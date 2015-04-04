CakePHP 2.6.2 Released
======================

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.6.2.

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.6.2. 2.6.2 is a bugfix release for the 2.6 release
branch. A short list of the changes you can expect is:

+ Fixed exception rendering when ExceptionRenderer raised an error.
+ Notice errors in PaginatorHelper when no model was set have been
  fixed.
+ ConsoleOutput does not generate errors when used with
  `php://output`.
+ Redirect responses now use 302 as the default status code instead of
  200.
+ Plugin bake now generates correct directories for Views/Layouts.
+ FormHelper no longer creates invalid maxlength attributes for
  decimal columns when the text type is forced.
+ TextHelper no longer doubly links urls starting with //
+ POT file generation no longer includes the 'POT-Creation-Date'
  header. It often lead to pointless noise in version control.

You can view the full `changelog on cakephp.org`_. I'd like to thank
the people who have contributed to this release. Your bug tickets,
documentation edits, and patches/pull requests are a big part of what
keeps CakePHP alive and ticking. Download a `packaged release on
github`_.


.. _packaged release on github: https://github.com/cakephp/cakephp/releases/2.6.2
.. _changelog on cakephp.org: http://cakephp.org/changelogs/2.6.2

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,News
