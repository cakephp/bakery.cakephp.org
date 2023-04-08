CakePHP 3.0.3 Released
======================

The CakePHP core team is proud to announce the immediate availability of CakePHP
3.0.3. This is maintenance releases that improves speed and reliability of the
framework.

Some of the changes introduced were:

* Extracted the validation logic into a trait that can be reused in projects
  outside the framework or directly into other parts of your application.
* Fixed several problems in the Http client class, added support for the
  OPTIONS and TRACE methods. Improved ssl connections in PHP 5.6
* Improved performance of ``find('list')`` by only selecting the columns that
  it needs to use for generating the result, when possible.
* Using the multi-table update syntax in MySQL is now allowed when using
  a `ORM\Query` object
* Numerous bug fixes.

CakeFest 2015 Tickets
---------------------

There is still time to get your tickets for `CakeFest 2015
<https://cakefest.org/tickets>`_ if you haven't already. May 28th and CakePHP's
10th anniversary are quickly approaching.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. The Cake is still
rinsing!

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: lorenzo
.. categories:: release, news
.. tags:: release
.. comments::
