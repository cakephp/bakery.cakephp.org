Running CakePHP using the Facebook's HipHop compiler
====================================================

I always had the curiosity of trying to compile CakePHP to C++ code,
but never had the time. This year I decided to give it a go...

Facebook surprised the PHP community in early 2010 when announced they
managed to write a compiler for PHP to produce C++
(`https://developers.facebook.com/blog/post/358)`_ code. Being PHP the
most popular language for web applications, it faces a lot of
competition from other languages to position themselves as the fastest
language out there, buy this announcement was a real game changer as
it is hard to argue against the speed of compiled machine code.

It was clear, though, that using the HipHop compiler was not for
everyone. It is widely known you can very easily scale PHP for high
performance applications, frameworks usually provide tools to squeeze
speed and foster cache use to make your application faster, and
throwing more hardware and the problems is often the cheapest and most
rapid way of serving your code to more users. Nevertheless, having an
almost free way of making your code twice as fast under the same
hardware sounds too good to not give it a try.

::

    echo "<?php echo 'Hello World'; ?>" > test.php
    src/hphpi/hphpi test.php

1
My Main motivation to try compiling CakePHP with Facebook's HipHop was
simple curiosity: will it work? I though it was worth the shot. By the
time I was having 2the idea, there were a lot of discussions in the
forums and twitter about which the fastest PHP framework was, there
were tons of benchmarks out there with lot of bias, and most of them
portrayed CakePHP as a slow beast that only a fool would use.

Even though that was an outright lie, I thought the discussion would
be over and basically turned irrelevant if one could compile the code
and get awesome speed without having to change the code. So I embarked
in a surprisingly simple adventure for converting CakePHP into C++
code.


Requirements
------------

To perform my testing I used a Ubuntu 11.10 64bits virtual machine, if
you are building it in your own box, or using a virtual machine, make
user it is 64bits, as that is the only platform HipHop runs in.
Additionally you will need:

::

    public $default = array(
        'datasource' => 'HipHop.Database/HpMysql',
        'persistent' => false,
        'host' => 'localhost',
        'login' => 'root',
        'password' => 'root',
        'database' => 'cakephp',
        'prefix' => '',
        'encoding' => 'utf8',
    );

2

Installation
------------

Follow the installing instructions in this page Building and
Installing on Ubuntu 11.10 (`https://github.com/facebook/hiphop-php/wiki/Building-and-Installing-on-Ubuntu-11.10)`_
do not skip any part, all libraries listed there and patches to be applied are
required. There are a couple of problematic steps in the
aforementioned guide when building required libs. I have created some
repos in github, including a fork of HipHop itself so you can clone
them and just build the sources without having to redo the work I did.
These are my forks:

+ curl 7.2.1 (`https://github.com/lorenzo/curl/zipball/hiphop)`_
+ HipHop (`https://github.com/lorenzo/hiphop-php)`_ clone the repo or
  download the master branch

You can download and compile libevent without applying any custom
patches. Follow the installation guide and use my forks where it tells
you to download from the original source.

Once HipHop is compiled, create a simple php file and test whether it
works fine. Make sure you read this guide
(`https://github.com/facebook/hiphop-php/wiki/Running-HipHop)`_ before
you attempt to do anything, it is crucial that you set up the
environment variables `HPHP_HOME` and `HPHP_LIB` as shown in that
link.


Testing your build
------------------

::

    cd hiphop-php
    export CMAKE_PREFIX_PATH=`/bin/pwd`/../
    export HPHP_HOME=`/bin/pwd`
    export HPHP_LIB=`/bin/pwd`/bin

I used the interpreter instead of compiling directly. This is what I
did:
B0x1A1
You can follow the more advanced examples for compiling your code
explained at the wiki page. I would strongly recommend you feel
comfortable with compiling simple examples and getting them running
before proceeding with compiling CakePHP.


Compiling CakePHP
-----------------

The most important part of compiling your application is getting ready
for it. I used a simple blog baked from a rather simple database
schema to perform my testing using CakePHP 2.1-beta, and I made an
exhaustive testing of every feature using the `hphpi` interpreter
first.

Remember that HipHop produces a single program out of every php source
file your application uses. So the simplest way of compiling and
testing your source is by keeping the default CakePHP folder structure
(where app and lib lives under the same root folder). There are a few
simple modifications we have to do in order to test the application
using the interpreter.


Installing the HipHop plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

First step is installing my HipHop plugin
(`https://github.com/lorenzo/HipHop),`_ just drop it in app/Plugin and
enable it using `CakePlugin::load('HipHop')` in your
app/Config/bootstrap.php file. This plugin contains several useful
scripts to adapt your application for the new environment.

Keep in my that HipHop only supports Mysql and SQLite as databases for
your project, but unfortunately, the PDO implementation Facebook did
does not behave exactly the same as the original PHP implementation.
For that reason the plugin bundles a somewhat modified Mysql source
that you need to use if you expect your application to work correctly
when compiled. This is a database.php example:
B0x1A2

Generating the class map
~~~~~~~~~~~~~~~~~~~~~~~~

HipHop does not implement any kind of automatic class loader, so we
need to provide a complete list of classes to be used in your
application, this is a big difference between the hphpi interpreter
and the compiler. Your CakePHP application will run just fin in the
interpreter, but it won't after compiling if you are unable to tell it
where your classes are. For this purpose, the plugin bundles a shell
that needs to be executed before compiling your code:

::

    app/Console/cake HipHop.ClassPath

The previous command will generate a file under app/Config named
`incules.php` containing hard-coded include statements for all your
files containing classes. *It is extremely importart you have only 1
class per file*, also avoid having files combining class definitions
and procedural code.

Next step is to copy the file from
`app/Plugin/HipHop/Config/webroot/index.php` to
`app/webroot/index.php`

::

    cp `app/Plugin/HipHop/Config/webroot/index.php app/webroot/index.php

Main difference between both files is that the one provided by the
plugin includes the class map before dispatching the request. This
enables the compiler to know beforehand where to find any needed
class.


Test driving it
~~~~~~~~~~~~~~~

Copy the `app/Plugin/HipHop/Config/config.hdf` file in your
application root folder, and edit it. Your will find comments inside
the file of how it should look like, this is one example:

::

    Server {
        Port = 80
        SourceRoot = /home/lorenzo/cakephp
    }

    VirtualHost {
        * {
            Prefix = hiphop.local
            RewriteRules {
                * {
                    pattern =    ^(.*)$
                    to = /app/webroot/index.php$1
                    qsa = true
                        conditions {
                                * {
                                    pattern = ^/(css|js|img)/*
                                    negate = true
                                }
                        }
                }
                * {
                    pattern = ^/(css|js|img)/(.*)$
                    to = /app/webroot/$1/$2
                    qsa = true
                }
            }
        }
    }

Run the interpreter in server mode for the first time using your
application source. Go to the root folder containing your app
directory and execute the following command:

::

    sudo ~/dev/hiphop-php/src/hphpi/hphpi -m server -c config.hdf

Change directories accordingly if you did not follow the guide and
setup the folders as suggested. After running this command you will be
able to access `http://localhost/`_ and start browsing your
application, you can also provide the `-p` option to select a
different port like 8080 if you don't want to run the interpreter as
super user.

When you have tested every feature in your app, and feel comfortable
with results, it is time to start compiling your source.


Compiling your application
~~~~~~~~~~~~~~~~~~~~~~~~~~

When compiling your source expect a lot bumps in the road. Hopefully
you won't have different problems that I had, so the plugin is already
bundling a solution for those. Compiling the source requires a full
list of files to include in the resulting binary, as always use the
plugin to produce it:

::

    app/Plugin/HipHop/Config/scripts/generate_list

Previous command will create the files.list file. Right after
generating the list, use the following command to compile your
application:

::

    ~/dev/hiphop-php/src/hphp/hphp --input-list=files.list -k 1 --log=3 -v "AllDynamic=true"

Expect it to fail. It will complain about missing PDO constants. Let's
take care of it with the following command:

::

    app/Plugin/HipHop/Config/scripts/fixconstants

It will run a search and replace function inside `/tmp/hphp*` (there
should be only one directory matching the expression) fixing any
incorrectly exported symbol. Now `cd` to the build folder and start
the process again:

::

    cd /tmp/hphp* && make

Be patient, it will take some time. Hopefully the compiling process
will finish without errors, and it will produce a binary file named
`program`, be ready to execute it for the first time.

Copy the program executable anywhere you like, I put it again into my
application root folder. Run it for the first time:

./program -m server -v "Server.DefaultDocument=index.php" -c
config.hdf

Browse your application again and make sure everything runs as it
should, and be amazed at the speed and how much concurrent connections
it can handle at the same time.


Conclusion
----------

Running CakePHP using HipHop is arguably simple one you automate the
process, I'm still far from it, but I have created script for most
steps. I'm really looking forward trying the new HipHop branch
featuring a new virtual machine and a just in time compiler.

I'm pretty confident there are no hidden bugs when running CakePHP
using HipHop, but I can be very wrong on this one. Want to help me
find those bugs and fixing them? Will you compile your own
applications? Leave your thoughts in the comments section!


.. _https://github.com/lorenzo/hiphop-php): https://github.com/lorenzo/hiphop-php)
.. _https://github.com/facebook/hiphop-php/wiki/Building-and-Installing-on-Ubuntu-11.10): https://github.com/facebook/hiphop-php/wiki/Building-and-Installing-on-Ubuntu-11.10)
.. _https://github.com/lorenzo/HipHop),: https://github.com/lorenzo/HipHop),
.. _https://developers.facebook.com/blog/post/358): https://developers.facebook.com/blog/post/358)
.. _http://localhost/: http://localhost/
.. _https://github.com/lorenzo/curl/zipball/hiphop): https://github.com/lorenzo/curl/zipball/hiphop)
.. _https://github.com/facebook/hiphop-php/wiki/Running-HipHop): https://github.com/facebook/hiphop-php/wiki/Running-HipHop)

.. author:: lorenzo
.. categories:: articles, tutorials
.. tags:: performance,compile,hiphop,Tutorials

