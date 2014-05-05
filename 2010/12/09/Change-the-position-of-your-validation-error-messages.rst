Change the position of your validation error messages
=====================================================

I don't like the validation error messages being displayed below the
input tag, so after not finding how to change its position on the web,
I found it on code. CakePHP has a neat templated way to render input
tags on FormHelper. And this introduced me to the [b]$format[/b]
option.
In my layout, I was having a hard time accepting the error message
below input tags. I want it between the label and the input.

As you may know, automagic form elements have some placeholders
(templates) on input options (see `http://book.cakephp.org/view/1393/options-before-options-between-options-separator-a`_).

I tried using $options['between'] but that wasn't nice code. Well, I
like nice code so I went after alternatives.

After spending some time trying variations of "cakephp validation
error position" on search engines, I started debugging code and
figured how CakePHP renders input tags.

Thank you,
Luciano Bargmann The way CakePHP renders the templates inside
$Form->input() is very clever:
It renders each template separatelly, and then use the
$options['format'] to determine the order of the final output.

From FormHelper (cake\libs\view\helpers\form.php):

::


    $format = $format ? $format : array('before', 'label', 'between', 'input', 'after', 'error');

Now with the right keywords to search, it was a breeze to find
documentation and get my final solution nicelly done.

I have an extension of the FormHelper class and below is my override
of the input() method where, among other time savers, sets format the
way I want it to be, with errors displayed after the label:

::


    	function input($fieldName, $options = array()) {

    		// include this field classes into error
    		$errClass= ' error-message';
    		if (!empty($options['class'])) {
    				$errClass = $options['class'] . $errClass;
    		}

    		// default options
    		$options['div'] = false;
    		$options['error'] = array('escape' => false, 'class' =>  $errClass);
    		$options['escape'] = false;
    		$options['format'] = array('before', 'label', 'error', 'between', 'input', 'after');

    		// render
    		$out = parent::input($fieldName, $options);

    		// add tip
    		return $this->addTip($out, $options);
    	}



.. _http://book.cakephp.org/view/1393/options-before-options-between-options-separator-a: http://book.cakephp.org/view/1393/options-before-options-between-options-separator-a

.. author:: lucianobargmann
.. categories:: articles, general_interest
.. tags:: order,positioning,validationerrors,after label,General Interest

