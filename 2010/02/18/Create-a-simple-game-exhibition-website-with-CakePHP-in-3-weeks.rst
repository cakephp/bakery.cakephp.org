Create a simple game exhibition website with CakePHP in 3 weeks
===============================================================

This is my first website work using CakePHP. I spent 3 days to learn
about cakephp at the beginning. And I got so much help from the
CookBook and The Bakery articles ( case studies as well).
When I got the idea to build `PopGames4u.com`_, CakePHP was the final
choice among several popular PHP Development Frameworks. Now, it's
online and works well.


Introduction
~~~~~~~~~~~~
`PopGames4u.com`_ is a game exhibition website. It lists the new and
interesting games everyday for both PC and Mac platform, and online
games as well. The game data will be updated frequently to show the
latest games.


The Tools and Libraries
~~~~~~~~~~~~~~~~~~~~~~~
The website was built with several popular tools, open source
libraries and cakephp.


+ VirtualBox VirtualBox is one of the most popular virtual machine
  software, and it's free and open sourced. I used VirtualBox to install
  ubuntu 9.0.4 on my desktop pc with runs win7. It provides the easy way
  to have different OSs on a single computer.
+ Ubuntu 9.0.4 desktop The famous open source linux system, which is
  similar to Debian. It's easy to install and manage, especially
  usefully for development.
+ XAMPP XAMPP is an easy to install Apache distribution containing
  MySQL, PHP and Perl. With XAMPP, I can built up my develop environment
  very quickly. You can get it from
  `http://www.apachefriends.org/en/xampp.html`_.
+ Notepad++ The very popular free editor runs on windows systems. It's
  my most favorite editor for php.
+ CakePHP framework

Learning CakePHP
~~~~~~~~~~~~~~~~
Thanks to the CakePHP team. Thanks for their great work of the
framework and wonderful documentations. These are the great places to
get the knowledge from: * CookBook. I study to use CakePHP step by
step following the CookBook, it leads me into the world of CakePHP. *
Articles and Case Studies These great articles and cases show the
conception of CakePHP programming. * Questions area I can get answers
here when I have problems.

The work
~~~~~~~~
After getting prepared, it's time to work. Mockups First of all,
create plain html pages to show the layouts. And creating images and
css files for the pages. Define models For these project, there is not
so many models. But I need to define the structure of very model and
relationships between these models. Coding controllers This is the
actual step of coding work, I need to modify models, views and
controllers to meet the real requirements. Views ware created based on
the mockups which mentioned in "Mockups" section. Define Routines The
is the the most difficult step to me. It took me 3 days to understand
the routine mechanism. Test with browsers I just tested the website in
browsers like: Firefox 3.x , IE7, IE8, Opera 9 and Google Chrome. I
have 3 guest systems installed in VirtualBox. So it's easy to test
with different environments and browsers.

Challenge
~~~~~~~~~
Because I'm using a VPS to host the webiste, the performance becomes
very important. Finally, I made a choice on Nginx + PHP + Mysql. The
key things is to convert .htaccess to nginx rewrite rules, after lots
of research, I got it to work and the rewrite rules for nginx looks
like .htaccess RewriteEngine On RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f RewriteRule ^(.*)$
index.php?url=$1 [QSA,L] convert to nginx location / { index index.php
if (!-d $request_filename){ set $rule_0 1$rule_0; } if (!-f
$request_filename){ set $rule_0 2$rule_0; } if ($rule_0 = "21"){
rewrite ^(.*)$ /index.php?url=$1 last; } }

The final result
~~~~~~~~~~~~~~~~
  After 3 weeks work, the website is online now, it's available at
  `http://www.popgames4u.com`_. I'd like to get feeds back from people:)


.. _PopGames4u.com: http://www.popgames4u.com/
.. _http://www.popgames4u.com: http://www.popgames4u.com/
.. _http://www.apachefriends.org/en/xampp.html: http://www.apachefriends.org/en/xampp.html

.. author:: ashong
.. categories:: articles, case_studies
.. tags:: Case Studies

