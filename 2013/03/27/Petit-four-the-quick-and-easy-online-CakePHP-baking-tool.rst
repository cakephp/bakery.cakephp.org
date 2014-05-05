Petit four, the quick and easy online CakePHP baking tool
=========================================================

Petit four is an online application that allows you to design the
models of your applications and then automatically generate a SQL
database and the base files for CakePHP: models, controllers and view
directories.

In our Web agency we have been glad to use CakePHP for almost two
years as it has really helped us speed up our projects.

However from time to time there are still some tasks that feel a bit
slow or tiresome, like creating the basics files to start a project,
or add models on the fly during the development process. The console
baking tool can be useful and has been improved over the years but has
many limitations and you don't always want to start it each time you
add a new model to your application in order to bake a model, a
generic controller and generic view files that you won't necessary use
as such.

That is why we developed a tool that allows us to speed up our
modeling process by easily creating the models, their attributes and
their relations and generating at the same time the SQL file ready to
be imported in a database, and the CakePHP basic files needed to build
an application on it.

Mind that this is only a beta version with a narrow set of
functionalities. We focused on the first layer that is needed for any
kind of MVC application: a database and models files. We throwed in
the creation of controllers and view directories, because they can be
useful, but as they are not always needed, we left them empty for the
moment.

Bake your Cakes online.
-----------------------

We designed a tool that would be useful for us, and we hope it will
also benefit the community and we plan on continuously improving it.
We already have a few improvements in mind, mainly to bring it to the
same level as the console bake for code generation:

+ Editing the validation rules for model attributes
+ Optionally generating the basics controller actions and views
+ Attaching behaviors to a model

`Read more instructions and more improvements that we have in mind.`_

Please comment this article, or send us suggestions for this tool on
the `pâtisserie`_ or by email at contact@keensoftware.com .


.. _Read more instructions and more improvements that we have in mind.: http://www.patisserie.keensoftware.com/en/pages/view/petit-four-l-application-en-ligne-de-generation-de-projets-cakephp
.. _pâtisserie: http://patisserie.keensoftware.com/en

.. author:: ccadere
.. categories:: articles
.. tags:: bake,CakePHP,tool,online,automated,Articles

