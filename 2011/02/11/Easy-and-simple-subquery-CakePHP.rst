Easy and simple subquery CakePHP
================================

How to easily make subquery in CakePHP
Example usage:

::

    $notID = $this->User->subquery(array('conditions' => array('User.status !=' => 'B')));

You produce a query like:

::

    SELECT  FROM `users` AS `User`   WHERE `User`.`status` != 'B'  

As you can see. You will refer to the model through the alias
ModelName 2 .column, you can choose a own alias (see below).
Now you can use $notID where you wish.

Usage 2 (count). There's a optional key ('count') that can be passed
to the method AppModel::subquery().

::

    $this->User->subquery('count', array('conditions' => array('User2.parent_id = User.id')))

Returns:

::

    SELECT COUNT(*) FROM `users` AS `User2`   WHERE `User2`.`parent_id` = `User`.`id`   

This is the same as:

::

    $this->Usuario->subquery(array('fields' => array('COUNT(*)'), 'conditions' => array('User2.parent_id = User.id')));


You can pass an alias for the last param:

::

    $this->User->subquery('count', array('conditions' => array('UserBigAliasHere.parent_id = User.id')), 'UserBigAliasHere')

Return:

::

    SELECT COUNT(*) FROM `users` AS `UserBigAliasHere`  WHERE `UserBigAliasHere`.`parent_id` = `User`.`id`   

This is the same as:

::

    $this->Usuario->subquery('count', array('alias' => 'UserBigAliasHere', 'conditions' => array('UserBigAliasHere.parent_id = User.id')))

Now the code.

Insert this in AppModel and enjoy:

::

        /**
         * Makes a subquery
         * @param strin|array $type The type o the query (only available 'count') or the $options
         * @param string|array $options The options array or $alias in case of $type be a array
         * @param string $alias You can use this intead of $options['alias'] if you want
         */
        public function subquery($type, $options = null, $alias = null){
            $fields = array();
            if(is_string($type)){
                $isString = true;
            }else{
                $alias = $options;
                $options = $type;
            }
            
            if($alias === null){
                $alias = $this->alias . '2';
            }
            
            if(isset($isString)){
                switch ($type){
                    case 'count':
                        $fields = array('COUNT(*)');
                        break;
                }
            }
            
            $dbo = $this->getDataSource();
                    
            $default = array(
                'fields' => $fields,
                'table' => $dbo->fullTableName($this),
                'alias' => $alias,
                'limit' => null,
                'offset' => null,
                'joins' => array(),
                'conditions' => array(),
                'order' => null,
                'group' => null
            );
            
            $params = array_merge($default, $options);
            $subQuery = $dbo->buildStatement($params, $this);
            
            return $subQuery;
        }



.. author:: lucaswxp
.. categories:: articles
.. tags:: model,appModel,subquery,Articles

