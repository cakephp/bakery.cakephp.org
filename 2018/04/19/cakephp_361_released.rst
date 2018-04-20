CakePHP 3.6.1 Released
=======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.6.1. This is a maintenance release for the 3.6 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.6.1. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.6.0...3.6.1>`_ for every commit.

* Improve deprecation warning message for controller properties.
* Deprecation warning messages now include how to disable them.
* Redirect loops created by AuthComponent for applications in subdirectories has
  been fixed.
* SecurityComponent no longer rejects requests for applications in
  subdirectories.
* Image URLs can now be data URIs.
* Improved API documentation.
* Added ``ServerRequest::getPath()`` as a better alternative for the deprecated
  ``url`` property.
* Updated requirements in the sub-split packages.

Contributors to 3.6.1
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Albert Cansado Solà
* José Lorenzo Rodríguez
* Koji Tanaka
* Mark Story
* Schlaefer
* inoas
* saeideng
* tsmsogn
* ypnos-web

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

