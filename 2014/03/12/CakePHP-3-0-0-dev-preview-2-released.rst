CakePHP 3.0.0 dev preview 2 released
====================================

The CakePHP core team is very excited to announce the second
development preview of CakePHP 3.0

The CakePHP core team is excited to announce the second development
preview of CakePHP 3.0.0[1]. In the few months since 3.0.0-dev1, we've
been hard at work incorporating community feedback on the ORM, and
building out some of the functionality that was missing in the first
development preview.


New features in 3.0.0-dev2
~~~~~~~~~~~~~~~~~~~~~~~~~~

+ CakePHP has adopted the PSR-4 autoloader standard. If you are
  updating, make sure you update composer as well using ` composerself-
  update`.
+ The directory structure of both CakePHP and the App skeleton has
  been simplified a bit thanks to PSR-4.
+ The AclComponent has been removed - It will be returning as a
  plugin.
+ The TestShell, and webrunner have been removed in favor of only
  supporting phpunit from the CLI, and VisualPHPUnit.
+ View templates have been moved from View/ to Template/. This was
  done so the View/ directory would only contain view classes and
  helpers.
+ The HtmlHelper, FormHelper, and SessionHelper use string templates
  consistently.
+ ID attributes are now always generated with ` -` instead of
  CamelCase. This was done to standardize on one convention for CSS
  selectors.
+ API documentation and the cookbook have had many new sections and
  improvements.
+ Scaffold has been removed. Improved dynamic scaffolding is now
  available through the CRUD plugin[2] which is already compatible with
  3.0 and takes away much of the repetitive tasks done in controllers.
+ The UpgradeShell has been moved into a separate plugin.
+ Better debugging output for some complex objects like Entities,
  Tables and Queries. Also added a special method to control what data
  is outputed for objects when using the debug() function
+ Added Collection::insert()


FormHelper
``````````

FormHelper has been re-built from the ground up. It features a new
extensible widget system. Form widgets allow you to build self
contained input widgets. This makes it easy to define complex widgets
like the datetime widget in application or plugin code. Once created,
widgets can be combined with other FormHelper features like `
input()`.

FormHelper also works with the new ORM now. You can create forms for
individual entities, or collections of entities:

::

     `
    //Createaformforasingleentity&itsassociations
    echo$this->Form->create($article);

    //Createaformformultipleentities&theirassociations.
    echo$this->Form->create($articles);

    `

FormHelper also features a pluggable context system that allows you to
integrate FormHelper with any ORM you may wish to use.


TranslateBehavior
`````````````````

TranslateBehavior has been re-built from the ground up. It features
the long awaited ability to translate *all* models including
associations from a find(). The new ` TranslateTrait` makes dealing
with multiple translations in your entities simple as well.


ORM improvements
````````````````

We've continued to build out capabilities in the ORM. Some notable
improvements in dev2 were:

+ Composite primary key support - The ORM now supports composite
  primary keys in all associations.
+ The Model.beforefind event is now triggered for all associations in
  the same query.
+ Eager loading is now separate from the Query class. This makes
  implementing custom eager loading much easier.
+ Model/Repository was renamed to Model/Table. Several people found
  'Repository' to be a confusing and alien term.
+ Interfaces have been extracted to reduce the reliance on concrete
  implementations.
+ The formatResults() method has been added to provide many of the
  features that afterFind() used to do.
+ Query::counter() was added to provide support for complex count
  logic. This makes it easier to override the count in the
  PaginatorComponent.
+ Table::patchEntity() was added, it enables you to merge requet form
  data into an existing entity and its associations.


Up next
~~~~~~~

Our next release will be yet another development preview. In the dev3
release we are going to focus on updating:

+ Bake and all the related tasks need to be updated to work with the
  new ORM.
+ Update the i18n extract task to extract validation messages from
  Table objects
+ Add support for SQLServer. With the database layer reasonably stable
  adding SQLServer will help developers on windows.

For more details on all the changes in 3.0.0, you can consult the
migration guide[2]. I'd like to thank everyone who has contributed
thoughts, code, documentation or feedback to 3.0 so far. It's going to
be a major milestone for the project, and we're just getting started
with making it the best version of CakePHP ever.


Links
~~~~~

+ [1] `https://github.com/cakephp/cakephp/releases/3.0.0-dev2`_
+ [2] `https://github.com/FriendsOfCake/crud/tree/cake3`_
+ [3] `http://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html`_



.. _http://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html: http://book.cakephp.org/3.0/en/appendices/3-0-migration-guide.html
.. _https://github.com/FriendsOfCake/crud/tree/cake3: https://github.com/FriendsOfCake/crud/tree/cake3
.. _https://github.com/cakephp/cakephp/releases/3.0.0-dev2: https://github.com/cakephp/cakephp/releases/3.0.0-dev2

.. author:: lorenzo
.. categories:: news
.. tags:: release,News

