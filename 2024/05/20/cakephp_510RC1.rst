CakePHP 5.1.0-RC1 Released
============================

The CakePHP core team is happy to announce the first release candidate for
CakePHP 5.1.0. The 5.1 release includes several behavior changes to increase
correctness and new features. The highlights of those include:

- Connection now creates unique read and write drivers if the keys ``read`` or
  ``write`` are present in the config regardless of values.
- FormHelper no longer generates ``aria-required`` attributes on input elements
  that also have the ``required`` attribute set. The ``aria-required`` attribute
  is redundant on these elements and generates HTML validation warnings. If you
  are using ``aria-required`` attribute in styling or scripting you'll need to
  update your application.
- Adding associations with duplicate names will now raise exceptions. You can
  use ``$table->associations()->has()`` to conditionally define associations if
  required.
- View cells now emit events around their actions ``Cell.beforeAction`` and
  ``Cell.afterAction``.
- ``Validation::enum()`` and ``Validator::enum()`` were added. These validation
  methods simplify validating backed enum values.
- ``Validation::enumOnly()`` and ``Validation::enumExcept()`` were added to
  check for specific cases and further simplify validating backed enum values.
- ``Client`` now emits ``HttpClient.beforeSend`` and ``HttpClient.afterSend``
  events when requests are sent. You can use these events to perform logging,
  caching or collect telemetry.
- ``Http\Server::terminate()`` was added. This method triggers the
  ``Server.terminate`` event which can be used to run logic after the response
  has been sent in fastcgi environments. In other environments the
  ``Server.terminate`` event runs *before* the response has been sent.


What's new in 5.1.0
-------------------

The `migration guide
<https://book.cakephp.org/5.next/en/appendices/5-1-migration-guide.html>`_ has
a complete list of what's new in 5.1.0. We recommend you give that page a read
when upgrading as it notes the behavior changes present in 5.1.0.

How you Can Help
----------------

You can help deliver 5.1.0 by contributing in one of many ways:

#. Check the `documentation <https://book.cakephp.org/5.next/en/>`_ for mistakes,
   outdated, unclear or broken examples. We've been trying to update the
   documentation as we go, but there are likely examples or sections we've
   missed.
#. Try it out! Give CakePHP 5.1.0 a test drive. Let us know how upgrading
   went and if there were any rough spots.
#. File issues for regressions in existing features, or suggest new features.
   Even if those features don't make it into 5.1.0, we're early in the process
   of planning 5.2 and value community feedback.

Contributors to 5.1.0-RC1
-------------------------

Thank you to all the contributors that have contributed to this release:

* Adam Halfar
* ADmad
* Fernando Herrero
* Frank de Graaf (Phally)
* J.Brabec
* Jozef Grencik
* Kevin Pfeifer
* KrzysiekNDS
* Mark Scherer
* Mark Story
* Maximilian Ruta
* ndm2
* othercorey
* Robert Pustułka

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: news
.. tags:: release,news
