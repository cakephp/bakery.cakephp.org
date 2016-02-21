CakePHP 3.0.16, 3.1.11, and 3.2.3 Released
==========================================

The CakePHP core team is happy to announce the immediate availability of CakePHP 3.0.16, 3.1.11, and 3.2.3. These releases contain security fixes. 3.2.3 and also contains bugfixes.

Security Fixes
--------------

An issue in PaginatorHelper has been fixed that would allow manipulation of pagination links. A malicious user could manipulate URLs to point at arbitrary destinations. A huge thank-you to Kurita Takashi for notifying us of this issue, and reviewing the fix.


Bugfixes in 3.2.3
-----------------

In addition to the security fix, 3.2.3 contains the following bug fixes:

* Camel-backed virtual properties can be accessed once again. This was a regression in 3.2.0. (@markstory)
* Long paths in the error pages are now wrapped. (@bcrowe)
* ``_joinData`` is no longer lost when marshalling existing BelongsToMany records using the ``id`` attributes. (@markstory)
* ``Date::parseDate()`` now correctly handles timezones. (@lorenzo)
* Setting a Cell's templatePath inside the action now works. (@markstory)
* FormHelper now consistently uses ``formatTemplate()`` internally. (@ypnos-web)
* ``Hash::sort()`` now correctly sorts ``DateTimeImmutable`` objects. (@ndm2)
* ``Security::randomBytes()`` was added. This method wraps the various ways to get secure random data. If secure data cannot be found, insecure data will be used and a warning will be emitted. (@markstory)
* CSRF tokens are now generated with ``Security::randomBytes()``. (@markstory)
* Custom template paths are now factored into view path generation. (@phillaf)


Minor Enhancements
------------------

* Improved API documentation (@dereuromark, @ndm2, @fxleblanc)
* ``EventManager::matchingListeners()`` was added, allowing the caller to find listeners bound to the named event. (@jeffblack360)
* ``Table::find('list')`` will automatically use the selected fields if there are 2 of them. This makes find(list) behave more consistently with 2.x easing migration. (@dereuromark)
* ``TableRegistry::get()`` now accepts a ``connectionName`` parameter. This lets you define the connection by name instead of requiring the object. (@skie)
* ``QueryExpression::identifierEquals()`` was added to increase compatiblity across the supported database vendors. (@skie)
* ``App::shortName()`` was added. (@Marlinc)
* AuthComponent ``finder`` option now permits finder options to be defined. (@ADmad)


CakeFest Call for Speakers is Still Open
----------------------------------------

CakeFest 2016 will be in Amsterdam from May 26th - May 29th. If you'd like to speak at CakeFest the call for [speakers is still open](http://cakefest.org/).  Tickets [are also on sale](http://cakefest.org/tickets) at a special rate until the speaker list is announced.

CakePHP Newsletter
----------------------------

Be sure to sign up for our [Newsletter](http://cakephp.org/newsletter/signup) to stay updated with what is happening with CakePHP. We also have a security list for anyone that is interested in receiving details about security releases.

As always, a huge thanks to all the community members that helped make this release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, security
