Use multiple databases in one app based on requested url
========================================================

I needed to build an application where there are multiple customers
(companies) using the application and each have their own database,
but also some common tables in another database. I selected CakePHP
for the framework and started to work with it. This is what I came up
with.


Requirements
~~~~~~~~~~~~
So let me first explain the database structure.

Tables in common database:

- Users
- Companies
- Common settings
- Etc. common tables to be used across the application...

Tables in company specific database:

- Users extra profile data
- Company employees
- Company services
- Etc. company specific data for the application...

So all users register to the application and the basic information is
stored in a table in the common database. One user login to the
application should work across the application for all companies. When
site visitor goes to some company's page, the data needs to be
retrieved from a database that is configured to that specific company.
All the application views are the same, but the displayed data changes
depending on which company's page is viewed. For security reasons, the
company specific data needs to be in their own database and I didn't
want to setup the database connections manually each time new company
would be added to the application.

I went to the CakePHP google groups with these requirements in my mind
and asked for an advice on what should I be looking at from the
documentation. The answer was: Routing in CakePHP and setting database
name for a datasource.


Routing setup
~~~~~~~~~~~~~
I decided to have these kind of urls in the application:

::

    http://www.domain.com/<company>/<controller>/<action>/<parameters>

That way the correct company specific database would be selected by
the value of that first part of the url. To make that happen I needed
to configure the following routes in /app/config/routes.php:

::

    <?php
    /**
     * Catch urls like http://www.domain.com/<company>/<controller>/<action>
     */
        Router::connect(
        	'/:company/:controller/:action',
            array (
            	'controller' => 'home', // default controller
            	'action' => 'index' // default action
            ),
            array (
            	'company' => '[a-zA-Z0-9]+' // regular expression match for the company parameter
            )
        );
    /**
     * Catch urls like http://www.domain.com/<company>/<controller>/<action>/<parameters>
     */
        Router::connect(
        	'/:company/:controller/:action/*',
            array (
            	'controller' => 'home', // default controller
            	'action' => 'index' // default action
            ),
            array (
            	'company' => '[a-zA-Z0-9]+' // regular expression match for the company parameter
            )
        );
    /**
     * Catch urls like http://www.domain.com/<company>/<controller>/
     */
        Router::connect(
        	'/:company/:controller',
            array (
            	'controller' => 'home', // default controller
            	'action' => 'index' // default action
            ),
            array (
            	'company' => '[a-zA-Z0-9]+' // regular expression match for the company parameter
            )
        );
    /**
     * Catch urls like http://www.domain.com/<company>/
     */
        Router::connect(
        	'/:company',
            array(
            	'controller' => 'home', // default controller
            	'action' => 'index' // default action
            ),
            array (
            	'company' => '[a-zA-Z0-9]+' // regular expression match for the company parameter
            )
        );
    ?>

Note: The routes need to be exactly in this order for it to work. If
you would change the two top ones other way around for example,
accessing to `http://www.domain.com/company/`_ would redirect to a
null controller. I never did quite understand why. Another thing I
didn't understand is that why I needed to define default controller
and action in the routes even thought they are setup in the route
itself, but trust me, it won't work otherwise.

Now with this setup, I could access the following url:

`http://www.domain.com/company/employees/list`_

and it would be routed to the list() method of EmployeesController.
Sweet!


Setting up some static controllers
``````````````````````````````````
I also needed some "static" urls for example to use with user
registration and login. So to achieve this I added following route
above the existing routes:

::

    <?php
    /**
     * Static url to users controller
     */
    	Router::connect(
    		'/users/:action/*',
    	    array (
    	    	'controller' => 'users',
    	    	'action' => 'index'
    	    )
        );
    ?>

Now I could access to the following url:

`http://www.domain.com/users/login`_

and that would be routed to the login() method of UsersController. Ok,
that's basically it for the routes, on to the next step!


Selecting correct database dynamically
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
First I needed to create a base class for all my controllers that
would do the saving of the parameter from requested url. So I created
the following AppController for my application to
/app/app_controller.php:

Controller Class:
`````````````````

::

    <?php class AppController extends Controller {
    
        function constructClasses() {
            // Save company name when we already know it but before models are created
            Configure::write(
            	'companyDB',
                !empty($this->params['company']) ? $this->params['company'] : false
            );
            parent::constructClasses();
        }
    
    }?>

Then I needed a base class for all of my models that would do the
database selection. So I created the following AppModel to
/app/app_model.php:

Model Class:
````````````

::

    <?php class AppModel extends Model {
        var $specific = false;
    
        function __construct($id = false, $table = null, $ds = null) {
            if ($this->specific) {
                // Get saved company/database name
                $dbName = Configure::read('companyDB');
                // Get common company-specific config (default settings in database.php)
                $config = ConnectionManager::getDataSource('defaultCompany')->config;
    
                // Set correct database name
                $config['database'] = $dbName;
                // Add new config to registry
                ConnectionManager::create($dbName, $config);
                // Point model to new config
                $this->useDbConfig = $dbName;
            }
            parent::__construct($id, $table, $ds);
        }
    
    }?>

Then when creating models for tables that are in the company specific
database, I can use the $specific variable to define that the model is
in the company specific db, like so:

Model Class:
````````````

::

    <?php class Employee extends AppModel {
            var $specific = true;
    
    }?>

Then all I needed is to have the two different datasource
configurations in /app/config/database.php:

::

    <?php
    class DATABASE_CONFIG {
    
    	var $default = array(
    		'driver' => 'mysql',
    		'persistent' => false,
    		'host' => 'localhost',
    		'login' => 'user',
    		'password' => 'pass',
    		'database' => 'common_database',
    		'encoding' => 'utf8'
    	);
    
    	var $defaultCompany = array(
    		'driver' => 'mysql',
    		'persistent' => false,
    		'host' => 'localhost',
    		'login' => 'user',
    		'password' => 'pass',
    		'encoding' => 'utf8'
    	);
    }
    ?>

That's that. Now when this url is accessed:

`http://www.domain.com/company/employees/list`_

it goes to the list() method of the EmployeeController and gets the
data for the Employee model from a database named "company". Yay!

Now if you would like to have own database user/pass for example for
each company specific database, you could take this further by saving
the company database info in the common database and use that :company
parameter to just retrieve the correct database access info from the
common database.

Thanks a lot to everyone who helped me at CakePHP google groups and in
#cakephp! You guys rock!

.. _http://www.domain.com/company/employees/list: http://www.domain.com/company/employees/list
.. _http://www.domain.com/users/login: http://www.domain.com/users/login
.. _http://www.domain.com/company/: http://www.domain.com/company/

.. author:: doze
.. categories:: articles, tutorials
.. tags:: routing,dynamic datasource,Tutorials

