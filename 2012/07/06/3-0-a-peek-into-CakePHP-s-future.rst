3.0: a peek into CakePHP's future
=================================

With version 2.2.0 out the team is now focusing on bringing the
CakePHP community a major new version with awesome features

Since its creation, more than 7 years ago, CakePHP has grown with a
life of its own. Its main goal has always been to empower developers
with tools that are both easy to learn and use, leverage great
libraries requiring low documentation and low dependencies too. We've
had several big releases along these years and an ever growing
community. Being one of the most popular frameworks out there and
probably the first one (!) we have also gotten a lot of criticism from
the developer community in general. We have, though, accepted it and
learnt from our mistakes to keep building the best PHP framework there
is.

CakePHP is known for having a very slow pace of adopting new stuff and
it has served very well to its community. Back when we were doing
version 2.0 we decided to hold on version 5.2 of PHP for multiple
reasons and despite it didn't let us innovate as much as we wished to,
it was an excellent choice given the general environment regarding
hosting solutions and general adoption of PHP 5.3. A look back into
the past reminded us that we were big innovators in PHP, bringing
features to developers that few dreamt possible to do in this
language. Now, it's time to look ahead in future and decide on staying
in our comfort zone or take back our leading position as innovators.

So it is with great excitement that we announce we are putting our our
efforts in bringing you the next major release of CakePHP. Version 3.0
will leverage the new features in PHP 5.4 and will include an
important change in our models and database system. CakePHP 3.0 will
not be ready less than 6 or 8 months and we reckon that, given the
rise of cheap cloud hosting solutions and upcoming release of new
operating system versions, there is no better time to jump on the most
current stable version of PHP.

As you may already know, PHP 5.4 offers awesome features that would
introduce useful new concepts and interesting solutions to old
problems. Closure binding, traits, multibyte support are tools we see
of great usefulness for properly implemented advanced framework
features we've had in mind for a long time. Also new syntax sugar
added to the language will make it more pleasant to write both small
and complex applications with the framework and a always welcomed free
performance increase.

We have a young but already well defined road map for what we want to
accomplish in next release and you are invited to contribute and
suggest what's next:

+ Drop support for 5.2.x and support 5.4+ only
+ Add proper namespaces for all classes. This will make it easier to
  reuse classes outside CakePHP and to use external libraries and
  finally no chances of collisions between your app classes and core
  ones.
+ Use traits were possible and makes sense
+ Improve bootstrapping process to allow more developer control and
  better performance
+ Model layer rewrite:

    + Models to return objects from queries
    + Datamapper-like paradigm
    + Richer query API
    + Support for any database type
    + Support for more database drivers both PDO and native

+ Improve Router:

    + Make it faster
    + Remove named parameters
    + Add support for named routes
    + Smarter router prefixes
    + Shorter url syntax


As you may imagine most of the time will be spent or rewriting the
model layer, but it will also be one of the most powerful features
CakePHP 3.0 will have. It's new architecture based on PHP 5.4
capabilities will offer an easier and more powerful set of tools to
build web applications in no time.

If you are already as excited as we are this all this new stuff
coming, you definitely should meet us on next `CakeFest`_ we'll be
talking about the future of CakePHP and hacking our way through to
bring you a dev release as soon as possible. Wouldn't it be lovely to
attend to awesome talks, workshops and also be part of the group
deciding initial architecture for next major version of the framework?
Make sure you book your tickets before we run out of them!

We're always looking for different people having a vision on software
development, are you interested in helping out? There is no better
time to start sending patches and become one of the core team!


.. _CakeFest: http://cakefest.org

.. author:: lorenzo
.. categories:: news
.. tags:: 3.0,News

