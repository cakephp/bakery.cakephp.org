CakePHP 2.3.0-RC1 and 2.2.4 are finally here
============================================

Following the release of 2.3.0-beta around one month ago, we are
excited to announce that 2.3 is very close to be marked as stable!

The CakePHP core team is proud to announce the immediate availability
of CakePHP 2.3.0-RC1 and 2.2.4[1]. 2.3.0-RC1 marks the freezing of
2.3.0 API and it is jsut a matter of a few weeks to mark it as stable
if no bugs are found in current codebase.


Changes since 2.3.0-beta
------------------------

+ Added ConfigReaderInterface::dump() and made all readers' dump()
  method support 'Plugin.keyname' format for keys
+ Made View trigger notice by default if elements are missing and
  added elementExists() method
+ Added Helper::$settings to match other objects like components and
  behaviors
+ You no longer have to specify 'maxLimit' when setting 'limit'
  greater than default 'maxLimit' when configuring pagination settings.
+ Added type hinting to Model::validator()
+ prev() and next() methods of PaginatorHelper now possible to place
  the 'tag' option to 'false' to disable the wrapping element.
+ Calling Form->input() with 'errorMessage'=>false should trigger
  field error, but not render error message (HTML element).
+ New options in HtmlHelper::getCrumbList() to make it compatible with
  Twitter Bootstrap, Zurb foundation or other CSS frameworks.
+ Added CakeTestCase::getMockForModel convenience method.
+ Implemented SSL peer verification in HttpSocket.
+ Added context() to CakeSocket.
+ Renamed HttpResponse to HttpSocketResponse. HttpResponse will
  continue to exist for backwards compatibility.
+ Using bytecode sequence for unicode ellipsis in String::trim().
+ When using XmlView, you can configure the top level element name by
  setting the `_rootNode` view variable.
+ Added warning to home.ctp when DebugKit is not installed and added a
  list of official plugins to home.ctp
+ Added View::startIfEmpty()
+ Added foreignKey to whitelist in saveAssociated()
+ RedisEngine: authenticate connection if 'password' is set



Changes in 2.2.4
----------------

2.2.4 is a bugfix/maintenance release for the 2.2.x release branch.
These are some of the changes included:

+ Update TLD validation to accept gTLD variations
+ Fixed sorting empty data with Hash & Set.
+ Fixed multi-model validators with deep & atomic validation error
  nesting
+ Fixed exceptions being thrown in beforeFilter breaking error pages.
+ Using HttpSocket to get proper exceptions when trying to load XML
  from remote servers to fix warnings from file_get_contents() in
  Xml::build()
+ Send charset=UTF-8 if Content-Type is JSON.
+ Added query logging to DboSource::insertMulti().
+ Fixed contain rule parsig in authentication adapters
+ Fixed required validation rule
+ Removed Inflector::slug() replacement from Ä to A
+ Fixed issue with Model::saveAssociated() and TranslateBehavior
+ Only setting $request->data with PUT/DELETE when it can be decoded.
+ Improved "required" field detection.
+ Made Model::find('first') always return an array.
+ Fixed issue where the incorrect meridian would be selected in
  FormHelper::dateTime()
+ Fixed issue where createSchema() would omit primary keys sometimes.
+ Fixed saveAssociated() with validate=first, atomic=false
+ Showing the last 200 queries instead of the first 200 in SQL log.
+ Fixed 0'th index file not being copied to $_FILES.
+ Fixed autoLinkUrls so it re-capture query strings.
+ Allow saving new records with pre specified primary key value with
  treebehavior.
+ Fix find('count') with 'group' when result has only one group.

A huge thanks to all involved in terms of both contributions through
commits, tickets, documentation edits, and those whom have otherwise
contributed to the framework. Without you there would be no CakePHP.
Download a packaged release [3]


Links
~~~~~

+ [1] `https://cakephp.org/changelogs/2.3.0-RC1`_
+ [1] `https://cakephp.org/changelogs/2.2.4`_
+ [2] `https://github.com/cakephp/cakephp/tags`_




.. _https://cakephp.org/changelogs/2.2.4: https://cakephp.org/changelogs/2.2.4
.. _https://github.com/cakephp/cakephp/tags: https://github.com/cakephp/cakephp/tags
.. _https://cakephp.org/changelogs/2.3.0-RC1: https://cakephp.org/changelogs/2.3.0-RC1

.. author:: lorenzo
.. categories:: news
.. tags:: News

