CakePHP 2 and launchd on Mac OS X 10.6
======================================

To run i.e. maintenance jobs on a regular basis CakePHP provides the
availability to write shells which should then be called by cron. Yet
on recent Mac OS systems, cron is not the way to go anymore. Instead,
there's "launchd". I want to show how to use launchd to run a custom
shell on a regular time interval.


The shell
=========

The shell itself can be any shell you want and/or have already
written. For details on this refer to the cake book, section `Creating
a Shell`_.


The command to run the script
=============================

In the cakebook in a section close to the one linked above, the
writers propose a short shell script which makes sure the paths are
set right – however, we don't need that on our shiny Mac OS systems.
Instead, we just call the shell directly using the provided "cake"
program: `/path/to/your/cake/app/Console/cake yourshell`


The launchd stuff
=================

Launchd wants us to create a .plist file with informations about the
program we want to run, when we want to run it and so on. I've posted
an `example plist file here`_, because the bakery doesn't allow me to
post code here...

Since we can give a working directory (in the `WorkingDirectory` key),
we don't need to use the cakeshell.sh as proposed in the book.

In the `StartInterval` key we give the time interval after which the
program execution should repeat.

To have everything running on boot, save this file to
`/Library/LaunchDaemons/` – this seems to be an appropriate place
since we programmed some sort of server daemon here. It's probably a
good idea to give the file the same name as you label it in the plist
file (only that you add .plist as ending...). Alternatively you can
also save the file somewhere else and manually load it by calling
`launchctl load /path/to/your/com.foo.bar.plist`, but you'll have to
repeat that after each reboot to have it constantly running.

Feel free to post any questions in the comments, although I probably
won't be able to answer many of them since I'm certainly not an expert
on any of those areas! :-)


.. _example plist file here: https://bin.cakephp.org/view/1680557223
.. _Creating a Shell: https://book.cakephp.org/2.0/en/console-and-shells.html#creating-a-shell

.. author:: benni
.. categories:: articles, tutorials
.. tags:: cron,cakephp 2.0,launchd,launchctl,Tutorials

