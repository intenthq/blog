---
layout: post
title:  For Those About To Code <br>(We Salute You)
date:   2015-06-8 12:00:00
excerpt: Looking for a memorable and fun way to explore programming languages? <br>"Nevermind" the rest, this technique rocks!
image: /assets/images/rock-title.jpg
thumbnail: /assets/images/rock-thumbnail.jpg
categories: engineering
author: Alec Hill
---

As programmers, a large portion of our job is to stay aware of, research, and assess new technologies in an industry that evolves at breakneck speed. Being continually bombarded with such information it can seem like an uphill struggle to process this information in a memorable fashion.

How we cope with this varies on an individual basis, and my method for learning, exploring, and (crucially) remembering a new programming language has been pointed out to be somewhat unconventional, yet strangely effective - perhaps it could be for you too?

###This is Major Tom To Ground Control

The ubiquitous "Hello World" scenario - whereby you are shown the code necessary to output the words "Hello World" - has long been the defacto introduction to a new language. While this is extremely useful as an indicator of complexity and verbosity, it is soooooo immeasurably dull that it is almost instantly forgettable. The fact that there are so many other "Hello World" examples seems to work against its memorability, as there is nothing to make it stand out.

###Exit Hello World, Enter Sandman

There have been many studies into the positive effect of the senses on memory. A smell can remind you of a place visited long ago, a song can trigger the memory of a specific moment in time only rememebered subconciously. So can this be utilised for learning a new programming language? Fo' shizzle! Attempt to apply the language to the lyrics of a song of course!

###This Is How We Do It

Now you can't pick just any song, and this is a key factor to get you highly invested and start priming the memory. It has to be a good fit for the language, which is great for researching and remembering best practices, and hence learning to avoid the bad ones.

For example, take Mark Morrison's seminal _"Return of the Mack"_, if you wish to explore [Scala](http://www.scala-lang.org), and your idea was to use the **`return`** keyword to accomplish the namesake lyric, you would find that explicitly returning values in Scala is not considered good practice, so may not be a good candidate song. However, you will have learnt something even though it is not an easy fit, from the very fact you evaluated it for a particular scenario, and discounted it, rather than simply reading about the languages nuances. Hence, you are much more likely to remember that in Scala, The Mack never returns!


{% highlight scala %}
// A very crude example of bad practice to fit song lyric

class Protagonist (var saidThatILoveYou:Boolean = false,
                   var tried:Boolean = false,
                   var cried:Boolean = false) {

  def liedTo(someone: Protagonist): Either[String, String] = {
     if (someone.saidThatILoveYou && someone.cried && someone.tried) {
      return Right("The Mack!")
    }
    Left("Oh my god")
  }
}

object ReturnOfTheMack {
  def main(args: Array[String]) = {
    val (you, me) = (new Protagonist, new Protagonist)

    you.liedTo(me).right.foreach(println)
    me.saidThatILoveYou = true
    you.liedTo(me).right.foreach(println)
    me.tried = true
    you.liedTo(me).right.foreach(println)
    me.cried = true
    you.liedTo(me).fold(x => println(x.toUpperCase), println)
  }

}
{% endhighlight %}

On the other hand if you wanted to experiment with ranges, symbols, and enumeration in [Ruby](https://www.ruby-lang.org), Jay-Z's _"99 Problems"_ could be the perfect fit...

{% highlight ruby %}
def feel_bad_for_you_son?(args)
  (0..args[:problems]).any? { |problem| args[:has_girl] unless problem != (bitch = 1) }
end

feel_bad_for_you_son? :has_girl => true, :problems => 99
{% endhighlight %}

Once it is chosen it likely won't be a smooth ride. This is fine, it will help!

* Write a rough outline that represents the lyrics well, but likely doesnt compile or run. 

* Every time an error is encountered, research the reasons why

* Refactor bit by bit in a manner that still conveys the lyrics or the concepts contained in the song

* Rinse and repeat until compiles and runs

* Evaluate entire program against song lyrics (optional)

* Refactor to better fit song with your newfound wider knowledge (optional)

###It's Like That, And That's The Way It Is
The benefits I find are two-fold:

* In the desire to convey the complexities of a song, you will inevitably run into and experiment with many low level characteristics of the language that you would not encounter in a "Hello World" exercise. 

* Recollection of the exercises results is enhanced by having engaged both the creative and analytical functions of the brain and creating a direct mapping between the two, much like the [Picture Superiority Effect](http://en.wikipedia.org/wiki/Picture_superiority_effect) attempts to do via imagary. In this case it is easier to visually recall the song written in code from memory as there is another stimulus to aid you - the song playing in your head - the same stimulus as when you were performing the excercise.


###Back To Life, Back To Reality

While you may be thinking this as all fun and games and not at all applicable to real life situations, this was used to great effect when I was tasked with interviewing candidates for a QA Automation Lead role. In order to do so, I had to very quickly familiarise myself with [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin). Admittedly, this was a much easier task given the limited scope of the language and its human readable syntax, however I decided to make it more interesting by attempting to research and incorporate all the features of the language into a single memborable song.

After toying with Michael Bolton's _"How Can We Be Lovers"_ (due in equal parts to the conditional structure of the lyrics, and my lifelong admiration of his majestic flowing locks), it was eventually decided to settle upon The Human League's anthemic _"Don't You Want Me"_.

{% highlight gherkin %}
@the-human-league
Feature: Don't You Want Me
  As an Eighties superstar
  I want to ascertain if I was ever wanted by you in the Eighties
  In order to justify my extravagent shoulder pads

  Background:
    Given It is 1981

  @philip-oakey
  Scenario Outline: As an Eighties icon, I would like to change your life, Baby
    Given You were working as a "<job_title>" in a "<workplace>"
    When I met you
    And I picked you out
    And I shook you up
    And I turned you around
    And I turned you into someone new
    Then You should not be working as "<job_title>" in a "<workplace>" after "<period>"

    Examples:
      | job_title | workplace    | period   |
      | waitress  | cocktail bar | 5 years  |
      | developer | tech startup | 10 years |

  @philip-oakey
  Scenario: As an Eighties idol, I would like to be acknowledged for influencing your life, Baby
    Given After meeting me, your success has been easy for:
      | 1 year  |
      | 2 years |
      | 3 years |
      | 4 years |
      | 5 years |
    When You forget it was me who put you where you are now
    Then I can put you back down too

  @philip-oakey
  Scenario Outline: As an Eighties legend, I think you should want me, Baby
    Given I have done all this for you
    When I ask you if you want me
    Then I should not believe you if you say you do not "<sentiment>" me

    Examples:
      | sentiment |
      | want      |
      | see       |
      | need      |

  @philip-oakey
  Scenario: As an Eighties heartthrob, I would like to threaten you, Baby
    Given It's much too late to find
    When You think you've changed your mind
    Then You'd better change it back or we will both be sorry

  @susan-ann-sulley
  Scenario Outline: As an Eighties babe, I would like you to get over yourself, Baby
    Given I was working as a "<job_title>" in a "<workplace>"
    When That much is true
    And Even then I knew I would find a much better place
    And That was "<relationship_status>" you
    And The "<period>" we have had has been such good times
    And At times I still "<sentiment>" you
    And Now I think it's time I lived my life on my own
    Then I guess it's just what I must do
    
    Examples:
      | job_title | workplace    | relationship_status | period  | sentiment |
      | waitress  | cocktail bar | with                | 5 years | love      |
      | developer | tech startup | without             | 0 years | hate      |


{% endhighlight %}

###It's The Final Countdown

Hopefully you will find some merit to this _"Off The Wall"_ technique, and perhaps give it a try. However, even if you do not find it useful as a learning tool, consider its potential uses elsewhere, here are some for consideration:

>**Recruitment:** Candidate employees complete no end of boring coding challenges prior to inteview. Will they put more effort into a challenge that is fun and differentiates itself from the rest? Very probably! Would they be attracted to a company that stands out in its more interesting and relaxed approach? Hell yeah! 

>**Motivation / Team building:** Why not introduce a recurring challenge between teams of your programmers? Rewarding perhaps a team lunch for the winners, for a fun activity that gets them working together, thinking outside usual constraints, and lets them experiment with new languages furthering skills within the company.

>**Brand Image:** When the idea for a "code wall" came about at IntentHQ to showcase excerpts of what is *under the hood*, these were deemed perfect material for promoting our light hearted attitudes and abilities simultaneously, whilst also creating a talking point for intrigued visitors.

Above all have fun, and make of it what you like - I'll be seeing you at the first Programmy Awards ceremony!