from Cake to Bake
=================

I will explain how i got CakePHP working from start (Download) to
finish (Bake). This tutorial is for PHP/MYSQL on Mint 12/Ubuntu users.
I assume that you have installed PHP/MYSQL and apache configured
already, you can find many tutorials for doing that, hence i will
focus on CakePHP. I also assume that you have created atleast one
table in your database by following naming conventions in CakePHP
which is pretty easy task :)

#. Download the latest version of Cake from `https://cakephp.org/`_
#. Go to your Download folder (or where ever you downloaded your
   folder), Extract the folder in the same location.
#. Move the folder to your application root. (In my case /var/www/ )if
   you face permission denied while copy/paste, use "gksu nautilus" to
   open the target location.
#. Rename the folder, MyCake
#. Use this to change permissions, "sudo chmod -R 777
   /var/www/MyCake/"
#. Delete the folder named "app" from /var/www/MyCake/ , we will be
   using folder that will be created by bake
#. So far you have downloaded and set up Cake, now lets install cake
   bake utility. Run this in your terminal to install cake, " sudo apt-
   get install cakephp-scripts " this will help in baking later. This
   will also create new folder in "/usr/share/php" named cake

Important: Use sudo gedit /etc/apache2/sites-available/default to edit
the contents to follow:

<Directory /var/www/> Options Indexes FollowSymLinks MultiViews
AllowOverride All Order allow,deny allow from all </Directory>

#. Run this in your terminal. This command will create a folder named
   app in your MyCake folder cake bake -app /var/www/MyCake/app/ This
   will ask you below:

What is the full path for this app including the app directory name?
Example:/var/www/MyCake/app/myapp [/var/www/My-CakePHP/aapp/myapp] >

You must give it path to where you want app folder created, in this
case type below:

/var/www/MyCake/app/

This will create new folder named app and new files under it.

#. Again run the same command, this time we want to use its CRUD
   functionality called Bake.

after running this command below: cake bake -app /var/www/MyCake/app/

it might tell you that your database.php file cannot be found and that
if you want to create the same, tell it yes and provide all the
details, do not modify first option ($default), this is a variable
that should be left untouched.

or it will ask you what you want to do?

Welcome to CakePHP v1.3.7 Console



App : app Path: /var/www/My-CakePHP/app
B0x1A0
Interactive Bake Shell
B0x1A0
[D]atabase Configuration [M]odel [V]iew [C]ontroller [P]roject
[F]ixture [T]est case [Q]uit What would you like to Bake?
(D/M/V/C/P/F/T/Q) >

tell it that you want to create Model by typing M

Bake Model Path: /var/www/My-CakePHP/app/models/
B0x1A0
Use Database Config: (default/database) [default] >

enter "database"

and so on....

Rest is very intutive and help you create controllers and view.

You can then access your site using `http://localhost/MyCake/`_ or if
you created controller by the name, posts, use
`http://localhost/MyCake/posts.`_


.. _http://localhost/MyCake/posts.: http://localhost/MyCake/posts.
.. _https://cakephp.org/: https://cakephp.org/
.. _http://localhost/MyCake/: http://localhost/MyCake/

.. author:: mainiabhay
.. categories:: articles
.. tags:: Articles

