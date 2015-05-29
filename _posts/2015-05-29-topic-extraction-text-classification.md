---
layout:     post
title:      Using Intent HQ topic extraction API for text classification
date:       2015-05-29 16:00:00
excerpt:    Named linked entities as features for text classification.
image:      /assets/images/tetc-title.jpg
thumbnail:  /assets/images/tetc-thumbnail.jpg
categories: R&D.
author:     Vladislav Soldatov.
---

Most of the data available on the Web is in the form of unstructured text. One of the ways to turn this mass of information into more structured, useable data is to extract keywords of known meaning - **named entities** - from the text. However, to make these extracted entities useful you need to overcome the many ambiguities that exist in everyday language. For example, the word ‘table’ can have several very distinct meanings: table as a piece of furniture, or table as an object in a database, or it can even be a verb, depending on the context of the sentence.

One approach often used to resolve these potential ambiguities is Entity Linking: a procedure that links each mention of an entity in the text with some corresponding entity in a knowledge base. 
**NED (Named Entity Disambiguation, NERD (Named Entity Recognition and Disambiguation, or NEN (Named Entity Normalization)** are all terms commonly used to describe this process.  The first, and very important step is to select a knowledge base to link to. One of the popular choices here is Wikipedia.

Named entity linking is difficult because of name variations and name ambiguity. Is it very common for a particular named entity to be expressed using a number of different word forms: full name, partial name, alias, abbreviation, even different spellings are often permitted. For example, an entity ‘University of Cambridge’ can appear in the text as ‘Cambridge University’ or ‘Cantab’. In this case an entity linking system has to find the correct mapping of different mentions to the same entity. Another case (the above example with ‘table’) requires the linking system to disambiguate all entity mentions and find a correct mapping for each of them.

####**There are several useful applications of named entity linking**:


 >**Knowledge base population.** 
>In the case of Wikipedia, it’s called Wikification and means adding links to existing Wikipedia articles to any new piece of 
>information that is to be added to it.

>**Question answering.**
>To answer a question ‘When did George Stevenson build the first public inter-city railway line in the world to use steam 
>locomotives’, question answering system should first perform named entity recognition,  then link ‘George Stevenson’ entity 
>to the ‘proper’ Stevenson, that is George Stevenson, english civil engineer, and then retrieve the necessary information 
>from the knowledge base.

>**Content analysis.**
>As a way to represent a piece of text in terms of it topics, ideas, categories, it is beneficial for content recommendation 
>systems and allows to recommend textual resources (pages) to users based on similarity of extracted (and linked) entities
>from the pages already viewed by the user.

>**Text Classification (categorisation).**
>Text (or document) classification (categorisation)  aims to assign some predefined categories to every piece of text from a 
>certain collection of documents. To run a classification algorithm on a set of texts,  we first need to extract features 
>from this text.

High dimension of feature space is one of the main problems in text categorisation, since naturally dimensionality of such feature space is equal to the total number of unique words in a collection of texts we are trying to classify. Since such high dimensionality makes application of some classification algorithms infeasible, it is highly beneficial to apply some automatic *dimensionality reduction methods*.

A widely used approach is to use one of the **automatic feature selection methods**, which aim to remove non-informative (in terms of some statistics over the whole set of texts) terms from the feature space. An example of a simple text feature selection method is document frequency thresholding. Document frequency for each term in the training corpus is computed and all the terms with this frequency lower than some limit are removed from the feature space.

Another promising approach is to use **named linked entities as text features**, which could give us the following benefits:

* Linked entities allow to differentiate similar words depending on the context they are used in. In an above example with the entity ‘table’ this will allow us to distinguish between, for example, ‘database’ and ‘furniture’ category.

* Linked entities could help mapping synonyms into one feature, e.g. ‘Cambridge University’ and ‘Cantab’ will map to the ‘University of Cambridge’.

* Linked entities effectively map multiple word entities into one feature

This last approach requires a good entity linking engine. As you may be aware from the post [‘Topic Graph Works’](https://www.intenthq.com/topic-graph-works)  by Phil Messenger on the Intent HQ company blog, Intent HQ topic graph is a data structure which encodes millions of concepts and links them based on ontological, categorical, semantic and affinity based relationships. It also exposes a topic extraction API, which you can use for entity linking (as described above), and then run classification algorithms on using extracted topics (named entities) as features.

####*Bibliography*
1. Král, P. (2014). Named Entities as new Features for Czech Document Classification. In Computational Linguistics and 
Intelligent Text Processing (pp. 417-427). Springer Berlin Heidelberg.

2. Yang, Y., & Pedersen, J. O. (1997, July). A comparative study on feature selection in text categorization. In ICML (Vol. 97, pp. 412-420).
3. Mihalcea, R., & Csomai, A. (2007, November). Wikify!: linking documents to encyclopedic knowledge. In Proceedings of the 
sixteenth ACM conference on Conference on information and knowledge management (pp. 233-242). ACM.

4. Shen, W., Wang, J., & Han, J. (2014). Entity linking with a knowledge base: Issues, techniques, and solutions.











