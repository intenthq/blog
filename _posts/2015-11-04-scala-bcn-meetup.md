---
layout: post
title:  Scala Barcelona Meetup
date:   2015-11-04 17:20:56
excerpt: The 29th of October Albert Pastrana & Artur Soler spoke about how Intent HQ is using Scala in production at the Scala Barcelona meetup.
image: /assets/images/scala-bcn-meetup-title.jpg
thumbnail: /assets/images/scala-bcn-meetup-thumbnail.jpg
categories: engineering
author: Albert Pastrana
---

On Thursday 29th October we had the pleasure to be speakers in the [Scala Barcelona meetup](http://www.meetup.com/Scala-Developers-Barcelona/). The group is very active and tries to schedule an event every two weeks to talk, discuss and enjoy coding some Scala.

Being one of the few companies in Barcelona that use Scala in production, we were asked to do a presentation about how are we using it internally. Last June we spoke about Akka Streams and published a blog post about how to [use Akka Streams to process larges amounts of data](/2015/06/wikidata-akka-streams/). This time we wanted to give a high level overview of how we are using Scala to do things like Natural Language Processing.

The presentation gave an overview of some of the problems we are solving at Intent HQ to provide the audience with some context. We ran through an example of how we could implement an algorithm that allows you to link a piece of text to a topic (aka Named Entity Linking).

Because of time constraints (and because it's part of our core IP), we just presented an oversimplified algorithm that would allow some discussion and learnings. [The code from the talk can be found on github](https://github.com/intenthq/scala-based-on-a-true-story).

The presentation, titled "Scala (based on a true story)" is available here:

<div class="iframe-container">
<iframe src="https://docs.google.com/presentation/d/1IOtDeS3Hh9zO1SERKCoxzOsknXUMvBcx3nKOAhYJj3Y/embed?start=false&loop=false&delayms=60000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>

Sometime in the next quarter we would like to participate again in the meetup and talk about some other technologies we are using, such as Spark. Let us know if you have any preference on what we could speak about!
