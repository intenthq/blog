---
layout: post
title:  BigData and CAP theorem in plain english
date:   2016-05-19 17:20:56
excerpt: Demitifying BigData and the CAP theorem. Trying to understand them by means of a metaphor.
image: /assets/images/big-data-cap-theorem/library-title.jpg
thumbnail: /assets/images/big-data-cap-theorem/library-thumbnail.jpg
categories: engineering
author: Albert Pastrana
---


> Are you a troubled developer because your boss heard about BigData and is asking you about it?

> Are you a CEO who just wants an understandable explanation about the CAP theorem?

> Are you the partner of a developer who just wants to understand what he/she is doing?

Don't worry, we have the solution: BigData and the CAP theorem explained in plain english.

Sometimes we (techies) tend to talk techie and not care about the real world understanding what we are doing. In my particular case, my wife often asks me during dinner about my day. And I have to admit that explaining it in plain (in my case) catalan can be quite challenging.

This article will pick some ideas from those conversations and will try to explain, by means of a metaphor, the implications of BigData and the CAP theorem[^other].

## Scaling vertically vs horizontally

Imagine that you own a [library](https://en.wikipedia.org/wiki/Library) (yes, that will be our metaphor). You have lots of books and magazines in it but, at some point, you don't have enough space in the shelves, so you decide to buy some more.

<img alt="Adding floors" style="float: right;" src="/assets/images/big-data-cap-theorem/scafolding.jpg">

After some weeks, you've filled the five floors of your library with shelves but you still don't have enough space (disk) for all the books you want to keep. This is when you decide you need to add floors to the library building.

With more books you also need to grow your library index, so you need to buy more cards (memory). You'll probably need to hire more librarians (cpu). Also, there is a point there are queues outside the building (too many visitors) so you need to open more entrance doors (network).

As you have imagined, this is what it's called "scaling up" or "scaling vertically"[^scale]. You find your bottleneck (e.g. memory) and just make it bigger.

Someday you'll see that the cost of expanding your library is prohibitive or, directly that it is physically impossible to add more shelves, indexes or doors. That day is the day you realise you need to build another library.

And yes, your guess is correct, creating a library network and adding more nodes (buildings) to it would be to "scale out" or "scale horizontally" your library.

## Sharding, redundancy and replication factor

### Sharding
Now that you have multiple buildings you need to take some important decisions. The first one is to decide how to distribute your books among the different libraries (sharding[^shard]).

One possible and easy solution would be to distribute them by author. Books of authors whose lastname starts with A, B, C or D go to building number 1. Authors with lastname starting with E, F, G or H go to building number 2 and so on.

You soon realise a problem with that approach. The authors lastnames are not distributed equally and some authors (like Terry Pratchet) have written many more books than others. The implication is that some of your buildings are half empty while some others are too busy.

You need to choose a better criterion (partition or shard key) that is easy to compute and well distributed. There are several options and there is not a good answer that will work in any scenario (it will depend on how your index is created, what queries can you do, what are the most common queries people is doing...). But, as an example, hashing the book title and using the modulus to decide which building the book is in would provide a better distribution of the books.

### Redundancy and replication factor

One day you read about [what happened to the alexandrians](https://en.wikipedia.org/wiki/Destruction_of_the_Library_of_Alexandria) and think about what would happen if one of the buildings caughts fire. So you decide to buy extra copies of your books and put them in different buildings (redundancy).

Of course, this comes with a cost and implications, both of them will depend on how many copies you want to keep (replication factor) among others.

Besides the obvious advantage of having backup copies of each book (you could have achieved that by simply having a warehouse), this new architecture has a major drawback, every time you receive a new edition of a book, you'll need to send the updated copy to each of he buildings -with a van, a truck, a train or a bycicle, but books (not yet) fly by themselves.

## CAP Theorem (aka Brewer's theorem)[^cap]

Now that you have several buildings spread all over the city with the books distributed among them is when you'll start having troubles.

Let's see what are the prolems that arise when you distribute your data by looking at different scenarios but, before that, we will define three desirable conditions that any library should fulfill.

- _Consistent:_ the books (data) in your library should be consistent.
  That means that if a book has a new edition with some corrections, all the
  different buildings should have that same edition so that any user requesting
  the book gets the same information.

- _Available:_ any user requesting a book in your library should be able
  to get a response regardless it is successful (for example, we have the
  book) or a failure (we don't have it). But the librarians should always
  be in the position where they know if they have the latest edition of
  the requested book.

- _Partition tolerance:_ the users can continue using the library despite
  any problem in the communications or the roads that connect the libraries.

[Eric Brewer](http://www.cs.berkeley.edu/~brewer/) stated that it is impossible for a distributed ~~computer system~~ library to be consistent, available and tolerant to ~~network~~ road partitions at the same time. The concept that you have to choose "two out of three" was rapidly spread, although, as we'll see next, it can be misleading.

### You can't choose any two

As just mentioned, many people saw the CAP theorem as a simplification that stated that you had to choose between a system being CA, CP or AP, which was kind of misleading as the same Eric pointed out some years later[^cap2].

In a distributed system (like our library) you will almost always rely on something you don't own or control, the communications. That means that you system *will* have network partitions.

In our example, you can't rely on the roads being always open, as it may snow, there may be a parade or a demonstration that doesn't allow you do go from one library to another.

In the real world, if your system is in two different datacenters you must account for the likelihood of a network partition. The probability of a network problem is much lower if your entire system is in the same datacenter and you control it, but it's not impossible.

The conclusion that comes from all the above is simple. If you want your libraries to be tolerant of not being able to communicate with each other, you'll need to plan what to do in case of a network problem:

- Tell your users the book they are requesting is not available. (Availability)

- Tell your users you have the book they are requesting, but you
  don't know if it's the latest edition. (Consistency)

This is (again) a bit misleading as your system doesn't need to choose between being consistent or available and the approach taken by most modern solutions is to have a balance between consitency and availability. But that's probably a discussion for another post, this one is already too long.


_[Library picture](https://www.pexels.com/photo/library-university-books-students-12064/) by [Tamás Mészáros](https://www.pexels.com/u/repuding/) is licensed under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)_

_[Scafoling picture](https://www.flickr.com/photos/gagilas/8094965097/) by [Gagilas](https://www.flickr.com/photos/gagilas/) is licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)_

## References

[^other]: Kaushik Sathupadi already did something similar some time ago: [http://ksat.me/a-plain-english-introduction-to-cap-theorem/]()
[^scale]: [https://en.wikipedia.org/wiki/Scalability#Horizontal\_and\_vertical\_scaling]()
[^shard]: [https://en.wikipedia.org/wiki/Sharding]()
[^cap]: [https://en.wikipedia.org/wiki/CAP_theorem]()
[^cap2]: Eric Brewer, ["CAP twelve years later: How the 'rules' have changed"](http://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed), IEEE Explore, Volume 45, Issue 2 (2012), pg. 23-29.
