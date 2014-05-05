AggregateCache Behavior
=======================

AggregateCache behavior caches the result of aggregate calculations
(min, max, avg, sum) in tables that are joined by a hasMany /
belongsTo association. I usually think of aggregates as being easy to
calculate when needed, though in situations where the aggregate value
is needed more often than the underlying data changes it makes sense
to cache the calculated value. Caching the result of the aggregate
calculation also makes it easier to write queries that filter or sort
on the aggregate value. This behavior makes caching the result of
aggregate calculations easy. AggregateCache is based on the
CounterCache behavior ([url]http://bakery.cakephp.org/articles/view
/countercache-or-counter_cache-behavior[/url]).

To introduce the AggregateCache behavior let's use a posts and
comments example. The date of the most recent comment, and the maximum
and average ratings from each comment will be cached to the Post
model, which will make it easy to use this information for display or
as filters in other queries.

Posts table:

::

    CREATE TABLE `posts` (
      `id` int(10) unsigned NOT NULL auto_increment,
      `created` datetime default NULL,
      `modified` datetime default NULL,
      `name` varchar(100) NOT NULL,
      `description` mediumtext,
      `average_rating` float default NULL,
      `best_rating` float default NULL,
      `latest_comment_date` datetime default NULL,
      PRIMARY KEY  (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

Comments table:

::

    CREATE TABLE `comments` (
      `id` int(10) unsigned NOT NULL auto_increment,
      `created` datetime default NULL,
      `modified` datetime default NULL,
      `name` varchar(100) NOT NULL,
      `description` mediumtext,
      `post_id` int(10) unsigned NOT NULL,
      `rating` int(11) default NULL,
      `visible` tinyint(1) unsigned NOT NULL default â€˜1â€™,
      PRIMARY KEY  (`id`),
      KEY `comments_ibfk_1` (`post_id`),
      CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

Post model:

Model Class:
````````````

::

    <?php 
    class Post extends AppModel {
    	var $name = 'Post';
    	var $validate = array('name'=>'notempty');
    	var $hasMany = array('Comment');
    }
    ?>

Comment model:

Model Class:
````````````

::

    <?php 
    class Comment extends AppModel {
    	var $name = 'Comment';
    	
    	var $actsAs = array(
    		'AggregateCache'=>array(
    			'created'=>array('model'=>'Post', 'max'=>'latest_comment_date'),
    			array('field'=>'rating', 'model'=>'Post', 'avg'=>'average_rating', 'max'=>'best_rating', 
    				'conditions'=>array('visible'=>'1'), 'recursive'=>-1),
    	));
    	
    	var $validate = array(
    		'name'=>'notempty', 
    		'post_id'=>'numeric', 
    		'rating'=>'numeric', 
    		'visible'=>'boolean'
    	);
    
    	var $belongsTo = array('Post');
    }
    ?>


The AggregateCache behavior requires a config array that specifies, at
minimum, the field and aggregate function to use in the aggregate
query, and the model and field to store the cached value. The example
above shows the minimal syntax in the first instance (which specifies
the aggregate field as a key to the config array), and the normal
syntax in the second instance. The second instance also uses the
optional parameters for conditions and recursive, and specifies more
than one aggregate to be calculated and stored.

To show this more clearly, the config array can specify:

::

    var $actsAs = array('AggregateCache'=>array(array(
    	'field'=>'name of the field to aggregate', 
    	'model'=>'belongsTo model alias to store the cached values', 
    	'min'=>'field name to store the minimum value', 
    	'max'=>'field name to store the maximum value',
    	'sum'=>'field name to store the sum value',
    	'avg'=>'field name to store the average value'
    	'conditions'=>array(), // conditions to use in the aggregate query
    	'recursive'=>-1 // recursive setting to use in the aggregate query
    )));


Field and model must be specified, and at least one of min, max, sum,
or avg must be specified.

The model name must be one of the keys in the belongsTo array (so if
an alias is used in belongsTo, the same alias must be used in the
AggregateCache config).

Specifying conditions for the aggregate query can be useful, for
example, to calculate an aggregate using only the comments that have
been approved for display on the site. If the conditions parameter is
not provided, the conditions defined in the belongsTo association are
used. (Conditions can be an empty array to specify that no conditions
be used in the aggregate query.) Note: If you need to specify
different conditions for different aggregates of the same field, you
will need to specify 'field' explicitly and not as a key to the config
array.

Specifying recursive is optional, though if your conditions donâ€™t
involve a related table recursive should be set to -1 to avoid having
unnecessary joins in the aggregate query.

Note: If you restrict saves to specific fields by specifying a
fieldList you will need to include the foreignKey fields used to
associate the model that will hold cached values, otherwise the
behavior will not have the id's available to query.

aggregate_cache.php

::

    <?php
    /**
     * AggregateCache Behavior
     *
     * Usage:
     * var $actsAs = array('AggregateCache'=>array(array(
     *   'field'=>'name of the field to aggregate',
     *   'model'=>'belongsTo model alias to store the cached values',
     *   'min'=>'field name to store the minimum value',
     *   'max'=>'field name to store the maximum value',
     *   'sum'=>'field name to store the sum value',
     *   'avg'=>'field name to store the average value'
     *   'conditions'=>array(), // conditions to use in the aggregate query
     *   'recursive'=>-1 // recursive setting to use in the aggregate query
     *  )));
     *
     * Example:
     * class Comments extends AppModel {
     *   var $name = 'Comment';
     *   var $actsAs = array(
     *     'AggregateCache'=>array(
     *         'rating'=>array('model'=>'Post', 'avg'=>'average_rating', 'max'=>'best_rating'),
     *         array('field'=>'created', 'model'=>'Post', 'max'=>'latest_comment_date', 'conditions'=>array('visible'=>'1'), 'recursive'=>-1)
     *     ));
     *   var $belongsTo = array('Post');
     * }
     *
     * Each element of the configuration array should be an array that specifies:
     * A field on which the aggregate values should be calculated. The field name may instead be given as a key in the configuration array.
     * A model that will store the cached aggregates. The model name must match the alias used for the model in the belongsTo array.
     * At least one aggregate function to calculate and the field in the related model that will store the calculated value.
     *    Aggregates available are: min, max, avg, sum.
     * A conditions array may be provided to filter the query used to calculate aggregates.
     *    If not specified, the conditions of the belongsTo association will be used.
     * A recursive value may be specified for the aggregate query. If not specified Cake's default will be used.
     *    If it's not necessary to use conditions involving a related table, setting recursive to -1 will make the aggregate query more efficient.
     *
     * @author Vincent Lizzi
     * @version 2010-07-17
     */
    class AggregateCacheBehavior extends ModelBehavior {
    
    	var $foreignTableIDs = array();
    	var $config = array();
    	var $functions = array('min', 'max', 'avg', 'sum');
    
    	function setup(&$model, $config = array()) {
    		foreach ($config as $k => $aggregate) {
    			if (empty($aggregate['field'])) {
    				$aggregate['field'] = $k;
    			}
    			if (!empty($aggregate['field']) && !empty($aggregate['model'])) {
    				$this->config[] = $aggregate;
    			}
    		}
    	}
    
    	function __updateCache(&$model, $aggregate, $foreignKey, $foreignId) {
    		$assocModel = & $model->{$aggregate['model']};
    		$calculations = array();
    		foreach ($aggregate as $function => $cacheField) {
    			if (!in_array($function, $this->functions)) {
    				continue;
    			}
    			$calculations[] = $function . '(' . $model->name . '.' . $aggregate['field'] . ') ' . $function . '_value';
    		}
    		if (count($calculations) > 0) {
    			$conditions = array($model->name . '.' . $foreignKey => $foreignId);
    			if (array_key_exists('conditions', $aggregate)) {
    				$conditions = am($conditions, $aggregate['conditions']);
    			} else {
    				$conditions = am($conditions, $model->belongsTo[$aggregate['model']]['conditions']);
    			}
    			$recursive = (array_key_exists('recursive', $aggregate)) ? $aggregate['recursive'] : null;
    			$results = $model->find('first', array(
    						'fields' => $calculations,
    						'conditions' => $conditions,
    						'recursive' => $recursive,
    						'group' => $model->name . '.' . $foreignKey,
    					));
    			$newValues = array();
    			foreach ($aggregate as $function => $cacheField) {
    				if (!in_array($function, $this->functions)) {
    					continue;
    				}
    				$newValues[$cacheField] = $results[0][$function . '_value'];
    			}
    			$assocModel->id = $foreignId;
    			$assocModel->save($newValues, false, array_keys($newValues));
    		}
    	}
    
    	function afterSave(&$model, $created) {
    		foreach ($this->config as $aggregate) {
    			if (!array_key_exists($aggregate['model'], $model->belongsTo)) {
    				continue;
    			}
    			$foreignKey = $model->belongsTo[$aggregate['model']]['foreignKey'];
    			$foreignId = $model->data[$model->name][$foreignKey];
    			$this->__updateCache($model, $aggregate, $foreignKey, $foreignId);
    		}
    	}
    
    	function beforeDelete(&$model) {
    		foreach ($model->belongsTo as $assocKey => $assocData) {
    			$this->foreignTableIDs[$assocData['className']] = $model->field($assocData['foreignKey']);
    		}
    		return true;
    	}
    
    	function afterDelete(&$model) {
    		foreach ($this->config as $aggregate) {
    			if (!array_key_exists($aggregate['model'], $model->belongsTo)) {
    				continue;
    			}
    			$foreignKey = $model->belongsTo[$aggregate['model']]['foreignKey'];
    			$foreignId = $this->foreignTableIDs[$aggregate['model']];
    			$this->__updateCache($model, $aggregate, $foreignKey, $foreignId);
    		}
    	}
    
    }
    ?>



.. author:: vincentm8
.. categories:: articles, behaviors
.. tags:: countercache,behavior,cache,aggregate,Behaviors

