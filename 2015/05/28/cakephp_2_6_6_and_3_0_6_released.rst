CakePHP 2.6.6 and 3.0.6 Released
================================

The CakePHP core team is ready to announce the immediate availability of CakePHP
2.6.6 and 3.0.6. These are maintenance releases that contain important security
fixes.

Security Fixes
--------------

Earlier this week we were notified that RequestHandlerComponent had
a vulnerability that would allow well crafted requests to create a denial of
service attack. RequestHandlerComponent leverages ``Xml::build()`` which allows
reading local files. We recommend that all applications using
RequestHandlerComponent upgrade, or disable parsing XML payloads. To disable XML
payload parsing you can do the following::

    // In a controller's beforeFilter
    $this->RequestHandler->addInputType('xml', function() { return []; });

The above code will replace the built-in XML parsing with a no-op function. We'd
like to thank Takeshi Terada for notifying us of this security issue using our
`Security Issue Process
<http://book.cakephp.org/3.0/en/contributing/tickets.html#reporting-security-issues>`_

Other Fixes in 2.6.6
--------------------

* ``FormHelper::radio()`` now correctly generates ID attributes for radio
  buttons with multibyte values.
* ``Inflector::humanize()`` and ``Inflector::underscore()`` work correctly with
  UTF8 characters now.

Other Fixes in 3.0.6
--------------------

* ``FormHelper::radio()`` now correctly generates ID attributes for radio
  buttons with multibyte values.
* ``Inflector::humanize()`` and ``Inflector::underscore()`` work correctly with
  UTF8 characters now.
* URLs in ``FormHelper::postLink()`` are no longer double encoded.
* ``PaginatorHelper::numbers()`` now supports the ``url`` option.
* Error.trace is now respected when logging exceptions.
* The Entity accessors cache introduced in 3.0.3 has been removed. It caused
  a number of issues and didn't greatly improve performance.
* ``EntityTrait::getOriginal()``  and ``EntityTrait::extractOriginal()`` now
  return values that were initially null.
* Empty query expressions used in association query builders no longer cause
  invalid SQL to be generated.

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: CakePHP, release
