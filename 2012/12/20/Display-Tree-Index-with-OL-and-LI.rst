Display Tree Index with OL and LI
=================================

As i prefer using the original helpers and behaviors, i also use it
for my Trees. In this article i'd like to clearify how we can display
a tree using unsorted lists or even tables.
Expecting you created your database tables consulting `Trees`_, you
should be able to use the following code in the controller of your
category model:

::

    
    <?php
    class CategoriesController extends AppController {
    	public function index() {
    
    		$categories = $this->Category->find('threaded', array(
    			'order' => array('Category.lft'))
    		);
    		$this->set('categories', $categories);
    
    	}
    }
    ?>

This returns an array with all categories in a nested structure.

To parse, or let me say, to display this array without having trouble
to use UL- or OL-Tag's, or even tables, let me introduce recursive
functions to you:

::

    
    <?php
    function RecursiveCategories($array) {
    
    	if (count($array)) {
    		echo "\n<ul>\n";
    	    foreach ($array as $vals) {
    
    			echo "<li id=\"".$vals['Category']['id']."\">".$vals['Category']['name'];
    			if (count($vals['children'])) {
    				RecursiveCategories($vals['children']);
    			}
    			echo "</li>\n";
    	    }
    		echo "</ul>\n";
    	}
    } ?>

This function returns a list of ul' and li's for each category and
it's children. If a child has got children, the function just calls
itself for them and returns a further ul. Now just print the result in
your view:

::

    <?= RecursiveCategories($categories) ?>

Should be easy to add your arrows for moving categories up or down, or
even delete. You just have to put them into the li.

.. _Trees: http://book.cakephp.org/2.0/en/core-libraries/behaviors/tree.html

.. author:: Blackbit
.. categories:: articles, tutorials
.. tags:: tree behavior index view,Tutorials

