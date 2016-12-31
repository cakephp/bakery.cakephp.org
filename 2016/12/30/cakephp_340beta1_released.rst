CakePHP 3.4.0-beta1 Released
============================

The CakePHP core team is happy to announce the immediate availability of CakePHP
3.4.0-beta1. This is the first beta release for 3.4.0, and it contains several
new major features.

Updating to the beta
--------------------

You can use composer to upgrade to the beta version of CakePHP 3.4.0::

    php composer.phar require "cakephp/cakephp:3.4.0-beta1"

We would greatly appreciate it if you temporarily upgraded your application,
and ran your tests. By opening issues for any regressions in the beta, we can
help ensure a smoother release of 3.4.0 before the stable release.

Notable changes in 3.4.0
------------------------

``Cake\Network\Response`` has been updated to implement the required PSR-7
interfaces and deprecates a number of methods that overlap with the 
interface methods. It also adds immutable versions of all the helper
methods that ``Response`` has offered in the past. Because the core response
object now implements the PSR-7 interface, ``Cake\Http\ResponseTransformer`` has been
deprecated and is no longer used.

``Cake\Http\ServerRequest`` has had its remaining public properties deprecated.
All of the public properties on the request should now be accessed via methods::

    $base = $this->request->base;
    // Should now be
    $base = $this->request->getAttribute('base');

In order to offer simpler interfaces that are more predictable, have simpler
return types and better facilitate IDE auto-completion, several classes have had
their combined get/set methods deprecated. The combined methods have been
replaced with ``getX``, ``setX`` style methods. The classes that have been updated
in 3.4.0 thus far are:

* Cake\Console\ConsoleOptionParser
* Cake\Database\Connection
* Cake\Database\Driver
* Cake\Database\Expression\FunctionExpression
* Cake\Database\Expression\QueryExpression
* Cake\Database\Expression\ValuesExpression
* Cake\Database\Query
* Cake\Database\Schema\CachedCollection
* Cake\Database\Schema\TableSchema
* Cake\Database\TypeMap
* Cake\ORM\EagerLoadable
* Cake\ORM\Query
* Cake\ORM\Table
* Cake\Validation\Validator
* Cake\View\StringTemplateTrait
* Cake\View\ViewBuilder

In addition each of the association classes now offer a fluent interface for
defining the various association options. These methods improve IDE autocompletion
and make mistakes easier to find::

    $this->belongsTo('Comments', [
        'foreignKey' => 'article_id',
        'finder' => 'active',
        'startegy' => 'subquery' // Contains a typo that can be hard to spot
    ]);

    // Now becomes
    $this->belongsTo('Comments')
        ->setForiegnKey('article_id')
        ->setFinder('active')
        ->setStrategy('subquery');

A full list of the changes in 3.4.0 can be found in the `3.4.0 migration guide
<https://book.cakephp.org/3.next/en/appendices/3-4-migration-guide.html>`_

Contributors to 3.4.0-beta1
---------------------------

Thank you to all the contributors that helped make this release happen:

* ADmad
* Andrej Griniuk
* André Teixeira
* Florian Krämer
* Jonas Hartmann
* Joris Vaesen
* José Lorenzo Rodríguez
* Juan Basso
* Marc Würth
* Mark Scherer
* Mark Story
* Mathew Foscarini
* Ondrej Mirtes
* antograssiot
* chinpei215
* glafarge
* inoas
* jirka
* ndm2
* offline

As always, we would like to thank all the contributors that opened issues,
created pull requests or updated the documentation.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news
