CakePHP 2.1.3 & 2.2.0-RC1 released
==================================

The CakePHP core team is proud to announce the immediate availability
of both CakePHP 2.1.3 [1], and 2.2.0-RC1[2]. 2.1.3 is a bugfix release
for the 2.1.x branch, while 2.2.0-RC1 is the first release candidate
for 2.2.x.

The CakePHP core team is proud to announce the immediate availability
of both CakePHP 2.1.3 [1], and 2.2.0-RC1[2]. 2.1.3 is a bugfix release
for the 2.1.x branch, while 2.2.0-RC1 is the first release candidate
for 2.2.x.


CakePHP 2.1.3
-------------

There are a number of bugfixes in 2.1.3, the most notable of these
changes are:

+ ControllerTestCase no longer overwrites GET/POST when simulating
  requests.
+ Xml::fromArray() now properly handles out of sequence numeric keys.
+ TranslateBehavior and Model::saveAll() now correctly save
  translations in hasMany associations.
+ Router::queryString() now correctly handles appending to existing
  querystrings.
+ Model::saveMany(), saveAssociated() correctly save data that was
  modified in a beforeValidate() callback.
+ View now correctly re-uses the Controller event manager instance.
+ Model::saveAll() and default values now behave better.

You can download a packaged release from `http://pear.cakephp.org`_ or
get a zip file from github[3].


CakePHP 2.2.0-RC1
-----------------

Since the release of CakePHP 2.2.0-beta a number of new features and
enhancements have been merged in:


Timezone support in CakeTime class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The $userOffset parameter has been replaced with $timezone parameter
in all relevant functions. So instead of numeric offset you can now
pass in a timezone string or DateTimeZone object. Passing numeric
offsets for $timezone parameter is still possible for backwards
compatibility.

`CakeTime::timeAgoInWords()` had the accuracy option added. This
option allows you to specify how accurate formatted times should be.

A few new methods were added:

+ CakeTime::toServer()
+ CakeTime::timezone()
+ CakeTime::listTimezones()

The $dateString parameter in all methods now accepts a DateTime
object. A new config parameter ‘Config.timezone’ is available which
you can set to user’s timezone string.


Dynamically modify and create validation rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A new object `ModelValidator` was added to delegate the work of
validating model data, it should be transparent to the application and
fully backwards compatible. It also exposes a rich API to add, modify
and remove validation rules. Check docs for this object in
`http://book.cakephp.org/2.0/en/models/data-validation.html#dynamically-change-validation-rules`_


Generate config files on the fly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`Configure::dump()` was added. It is used to persist configuration
data in durable storage like files. Both PhpReader and IniReader work
with it.


CakeLog
~~~~~~~

The CakeLog class now accepts the same log levels as defined in RFC
5424. Several convenience methods have also been added in `CakeLog`
class:

+ emergency
+ alert
+ critical
+ error
+ warning
+ notice
+ info
+ debug

Also log engines gained a `scope` setting to make them log only the
contexts they are interested in. You *need* to add the following lines
to your Config/bootsrap.php file:

::

    // Add logging configuration.
    CakeLog::config('debug', array(
        'engine' => 'FileLog',
        'types' => array('notice', 'info', 'debug'),
        'file' => 'debug',
    ));
    CakeLog::config('error', array(
        'engine' => 'FileLog',
        'types' => array('warning', 'error', 'critical', 'alert', 'emergency'),
        'file' => 'error',
    ));



Misc changes
~~~~~~~~~~~~

+ FormHelper::inputDefaults() setter/getter added.
+ Added ability for Auth login to use contain.
+ Supported Japanese legacy charset and changed to use upper case
  charset in Content-Type line in CakeEmail.
+ Improved doc blocks in all functions, mixed params now explicitly
  say which types are accepted.



Links
~~~~~

+ [1] `http://cakephp.org/changelogs/2.1.3`_
+ [2] `http://cakephp.org/changelogs/2.2.0-RC1`_
+ [3] `http://github.com/cakephp/cakephp/zipball/2.1.3`_
+ [4] `http://github.com/cakephp/cakephp/zipball/2.2.0-RC1`_




.. _http://cakephp.org/changelogs/2.1.3: http://cakephp.org/changelogs/2.1.3
.. _http://github.com/cakephp/cakephp/zipball/2.1.3: http://github.com/cakephp/cakephp/zipball/2.1.3
.. _http://cakephp.org/changelogs/2.2.0-RC1: http://cakephp.org/changelogs/2.2.0-RC1
.. _http://github.com/cakephp/cakephp/zipball/2.2.0-RC1: http://github.com/cakephp/cakephp/zipball/2.2.0-RC1
.. _http://book.cakephp.org/2.0/en/models/data-validation.html#dynamically-change-validation-rules: http://book.cakephp.org/2.0/en/models/data-validation.html#dynamically-change-validation-rules
.. _http://pear.cakephp.org: http://pear.cakephp.org

.. author:: markstory
.. categories:: news
.. tags:: release,CakePHP,news,News

