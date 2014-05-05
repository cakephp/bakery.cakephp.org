CDfuse.com: A Complete Rebuild with CakePHP
===========================================

When it came time to rebuild CDfuse.com, CakePHP became our framework
of choice. Here's how we completed our transition and what we hope to
accomplish in the future.


What is CDfuse.com?
```````````````````
CDfuse.com is a website dedicated to helping independent musicians
promote and sell their music and merchandise online. A friend of mine
came to me with the idea back in 2003 and we launched in January of
2004. A major refresh of the design and our feature set occurred in
August of 2004 and that site has been our mainstay until this time.

Over the next couple of years, it became apparent that we needed to
make some changes. The database design was simple and lacked a great
level of normalization. The code was fragmented and inconsistent.
Adding new features meant finding a way to make it work with our
setup.

What we needed was a database design that lent itself to being added
to quickly and code that could do the same. We needed to be able to
add new features in 7 - 10 days instead of 2 - 4 weeks. Finally, one
of the big ticket items we wanted to add, digital distribution, was
simply impossible with the database structure we had.


Legacy Features
```````````````
There were a certain amount of legacy features that had to be kept
when moving over to the new site. One of them was custom urls. Each
artist is given their own unique url (`www.cdfuse.com/yourbandname`_).
This had to stay the same. In addition to this, artists who were
selling merchandise through their storefronts had pages at
`www.cdfuse.com/yourbandname/store`_ that also had to remain the same.
We had to have as little interruption of service as humanly possible.
Luckily, Cake's built in routing functions give a great deal of
flexibility in how urls are displayed. I've even written another
article here regarding doing custom urls from the site root.


Research
````````
When we first started the planning phase of the new site in early
2006, I knew I had to find a way to keep some level of consistency
between all the moving parts. Luckily, there were a number of
frameworks beginning to gain traction around that time.
Unfortunately, that was also the first problem. Picking the right
framework for your team is much like picking the right used car. On
the surface, things may look great, but once you get a little deeper,
be prepared to run into some pitfalls.

The project went through iterations with Qcodo, Symfony, Zend
Framework, and CakePHP. From the start, Symfony seemed like the
logical choice. It was definitely geared toward what one would
consider enterprise development. The complex array of config files,
however, caused some difficulties in getting started. I felt like I
was getting bogged down in configuration instead of in the real meat
of the application. I attempted to do some work in Qcodo and Zend
Framework, but at the time, these projects were both in their infancy,
and I ran into a number of issues with their early releases. I'm sure
they've developed nicely now, however, at the time, I needed something
stable and ready to go.


Planning
````````
The main features of our site include providing independent artists
and labels with order fulfillment, customized storefronts, and an
artist profile page (with photos, mp3s, etc). Our plan included adding
a listener signup, digital distribution, and providing artists with
greater control over the details of their account. Unfortunately, as I
stated before, the design of the current database was severely
limiting it what it would allow us to do. My first order of business
was to refactor the database. Moving the database from our old format
to the new one was by far the most time consuming process of the
entire project.

Another big issue we had to overcome was storage. With the addition of
digital distribution, we were in need of an essentially endless supply
of storage, Enter Amazon S3. Amazon's S3 allows for an infinitely
expandable amount of storage. We now use S3 as a type of Content
Delivery Network. Items get uploaded to our server and then the data
is synced at different intervals throughout the day.


Database Transformation
```````````````````````
One thing that all frameworks have is a preferred way to have the
database setup. For the most part, the concepts of each are the same,
but their methodology differs. Cake's methodology made the most sense
to me. It was clear, concise, and made for a database that was easy to
understand even when looking at it through normal database management
tools.


Development Phase
`````````````````
Developing the site with CakePHP was one of the best experiences I've
had in development. I started out by baking almost everything. From
there, I had a good foundation of everything and could expand or
remove models, controllers, or actions as needed. I developed the
majority of the frontend in XHTML and CSS outside of Cake and then
ported all that into my views rather than trying to perfect
functionality and form at the same time.


Issues
``````
Most of the issues I ran into along the way were easily solved by some
reading in the API or a question in the IRC channel. My main issue
was, and still is, performance related. Each of my models is extremely
complex and carries with it a lot of data so mastering the use of
bindModel and unbindModel became very important.

SSL security also proved to be an interesting issue. Instead of trying
to hack a way for SSL pages to be secured through Cake, I instead
opted to let Apache do the heavy lifting on this one. By using
mod_rewrite in some interesting ways, I am able to explicitly state
which pages should be secured and which should not, keeping server
load as low as possible and allowing me to freely develop in Cake
without worrying about making conditions for SSL. Something to
remember if you go this route is to at least be aware of what areas
will and won't be SSL secured. POSTing to and from SSL and non-SSL can
cause some headaches with missing data if you're not careful.


Other Projects Included
```````````````````````
I'm a big fan of not reinventing the wheel. With that in mind, there
were a number of other prebuilt projects I used to complete this
project:

+ Yahoo UI
+ Lightbox
+ jQuery
+ getID3
+ kcaptcha
+ phpthumb
+ Amazon S3
+ Google Maps
+ mnoGoSearch


For the Future
``````````````
Planning for the next phase of the project has already begun. Here's
what's in store for the future.

#. Video - Currently, we're relying on YouTube to take care of our
   video needs. Our plan is to move our video hosting on-site using S3
   for our storage medium and Flex based player.
#. Tagging - Although the search and browse sections of our site are
   nice, we would like to also include the ability for users to tag
   artists and items as well.
#. Process Queuing - Our daily data syncing to S3 is working great,
   but in the future, as the amount of data we take in grows, it would be
   nice to queue processes to occur instead of having them on a schedule.
   This way, we can always add more to the queue that will continue to
   execute until finished.
#. Move to 1.2.x - At one point in the project, I started to port over
   to 1.2.x, but some changes in the way data validation was occurring
   caused me some headaches. For the time being, 1.1.x will work fine and
   the next phase should be a complete port to the 1.2.x series.



Final Thoughts
``````````````
It took roughly 18 months from start to finish for this project to be
completed, including all the planning and research. Only about 5
months of that was really devoted to building the new site with Cake.
For those of you that are converting a site with a fair number of
users, don't panic. It can be done. I can say that it has already
proven itself to be very worth it. Over the past week since the site
has been live, it has been extremely easy to troubleshoot problems
that have come up and fix them in mere minutes.

For anyone considering a large site rollout with Cake, I'd be happy to
offer any advice or help with issues that may come up. Just remember,
I'm still learning too, but I have been able to obtain a good grasp on
Cake and its intricacies over the course of this project. I'm in the
IRC channel pretty regularly so hit me up sometime!

.. _www.cdfuse.com/yourbandname/store: http://www.cdfuse.com/yourbandname/store
.. _www.cdfuse.com/yourbandname: http://www.cdfuse.com/yourbandname

.. author:: PHPdiddy
.. categories:: articles, case_studies
.. tags:: maps,audio,cdfuse,mp,Case Studies

