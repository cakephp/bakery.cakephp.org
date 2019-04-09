CakePHP 4.0.0-alpha1 Released
=============================

The CakePHP core team is proud to announce the first alpha release of CakePHP
4.0.0. We've been working on this release for several months now feel it is
ready for broader feedback from the community.

There are a few high-level goals for the 4.0.0 release that this alpha release
delivers upon:

#. Remove all features and functionality deprecated in 3.x and marked for
   removal in 4.x
#. Raise the minimum PHP version to 7.1.0. PHP 5 and PHP 7.0 are now end-of-life
   and we wanted to target a supported version of PHP. We are considering
   raising the minimum required PHP version to 7.2 and would `like your feedback
   <https://github.com/cakephp/cakephp/issue/13103>`.
#. Greatly improve the usage of typehinting internally to allow internals to be
   simplified due to less need to type check arguments.
#. Improve error messages across the framework.

New Features
------------

While 4.0 focuses on removing deprecated functionality we've also found the time
to add some great new features:

* The ORM can now automatically handle timezone conversions between your
  application server timezone and database timezone if they differ.
* CakePHP now supports the `PSR-15: HTTP Server Request Handlers
  <https://www.php-fig.org/psr/psr-15/>_` specification.
* ``Cake\Http\Client`` now follows `PSR-18: HTTP Client
  <https://www.php-fig.org/psr/psr-18/>_` specifications.
* FormHelper now generates HTML5 validation messages and datetime inputs.

The `migration guide
<https://book.cakephp.org/4.0/en/appendices/4-0-migration-guide.html>`_ has
a complete list of what's new in 4.0.0. We recommend you give that page a read
when upgrading as it notes the various breaking changes present in 4.0.

How you Can Help
----------------

You can help deliver 4.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/4.0/en/` for mistakes,
   outdated, unclear or broken examples. We've been trying to update everything
   but may have not caught everthing.
#. Try it out! Give CakePHP 4.0 a test drive in a non-production application.
   We'd love to hear how converting a small application went and what was harder
   than it should have been.
#. File issues for regreessions in existing features, or suggest new features.
   While we're not likely to greatly expand the scope of 4.0, we would like
   input on what should be a part of 4.1 and 4.2.
#. Let us know about unclear error messages or silent failures in CakePHP.


Contributors to 4.0.0-alpha1
----------------------------

Thank you to all the contributors that helped get 4.0 to this point:

* TODO

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.


.. author:: markstory
.. categories:: news
.. tags:: release,news
