---
layout: post
title:  Automatic topic-modelling with Latent Dirichlet Allocation
date:   2015-02-24 14:50:00
excerpt: LDA automatically assigns topics to text documents. How is it done? Which are its limitations? What is the best open-source library to use in your code?
image: /assets/images/lda-title.jpg
thumbnail: /assets/images/lda-thumbnail.jpg
categories: r&d
author: Alberto Boschetti
---

At IntentHQ we deal with a huge amount of data on a daily basis. Much of this is textual as we try to get an intimate understanding of articles, web pages, blog posts and opinions. Fortunately, **text mining**, a branch of data science, gives us a hand.

In this post we’re going to describe how topics can be automatically assigned to text documents; this process is named, unsurprisingly, **topic-modelling**. It works like fuzzy (or soft) clustering since it’s not a strict categorisation of the document to its dominant topic.

Let’s start with an example: the optimal topic-modelling outcome for Shakespeare’s Romeo & Juliet would be a composition of topics of circa 50% tragedy and 50% romance. Surely, topics like social networks, football and indian cuisine don’t appear in the play, so their weights would be all 0%.

One of the most advanced algorithms for doing topic-modelling is **Latent Dirichlet Allocation** (or **LDA**). This is a probabilistic model developed by Blei, Ng and Jordan in 2003. LDA is an iterative algorithm which requires only three parameters to run: when they’re chosen properly, its accuracy is pretty high. Unfortunately, one of the required parameters is the number of topics: exactly as happens with K-means, this requires a deep a-priori knowledge of the dataset.

A good measure to evaluate the performance of LDA is **perplexity**. This measure is taken from information theory and measures how well a probability distribution predicts an observed sample. To evaluate the LDA model, one document is taken and split in two. The first half is fed into LDA to compute the topics composition; from that composition, then, the word distribution is estimated. This distribution is then compared with the word distribution of the second half of the document. a a measure of distance is extracted. Thanks to this measure, in practice, perplexity is often used to select the best number of topics of the LDA model.

Under the hood, LDA models both the topics-per-document and the topic-per-word distribution as Dirichlet distributions (that’s why it appears in its name). By using a Markov Chain Monte Carlo (MCMC) method to sample and approximate the underlying Markov Chain stationary distribution (called **Gibbs sampling**), the whole process is iterative, pretty fast, convergent and accurate. Math behind LDA is fairly complex, but a simple example on how LDA works is contained in this video presentation of David Minmo, a world class researcher of topic-modelling:

<iframe src="//player.vimeo.com/video/53080123" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/53080123">Topic Modeling Workshop: Mimno</a> from <a href="https://vimeo.com/mithinmd">MITH in MD</a>.</p>

### Start TL;DR
For the bravest, this is the graphical representation of LDA: grey circles represent the observable variables; latent (also called hidden) ones are white. Boxes represent collections (repetition) of variables.

![Graphical representation of LDA](/assets/lda-graphical-representation.png)

*[Image taken from Wikipedia, CC-3.0 licensed]*

Parameters of the model:

- Boxed:

  - K is the number of topics

  - N is the number of words in the document

  - M is the number of documents to analyse

- α is the Dirichlet-prior concentration parameter of the per-document topic distribution

- β is the same parameter of the per-topic word distribution

- φ(k) is the word distribution for topic k

- θ(i) is the topic distribution for document i

- z(i,j) is the topic assignment for w(i,j)

- w(i,j) is the j-th word in the i-th document

φ and θ are Dirichlet distributions, z and w are multinomials.

### End TL;DR


On the Internet there are a bunch of libraries able to perform topic-modelling through LDA. Note that the acronym LDA is also refer to another technique with the same initials (Linear Discriminant Analysis), but the two algorithms are completely unrelated. Now, in the follow, our point of view of some open sourced Latent Dirichlet Allocation Implementations. For each of them, we’re pointing out strengths and weakness, as well as simplicity to install and use and scalability.


### [MALLET](http://mallet.cs.umass.edu) and [TMT](http://www-nlp.stanford.edu/software/tmt)

- Current status: no longer developed or maintained

- Programming language: Java (Mallet) and Scala (TMT)

- Features: university backed software, not optimised for production. Great for learning and exploring LDA on small datasets, understanding its parameters and tuning the model.

- Scalability: multi-threaded, single-machine. Good for small to medium collections of documents.

- Simplicity to install: simple. Jar distributed and Maven compilable.

- Simplicity to train the model: simple and very customisable.

- Infer topics on unseen documents: simple as well as training.

### [Y!LDA](https://github.com/shravanmn/Yahoo_LDA)

- Current status: no longer developed or maintained

- Programming language: C++

- Features: Very scalable LDA algorithm, able to scale across multiple hosts and cores. Code is very optimised, and requires experienced C++ developers to modify it.

- Scalability: multi-core, multi-machine Hadoop backed. Good for medium to huge collections of documents (it’s able to handle 1M+ documents).

- Simplicity to install: pretty complicated. A 4 years old linux box with many outdates libraries are required. Ice dependency is very tricky to install.

- Simplicity to train the model: cumbersome. It tooks a long while to make Yahoo_LDA working properly on a Hadoop cluster. Also, in case of error, C++ compiled code on a Java/Hadoop system makes the investigation of what went wrong very hard.

- Infer topics on unseen documents: simpler than the training phase.

### [GraphLab](https://github.com/graphlab-code/graphlab)

- *Current status*: active. Maintained by GraphLab Inc and community

- Programming language: C++

- Features: Very scalable LDA algorithm, able to scale across multiple hosts and cores. Code and algorithms are very optimised, and requires experienced C++ developers to modify it.

- Scalability: multi-core, multi-machine through MPIs. Good for medium to huge collections of documents (it’s able to handle 1M+ documents).

- Simplicity to install: pretty simple (cMake), with few dependencies to install.

- Simplicity to train the model: pretty simple, even in a multi-machine environment. Following the easy documentation, LDA simply works.

- Infer topics on unseen documents: complex. There is not an out of the box routine to infer topics on new documents. Creating that inferencer is not so complicated, though.

- Note: recently, documentation of LDA has disappeared from the website. Fortunately, it’s still available from the [internet archive](http://web.archive.org/web/20140820035159/http://docs.graphlab.org/topic_modeling.html).

### [Gensim](https://radimrehurek.com/gensi)

- Current status: active. Maintained by Radim Řehůřek and community

- Programming language: Python (with core pieces in Fortran/C)

- Features: Very scalable LDA algorithm, distributed, able to process input collections larger than RAM (online learning) and easy to use.

- Scalability: multi-core, multi-machine through RPCs. Good for medium to large collections of documents (it’s able to handle 1M+ documents).

- Simplicity to install: very easy (using pip install or easy_install)

- Simplicity to train the model: very simple. There are many helping routines that allow to build and tune the model with few lines of code (also in multi-machine environment)

- Infer topics on unseen documents: very easy. It also update the model with the sample.

- *Quick tour* as IPython notebook [here](http://nbviewer.ipython.org/gist/boskaiolo/cc3e1341f59bfbd02726).

### LDA limitations: what’s next?

Although LDA is a great algorithm for topic-modelling, it still has some limitations, mainly due to the fact that it’s has become popular and available to the mass recently. One major limitation is perhaps given by its underlying unigram text model: LDA doesn’t consider the mutual position of the words in the document. Documents like “Man, I love this can” and “I can love this man” are probably modelled the same way. It’s also true that for longer documents, mismatching topics is harder. To overcome this limitation, at the cost of almost square the complexity, you can use 2-grams (or N-grams)along with 1-gram.

Another weakness of LDA is in the topics composition: they’re overlapping. In fact, you can find the same word in multiple topics (the example above, of the word “can”, is obvious). The generated topics, therefore, are not independent and orthogonal like in a PCA-decomposed basis, for example. This implies that you must pay lots of attention while dealing with them (e.g. don’t use cosine similarity).

For a more structured approach - especially if the topic composition is very misleading - you might consider the hierarchical variation of LDA, named H-LDA, (or simply Hierarchical LDA). In H-LDA, topics are joined together in a hierarchy by using a Nested Chinese Restaurant Process (NCRP). This model is more complex than LDA, and the description is beyond the goal of this blog entry, but if you like to have an idea of the possible output, here it is. Don’t forget that we’re still in the probabilistic world: each node of the H-DLA tree is a topic distribution.

![Graphical representation of LDA](/assets/hlda_example.png)

*[Image taken from the original paper on HLDA: Blei, Jordan, Griffiths Tenenbaum, © MIT Press, 2004 ]*

If you're very curious on LDA, I've prepared a quick example [here](http://nbviewer.ipython.org/gist/boskaiolo/cc3e1341f59bfbd02726).

Enjoy!