---
layout: post
title:  What is good code? A scientific definition.
date:   2015-03-11 11:10:00
excerpt: How would you define good code? This article gives a pseudo-scientific answer to that question after asking a sample of 65 developers that same question.
image: /assets/images/quality.jpg
thumbnail: /assets/images/quality-thumbnail.jpg
categories: engineering
author: Albert Pastrana
---
Here at Intent HQ we believe how important it is to write good code. Why? First, because writing good code is much cheaper and more fun than writing bad code. Second, because if you write good code chances are that the product you are building will be much better. Third, and more important, because writing good code is what we are supposed to do: after all, we are getting paid for doing our job *well*.

It's because of the importance of writing good code that we always ask the candidates what do they believe good code is. Note that the question asks for a subjective answer, and that's what what we are expecting, the actual thoughts of the candidate about what would he or she expect a code to have (or not have) in order to be considered good.

After lots of interviews we started wondering if we could come out with a definition of good code following a pseudo-scientific method. After all, we had the answers of dozens of software developers and they can't all be wrong, can they?

[![Good code measure is wtf/minute by osnews](/assets/images/good-code-wtf.jpg)](http://mobile.osnews.com/story.php/19266/WTFs_m)

## Methodology
The population is defined by all the software developers. The sample consists of 65 developers chosen by convenience (applying and having an interview for one of our positions). That means that the sample is biased to developers with some Java or Scala skills and, in general, +5 years of experience.

The questionnaire consists in a single question: _"What do you feel makes code good? How would you define good code?"_ The question has been asked by the same person in a job interview (face to face or via phone) in a period of approximately 1 year, from January 2014 to January 2015.

The answers were coded and grouped into 31 different categories grouping the answers that have a frequency of 2 or more, the rest of the answers were discarded for the purpose of this exercise. For example, the following answers fall in the category _Readable_:

> Readable

> Can be read by humans

> Self explanatory

> People can read it

> Easy to understand

> Takes less than 5 min to understand it

> You can read it, can understand it without documentation

> Understandable, new developers should be able to understand it

> Easily readable as if it was some text

> Easy to read. Straight forward


## Results

The answers of the 65 developers resulted in a total of 288 different items, an average of 4.43 items per person.

Of those, the most common answer by far was that the code has to be _Readable_ (78.46%), almost 8 of each 10 developers believe that good code should be easy to read and understand.

The next item in the list is _Testable/Tested_ (29.23%), meaning that good code should be covered by automated tests (or at least it should be possible to do it). One quarter of the respondents believe that good code should be _simple_ --not over complicated-- and that it should _work_ as well, meaning that should do what it's intended to do with answers like should be "functionally correct". The last item in the top five stands that the code should be _Maintainable_ (21.54%).

Curiously, following in the list we find two are about the same topic, documentation and comments in the code. People that argue the code should be self documented gave answers like  "no need to document to know what's happening" while the ones that highlight the importance of comments in the code go from documenting public apis ("proper javadocs") to "comments, explain what you are doing in your code".

Some other answers include _Clean_ --with clear references in some cases to the well known book "Clean Code" by [Uncle Bob](http://en.wikipedia.org/wiki/Robert_Cecil_Martin)--; _Extendable/Reusable_, e.g. "doesn't constraint you for extension"; the need to not repeat ourselves ([_DRY_](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself)); choose proper _Naming_; write code _Decoupled_ or the importance to write _Small methods_ --although small is a different concept that goes from "10-15 lines" to "<50" depending on the developer--.

![Characteristics of good code](/assets/images/good-code-characteristics.png)

## Discussion

The interviews have left us with some very interesting quantitative data to analyse, along with some qualitative data that is worth mentioning. See below some of the answers that we liked the most, some of them because they made us smile, some others just because they sounded so reasonable and obvious:

> Tested, it doesn't explode.

> Don't create things that don't need to exist.

> Anybody can go with a bit of comment. In the future they can see it.

> When you see it, it does make sense.

> You have to understand the business purpose.

> You don’t write code just to be there.

> No too clever.

> Bad code does a lot of things but none well.

From the results it's probably not surprising to see that vast majority of the developers really value readability and understandability in the code that they write (and read). What can be a little more surprising is the difference between that characteristic and all the rest, about 50% less!

Here at Intent we were slightly surprised by four items specifically (sorted by the level of surprise):

* _Maintainable_: given that most of us have had to maintain somebody else's code (or our own after some time) and have probably thought about them in non-friendly terms, we were expecting more developers to be worried about writing maintainable code. Maybe it's because some of them assumed that if the code is readable it's maintainable as well.

* _Works_: writing code should always have one purpose, deliver some value to somebody. Writing code that works, that it's actually deployed somewhere making somebody happy is one of our top priorities. So we were kind of surprised every time a developer didn't include that item in the answer. To be fair, it's also true that some of the developers had given that for granted (or at least that's what they said when asked) but it can be symptom of some underlying problem.

* _Testable/Tested_: we won't emphasise in here the importance of testing our code, we believe it's well covered in hundreds of other posts and books. That's precisely why we had thought that nowadays more developers would have highlighted the importance of having tests behind our code.

* _Efficient_: it's surprising that 40 years after the famous quote from Knuth: _"We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil"_ [^1]. There are more than two times more developers that highlight the importance of writing efficient code than developers that highlight the need to not fall in premature optimisation.

[^1]: Knuth, Donald (December 1974). "Structured Programming with go to Statements". _ACM Journal *Computing Surveys_ 6* (4): 268. CiteSeerX: [10.1.1.103.6084](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.103.6084).

Finally, we would like to create a definition of good code. In order to do it firstly we should decide how many dimensions we should take into account. Given that the average number of items answer by the developers is 4.46 then, we have decided to take the 5 items with more answers (_Readable_, _Testable/Tested_, _Works_, _Simple_ and _Maintainable) and use them to create the definitive (or at least democratic?) definition of good code:

**"Good code is written so that is readable, understandable, covered by automated tests, not over complicated and does well what is intended to do."**

Doesn't sound bad at all, does it?

[![How to write good code by xkcd](http://imgs.xkcd.com/comics/good_code.png)](http://xkcd.com/844/)[^2]

[^2]: Cartoon by [xkcd](http://xkcd.com/)
