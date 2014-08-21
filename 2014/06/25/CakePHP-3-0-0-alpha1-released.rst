CakePHP 3.0.0-alpha1 released
=============================

We are excited to announce one new release in the 3.x series,
approaching now a stable release

The CakePHP core team proudly announces the first alpha release of
CakePHP 3.0.0. In the months between 3.0.0-dev3 and this release,
we've been working really hard at getting more of the remaining parts
implemented, and incorporating all the great feedback we've gotten
from the community so far.

There are still a few larger features to be completed before we go to
a beta release, most importantly:

+ Updated i18n and L10n features.
+ A replacement for CacheHelper based on Edge Side Includes.
+ A new routing API for simpler and faster route declaration.

The alpha releases will focus on getting these key features completed.
After which, we'll start beta releases focusing on polishing up any
rough or confusing features, improving error messages/help and porting
over plugins produced by the core team.

We've been truly humbled by the fantastic feedback and support we've
received from the community in the last month. We've had numerous bug
reports, pull requests and documentation edits that have helped
improve 3.0 overall.

This release also comes with complete documentation for the new
features and changes, make sure you check out the new CakePHP 3.0 book
to read about them in detail.

Below is the list of new features and changes that made it into
3.0.0-alpha1:


Reworked Dispatcher Filters
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Dispatcher filters have been reworked and expanded to include some of
the previously 'magic' features of CakePHP. Filters are now registered
as instances instead of through configuration data making it simple to
do dependency injection.

Dispatcher filters also include a way to restrict when they are
applied to any given request.


New Session Object
~~~~~~~~~~~~~~~~~~

Session management has always been a static class in CakePHP which has
proven to be problematic in a number of ways. For CakePHP 3.0, you can
access the session from the request object `
$this->request->session()`.

This change also makes the session easier to test, and allows CakePHP
to use PHPUnit 4.x


FlashHelper and FlashComponent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Flash messages play an important part in modern web applications.
While CakePHP has always had rudimentary flash messaging support,
CakePHP 3.0 gives developers even more tools to create and render
multiple kinds of messages in a simple way. To make this happen a
separate component and helper were created. We'd like to thank jadb
and bcrowe for making this code happen.


CookieComponent
~~~~~~~~~~~~~~~

CookieComponent has only been able to manage one cookie namespace at a
time in the past. While it offered powerful tools for creating
encrypted cookies, those tools were hard to use consistently and
correctly. The redesigned CookieComponent makes it much easier to
separate the configuration of cookie namespaces and the handling of
cookie data.


Passwords Default to Bcrypt
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Using bcrypt for passwords is a current best-practice. To help steer
developers in the right direction, we've made bcrypt the default
password hashing system in CakePHP, and provided an easy to use
FallbackHasher that will allow you to incrementally update your
password hashes from older hashing algorithms.


Themes and Plugins Merged
~~~~~~~~~~~~~~~~~~~~~~~~~

For CakePHP 3.0.0, we wanted to make themes more powerful and more
robust. As we looked at ways of improving themes, we realized that
what we really wanted were plugins. To that end, you can now use any
plugin as a theme. This makes packaging and re-distributing themes
easy as they are simply plugins do and can include helpers and cells.


App and Plugins share a standard suggested directory layout
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To make your experience developing as consistent as possible, we've
updated both the application skeleton and plugin skeletons to use the
same directory structure. This will help make working with plugins
feel just like you're working in a small modular application.


ORM Improvements
~~~~~~~~~~~~~~~~

Several API changes made their way into the new ORM. Now it is simpler
to specify deep associations for saving operations and we have changed
a couple conventions to reduce the learning curve and confusion among
new adopters.


Better Performance
~~~~~~~~~~~~~~~~~~

We've taken an initial performance review over the new features in
3.0, and spent some time removing obvious bottlenecks. We're happy to
announce that we succeeded at making the bootstrap process and several
parts of the helpers template generation faster.

Additionally, we've identified a way to make the routing process
several times faster. We'll be implementing these new ideas for the
following beta release.

You can `download`_ the release or just use `composer create-project
-s dev cakephp/app` to start using CakePHP 3.0 today!


.. _download: https://github.com/cakephp/cakephp/releases/download/3.0.0-alpha1/cakephp-3.0.0-alpha1.zip

.. author:: lorenzo
.. categories:: news
.. tags:: ,News

