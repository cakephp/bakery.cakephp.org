Troubleshooting CakePHP installation issues related to Apache 2
mod_rewrite - for beginners.
============================

If you are able to get your default CakePHP index page to come up
after installing, but without the Cake logo in the top left and
without the styling, chances are the problem is related to your Apache
configuration with regard to the rewrite module, a.k.a. mod_rewrite.
This article should help you troubleshoot.
A common issue when installing CakePHP is that the main index page
will come up, but without images and styling, making your page look
kind of like a text and-hyperlink-only html page.

The following image is an example of how CakePHP's homepage should
look when you first install it. And it should look this way without
touching ANY of the CakePHP files:

`http://www.ibm.com/developerworks/opensource/tutorials/os-php-cake1/fig01.jpg`_
Many people after installing can get the page to come up, but it looks
more like this:

`http://www.ibm.com/developerworks/opensource/tutorials/os-php-cake1/fig02.jpg`_
If you are experiencing this issue, the problem is most likely not
with your cake installation, it's with your Apache configuration...
more specifically the problem is that you aren't using mod_rewrite
correctly.

If you are not familiar with mod_rewrite and it frustrates you, don't
feel bad. I've installed LAMP servers (and a WAMP server or two) many
different ways, through Linux package repositories, compiling PHP,
Apache and MySQL individually from source, etc. and I have to say
getting Apache to work the way I wanted it to (especially mod_rewrite)
was among the most frustrating things I've ever had to deal with in my
programming experience.

What is mod_rewrite, you ask? Here's my quick explanation: mod_rewrite
is an Apache module (a piece of Apache you can enable or disable) that
basically allows the server to "rewrite" the URL you type into your
browser behind the scenes... as well as rewriting any URL's referenced
within the HTML source of the page. You can't see the rewritten URL's
in your browser's address bar. Without this, you wouldn't be able to
use the MVC-friendly URL's CakePHP is designed to use.

mod_rewrite is most likely enabled in your Apache configuration file,
usually called httpd.conf (httpd is the name of the daemon process
that is the Apache server, so as far as we're concerned httpd=Apache)
The rules for this rewriting are defined in the .htaccess files
included with CakePHP.

CakePHP also expects you to configure Apache such that the
"DocumentRoot" points directly to the directory where you installed
CakePHP, which should contain an index.php file and the app/
directory, among other things. We will refer to this directory as
CAKEROOT. Apache 2 installations including MAMP, WAMPServer, XXAMP,
etc. do NOT do this by default. They usually have a directory called
www, public_html, webroot, httpdocs, or something like that and the
"DocumentRoot" points there by default. They (AMP) expect you to
either put your website there or in a subdirectory.

Cake's .htaccess files are written on the assumption that your
DocumentRoot points directly to your CAKEROOT directory. While you CAN
make CakePHP work in a subdirectory of your DocumentRoot, it requires
changes to .htaccess files and maybe even cake config files or index
files, etc. And you may run into other issues later when trying to
follow instructions that assume you have it working. So if you're just
interested in learning CakePHP, do not waste your time trying to
figure out how to bypass mod_rewrite unless you REALLY have to.

HOW TO TROUBLESHOOT THIS ISSUE:

STEP 1) Check for the .htaccess files and make sure they are readable.
Files starting with a "dot" like .htaccess are usually hidden by
default. Depending on how your machine is set up, these hidden files
can be ignored when copying, especially if you are using a file
browser and you have it configured to hide hidden files (usually the
default setting).

The safest option is to unzip, untar, etc. in the CAKEROOT folder, but
regardless of how you do it, check to make sure the .htaccess files
are there and make sure they have the proper permissions so they can
be read by the server.

You should be able to find a file called .htaccess in each of the
following locations:

CAKEROOT/.htaccess
CAKEROOT/app/.htaccess
CAKEROOT/app/webroot/.htaccess
CAKEROOT/cake/console/libs/templates/skel/.htaccess
CAKEROOT/cake/console/libs/templates/skel/webroot/.htaccess

If you decompressed (unzipped, untarred, etc.) a cake archive you
downloaded from the CakePHP site and did so directly in the CAKEROOT
directory, these files should all be in place.

If you decompressed an archive, then COPIED the files, especially if
you did it using a graphical program like Windows Explorer (of Finder
for Mac, someone correct me if I'm wrong), then it's entirely possible
that the files did not get copied.

If you don't want to manually check for each one you can open a
command prompt, preferably as user "root", navigate to the CAKEROOT
directory and run the following command:

find . -name .htaccess

This should spit out a list of .htaccess files similar to the one I
gave above.

If the files are there, double check to make sure they have the
correct file permissions. If they can't be read by the server, they
won't be picked up. From the command line, navigate to the CAKEROOT
directory again and run the "list (long)" command:

ls -l .htaccess

You should see something like this:

-rw-rw-r-- 1 root users 139 2010-01-29 21:54 .htaccess

In this case the file is readable by everyone because there are 3 r's.
If you see this, move on to STEP 2.

If you want to understand how file permissions in UNIX-like systems
work, go here:
`http://www.perlfect.com/articles/chmod.shtml`_
If you do not see 3 r's, assuming you or root has the privileges
needed to modify the file, you can fix this by going to each folder
that has an .htaccess file and running the following command:

chmod a+r .htaccess

STEP 2) Find your apache configuration file(s)
I know WAMPServer has a system tray icon you can click through to get
to the httpd.conf. I assume MAMP, XXAMP, etc. are similar, but not
identical.

If you do not know how to access your Apache configuration files,
start by checking the documentation for whatever server software you
are using (MAMP, XXAMP, WAMP, etc.) because although they all seem
pretty similar, they are most likely not all the same.

Keep in mind the following rules (at least the ones I'm aware of)
about Apache configuration files:

-Since AMP servers are designed to make server administration more
simple, it's usually called httpd.conf, but it DOESN'T HAVE TO BE.
-It can actually be more than one file... you can include other config
files from within httpd.conf.
-If you find a file called httpd.conf, it doesn't necessarily mean
it's the one being used... there are situations where you might have
more than one httpd.conf in your system.

So again, your AMP documentation is your best bet for finding the
correct file. Once you know how to access the correct file (or files),
note it down somewhere. You will need this later.

STEP 3) Find out if mod_rewrite is enabled.
The easiest, most definitive way to find out if mod_rewrite is enabled
on your server, if you can get it to work, is to find your
CAKEROOT/index.php file and add the following line of PHP code
somewhere:

phpinfo();

Then when you open your cake page again, you will see the PHP Info
page first, followed by the broken cake page like the pic above. If
you can get this to work, this will make it WAYYYYYYY easier to
troubleshoot your Apache issues. Therefore I will make this the one
exception to my earlier rule about not modifying the cake files until
you get Apache working properly.

mod_rewrite

About 3 tables down or so in your PHP Info page (the contents of this
page varies depending on your php build an php.ini settings) look for
a table called "apache2handler". Towards the bottom of the table you
should see "Loaded Modules". Somewhere in that list you should find
mod_rewrite. If you DO NOT find it, mod_rewrite is NOT enabled.
Remember this.... we will go over what to do about it later in the
post.

DocumentRoot

You can also find out what your true DocumentRoot is by looking at
this PHP Info page. A little further down, there will be a table
entitled Apache Environment. Find the DocumentRoot field and remember
the value you see there. This will also come in handy later.

IF FOR SOME REASON YOU CAN NOT GET THE PHP INFO PAGE TO DISPLAY, you
will have to be really sure about which Apache configuration file or
files are being used and go on to STEP 4.

STEP 4) Edit your Apache configuration file if needed.
Check that you have the following set up in your Apache configuration
file(s) (from STEP 1)

Search through them for the following lines:

This line loads the driver/library for the rewrite_module (another
name for mod_rewrite):
LoadModule rewrite_module libexec/mod_rewrite.so

This line ENABLES the rewrite_module:
AddModule mod_rewrite.c

This line sets the DocumentRoot of the server. This can be in multiple
places, so make sure you know where all of them are:
DocumentRoot CAKEROOT

If any of these lines are not there or are preceded by a hash (#),
then you need to add them or remove the hash.

Additionally, if you find this line included within the Directory tags
for your CAKEROOT directory:
AllowOverride None

You will need to change this to:
AllowOverride All

Otherwise the server will not pick up your .htaccess file at all.


When making changes to files like this, don't forget to take measures
to make sure you can roll back your changes if needed. Remember the
following guidelines:

1) Do not touch the file until you have made a backup copy of the
file.

For example, I recommend you copy httpd.conf to something like
httpd.conf.20100220. (today's date stamp) so later on you can find the
latest working copy if you break something else and need to quickly
roll back.

2) Never delete or change any existing code in the file, always
comment it out. In apache configuration files, you do this by
preceding the line with a hash (#).

3) You should also add a comment on the previous line with a note
about what you changed and when (and if you really want to be careful,
the reason why). Include your name in case your project ever becomes
collaborative.

Examples:

#Modified by Bobby 2/20/2010 for the CakePHP tutorial
#DocumentRoot "/some/wrong/root/folder"
DocumentRoot "CAKEROOT"

#Added by Bobby 2/20/2010
LoadModule rewrite_module libexec/mod_rewrite.so

#Removed by Bobby 2/20/2010 to prevent overlap
#Alias /cake/ "CAKEROOT/app/webroot"

STEP 5) If you made changes to the Apache configuration files in STEP
4, RESTART APACHE. You'd be surprised how many people forget this.

If you do not know how to restart Apache, refer again to your AMP
documentation. It may vary from version to version.

Now your CakePHP homepage should load correctly and you are now ready
to continue with the tutorial.

If you still can't get it to work, the CakePHP Cookbook has some info
about how to use Cake's "Pretty URL's". Go here:
`http://book.cakephp.org/view/333/A-Note-on-mod_rewrite`_
If you have any questions/comments/corrections, please post a comment.

.. _http://www.ibm.com/developerworks/opensource/tutorials/os-php-cake1/fig02.jpg: http://www.ibm.com/developerworks/opensource/tutorials/os-php-cake1/fig02.jpg
.. _http://www.perlfect.com/articles/chmod.shtml: http://www.perlfect.com/articles/chmod.shtml
.. _http://book.cakephp.org/view/333/A-Note-on-mod_rewrite: http://book.cakephp.org/view/333/A-Note-on-mod_rewrite
.. _http://www.ibm.com/developerworks/opensource/tutorials/os-php-cake1/fig01.jpg: http://www.ibm.com/developerworks/opensource/tutorials/os-php-cake1/fig01.jpg

.. author:: BBBThunda
.. categories:: articles, tutorials
.. tags:: mod_rewrite,installation,CakePHP,no css,rewritemodule,no styling,Tutorials

