Sluggable Behavior for easy permalinks
======================================

I put together a CakePHP behaviour for generation of permalinks as a
record is saved to the database.

This has been shown to help with search engine optimisation, getting
important keywords and phrases into your site URLs.

Go from this: http://example.com/posts/view/23
To this: http://example.com/posts/view/great-new-widget-product-
released


+ Specify a source field from which the slug should be generated (e.g.
  column “headline” : ‘The Great & the Good’)
+ Specify a database field into which the slug should be stored (e.g.
  column “slug” : ‘the_great_the_good’)
+ Automatically handle potential duplicates, adding numerical suffixes
  accordingly Keep slugs constant even when source field changes (for
  true permalinks)
+ Slug may be manually overridden without problems by putting it into
  the data array being saved in Cake

`Download the source`_ from Github.


.. _Download the source: https://github.com/vduglued/CakePHP-Sluggable-Behavior

.. author:: vduglued
.. categories:: articles, behaviors
.. tags:: behavior,permalink,sluggable,Behaviors

