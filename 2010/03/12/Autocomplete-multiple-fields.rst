Autocomplete multiple fields
============================

This short tutorial will show how to autocomplete data to multiple
fields.
In this tutorial I will assume you have a working autocomplete
function up and running already, as seen in
`http://book.cakephp.org/view/632/autoComplete`_.

In my case, I have a model called "Customer" which stores information
about customers, such as customer address data. A second model is
"Invoice". When I add a new invoice I want to bind it to a customer
and also fetch certain customer information to be added to the
invoice.

You will see that I am fetching data from the customer model with the
intent to store it in the invoice model as well. This may seem
redundant, but in my case, once an invoice is created and sent out to
a customer, the invoice stored in the database is not supposed to
change even if the customer data is updated afterwards.


Form view
~~~~~~~~~
Here are some snippets of how my view with all the forms for adding a
new invoice looks. When including the javascript to create a new
autocompleter take note that I have added the option
afterUpdateElement with the value setCustomerValues which will call a
custom javascript function called setCustomerValues after an item from
the autocomplete list has been selected.

View Template:
``````````````

::

    
    ...
    <?php
    echo $form->input('customer_id', array('type' => 'hidden'));
    echo $form->input('addr_name');
    echo $form->input('addr_street');
    echo $form->input('addr_city');
    ?>
    <div id="customer_choices" class="autocomplete"></div>
    ...
    
    
    ...
    <div id="javascripts" style="display:none;">
    <script type="text/javascript">new Ajax.Autocompleter("InvoiceAddrName", "customer_choices", "/customers/autocomplete/", { frequency: '0.6', afterUpdateElement : setCustomerValues }, {});
    </script>
    </div>
    ...



Autocomplete view
~~~~~~~~~~~~~~~~~
With a normal autocomplete view, you have a list of items with the
data inside the li html element. To bake in hidden additional data
that is ment to be sent to other input fields, I include the data as
attributes to the li element.

View Template:
``````````````

::

    
    <ul>
    <?php foreach($customers as $customer): ?>
    	<li addr_street="<?php echo @$customer['Customer']['addr_street'];?>" addr_city="<?php echo @$customer['Customer']['addr_city'];?>" customer_id="<?php echo @$customer['Customer']['id'];?>"><?php echo $customer['Customer']['name'];?></li>
    <?php endforeach; ?>
    </ul>



The javascript
~~~~~~~~~~~~~~
As you hopefully remember, we added the option to call a custom
function called setCustomerValues after an item is selected in the
autocomplete list. This function has to be created and you need to put
it in a javascript file and make sure to include the javascript file
in your view.

::

    
    //Use -1 as "attr" parameter value to setValue to clear the element.
    function setValue(element,attr) {
    	var e = document.getElementById(element);
    	if (e==null){return;}
    	if (attr == -1) {e.value = '';} 
    	else if (attr != null && attr != ' ' && attr != '') {e.value = attr;}
    }
    
    function setCustomerValues(text, li)
    {
    	setValue('InvoiceCustomerId',li.getAttribute('customer_id'));
    	setValue('InvoiceAddrStreet',li.getAttribute('addr_street'));
    	setValue('InvoiceAddrCity',li.getAttribute('addr_city'));
    }



.. _http://book.cakephp.org/view/632/autoComplete: http://book.cakephp.org/view/632/autoComplete

.. author:: MartinLissmats
.. categories:: articles, tutorials
.. tags:: javascript,AJAX,autocomplete,Tutorials

