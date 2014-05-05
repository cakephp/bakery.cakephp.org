how to create an observeField equivalent in the new JsHelper
============================================================

A lot of people are having trouble upgrading to the new JsHelper. Here
is a simple syntax of how to use an observeField equivalent in the new
JsHelper.
For those of you who are migrating from cakephp 1.2 to 1.3:

let's say we have two select boxes (books and authors).
I want to automatically select the right author when a book is
selected:

Instead of using:

::

    
    echo $ajax->observeField('BookID', array(
    'url' => 'auto_select_author',
    'update' => 'AuthorID'
    'with' => "Form.serialize( $('MyForm') )"
    ) );

Use:

::

    
    $this->Js->get('#BookID')->event('change', $this->Js->request(
    array('controller' => 'critiques', 'action' => 'auto_select_author'),
    array(
    'update' => '#AuthorID',
    'async' => true,
    'dataExpression' => true,
    'method' => 'post',
    'data' => $js->serializeForm(array('isForm' => false, 'inline' => true))
    ) ) );

the serialize() function sends the form data to the php action so we
can see which option was selected and decide what to update in the
ajax call.

the form data will be found in $this->data in the action (just like
after a form has been submited).

Don't forget to add $this->Js->writeBuffer(); in your layout just
before the body closing tag. Otherwise all the ajax code will not be
added to your page.

creating an observeForm equivalent in JsHeper
Let's say you have a few radio inputs and you want to caculate a total
grade depending on their selected options. you can create an ajax code
that will observe them and on each change/click will re-caclulate the
grade.

in order to create an $ajax->observeForm equivalent, one can use the
$this->Js->each method:

::

    
    $this->Js->get('input.grade')->each( 
    $this->Js->event('click', $this->Js->request(...)
    );

I gave all the input fileds i wanted to monitor a class='grade' and
then set an event method to them. when each of them is clicked the
action will be called in my controller and the total grade div will be
updated with the new grade.


.. author:: Calderoy
.. categories:: articles, tutorials
.. tags:: o,Tutorials

