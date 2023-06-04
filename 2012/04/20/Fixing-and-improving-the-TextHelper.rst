Fixing and improving the TextHelper
===================================

The TextHelper is a really useful utility in CakePHP. But some
functions behave strangely and others are missing. That's why I
extended it as follows.
General
I created a new helper which the following file in
"/app/view/helpers/Text2Helper.php":

::


    <?php
    App::import('Helper', 'Text');

    class Text2Helper extends TextHelper {
    	public function function_name($parameters) {
    		// some code

    		// if you want to extend functionality, maybe you want
    		// to call the parent function
    		parent::function_name($parameters);
    	}
    }
    ?>

You can overwrite and create new functions in this file.
(See: `https://ask.cakephp.org/questions/view/how_can_i_extend_the_core_helpers`_)

Note that you can not use the helper with adding "Text2" to the
$helpers array inside a controller.
Unfortunately you cannot globally specify to always use the
Text2Helper instead of the TextHelper!
The only thing you can do is to add the following to your view:

::


    $this->Text = $this->Text2;

I would like to see a functionality to alias helpers! This would make
the job easier and prettier.
(`http://cakebaker.42dh.com/2008/10/18/dont-abuse-the-apphelper-to-extend-the-core-helpers/#comment-110649`_)

So let's start with my modifications:

1.) Increasing toList() functionality
I added the functionality to specify who each item should be displayed
(some sourrounding code and so on).
Therefore I added the parameter $phrase. _key_ will be replaced by the
current element's key and _item_ will be replaced by the current
element's value.

::


    <?php
    	public function toList($list, $and = 'and', $separator = ', ', $phrase = '_item_') {
    		foreach($list as $key => &$item)
    			$item = str_replace(array('_key_', '_item_'), array($key, $item), $phrase);
    		return parent::toList($list, $and, $separator);
    	}
    ?>


2.) Fixing truncate()
Currently the truncate() function only breaks on spaces. So when you
only have newline characters or tabs, the code won't break. That's why
even very long strings may result in "...".
Therefore I added 3 fixes.

2.1.) Fixing punctuation
Some people don't add spaces after dots, commas and so on. That's why
I added exactly one space after each of these characters:

::


    <?php
    	// 1. fix punctuation
    	if ($options['fix_punctuation']) {
    		$punctuation = ',.;:';
    		$text = preg_replace('/(['.$punctuation.'])[\s]*/', '\1 ', $text);
    	}
    ?>

2.2.) Fixing spaces
All possible space symbols (like newline, tab, ...) are replaced by
one space character:

::


    <?php
    	// 2. fix spaces
    	if ($options['fix_spaces']) {
    		//$spaces = " \t\r\n";		// use preg_replace() or str_replace() or strtr()
    		$text = preg_replace('/[[:space:]]+/', ' ', $text);		// [:space:] equal \s
    	}
    ?>

2.3.) Switch to cut instead of clear
When the returned string is still only '...' then set 'exact' => true
(cutting instead of searching for spaces):

::


    <?php
    	// get truncated string
    	$result = parent::truncate($text, $length, $options);

    	// 3. fix long strings: cut instead of clear
    	if ($options['fix_longStr']) {
    		if ($result === $options['ending']) {
    			$options['exact'] = true;
    			$result = parent::truncate($text, $length, $options);
    		}
    	}
    ?>

So here is the whole code of my truncate function:

::


    <?php
    	public function truncate($text, $length = 100, $options = array()) {
    		$default = array(
    			'fix_punctuation' => true,
    			'fix_spaces' => true,
    			'fix_longStr' => true, 'ending' => '...'
    		);
    		$options = array_merge($default, $options);

    		// 1. fix punctuation
    		if ($options['fix_punctuation']) {
    			$punctuation = ',.;:';
    			$text = preg_replace('/(['.$punctuation.'])[\s]*/', '\1 ', $text);
    		}

    		// 2. fix spaces
    		if ($options['fix_spaces']) {
    			//$spaces = " \t\r\n";		// use preg_replace() or str_replace() or strtr()
    			$text = preg_replace('/[[:space:]]+/', ' ', $text);		// [:space:] equal \s
    		}

    		// get truncated string
    		$result = parent::truncate($text, $length, $options);

    		// 3. fix long strings: cut instead of clear
    		if ($options['fix_longStr']) {
    			if ($result === $options['ending']) {
    				$options['exact'] = true;
    				$result = parent::truncate($text, $length, $options);
    			}
    		}

    		// return truncated string
    		return $result;
    	}
    ?>


3.) Add wordwrap()
This function automatically inserts a newline after a maximum number
or characters.
Please not that this mostly only useful when you have "text-align:
justify;" in your css style.
Otherwise it's often better to set "word-wrap: break-word;" in your
css to let the browser do the work. That's because of the different
widths for the different characters for most fonts.

So here is my code:

::


    <?php
    /**
     * Splits string in lines of given length.
     * Note: Perhaps it's better to set the following css option: "word-wrap: break-word;"
     *		 because it handles the different widths of the characters correctly
     *
     * @param string $text String to wrap.
     * @param integer $length Maximum length (number of characters) of returned lines.
     * @param bool $cut If the cut is set to TRUE, the string is always wrapped at or before the specified width. So only if you have a word that is larger than the given width, it is broken apart.
     * @param bool $htmlBreak Inserts '<br />' on every newline.
     * @return string Wrapped string.
     */
    	public function wordwrap($text, $length = 100, $cut = true, $htmlBreak = true) {
    		$text = wordwrap($text, $length, "\n", $cut);
    		return (($htmlBreak)?nl2br($text):$text);
    	}
    ?>


I hope you find this information useful.
When you are of the CakePHP team, consider implementing these fixes
into the original TextHelper ;)

.. _https://ask.cakephp.org/questions/view/how_can_i_extend_the_core_helpers: https://ask.cakephp.org/questions/view/how_can_i_extend_the_core_helpers
.. _http://cakebaker.42dh.com/2008/10/18/dont-abuse-the-apphelper-to-extend-the-core-helpers/#comment-110649: http://cakebaker.42dh.com/2008/10/18/dont-abuse-the-apphelper-to-extend-the-core-helpers/#comment-110649

.. author:: darkdragon
.. categories:: articles, helpers
.. tags:: CakePHP,list,extend,fix,texthelper,truncate,toList,improve,wordwrap,Helpers

