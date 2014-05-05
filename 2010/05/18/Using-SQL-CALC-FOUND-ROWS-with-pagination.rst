Using SQL_CALC_FOUND_ROWS with pagination
=========================================

A quick and dirty way to get SQL_CALC_FOUND_ROWS / found_rows()
working with cakes pagination feature
I came across a situation while trying to paginate a query with
multiple joins and a group by condition that the way cake was
calculating the total count(*) for the result set was returning an
incorrect value.

Did a couple changes to Controller::paginate to detect if
SQL_CALC_FOUND_ROWS is in your fields list and use it to calculate the
total rows.

First and most important change you need to make is to use a string as
your fields list in the pagination config

::

    
    $this->paginate = array(
    	'Product' => array(
    		'limit' => 16,
    		'fields' => 'SQL_CALC_FOUND_ROWS `Product`.`id`, `Product`.`name`, `Model2`.`etc`',
    		...

next drop this updated pagination function in your controller or in
app_controller.php to use is application wide.


::

    
    function paginate($object = null, $scope = array(), $whitelist = array()) {
    	if (is_array($object)) {
    		$whitelist = $scope;
    		$scope = $object;
    		$object = null;
    	}
    	$assoc = null;
    
    	if (is_string($object)) {
    		$assoc = null;
    		if (strpos($object, '.')  !== false) {
    			list($object, $assoc) = pluginSplit($object);
    		}
    
    		if ($assoc && isset($this->{$object}->{$assoc})) {
    			$object =& $this->{$object}->{$assoc};
    		} elseif (
    			$assoc && isset($this->{$this->modelClass}) &&
    			isset($this->{$this->modelClass}->{$assoc}
    		)) {
    			$object =& $this->{$this->modelClass}->{$assoc};
    		} elseif (isset($this->{$object})) {
    			$object =& $this->{$object};
    		} elseif (
    			isset($this->{$this->modelClass}) && isset($this->{$this->modelClass}->{$object}
    		)) {
    			$object =& $this->{$this->modelClass}->{$object};
    		}
    	} elseif (empty($object) || $object === null) {
    		if (isset($this->{$this->modelClass})) {
    			$object =& $this->{$this->modelClass};
    		} else {
    			$className = null;
    			$name = $this->uses[0];
    			if (strpos($this->uses[0], '.') !== false) {
    				list($name, $className) = explode('.', $this->uses[0]);
    			}
    			if ($className) {
    				$object =& $this->{$className};
    			} else {
    				$object =& $this->{$name};
    			}
    		}
    	}
    
    	if (!is_object($object)) {
    		trigger_error(sprintf(
    			__('Controller::paginate() - can\'t find model %1$s in controller %2$sController',
    				true
    			), $object, $this->name
    		), E_USER_WARNING);
    		return array();
    	}
    	$options = array_merge($this->params, $this->params['url'], $this->passedArgs);
    
    	if (isset($this->paginate[$object->alias])) {
    		$defaults = $this->paginate[$object->alias];
    	} else {
    		$defaults = $this->paginate;
    	}
    
    	if (isset($options['show'])) {
    		$options['limit'] = $options['show'];
    	}
    
    	if (isset($options['sort'])) {
    		$direction = null;
    		if (isset($options['direction'])) {
    			$direction = strtolower($options['direction']);
    		}
    		if ($direction != 'asc' && $direction != 'desc') {
    			$direction = 'asc';
    		}
    		$options['order'] = array($options['sort'] => $direction);
    	}
    
    	if (!empty($options['order']) && is_array($options['order'])) {
    		$alias = $object->alias ;
    		$key = $field = key($options['order']);
    
    		if (strpos($key, '.') !== false) {
    			list($alias, $field) = explode('.', $key);
    		}
    		$value = $options['order'][$key];
    		unset($options['order'][$key]);
    
    		if ($object->hasField($field)) {
    			$options['order'][$alias . '.' . $field] = $value;
    		} elseif ($object->hasField($field, true)) {
    			$options['order'][$field] = $value;
    		} elseif (isset($object->{$alias}) && $object->{$alias}->hasField($field)) {
    			$options['order'][$alias . '.' . $field] = $value;
    		}
    	}
    	$vars = array('fields', 'order', 'limit', 'page', 'recursive');
    	$keys = array_keys($options);
    	$count = count($keys);
    
    	for ($i = 0; $i < $count; $i++) {
    		if (!in_array($keys[$i], $vars, true)) {
    			unset($options[$keys[$i]]);
    		}
    		if (empty($whitelist) && ($keys[$i] === 'fields' || $keys[$i] === 'recursive')) {
    			unset($options[$keys[$i]]);
    		} elseif (!empty($whitelist) && !in_array($keys[$i], $whitelist)) {
    			unset($options[$keys[$i]]);
    		}
    	}
    	$conditions = $fields = $order = $limit = $page = $recursive = null;
    
    	if (!isset($defaults['conditions'])) {
    		$defaults['conditions'] = array();
    	}
    
    	$type = 'all';
    
    	if (isset($defaults[0])) {
    		$type = $defaults[0];
    		unset($defaults[0]);
    	}
    
    	$options = array_merge(array('page' => 1, 'limit' => 20), $defaults, $options);
    	$options['limit'] = (int) $options['limit'];
    	if (empty($options['limit']) || $options['limit'] < 1) {
    		$options['limit'] = 1;
    	}
    
    	extract($options);
    
    	if (is_array($scope) && !empty($scope)) {
    		$conditions = array_merge($conditions, $scope);
    	} elseif (is_string($scope)) {
    		$conditions = array($conditions, $scope);
    	}
    	if ($recursive === null) {
    		$recursive = $object->recursive;
    	}
    
    	$extra = array_diff_key($defaults, compact(
    		'conditions', 'fields', 'order', 'limit', 'page', 'recursive'
    	));
    	if ($type !== 'all') {
    		$extra['type'] = $type;
    	}
    
    	///////////////////////////////////
    	/// Use SQL_CALC_FOUND_ROWS
    	///////////////////////////////////
    	if (is_string($fields) && strpos($fields, 'SQL_CALC_FOUND_ROWS') !== false)
    	{
    		//Use found_rows for length
    		if (intval($page) < 1) {
    			$options['page'] = $page = 1;
    		}
    		$page = $options['page'] = (integer)$page;
    		
    		if (method_exists($object, 'paginate')) {
    			$results = $object->paginate(
    				$conditions, $fields, $order, $limit, $page, $recursive, $extra
    			);
    		} else {
    			$parameters = compact('conditions', 'fields', 'order', 'limit', 'page');
    			if ($recursive != $object->recursive) {
    				$parameters['recursive'] = $recursive;
    			}
    			$results = $object->find($type, array_merge($parameters, $extra));
    		}
    		
    		$count = $object->query('SELECT found_rows() AS `found`;');
    		if (isset($count[0][0]['found']))
    		{
    			$count = $count[0][0]['found'];
    		}
    		else
    		{
    			$count = 0;
    		}
    		
    		$pageCount = intval(ceil($count / $limit));
    	
    	}
    	///////////////////////////////////
    	/// Use Default Way
    	///////////////////////////////////
    	else
    	{
    		if (method_exists($object, 'paginateCount')) {
    			$count = $object->paginateCount($conditions, $recursive, $extra);
    		} else {
    			$parameters = compact('conditions');
    			if ($recursive != $object->recursive) {
    				$parameters['recursive'] = $recursive;
    			}
    			$count = $object->find('count', array_merge($parameters, $extra));
    		}
    		$pageCount = intval(ceil($count / $limit));
    
    		if ($page === 'last' || $page >= $pageCount) {
    			$options['page'] = $page = $pageCount;
    		} elseif (intval($page) < 1) {
    			$options['page'] = $page = 1;
    		}
    		$page = $options['page'] = (integer)$page;
    
    		if (method_exists($object, 'paginate')) {
    			$results = $object->paginate(
    				$conditions, $fields, $order, $limit, $page, $recursive, $extra
    			);
    		} else {
    			$parameters = compact('conditions', 'fields', 'order', 'limit', 'page');
    			if ($recursive != $object->recursive) {
    				$parameters['recursive'] = $recursive;
    			}
    			$results = $object->find($type, array_merge($parameters, $extra));
    		}
    
    	}
    
    	$paging = array(
    		'page'		=> $page,
    		'current'	=> count($results),
    		'count'		=> $count,
    		'prevPage'	=> ($page > 1),
    		'nextPage'	=> ($count > ($page * $limit)),
    		'pageCount'	=> $pageCount,
    		'defaults'	=> array_merge(array('limit' => 20, 'step' => 1), $defaults),
    		'options'	=> $options
    	);
    	$this->params['paging'][$object->alias] = $paging;
    
    	if (!in_array('Paginator', $this->helpers) && !array_key_exists('Paginator', $this->helpers)) {
    		$this->helpers[] = 'Paginator';
    	}
    	return $results;
    }


One feature that you do lose is that if you pass page:99 in your url
and the result set has a max of 9 pages it would adjust the page
number to 9. Since were using SQL_CALC_FOUND_ROWS the find query runs
before the count query so there is no way (that I can think of?) to
correct the last page number.





.. author:: techlands
.. categories:: articles, general_interest
.. tags:: pagination,sqlcalcfoundrows,General Interest

