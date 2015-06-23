---
layout: post
title: Process the whole Wikidata in 7 minutes with your laptop (and Akka streams)
date: 2015-06-23 11:20:32
excerpt: How Akka Streams can be used to process the Wikidata dump in parallel and using constant memory with just your laptop.
image: /assets/images/wikidata-akka-streams.jpg
thumbnail: /assets/images/wikidata-akka-streams-thumbnail.jpg
categories: engineering
author: Albert Pastrana
---

Here at Intent HQ we use Wikipedia and Wikidata as sources of data. They are very important to us because they both encode an enormous amount of information in several languages that we use to build our [Topic Graph](https://www.intenthq.com/the-topic-graph/).

Although the current process we have to process these dumps works well enough, we are always interested in finding new and better ways of doing our work. It's because of that that we were very excited when we saw the Reactive Streams initiative [^1]. We thought it could be used to process the largest encyclopædia in the world [^2].

One may think about using some of the (alert, buzzword landing) Big Data tools everybody is using nowadays. Wikidata and Wikipedia are huge (the english version of Wikipedia, for example, has over 4.8 million articles[^3] and the uncompressed dump is a single xml file of about 50 GB) and it is also challenging enough to work with. But we can't call it Big Data - actually, the whole dataset fits "easily" in memory[^4].

## The proof of concept

So, here we are, trying to solve an old problem with a (fairly) new technology. The main goal of the proof of concept was to evaluate if it was possible to process the whole Wikidata dump with constant memory usage and making the most of our computer (by using all of our CPU cores, for example).

The PoC was based on this requirement:

> In order to obtain the Wikidata ID for an item given its title and a specific language, we should generate an index containing (title, lang) => canonical-id

Let's see what we did...

You can think of Akka Streams as a graph. Our execution graph for this PoC was simple enough, it can be seen below:

    dump-file -> parse-json -> extract-site-links -> print-progress

### Creating the data source

If we want to create a stream, the first thing we will need is a Source[^5]:

 > A `Source` is a set of stream processing steps that has one open output. It can comprise any number of internal sources and transformations that are wired together, or it can be an “atomic” source, e.g. from a collection or a file. Materialization turns a Source into a Reactive Streams `Publisher` (at least conceptually).


In our case, this is the JSON Wikidata dump[^6] which comes in a single gzip compressed file as a (huge) JSON array. Luckily for us, each object is on a separate line in the file, so it can be easily read line by line and and processed independently.

This is an extract showing what the dump looks like:
{% highlight json %}
[
{"id":"Q1","type":"item", "aliases": ... },
{"id":"Q8","type":"item","aliases": ... },
...
{"id":"Q20022554","type":"item","descriptions": ... },
{"id":"Q20022558","type":"item","descriptions": ... }
]
{% endhighlight %}

The function that creates the source will need to make use of the Java io classes and would look something like this:
{% highlight scala %}
def source(file: File): Source[String, Unit] = {
  val compressed = new GZIPInputStream(new FileInputStream(file), 65536)
  val source = ioSource.fromInputStream(compressed, "utf-8")
  Source(() => source.getLines()).drop(1)
}
{% endhighlight %}

### Our first Flow: parsing the JSON

Once we have the data source, we need to parse the JSON and extract the relevant pieces of it. In our case, we would like to map each item in the file into a case class that contains the information we need for this PoC:

{% highlight scala %}
//id is the wikidata canonical id
//sites is a map of titles indexed by language
case class WikidataElement(id: String, sites: Map[String, String])
{% endhighlight %}

In order to process data from a stream, we will need to create a Flow[^7]:

> A processing stage which has exactly one input and output, which connects its up- and downstreams by transforming the data elements flowing through it.

In our case, the flow will receive a `String` and will output a `WikidataElement`, so we will need to create a `Flow[String, WikidataElement]`. Another way of thinking about it is as a function `(String => WikidataElement)`.

The resulting code could be something as simple as:
{% highlight scala %}
def parseJson(langs: Seq[String]): Flow[String, WikidataElement, Unit] =
  Flow[String].map(line => parseItem(langs, line))
{% endhighlight %}

Where `parseItem` is a function that parses a single line of the input file (an item element in the Wikidata JSON) and returns a `WikidataElement` filled with the titles for all the languages passed as a parameter.

It's important to note that this function won't be able to generate a `WikidataElement` for all the items in the input (some of them, for example, don't have any sitelink, so we are not interested in them), so the relationship between the output and the transformation is not 1:1.

That can be easily solved by returning an `Option[WikidataElement]` and by flattening the result. In Akka Streams, there is no `flatMap` but you can use `mapConcat` instead (note that it works only on `immutable.Seq[T]`).

{% highlight scala %}
def parseItem(langs: Seq[String], line: String): Option[WikidataElement] = ???

def parseJson(langs: Seq[String]): Flow[String, WikidataElement, Unit] =
  Flow[String].mapConcat(line => parseItem(langs, line).toList)
{% endhighlight %}

Now, if we combine the source creation and the transformation, we can have a source that reads the file and transforms it into a stream of `WikidataElements`:

{% highlight scala %}
val transformedSource = source(config.input).via(parseJson(config.languages))
{% endhighlight %}

### Adding a Sink: log every N elements

In the scenario we are considering for this simple PoC, we don't want to do anything else with the elements but just to log the progress every N elements. In order to do that we will need a `Sink`[^8]:

> A `Sink` is a set of stream processing steps that has one open input and an attached output. Can be used as a `Subscriber`

There are several ways of creating a `Sink`. For our purpose, we will fold over the stream to accumulate a counter that we will use to log a message every N elements. A possible implementation would be the following one:

{% highlight scala %}
def logEveryNSink[T](n: Int) = Sink.fold(0) { (x, y: T) =>
  if (x % n == 0)
    println(s"Processing element $x: $y")
  x + 1
}
{% endhighlight %}

Putting all together, we have a one-liner that creates a source, transforms it by parsing the JSON and logs a message every 10K items:

{% highlight scala %}
source(config.input).via(parseJson(config.languages)).to(logEveryNSink(10000)).run()
{% endhighlight %}

You must be thinking now: "that's ok, but I can't see why you need that *** framework to parse and process a file".

Well, you are right. We could try to argue that Akka Streams is this or that. But let's be honest, we haven't done anything (yet) that will change our lives. We will take this simple example and will add some cool stuff: it may not change your lives but it may make them easier at some point.

[![An Icon For A Commit](/assets/images/commit.png) _View the commit for this section on GitHub_](https://github.com/intenthq/wikidata-akka-streams/commit/d0e32be48427962d5d8f19c7b3db0d43c868ba73)

### Paralellise all the things!

Yep, we know, your CPU has N cores and you like all of them to be as busy as possible. Given that the process can be easilly parallelised, we only need to find how Akka Streams allow us do it. There are a couple of methods in the `Flow` class that can help us:

{% highlight scala %}
  /**
   * Transform this stream by applying the given function to each of
   * the elements as they pass through this processing step. (...)
   * These Futures may complete in any order, but the elements that
   * are emitted downstream are in the same order as received from upstream.
   */
  def mapAsync[T](parallelism: Int)(f: Out ⇒ Future[T]): Repr[T, Mat]
  /**
   * Transform this stream by applying the given function to each of
   * the elements as they pass through this processing step.
   * (...) each processed element will be emitted downstream as soon as it
   * is ready, i.e. it is possible that the elements are not emitted
   * downstream in the same order as received from upstream.
   */
  def mapAsyncUnordered[T](parallelism: Int)(f: Out ⇒ Future[T]): Repr[T, Mat]
{% endhighlight %}

The choice is clear then, if you are not interested in the order (and we are not) then `mapAsyncUnordered` is the answer, as you will make the most of the parallelisation process.

We are not yet done (almost). In order to make it work we will need to:

* Generate a `Future` for each item processed

* Decide how many of those futures will run in parallel (in our case, 8)

* Ensure there is an `ExecutionContext` defined. This can easily done by declaring an implicit in the `parseJson` function.

* Given that there is no `mapAsyncUnorderedConcat` or similar, we will need to make sure only the items correctly parsed are emitted in the resulting stream. We could compose `mapAsyncUnordered` results with `mapConcat(identity)` but, as we have already used `mapConcat`, we will use `collect` this time.

The resulting method is still pretty simple though:
{% highlight scala %}
def parseJson(langs: Seq[String])(implicit ec: ExecutionContext): Flow[String, WikidataElement, Unit] = {
  Flow[String].mapAsyncUnordered(8)(line => Future(parseItem(langs, line))).collect {
    case Some(v) => v
  }
}
{% endhighlight %}

[![An Icon For A Commit](/assets/images/commit.png) _View the commit for this section on GitHub_](https://github.com/intenthq/wikidata-akka-streams/commit/dce57805d745e009aa2283aaf1437ad4aa6dbbc3)

### Doing more stuff at the same time

Imagine now that besides logging every N items, we want another process to take each WikidataElement and tell us if the title (site link) is the same in all the specified languages. After that, we want to aggregate the results and output just the percentages.

One easy way of doing this is to create a `Sink` that does the processing and feeds both this new sink and the previous one (logging) with the stream of Wikidata elements. Akka Streams provides us with some very handy DSL to do it.

    dump-file -> parse-json -> extract-site-links -> print-progress
                                                  -> check-same-titles -> count

#### The logic

In order to count the items we will need a `Flow` that emits true if all the titles in the items are the same or false otherwise and, after that, a `Sink` that folds the stream counting how many of them are the same and how many are not.

{% highlight scala %}
def checkSameTitles(langs: Set[String]): Flow[WikidataElement, Boolean, Unit] = Flow[WikidataElement]
  .filter(_.sites.keySet == langs)
  .map { x =>
    val titles = x.sites.values
    titles.forall( _ == titles.head)
  }

def count: Sink[Boolean, Future[(Int, Int)]] = Sink.fold((0,0)) {
  case ((t, f), true) => (t+1, f)
  case ((t, f), false) => (t, f+1)
}
{% endhighlight %}

#### Putting it all together

Now, in order to do be able to have two flows processing the same stream, we will need to use what Akka Streams calls Graphs[^9]:

> Graphs are needed whenever you want to perform any kind of fan-in ("multiple inputs") or fan-out ("multiple outputs") operations. Considering linear Flows to be like roads, we can picture graph operations as junctions: multiple flows being connected at a single point.

The `FlowGraph` object contains several methods that will help us creating a graph. Given that our graph is fully connected and that we want to have access to the results of the count sink from the outside the resulting code would be similar to this one:

{% highlight scala %}
val elements = source(config.input).via(parseJson(config.langs))

val graph = FlowGraph.closed(count) { implicit b =>
  sinkCount => {
    import FlowGraph.Implicits._

    val broadcast = b.add(Broadcast[WikidataElement](2))
    elements ~> broadcast ~> logEveryNSink(1000)
                broadcast ~> checkSameTitles(config.langs.toSet) ~> sinkCount
  }
}
{% endhighlight %}

[![An Icon For A Commit](/assets/images/commit.png) _View the commit for this section on GitHub_](https://github.com/intenthq/wikidata-akka-streams/commit/9d0a00564b95abbf31580d0c28b7ac89b8fd16b9)

#### Results
We executed some tests comparing English, German and Catalan Wikipedia links (aka sitelinks). The execution took in between 362 and 410 seconds on a MacBook Pro 2.3 GHz Intel Core i7 (don't take that as a benchmark, we didn't). The results, in case you are interested are the following: 44.87% of the entries in the English Wikipedia share the same title with the German one while this figure is only 35.05% when we compare it with the Catalan Wikipedia.

Complete output below:

    en,de
     Number of items with the same title: 459833
     Number of items with the different title: 564918
     Ratios: 0.44872656869815203 / 0.5512734313018479

    en,ca
     Number of items with the same title: 122093
     Number of items with the different title: 226165
     Ratios: 0.3505820397521378 / 0.6494179602478622

    de,ca
     Number of items with the same title: 77044
     Number of items with the different title: 143737
     Ratios: 0.34896118778336904 / 0.651038812216631

### Conclusion

First of all, we had some good fun playing with Akka Streams. It's a fairly easy to use framework, well documented enough and with a mild learning curve. We will for sure consider using it in the future!

Now, it's your turn, try it for yourself -you can find a repo with the code of the PoC in our <a href="https://github.com/intenthq/wikidata-akka-streams/" target="_blank">github</a>- and let us know your thoughts.

[^1]: <a href="http://www.reactive-streams.org/" target="_blank">Reactive Streams</a>
[^2]: <a href="http://en.wikipedia.org/wiki/Wikipedia:Size_comparisons" target="_blank">Wikipedia: Size comparisons</a>
[^3]: <a href="http://en.wikipedia.org/wiki/Wikipedia:Size_of_Wikipedia" target="_blank">Wikipedia: Size of Wikipedia</a>
[^4]: <a href="https://news.ycombinator.com/item?id=9581862" target="_blank">Hacker news discussion: Your data fits in RAM</a>
[^5]: <a href="https://github.com/akka/akka/blob/release-2.3-dev/akka-stream/src/main/scala/akka/stream/scaladsl/Source.scala#L38" target="_blank">Akka Streams: Source.scala</a>
[^6]: <a href="https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29" target="_blank">Wikidata: Database download. JSON dumps</a>
[^7]: <a href="http://doc.akka.io/docs/akka-stream-and-http-experimental/1.0-RC3/scala/stream-flows-and-basics.html" target="_blank">Akka Streams: Basics and working with Flows</a>
[^8]: <a href="https://github.com/akka/akka/blob/release-2.3-dev/akka-stream/src/main/scala/akka/stream/scaladsl/Sink.scala#L24" target="_blank">Akka streams: Sink.scala</a>
[^9]: <a href="http://doc.akka.io/docs/akka-stream-and-http-experimental/1.0-RC3/scala/stream-graphs.html" target="_blank">Akka Streams: Working with Graphs</a>
