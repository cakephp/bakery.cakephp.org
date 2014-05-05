Datepicker Helper for Dynarch Calendar (JSCal2)
===============================================

Datepicker, now with more [b]cowbell[/b]!
Wanted a nice datepicker for my application. I decided to google
"datepicker cakephp" to see what alternatives are out there. Found the
following articles on the bakery:

`http://bakery.cakephp.org/articles/view/transparent-datepicker-with-jquery`_
`http://bakery.cakephp.org/articles/view/using-the-unobtrusive-date-picker-widget-in-cakephp`_
I also found this article by Nik Chankov from 2007:
`http://nik.chankov.net/2007/09/13/advanced-datepicker-helper-for-cakephp/`_.
Nik coded a helper for the first version of Dynarch
Calendar. I checked the calendar at
`http://www.dynarch.com/projects/calendar/`_ and I was impressed by it
so I decided to give it a try.

Documentation for the calendar can be found at
`http://www.dynarch.com/projects/calendar/doc/`_.

The code is tested and working with CakePHP v1.3 and JSCal2 v.1.8.


Step 1
~~~~~~
Download a copy of the calendar `http://www.dynarch.com/projects/calendar/download/1.8/JSCal2-1.8.zip`_
and unzip it in your hard drive. You should have a "JSCal2-1.8" directory.


Step 2
~~~~~~
Create a new directory in your " {cakeproject}/app/webroot/js "
directory and call it " jscalendar ". Copy the contents of the "
JSCal2-1.8\src\js " directory (i.e. " jscal2.js " and the " lang "
directory) to the newly created "
{cakeproject}/app/webroot/js/jscalendar ".


Step 3
~~~~~~
Copy all the contents of " JSCal2-1.8\src\css " to your "
{cakeproject}/app/webroot/css " directory.


Step 4
~~~~~~
Download the Calendar Icon from
`http://www.elibrary.dep.state.pa.us/images/small/calendar.png`_ and
put it in " {cakeproject}/app/webroot/img ".


Step 5
~~~~~~
Create a new file in " {cakeproject}/app/view/helpers/ " and call it "
date_picker.php ". This is going to be our Helper. Open "
date_picker.php " with your favorite editor and copy-paste the
following code:

::


    <?php
    /**
    * DatePicker Helper
    * Used with Dynarch Calendar JSCal2 and CakePHP 1.3
    * Based on the helper by Nik Chankov http://nik.chankov.net
    *
    * @author  Christakis Mina
    * @email   minatsu@gmail.com
    * @version 1.0.0
    */

    uses('view/helpers/Form');
    class DatePickerHelper extends FormHelper {

        var $format = '%Y-%m-%d';

        /**
         *Setup the format if exist in Configure class
         */
        function _setup(){
            $format = Configure::read('DatePicker.format');
            if($format != null){
                $this->format = $format;
            }
        }

        /**
        * The Main Function - picker
        *
        * @param string $field Name of the database field. Possible usage with Model.
        * @param array $options Optional Array. Options are the same as in the usual text input field.
        */
        function picker($fieldName, $options = array()) {
            $this->_setup();
            $this->setEntity($fieldName);
            $htmlAttributes = $this->domId($options);
            $divOptions['class'] = 'date';
            $options['type'] = 'text';
            $options['maxlength'] = '255';
            $options['div']['class'] = 'formfield';
            $options['after'] = $this->Html->image('calendar.png', array('id' => $fieldName.'-trigger')).'<script> Calendar.setup({trigger: "'.$fieldName.'-trigger", inputField: "'.$htmlAttributes['id'].'", onSelect   : function() { this.hide() } }); </script>';
            return $this->input($fieldName, $options);
        }

    }
    ?>



Step 6
~~~~~~
Add the following code in your layout file (" default.ctp ") between
head tags:

::


    <?php echo $this->Html->script(array('jscalendar/jscal2', 'jscalendar/lang/en')); ?>
    <?php echo $html->css('jscal2', 'stylesheet')."\n"; ?>
    <?php echo $html->css('border-radius', 'stylesheet')."\n"; ?>
    <?php echo $html->css('steel/steel', 'stylesheet')."\n"; ?>
    <?php //echo $html->css('gold/gold', 'stylesheet')."\n"; ?>
    <?php //echo $html->css('matrix/matrix', 'stylesheet')."\n"; ?>
    <?php //echo $html->css('win2k/win2k', 'stylesheet')."\n"; ?>



Step 7
~~~~~~
Add the "DatePicker" helper in the $helpers variable of your app
controller. Alternatively you can put in the " app_controller.php " to
be used throughout the application:

::


    <?php
    class AppController extends Controller {
        var $components = array('Auth', 'Session', 'Email', 'RequestHandler');
        var $helpers = array('Html', 'Session', 'Form', 'Js', 'DatePicker');
    ?>



Step 8
~~~~~~
You can use the Helper in your view files like that:

::


    <?php
    echo $datePicker->picker('mydate');
    ?>



Step 9
~~~~~~
Enjoy!

.. _http://www.dynarch.com/projects/calendar/: http://www.dynarch.com/projects/calendar/
.. _http://www.dynarch.com/projects/calendar/doc/: http://www.dynarch.com/projects/calendar/doc/
.. _http://bakery.cakephp.org/articles/view/using-the-unobtrusive-date-picker-widget-in-cakephp: http://bakery.cakephp.org/articles/view/using-the-unobtrusive-date-picker-widget-in-cakephp
.. _http://bakery.cakephp.org/articles/view/transparent-datepicker-with-jquery: http://bakery.cakephp.org/articles/view/transparent-datepicker-with-jquery
.. _http://www.dynarch.com/projects/calendar/download/1.8/JSCal2-1.8.zip: http://www.dynarch.com/projects/calendar/download/1.8/JSCal2-1.8.zip
.. _http://nik.chankov.net/2007/09/13/advanced-datepicker-helper-for-cakephp/: http://nik.chankov.net/2007/09/13/advanced-datepicker-helper-for-cakephp/
.. _http://www.elibrary.dep.state.pa.us/images/small/calendar.png: http://www.elibrary.dep.state.pa.us/images/small/calendar.png

.. author:: chrmina
.. categories:: articles, helpers
.. tags:: date picker,dynarch calendar,jscal,Helpers

