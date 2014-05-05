QuickApps CMS - CakePHP 2.0
===========================

QuickApps CMS is a free open source CMS built with CakePHP v2.0


Description
-----------

QuickApps CMS is a free open source CMS built on CakePHP v2.0. It
could basically be considered a Drupal[1] port, It has some of the
most remarkable characteristics of Drupal: Modularzation, Node
architecture, Content Types system creation and Field API. It is a
simple application, but robust enough to create and manage any
website. It can handle simple websites (static content), as well as
complex sites through the creation of custom Themes, Modules, or
Fields.



Inspiration
-----------

+ Drupal: Node & NodeType system, Hooks and Modularization, backend
  interface.
+ Wordpress: *shortcodes*.



Features
--------

+ Nodes: Each item of content is called a *node*, and each *node*
  belongs to a single *content type*.
+ Content Type: Defines various default settings for nodes of that
  type. Such as comments, publication, etc.
+ Field API: Allows to associate various types of information to
  *content types*. Fields controls how this information is processed,
  stored, or renderized.

::

    
    Fields included in the Core:
        -  *text*: textboxes & textareas.
        -  *list*: checkboxes or radio buttons lists.
        -  *terms list*: tags.
        -  *file*: file atachments (powered by Uploadify).

+ Module: In the system, everything is a module, even Themes have an
  associated Module. Modules included in the Core are: Block, Comment,
  Field, Locale, Menu, Node, System, Taxonomy, User.
+ Taxonomy: Categorize your content. Assign a *term list* field to
  your *content type* and start tagging you content.
+ Comments
+ Manage users: ACL
+ Blocks: Allows you to create boxes of content, which are rendered
  into an area, or region, of one or more pages of a website.
+ Menu: Is a hierarchical collection (Tree) of links, which can be
  within or external to the site. Each menu is rendered in a block that
  can be enabled and positioned through the Block system above.
+ Themes: Backend and Frontend Themes are managed independently.
+ RSS: Powered by a nice built-in search system.
+ Hook system: (or *event* system) separated in 3 layers: Controllers,
  Models, Views. Wich allow modules to interact with the entire system
  or even with other modules.
+ HookTags: Similar to Wordpress *shortcodes*.
+ Multi languages: Load your own translation packages (.po) or define
  your own *translatable entries* directly into the data base.
+ Free and much more.



Additional Modules Available
----------------------------

+ `DebugKit`_: The most popular debugging plugin compatible with QA
+ `StickyAdmin`_: Adds a sticky admin menu in front office
+ `Mediamanger`_: Management of your files stored on your website
  (Powered by ElFinder)
+ `Wysiwyg`_: Wysiwyg editor for textareas

* (Contributions are welcome) *



Try it
------

`http://demo.quickapps.es/admin`_
> user: admin<br > password: demo123



Examples
--------

+ `viverosjuangarcia.com`_: Various sections, contents and blocks +
  News system
+ `ideart.es`_: Simple index + Blog system
+ `quickapps.fr`_: French translation collaboration site



Installation instructions
-------------------------

Go to github[2] and read Readme



What is next ?
--------------

There is still a lot of work to finish. But, for now, I will
concentrate on creating a more decent official web [3], writing
documentation in GitHub, and correct errors in the actual Beta or
include new functions if necessary.



Links/References
----------------

+ `Official site`_ [3]
+ `Download it`_ [2]
+ `Drupal`_ [1]

.. _quickapps.fr: http://quickapps.fr/
.. _viverosjuangarcia.com: http://www.viverosjuangarcia.com
.. _StickyAdmin: https://github.com/QuickAppsCMS/QACMS-StickyAdmin
.. _Wysiwyg: https://github.com/QuickAppsCMS/QACMS-Wysiwyg
.. _DebugKit: https://github.com/QuickAppsCMS/QACMS-DebugKit
.. _Drupal: http://drupal.org/about
.. _Download it: https://github.com/QuickAppsCMS/QuickApps-CMS
.. _http://demo.quickapps.es/admin: http://demo.quickapps.es/admin
.. _ideart.es: http://ideart.es/
.. _Official site: http://cms.quickapps.es
.. _Mediamanger: https://github.com/QuickAppsCMS/QACMS-Mediamanager

.. author:: y2k_2000
.. categories:: articles
.. tags:: CMS,cakephp 2.0,Articles

