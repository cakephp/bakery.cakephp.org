Release: CakePHP 1.2.6
======================

The CakePHP development team is happy to announce CakePHP 1.2.6
The CakePHP development team is happy to announce CakePHP 1.2.6[1].
1.2.6 is a bug fix release of the latest stable branch. Check the
changelog[2] for all the changes.

CakePHP 1.2.6 Includes more than 160 commits improving performance and
fixing more than 75 related tickets. There have been a number of long
standing issues fixed in 1.2.6 that may affect your application
including:

- Controller::$cacheAction now functions as documented
  a87d31cc7f570a1ac03abc2c04b04f71e4f6c955

- returning false from a beforeValidate actually cancels a save
  operation
  e609875754103913927f4bab7f67323aa6529165

- DboSource::fields() now accepts expression objects.
  02330b2d9c292110240c606e976e182c973897e9

- Configure::store() now correctly stores values with slashes.
  862ff82ad48ef613df33447697e6b2f33903d464

- App::import() can be used from bootstrap.php without the penalty of
  having no cache available.
  82a2b1a01957ccbfd3a6abe31133f49b9005bced

- Controller::paginate() now accounts for limit:0 -
  4bbfcbff7e90fab42bef39e01003113dc715a3b0

- Debugger::log() does what its doc block says.
  a31a2d264c2cd128de2db839fa2901680c7de2ba

- group key was added to DboOracle
  34deb2a18df1cf15c1b120333d47070c850db3fd

- 'with' models failing validation will now make save() return false.
  a490e249fa76b1076ab5ee255636f1f533560842

Be sure to check the full changelog[2] for all changes that have
occurred. The 1.3 branch continues progress and we hope to have a
release candidate ready for release soon. If you are interested in
helping with the ongoing development of 1.3 please visit lighthouse[3]
for additional information on how you can help.

In other project news, the API documentation for 1.3 is now available
at `http://api13.cakephp.org`_. In addition to the 1.3 API, the 1.1
API has been restored as well, and can be found at
`http://api11.cakephp.org`_. A big thanks to Graham Weldon (aka.
Predominant) for getting the API's online.

And as always, thank you for helping us make a great framework.

[1] `http://github.com/cakephp/cakephp1x/downloads`_
[2] `http://cakephp.lighthouseapp.com/projects/42648/changelog-1-2-6`_
[3] `http://cakephp.lighthouseapp.com/how-you-can-help`_

.. _http://github.com/cakephp/cakephp1x/downloads: http://github.com/cakephp/cakephp1x/downloads
.. _http://api13.cakephp.org: http://api13.cakephp.org/
.. _http://api11.cakephp.org: http://api11.cakephp.org
.. _http://cakephp.lighthouseapp.com/projects/42648/changelog-1-2-6: http://cakephp.lighthouseapp.com/projects/42648/changelog-1-2-6
.. _http://cakephp.lighthouseapp.com/how-you-can-help: http://cakephp.lighthouseapp.com/how-you-can-help

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

