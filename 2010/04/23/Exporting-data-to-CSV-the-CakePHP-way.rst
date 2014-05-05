Exporting data to CSV the CakePHP way
=====================================

After some fast and shallow searching, finding specific information on
how to properly export data to a CSV file proved difficult. After
digging into The Cookbook I came up with a way of presenting data to
the user in a CSV format. As CakePHP 1.2 provides a lot of support for
parsing extensions and request handling, as well as the ability to use
custom layouts and views for different situations, I came up with a
way I think CakePHP should be used in a case like this. No high
profile stuff, but a great showcase for a beginner to get the feel of
doing things the Cake way.
The past week I've been working on a new administration panel for our
webshops. The old version (still running on CakePHP 1.1) needs a major
overhaul, and I decided to start from scratch. That would also allow
me dig deeper into the 1.2 version of Cake, hoping a shift to 1.3
would be easy once I cleaned up shop rigorously.

An important part of the application is the ability to export orders
from our shops to an external party for further processing in the
bookkeeping process. In our current application this is done using a
custom component that outputs some headers to the browser and then
echoes every row.

Since I'm moving to a newer version of Cake (which I already used to
build the front end of our webshops), I felt the need to dig deeper in
Cake's ways of presenting data to the user. I couldn't find anything
specifically tailored to CSV (comma separated values) exports, so I
thought I'd share my findings here. Perhaps some beginning CakePHP
programmer could benefit, as I figure nothing here is really new to
the pro's.

The objective of this little excersise: make a CSV export available
through a default link, i.e. /orders/export.csv, and do it the proper
way. Please note that I assume you are using CakePHP 1.2.


Parsing extensions
~~~~~~~~~~~~~~~~~~
Cake's routing powers are pretty awesome. They allow you to present
almost any type of link to the user, whilst you - the programmer - can
maintain your controllers and actions in a clean and logical order.
For this article, one method of the Router class is specifically
important: parseExtensions(). This method lets Cake know how it should
handle certain file types requested by the user. As we are focussing
on CSV exports right now, the following line should be added to our
routes.php file:

::

    
    <?php
        // File: /app/config/routes.php
       
        // Make sure CakePHP parses CSV file requests correctly
        Router::parseExtensions('csv');

That single line tells Cake to watch out for requests ending in
'.csv', and to take appropriate measures. In our case, it makes sure
that a file being requested is handled by the proper action in your
controller. But before that happens, data must be read from our
database table to be rendered by the view. Obviously, we use our
controller for that:

::

    
    <?php
        // File: /app/controllers/orders_controller.php
       
        class OrdersController extends AppController
        {
            var $name = 'Orders';
            var $uses = array('Order');
           
            // Include the RequestHandler, it makes sure the proper layout and views files are used
            var $components = array('RequestHandler');
           
            function export()
            {
                // Stop Cake from displaying action's execution time
                Configure::write('debug',0);
                // Find fields needed without recursing through associated models
                $data = $this->Order->find(
                    'all',
                    array(
                        'fields' => array('id','created','name','paid','total'),
                        'order' => "Order.id ASC",
                        'contain' => false
                );
                // Define column headers for CSV file, in same array format as the data itself
                $headers = array(
                    'Order'=>array(
                        'id' => 'ID',
                        'created' => 'Date',
                        'name' => 'Name',
                        'paid' => 'Paid?',
                        'total' => 'Total'
                    )
                );
                // Add headers to start of data array
                array_unshift($data,$headers);
                // Make the data available to the view (and the resulting CSV file)
                $this->set(compact('data'));
            }

First off, we start by including the RequestHandler component. It'll
make sure the proper layout and view files are rendered, depending on
the type of request being made. We then disable debugging (not
absolutely needed, but it takes away any unwanted text in your CSV
file). Last, we fetch some data from our database table and feed it to
the view. The part where I set the headers is completely optional; you
can omit that if no headers are needed.


Layouts & views
~~~~~~~~~~~~~~~
Next, we need to present the data to the user the way he or she
requested it. We told Cake to parse file extensions and we included
the RequestHandler. So, when a CSV file is requested (through
/orders/export.csv for example) Cake automagically looks for the CSV
layout file in /app/views/layouts/csv, called default.ctp:

::

    
    <?php
        // File: /app/views/layouts/csv/default.ctp
    
        // Echo the view's output as we would on any normal web page   
        echo $content_for_layout;
    ?>

As a CSV file is nothing more than plain text, we don't have much to
do here. As a variation to my example, you could consider echoing the
headers to the data columns here, but since we already have those
together with our data in our $data variable, there is no need to put
any other code in here as well. So, the only thing we do is tell Cake
to echo any HTML it renders from the view template. The variable
$content_for_layout being echoed will therefore contain the output of
the action's view. In our case that would be
/app/views/orders/csv/export.ctp. Mind the extra directory /csv added
to that path; that is the place where the RequestHandler will direct
CakePHP to once it goes looking for the view file belonging to the
action being executed.

::

    
    <?php
        // File: /app/views/orders/csv/export.ctp
       
        // Loop through the data array
        foreach ($data as $row)
        {
            // Loop through every value in a row
            foreach ($row['Order'] as &$value)
            {
                // Apply opening and closing text delimiters to every value
                $value = "\"".$value."\"";
            }
            // Echo all values in a row comma separated
            echo implode(",",$row['Order'])."\n";
        }
    ?>

In our view template it gets down to echoing the actual headers and
data. Nothing CakePHP about that; we just loop through each row, make
sure all values are delimited properly and echo every row array
through the implode() method to end up with a single line of text.
Each row ends with a newline, just the way your spreadsheet program
likes it when opening a CSV file.

Note: when echoing the data in the CSV file's view, be careful to
properly escape any characters in your data that might interfere with
the file build up you're trying to achieve. Think of escaping
characters that are being used as text delimiters, end of line
characters and so on. Depending on the platform that's used to open
the resulting CSV file, different solutions may prove to work best.
Check out `http://www.csvreader.com/csv_format.php`_ for a nice
overview on the CSV format.

Note 2: like ADmad points out in his comment, echoing the data in the
CSV view file could be improved by using a helper. It seems to take
care of some of the issues described under my first note. Check out
`http://bakery.cakephp.org/articles/view/csv-helper-php5`_. As far as
I can see, that helper would indeed be a great help.

Tip: It's easy to give your user more control over what's being
exported. In my application I start off with form that allows the user
to pick a start and end date, for example. I make that form post to
the file being exported, even adding today's date to the filename.
Using the Form helper that's pretty easy, as Cake takes care of most
of the work:

::

    
    <?php
        echo $form->create('Order',array('url'=>'/orders/export/orders_'.date("Ymd").'.csv'));



That's it
~~~~~~~~~
Sure hope it helps someone, even though there are probably ways of
further improving this. Most information provided above can be found
in The Cookbook, although scattered and sometimes not specifically
targeted at the problem at hand. I welcome any questions and comments
you might have, as it will probably make my own code better.

.. _http://www.csvreader.com/csv_format.php: http://www.csvreader.com/csv_format.php
.. _http://bakery.cakephp.org/articles/view/csv-helper-php5: http://bakery.cakephp.org/articles/view/csv-helper-php5

.. author:: jeroendenhaan
.. categories:: articles, tutorials
.. tags:: export,csv,parseextensions,requesthandler,Tutorials

