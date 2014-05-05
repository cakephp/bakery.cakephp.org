HOWTO Setup Eclipse 3.6 to get the most out of CakePHP 1.3 Development
======================================================================

This article explains step-by-step on how to setup your CakePHP dev
environment to get the most out of open source tooling.
There are lots of great resources out there for developing CakePHP
apps in eclipse - but they are outdated and scattered. I took the time
tonight to setup my environment, so I figured I'd blog about it. Below
are the steps I took to get thinks as I like 'em. I run Ubuntu 10.10
64bit, but these directions should apply to any OS. This requires you
have CakePHP 1.3.X extracted someplace on your box.

#. Download Eclipse PDT all in one, and extract.
   `http://www.eclipse.org/pdt/downloads/`_
#. Need to fix a PDT compare/diff bug. Start eclipse, go to
   help>install new software. Add
   'http://download.eclipse.org/tools/pdt/updates/2.2/milestones' and
   install the features (source feature is optional). Restart eclipse
   when prompted.
#. Install subversive (optional, only if you use Subversion): Open
   eclipse, help>install new software>select Helios -
   `http://download.eclipse.org/releases/helios`_ > Collaboration Tools.
   Install the Subversive SVN connector and team provider
#. Setup your PATH to use the cake console (optional, requires
   php5-cli to be installed). This allows you to call 'cake bake help'
   for example, from your terminal. Edit ~/.profile and add to the bottom
   of the file

::

    PATH="/path/to/cake/runtime/13/cake/console:$PATH"

#. Setup eclipse so it can run 'cake bake directly' from the IDE.
#.

    #. Open eclipse, go to your PHP explorer perspective. From the menu
       choose Run > External Tools > External Tools Configurations
    #. Click Program, then new program (white page upper left). Give it a
       name like Cake bake.
    #. In the Location field put the full path to the cake console script.
       I have 1 shared runtime on my box for all my CakePHP 1.3 based apps.
       Ex: /opt/cake/runtime/13/cake/console/cake. Note: If you typically run
       diff versions of cake or have the cake runtime directly in your
       project, you can insert variables in the location box (like
       workspace).
    #. Under Working Directory put ${project_loc}/app
    #. Under Arguments put 'bake'
    #. Now click Apply then close.
    #. Test it out by clicking on a cake project (must have the structure
       of 'project name' with a subfolder called 'app'), then clicking
       Run>External tools>Cake bake. This will open a console that you can
       type in.

#. Repeat Step 5 for other cake console things you would like to use
   from the IDE (like 'cake console' for example)
#. Setup syntax highlighting for .ctp files: Window > Preferences >
   General > Appearance > content Types > Text > PHP Content type > Add..
   , then put in `*.ctp`.
#. Install Open Cake File eclipse plugin to enable fast switching
   between your MVC classes/files. This is not well known, but its a
   nifty plugin. `http://opencakefile.sourceforge.net/`_

Thats it! If you know of any other cool things email me, and I'll add
em. Note: I left off code completion intentionally, as I am not a big
fan of the implementation of the solutions I've seen.

The most up to date version of this can be found on my blog at
`http://www.rynop.com/`_

.. _http://www.rynop.com/: http://www.rynop.com/
.. _http://www.eclipse.org/pdt/downloads/: http://www.eclipse.org/pdt/downloads/
.. _http://download.eclipse.org/releases/helios: http://download.eclipse.org/releases/helios
.. _http://opencakefile.sourceforge.net/: http://opencakefile.sourceforge.net/

.. author:: rynop
.. categories:: articles, tutorials
.. tags:: svn,Eclipse,ide,plugin,PDT,Tutorials

