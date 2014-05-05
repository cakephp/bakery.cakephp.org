Nested Tree Behaviour
=====================

I quite like the Tree Behaviour. But unfortunately the 'separator'
idea is a little too primitive for flexible HTML. The problem lies in
the fact that generatetreelist always returns a flat structure. Here's
a way to return a structure grouped by parent_id, which would allow
you to intelligently traverse the tree.
Subclass TreeBehaviour by creating a php file:
APP/models/behaviours/group_tree.php
The class name would be GroupTreeBehaviour.

Implement a function called generatetreegrouped:


Model Class:
````````````

::

    <?php 
    class GroupTreeBehavior extends TreeBehavior {
    	function generatetreegrouped(&$Model, $conditions = null, $keyPath = null, $valuePath = null, $groupPath = null, $recursive = null) {
    		$overrideRecursive = $recursive;
    		extract($this->settings[$Model->alias]);
    		if (!is_null($overrideRecursive)) {
    			$recursive = $overrideRecursive;
    		}
    
    		if ($keyPath == null && $valuePath == null && $groupPath == null && $Model->hasField($Model->displayField)) {
    			$fields = array($Model->primaryKey, $Model->displayField, 'parent_id', $left, $right);
    		} else {
    			$fields = null;
    		}
    
    		if ($keyPath == null) {
    			$keyPath = '{n}.' . $Model->alias . '.' . $Model->primaryKey;
    		}
    
    		if ($valuePath == null) {
    			$valuePath = '{n}.' . $Model->alias . '.' . $Model->displayField;
    		}
    		
    		if ($groupPath == null) {
    			$groupPath = '{n}.' . $Model->alias . '.parent_id';
    		}
    		
    		$order = $Model->alias . '.' . $left . ' asc';
    		$results = $Model->find('all', compact('conditions', 'fields', 'order', 'recursive'));
    		$stack = array();
    
    		foreach ($results as $i => $result) {
    			while ($stack && ($stack[count($stack) - 1] < $result[$Model->alias][$right])) {
    				array_pop($stack);
    			}
    			$stack[] = $result[$Model->alias][$right];
    		}
    		if (empty($results)) {
    			return array();
    		}
    		return Set::combine($results, $keyPath, $valuePath, $groupPath);
    	}
    }
    ?>

There's 2 differences between the new function and 'generatetreelist':
1 - A 'groupPath' parameter has been added, and by default it would be
'{n}.' . $Model->alias . '.parent_id';
2 - The 'spacer' parameter has been removed, since it would be
unnecessary.

It would result in a tree looking like this:

::

    
    Array
    (
        [0] => Array
            (
                [1] => Fruit
                [2] => Vegetable
            )
    
        [1] => Array
            (
                [4] => Apple
                [5] => Banana
            )
    
        [2] => Array
            (
                [6] => Cauliflower
                [7] => Pumpkin
            )
    )

All your tree models should now act as GroupTree instead of Tree.
i.e. place the following in your model: var $actsAs =
array('GroupTree');

In your controller, you can now get the treelist by calling:

::

    
    $categories = $this->Category->generatetreegrouped();

In your view, do the following to generate a nested list:

Helper Class:
`````````````

::

    <?php 
    class NestedTreeHelper extends AppHelper
    
    function getCategories($key, $categories, &$mainList) {
    	$result = '<ul>';
    	foreach($categories as $catKey => $name) {
    		$result .= $this->getCategory($catKey, $name, $mainList);
    	}
    	$result .= '</ul>';
    	return $result;
    }
    
    function getCategory($key, $value, &$mainList) {
    	$result = '<li>';
    	$result .= $value;
    	if(array_key_exists($key, $mainList)) {
    		$result .= $this->getCategories($key, $mainList[$key], $mainList);
    	}
    	$result .= '</li>';
    	return $result;
    }
    ?>
    ?>


View Template:
``````````````

::

    
    if(array_key_exists(0, $categories)) {
    	echo $nestedtree->getCategories(0, $categories[0], $categories);
    }

In this simple example, the 'key' parameters aren't used, but if you
do something more useful like creating nested checkboxes in a form, it
would be needed.

That's it!
Your HTML should look like:

View Template:
``````````````

::

    
    <ul>
    	<li>Fruit
    		<ul>
    			<li>Apple</li>
    			<li>Banana</li>
    		</ul>
    	</li>
    	<li>Vegetable
    		<ul>
    			<li>Cauliflower</li>
    			<li>Pumpkin</li>
    		</ul>
    	</li>
    </ul>

Footnote:
The same functionality could be achieved by using the model function
'findAllThreaded', but the resultset is much more cumbersome than the
Tree structure returned above, and I couldn't figure out a way to use
Set:combine on it in a way that would yield the same structure.



.. author:: superkruger
.. categories:: articles, tutorials
.. tags:: tree,category,nested,categories,treebehaviour,Tutorials

