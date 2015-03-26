CakePHP 3.0.0-RC1 Released
==========================

Was is the best way to start a new year? Having the most advanced and
flexible version of CakePHP ready to be used in your projects!

The CakePHP core team is proud to announce the first release candidate
for `CakePHP 3.0.0`_. It's been an intense time since our last beta
release. We have been busy polishing most of the rough edges that we
could find with the help of the community.

This polishing sprint meant a few breaking API breaking changes from
beta3, specifically around the validation subsystem, due to many
shortcomings found in the previous implementation.

Below the list of new features and changes that made it into
3.0.0-rc1:


Revamped Validation
~~~~~~~~~~~~~~~~~~~

The validation process was split into two stages. The first stage is a
user-facing type of validation and has not changed since the last
release except for where and when it is performed.

In previous versions you would do

::

     `
    $article=$this->Articles->newEntity($this->request->data);
    $this->Articles->save($article,['validate'=>'myCustomValidatorName']);
    
    `

But now, user-facing validation is performed when creating the entity
and not when saving it. This requires you to pass the validation
option to either ` newEntity` or ` patchEntity` methods:

::

     `
    $article=$this->Articles->newEntity($this->request->data,[
    'validate'=>'myCustomValidatorName'
    ]);
    $this->Articles->save($article);
    
    `

It is important to notice that fields that fail validation will *not*
be copied into the resulting entity.

The second validation step, that we have called "application rules",
is done when saving or deleting an entity. The rules checking step is
meant to check application integrity, such as uniqueness of a column,
arity or foreignKey constraints:

::

     `
    //InUsersTable.php
    
    publicfunctionbuildRules(RulesChecker$rules){
    $rules->add($rules->isUnique('email'));
    return$rules;
    }
    
    `

Application rules can also be used to enforce business logic
constraints such as state machines, and workflow states.

The ` validate()` and ` validateMany()` methods have been removed from
the ` Table` class.

You can read more about the application rules system in the `rules
checker documentation`_.


New Error Pages
~~~~~~~~~~~~~~~

The error pages containing the exception stack traces have been
redesigned to be easier to read and spot what caused the error
originally. The new look was inspired by the `Rails' better errors
plugin`_


New Bake Plugin
~~~~~~~~~~~~~~~

The ` cakebake` command is now a plugin. This will help us evolve its
code at a higher pace and introduce new code generators and
configuration options.

One important change concerning bake is that it now uses CakePHP's `
View` system to render the templates. This means that it is possible
to attach listeners to the ` Bake.beforeRender` and `
Bake.afterRender` events to modify bake's output.

Additionally, the templating syntax has changed to make them more
readable. If you had your own bake templates in the past, they will
need to be updated to use the new syntax which uses erb style tags. To
get the ` Bake` plugin run:

::

     `
    composerrequirecakephp/bake=dev-master--dev
    
    `

And load it in your application ` bootstrap_cli.php` file:

` Plugin::load('Bake');`


Table-less Forms
~~~~~~~~~~~~~~~~

Due to popular request, there is now a ` Form` object that is capable
of defining a schema and validating form data without the use of ORM
tables or entities:

::

     `
    publicfunctionadd()
    {
    $contact=newContactForm();
    if($this->request->is('post')){
    if($contact->execute($this->request->data)){
    $this->Flash->success('Wewillgetbacktoyousoon.');
    return$this->redirect(['action'=>'add']);
    }
    $this->Flash->error('Therewasaproblemsubmittingyourform.');
    }
    $this->set('contact',$contact);
    }
    
    `

You can read more about them here `http://book.cakephp.org/3.0/en
/core-libraries/form.html`_


Adopted PSR-2
~~~~~~~~~~~~~

We have recently adopted the `PSR-2`_ coding style standard for
CakePHP and all the official plugins. You can read more about the
reasoning in `this blog post`_


ORM Related Improvements
~~~~~~~~~~~~~~~~~~~~~~~~

+ Added ` Query::firstOrFail()`
+ Allowing to change the joinType in ` TranslateBehavior`
+ Implemented ` Table::addAssociations()` to add multiple associations
  at once
+ Support for ` ISNOT` operator
+ It is now possible to call ` matching()` and ` contain()` for the
  same association alias.

We'd like to thank again everyone who has contributed thoughts, code,
documentation or feedback to 3.0 so far. Please help us find any
issues or rough edges in the code by opening tickets in Github.


.. _PSR-2: http://www.php-fig.org/psr/psr-2/
.. _CakePHP 3.0.0: https://github.com/cakephp/cakephp/releases/3.0.0-rc1
.. _Rails' better errors plugin: https://camo.githubusercontent.com/3fa6840d5e20236b4f768d6ed4b42421ba7c2f21/68747470733a2f2f692e696d6775722e636f6d2f367a42474141622e706e67
.. _this blog post: http://bakery.cakephp.org/articles/jameswatts/2014/12/16/cakephp_3_to_fully_adopt_psr-2
.. _http://book.cakephp.org/3.0/en/core-libraries/form.html: http://book.cakephp.org/3.0/en/core-libraries/form.html
.. _rules checker documentation: http://book.cakephp.org/3.0/en/orm/saving-data.html#applying-application-rules

.. author:: lorenzo
.. categories:: news
.. tags:: ,News

