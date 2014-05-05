Testing with Virtualbox and Vagrant
===================================

Getting a good test environment running on your machine can be a chore
when you have to worry about OS upgrades that break paths and
utilities. I want to show you how I've used Virtualbox and Vagrant to
create a portable and stable(ish) test environment for building
CakePHP 2.0.3 (as of writing this article) plugins or applications for
local work.

I procrastinated, for a very long time, about which projects I'd start
practising tests with; I've long admired people who wrote tests for
code, but I'd never done it formally before for my own projects. I'd
written tests for a few JS projects that I'd contributed to; but, as
they already had a solid system in place, I simply needed to copy a
few lines of existing test code and change it to meet my needs.

I recently implemented a `JsonReader`_ configuration reader for a
recent project. I decided to make that my first plunge in to CakePHP
testing. Turns out that writing tests is so effing easy; but getting a
good testing environment set up on your local machine can be a pain.

*Side note*: My development environment consists of a dotfiles Git
repo, SSH, tmux (but GNU Screen may be to the taste of other devs) and
remote Linux machines (development and production.) I really don't
like fiddling with my local machine, be it a Linux or OS X machine; I
prefer to keep it fairly vanilla and keep my dev sessions running on a
machine that my wife can't accidentally reboot.

As I like to keep things clean, I turned to virtualisation as a way of
locally testing. I didn't want to have to mess around with a
CakePHP/Apache configuration every time I wanted to test a plugin. To
that end, I got started with `VirtualBox`_ & `Vagrant`_. The virtual
machine is preconfigured with PHPUnit, Xdebug, PHP 5.3ish, Apache HTTP
Server. I tried to trim as much out of the distribution as possible to
keep the download small but you are welcome to install new stuff to
suit your needs.


What you'll need
````````````````

+ `VirtualBox`_
+ The gem command available from a terminal (if you're on OS X, and
  many Linux distros, you should be fine) If you don't have Ruby
  installed on your machine, `RVM`_ may be able to aid you install it
  locally to your profile. If you are on a Windows machine, there are
  solutions out there.
+ `Vagrant`_ To install it you just need to do ` geminstallvagrant` or
  ` sudogeminstallvagrant` If you have never used gem before, or haven't
  ever heard of Ruby, or don't know what RVM is, you probably need to `
  sudo`.
+ `Git`_ - you don't really need this if you're happy to download
  CakePHP manually.



Getting started
```````````````

If you're working on a fully fledged CakePHP application, rather than
a plugin or some sort of standalone lib, skip to 2:


1) Download a fresh CakePHP.
++++++++++++++++++++++++++++

::

     `
    gitclonegit://github.com/cakephp/cakephp
    `

` cd` in to the cakephp dir (eg. ` cdcakephp`)


2) Download the CakePHP testing box that I've created:
++++++++++++++++++++++++++++++++++++++++++++++++++++++

::

     `
    vagrantboxaddcakephphttp://dl.dropbox.com/u/7242440/cakephp-testing.box
    vagrantinitcakephp
    `



3) Make sure your CakePHP environment is correctly configured
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The testing box assumes that your CakePHP project is entirely self-
contained, with no symlinks, and with a ROOT/app/webroot directory as
standard

Provided that you don't have plans to do any database testing, your
app/Config/database.php needs populating with a dummy/empty test
database configuration.


4) Start the vagrant box
++++++++++++++++++++++++

::

     `
    vagrantup
    `



Accessing tests
```````````````

The virtual machine is configured to automatically set up port
forwarding so that you can access your application tests at
http://localhost:2253/test.php

There is no need to restart the machine as the app folder is live
shared. You can start making changes and rerunning tests at will. If
you want to run tests from a terminal, you will need to ssh in like
so:

::

     `
    vagrantssh
    cd/vagrant
    ./Console/cakexxx
    `

Pretty simple huh?


Reusing the virtualbox
``````````````````````

The box doesn't have to be downloaded every time you create a new
project. Once you've run ` vagrantboxaddcakephp{url}`, that box is
available to your system under the name cakephp. If, at a later date,
you have a new project which you want to test locally, you simply need
to replace the aforementioned command with ` vagrantboxinitcakephp`


Extending the virtualbox
````````````````````````

Once you've downloaded it, you can do as you wish with it. You can `
vagrantssh` in to it and use the package manager to install new
services and apps. The box was created with vagrant in mind so you can
` sudo` without a password and ` apt-get` or ` make` anything you
please.

Note that I placed the PHPUnit files in the vagrant user home dir so
that I didn't risk pruning them when reducing the box size (it's
around 600MB in size) and I've left them there due to laziness. If
CakePHP, at a later date, supports newer versions of PHPUnit, you can
simply cd in to each part of the PHPUnit source and use git to pull
down newer releases.


But wait! That URL doesn't work/it takes forever to download the box
file!
`````

Dropbox is far from the best location to host a .box file, I admit.
I've created a `torrent`_ that you can use to download it locally and
help me seed until I find a better permanent location. Once you've
downloaded it locally, you can give vagrant a local path when adding
it eg:

::

     `
    vagrantboxaddcakephptest/path/to/cakephp-testing.box
    `



.. _torrent: http://dl.dropbox.com/u/7242440/cakephp-testing.box.torrent
.. _VirtualBox: http://virtualbox.org
.. _Vagrant: http://vagrantup.com
.. _Git: http://git-scm.com
.. _JsonReader: https://github.com/connrs/JsonReader
.. _RVM: http://beginrescueend.com/

.. author:: connrs
.. categories:: articles, tutorials
.. tags:: testing,Tutorials

