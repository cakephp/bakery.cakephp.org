Introducing Start Tutorial
==========================

I have been working with CakePHP since its first release. And recently
I decided to build a tutorial website and share my experience of
various development techniques. And here comes StarTutorial.com and I
spent around 4 days to build it using CakePHP.


Introduction
~~~~~~~~~~~~
StarTutorial.com is a new teaching website where you can find useful
tutorials of various topics. Currently its main focus is on CakePHP
and JQuery. StarTutorial.com is up on 17 Aug 2010, and it is already
published with 5 articles.


Tools
~~~~~
Below are some tools I have used while building this site:

#. XAMPP - XAMPP is basically a web server package, consisting mainly
   of the Apache HTTP Server, MySQL database, and interpreters for
   scripts.
#. Eclipse with PHPeclipse plugin - PHPeclipse plugin is a quite
   useful Eclipse plugin which improves development speed with its code
   completion and so on.



Process
~~~~~~~

#. Database design - first I have my database design according to my
   requirement. Since it is quite similar to a blog, so its database is
   quite simple.
#. Build CakePHP model - define my model objects as well as its
   association, I prefer to have all models to be associated instead of
   binding their relationship on the fly.
#. Bake controllers and views - with CakePHP's powefully bake command,
   it becomes very easy and fast to build controllers and views.
#. Modify views to fit my design - I have bought this website's design
   from a designer, so I had all xhtml+css from her, what I need to do is
   to convert all her xhtml+css into my CakePHP layout and view files.
#. Add some fun elements to my app - so far, this website is all done.
   However it is always to keep on adding features to your app, so I
   consistently try to improve it. What I did so far includes integrate
   Gravatar using a CakePHP gravatar helper from Bakery, I guess that is
   why building CakePHP app is fun, because you can always try out other
   people's creation.



Highlight
~~~~~~~~~
Cakephp's bake command has became the most powerful part of this
development, it basically did all backend stuff, which is an admin
panel where I can manage all my posts as well as comments.

The way I bake my app is slightly different from others, since what I
wanted is a pretty simple admin panel. I don't want associated models'
pages to be linked together, but I do want to models to be associated.

And here is how I did that without massive manual code modification:

#. Bake my models using bake command,It generates models with all
   association from database. cake bake "model's name"
#. Comment association before bake controllers. So in this step, I
   comment out all associations. > The reason I am doing this is to
   prevent CakePHP generating associated links in views. <q> /$belongsTo
   = array() > /$hasMany = array()
#. Bake controllers and views as normal. cake bake controller
   "controller's name" scaffold > cake bake view "model names" < q>
#. Go back to models and remove comment signs. > So I had everything I
   wanted. < li>



The End
~~~~~~~
Here comes StarTutorial.com, and it is only 4 days development. Thanks
to CakePHP, a powerful RAD system.


.. author:: thedilab
.. categories:: articles, case_studies
.. tags:: tutorial website,Case Studies

