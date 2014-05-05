How to build a Digg or Reddit clone with CakePHP
================================================

Bump or dump? Thatâ€™s the theme behind the newly launched Link Bump
(http://www.linkbump.com), where users "bump" the most interesting
videos and news to the top and "dump" the trash into oblivion. The
website was created with CakePHP and MySQL.
This is my first CakePHP application. Where to begin?

Overall Concept
```````````````
Users can share videos, news, or useful information (even if it's not
new). Unlike other popular social media applications, image
submissions are not accepted. The site aims for more useful content
and less humor.

All of the front page content is determined by users like you, not
some out-of-touch corporate fat cats. Once a new link is shared, it's
either bumped to the top or dumped into oblivion. You decide.

Database Structure
``````````````````
There are only 10 tables in the database:

1. users
2. links
3. link_descriptions
4. link_ratings
5. comments
6. comment_ratings
7. comment_texts
8. histories
9. page_views
10. search_links

For transaction support, all of the tables use INNODB except
search_links. Transactions allow me to keep a log of everything a user
does. For example, when a users bumps a link, a new row will be
inserted into link_ratings and histories. If either of the queries
fail, the transaction will be rolled back. CakePHP makes this easy
with saveall().

The problem with INNODB is that FULLTEXT searches are not supported.
This makes it difficult to search the Link.link_title and
LinkDescription.description fields. To remedy the problem, a MyISAM
table has been created called search_links. This contains a MyISAM
copy of the link_title and link_description data located in the INNODB
tables. Data integrity is maintained through a MySQL trigger. Whenever
a record is changed in links or link_descriptions, the corresponding
record is updated in search_links.


Javascript Libraries
````````````````````
Prototype and script.aculo.us are used for the AJAX effects.


Spam Control
````````````
Sites like this are sure to be inundated with link spam. To discourage
this practice, the external URL of each submission cannot be viewed by
anonymous users (or search engines) until it receives 20 votes. If you
login, you can view the external URL for all links.

Each user is only allowed one vote per link. Also, each IP address is
only allowed one vote per link.


Email
`````
SwiftMailer was used with the help of this `SwiftMailer component`_.


Future Plans
````````````
* Users will be encouraged to submit a profile photo, which will be
  used throughout the site.
* Video submissions will be embedded.
* Thumbnails should be added to each link submission.
* A rating system needs to be implemented for link comments.
* OpenInviter will be implemented to grow the community.
* Chinese and Korean versions of the website will soon be launched.


Conclusion and Outlook
``````````````````````
Of course it's nearly impossible for a small time programmer like
myself to compete with heavy hitters like Digg, Reddit, Yahoo! Buzz,
and Mixx. Hopefully LinkBump.com can find a niche, grow steadily, and
maintain moderate traffic. As of now, there are no advertisements on
LinkBump.com.

Criticism, comments, and suggestions are welcome. I would like to
thank the community for answering all of my questions.

`Link Bump Support`_
linkbump[at]gmail[dot]com

.. _Link Bump Support: http://www.linkbump.com/contact
.. _SwiftMailer component: http://bakery.cakephp.org/articles/view/updated-swiftmailer-4-xx-component-with-attachments-and-plugins

.. author:: sbefort
.. categories:: articles, case_studies
.. tags:: CakePHP,digg,rating,social media,reddit,Case Studies

