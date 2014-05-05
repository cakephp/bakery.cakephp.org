Got2BShoes.com - Intelligent Caching of Amazon's Product Advertising
API
===

Intelligent Caching of Amazon's Product Advertising API provide a
simple and elegant solution to people who are shopping for many
different types of shoes including men's shoes, women's shoes, and
more.


Introduction
~~~~~~~~~~~~
As my first CakePHP project, `Got2BShoes.com`_ was definitely a
learning experience. Knowing what I know now, I would have done a few
things differently. However, I'm pretty happy with how it came out. In
this article Iâ€™ll focus mostly on what I did to intelligently cache
the Amazon Product Advertising API data.
The overall concept of the website was to use Amazon's Product
Advertising API to gather and cache footwear data on a regular basis
and drive potential customers to Amazon. This website was to help
those people who want a stupid simple way to find the shoes that they
want to buy and then directing them somewhere that can process the
sale and ship it quickly.


The Challenge
~~~~~~~~~~~~~
The biggest challenge was to fill and maintain the database with shoe
information that would update regularly to keep things fresh as a
daisy. This sounds a lot simpler than it is. The API typically
provides data in chunks of ten items at a time. Using Cake, Got2BShoes
parses the information in the API and puts it in a MySQL database for
future use. The bulk of this work is performed by a single CakePHP
shell, which performs many actions:


#. Maintains the shoe category hierarchy as Amazon.
#. Maintains a record for each page in those categories. Why maintain
   records for each page? Well let me explain... In Amazon's API, each
   request made for a category will also yield how many pages of items
   the category has. Each page, with ten items each, has to be fetched
   separately. For example, the `women's sandal`_ has over 10,000 items.
   This means it has over 1,000 pages, which has to be fetched
   separately. Add to that the fact that it can take 3 - 4 seconds to
   request a page and you start to realize that fetching the Amazon
   universe of shoes isn't something that can be done in one sitting but
   something that has to be done progressively over time. So, the CakePHP
   shell that I made maintains a record for each of the pages that must
   be fetched and also updates each of those records to remember when
   each page was last fetched.
#. Maintains the page "priorities". Because the most popular items are
   in the first pages in a category, they have highest priority. It
   doesn't make much sense to spend a majority of the time on pages with
   unpopular items that live in page 50â€™s and above.
#. Makes a to do list containing the pages that it will fetch. It
   makes this to do list by looping through each possible priority level.
   It starts by looking to see if there are any priority 1 pages that
   have never been updated. If there are, then it puts them in the to do
   list. Then, if there are any priority 1 pages that haven't been
   refreshed in 30 days, then it adds those. After that it moves on to
   priority 2, then 3, and all the way to 10. It processes as many as
   2,000 pages in one run.
#. It loops through those pages in the to do list, processing one at a
   time. Each page is then fetched from Amazon, parsed, validated,
   organized, and stored.



But That's Not All
~~~~~~~~~~~~~~~~~~
On top of that, there is some additional work being performed on the
website itself. Because prices often change, prices are updated on the
fly if they are over two hours old. You can see this happen on shoes
such as the `Aldo Hesperange`_. Below where it says 'Available from
XX', you will sometimes see a notification that the price and
availability is being updated.


The Result
~~~~~~~~~~
All the data gathering and maintenance gives the website a rich set of
organized information. This organized information powers a website
that allows the user to refine shoe results by type, by brand and to
be able to sort their results by either popularity or price. Each shoe
can be presented with photos of the various colors and angles, such as
with this `women's ballet shoe from Paul Mayer`_. Reviews are also
present on some shoes, such as this `Saucony Low Pro Sneaker`_. Shoes
pages can also include product descriptions.

In addition, having the information cached means the website can be
lightning quick because it doesn't rely on fetching information from
Amazon for every page load. To further improve performance, I limited
the amount of extra graphics on every page. And last but not least,
`Minify`_ was also used to help front end performance. I highly
recommend it.

I must say that I was pleasantly surprised with CakePHP. Without it,
this project would have taken a lot longer than it had. I would have
appreciated better HABTM relationship handling though. I found myself
having to manually write a few queries that seemed impossible with the
built in find(). Regardless, the convention over configuration
philosophy cut out many of the tedious tasks present in most web
development projects. And the tree behavior is awesome!

Comments and questions welcomeâ€¦



.. _Minify: http://code.google.com/p/minify/
.. _women's ballet shoe from Paul Mayer: http://www.got2bshoes.com/shoe/paul-mayerattitudes/paul-mayerattitudes-womens-grand-flat/47949/
.. _Saucony Low Pro Sneaker: http://www.got2bshoes.com/shoe/saucony/saucony-mens-jazz-low-pro-sneaker/14186/
.. _women's sandal: http://www.got2bshoes.com/type/womens/sandals/118/
.. _Got2BShoes.com: http://www.got2bshoes.com/
.. _Aldo Hesperange: http://www.got2bshoes.com/shoe/aldo/aldo-hesperange-clearance-flats-womens-shoes/7570/

.. author:: lbmtb
.. categories:: articles, case_studies
.. tags:: api,caching,amazon,amazon product adver,shoes,footwear,Case Studies

