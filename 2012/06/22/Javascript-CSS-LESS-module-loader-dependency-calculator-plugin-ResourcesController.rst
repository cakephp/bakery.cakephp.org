Javascript/CSS/LESS module loader + dependency calculator plugin
("ResourcesController")
=======================

ResourcesController is a module loader for resource files (e.g.
javascript, LESS, CSS). It can handle both inter- and intra- package
dependencies, as well as a variety of preprocessors (I have currently
only put a LESS CSS preprocessor in, but others can be easily built
using the implementable iPreprocessor interface).

(You can find it at `https://github.com/gfarrell/ResourcesController`_
- please fork it and improve it!)

I have always found it pretty frustrating when one has loads of nicely
separated javascript files, each with its own class and each with its
own dependencies but then you have to either run a compiler of some
sort to mash them all together (like Juicer or BTMPackager) or use a
client side asynchronous module loader like require.js.

ResourcesController allows you to define packages of files like CSS,
LESS or Javascript files with dependencies either for the whole
package or for the individual file and then when the files are
requested the dependency tree is flattened and the files are packaged
up, compressed and delivered.

The plugin also uses caching (otherwise this would be a really slow
operation) so that if the files haven't changed since the last cache,
the cached version is served up. The best part of that is that it uses
native Cake caching so whatever your chosen cache engine, it's already
using it!

At the moment it can do CSS and Javascript compression and LESS
preprocessing. I wanted to include CoffeeScript but there's no PHP
version and I am loathe to use exec() commands in a generally
available plugin. I wanted this to be as versatile as possible.

It's pretty easy to extend, you can just write new preprocessor
components with the iPreprocessor interface.

The documentation should be quite complete, so have a look and let me
know if you use it/what you think/if you encounter bugs.

(You can find it at `https://github.com/gfarrell/ResourcesController`_
- please fork it and improve it!)


.. _https://github.com/gfarrell/ResourcesController: https://github.com/gfarrell/ResourcesController

.. author:: gfarrell
.. categories:: articles, plugins
.. tags:: javascript,CSS,Modules,module loader,less,Plugins

