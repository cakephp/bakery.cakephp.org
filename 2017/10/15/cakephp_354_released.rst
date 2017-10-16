CakePHP 3.5.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.4. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.3...3.5.4>`_ for every commit.

* Logging email payloads now succeeds even when the transport returns string data.
* Element cache settings are now cached in memory saving repeat cached elements
  in the same request.
* All tests are now passing against PHP 7.2.0-RC1
* Database FloatType now correctly parses locale data that use ``.`` as the
  thousands separator.
* ``Text::slug()`` correctly cleans strings when the ``preserve`` option is
  used.
* Credit card pattern for JCB card types now accepts all current JCB card types.
* CakePHP uses chained exceptions where possible now, allowing root causes of
  failures to be exposed by the error handler in future releases.
* ``Validation::url()`` now accepts 4 byte unicode characters.
* SQLServer column length values are always integers now.
* UrlHelper no longer uses error suppression when adding file timestamps.
* ``TreeBehavior`` node deletion now correctly handles multiple trees in the
  same table. Previously all trees would have nodes deleted from them.

Contributors to 3.5.4
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Albert Cansado Solà
* Anton Nguyen
* DiogoRMax
* Hideki Kinjyo
* Jon McAndrew
* Koji Tanaka
* Mark Scherer
* Mark Story
* Marko Kallio
* Robert Pustułka
* Young Padawan
* chinpei215
* makallio85

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
