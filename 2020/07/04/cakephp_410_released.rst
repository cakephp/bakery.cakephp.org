CakePHP 4.1.0 Released
=========================

The CakePHP core team is happy to announce the immediate availability of CakePHP
4.1.0. This is the first stable release of 4.1.0. 4.1.0 provides a number
improvements both large and small to CakePHP.

Upgrading to 4.1.0
------------------

You can use composer to upgrade to CakePHP 4.1.0::

    php composer.phar require --update-with-dependencies "cakephp/cakephp:4.1.*"

Deprecation Warnings
--------------------

4.1 introduces a few deprecations. All of these features will continue for the
duration of 4.x but will be removed in 5.0. See the `migration guide
<https://book.cakephp.org/4/en/appendices/4-1-migration-guide.html>`_. 

What's new in 4.1.0?
--------------------

The `migration guide
<https://book.cakephp.org/4/en/appendices/4-1-migration-guide.html>`_ has
a complete list of what's new in 4.1.0. We recommend you give that page a read
when upgrading. A few highlights from 4.1.0 are:

* Support for Common Table Expressions (CTE) in the ORM.
* Support for window functions in the ORM.
* ``Query::orderAsc()`` and ``Query::orderDesc()`` now accept Closure's as their
  field enabling you to use build complex order expressions with the provided
  ``QueryExpression`` object.
* ``debug()`` and ``Debugger::printVar()`` now emit HTML in web contexts, and
  ANSI styled output in CLI contexts. Output of cyclic structures and repeated objects
  is much simpler. Cyclic objects are only dumped once and use reference ids to
  point back to the full value.
* ``CsrfProtectionMiddleware`` can now create cookies with the ``samesite`` attribute set.
* Log messages can now contain ``{foo}`` style placeholders. These placeholders
  will be replaced by values from the ``$context`` parameter if available.


Contributors to 4.1.0
---------------------------

Thank you to all the contributors that helped make 4.1 happen:

* ADmad
* andrii-pukhalevych
* Cauan Cabral
* chinpei215
* Corey Taylor
* Diego Sardina
* diegosardina
* Edgaras Janušauskas
* Frank de Graaf
* Jad Bitar
* John Zwarthoed
* Marc Würth
* Mario Rothauer
* Mark Scherer
* Mark Story
* Matthias Wirtz
* McsKienNP
* mcsknp
* mtak3
* ndm2
* nojimag
* Oliver Nowak
* othercorey
* saeideng
* victoreassi
* Vincent PLANCHER
* Walther Lalk

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests. 4.1.0 is a large
release and would not have been possible without the community support and
feedback.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
