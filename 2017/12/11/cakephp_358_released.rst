CakePHP 3.5.8 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.5.8. This is a maintenance release for the 3.5 branch that fixes several
community reported issues.

Bugfixes & New Features
-----------------------

You can expect the following changes in 3.5.8. See the `changelog
<https://github.com/cakephp/cakephp/compare/3.5.7...3.5.8>`_ for every commit.

* Added ``Mailer::setTransferEncoding()`` to allow the transfer encoding to be
  controlled.
* Added to ``203`` and ``204`` allowed status code in
  ``Cake\Http\Client\Response::isOk()``.
* Fixed regression around PHP7 error handling & logging.

Contributors to 3.5.8
----------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Kazuki_Kamizuru
* LifeOrYou
* Mark Scherer
* Mark Story

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
