Custom RSS-Helper that actually works with namespaces for Cakphp 2.0
====================================================================

I had a hard time using cakes built in rss helper to create a podcast-
feed for iTunes/iTunes U, because Apple wants us to use custom tags
defined in their own namespace. Namespaces don't work with cakes rss
helper (for now), so I built my own!

I've described my problems in `this thread`_ over in the cakephp
google group.

My own solution consists of a very simple little helper class which I
posted to the bin: `Cakephp bRss Helper`_

For how to use it have a look at the official cakebook `here`_.

But unlike there, use `this layout`_ and `this view`_. Note how I
ignore the 'documentData' and create the surrounding rss tag with the
necessary namespace information "by hand".

Also my helper just constructs the xml as a string without ever using
php's xml object.

I'm aware that this is by no means a good implementation, but it works
for me and there will probably be a fix in the original cakephp helper
at some point. But if you run into the same problems as I did, feel
free to try this solution and also to improve it! You can also just
comment if you have troubles running it.


.. _this layout: http://bin.cakephp.org/view/362729703
.. _here: http://book.cakephp.org/2.0/en/core-libraries/helpers/rss.html
.. _Cakephp bRss Helper: http://bin.cakephp.org/view/1232471515
.. _this view: http://bin.cakephp.org/view/1266667979
.. _this thread: http://groups.google.com/group/cake-php/browse_thread/thread/25e0f825c4eb878b#

.. author:: benni
.. categories:: articles, helpers
.. tags:: helper,Rss,cakephp 2.0,podcast,itunes,Helpers

