Override HtmlHelper for Acl component. Hide links where users don't
have privileges.
================

Here is a way to hide links where users are not authorized. Rights are
cached in session.
Copy HtmlHelper in your app directory(/app/views/helpers/html.php).
Use $options['extern'] = true to skip right check.
Find link method and just before the return statement add this code

::

    
    function link($title, $url = null, $options = array(), $confirmMessage = false) {
    
            /**
             * ..
             * ...Original code here
             * ....
             */
    
            /**
             * Override link method for Acl rights checking
             */
            $extern = false;
            if (isset($options['extern'])) {
                $extern = (boolean) $options['extern'];
                unset($options['extern']);
            }
            $parsedUrl = Router::parse($url);
            if (!$extern &&
                    isset($parsedUrl['controller']) &&
                    isset($parsedUrl['action']) &&
                    strpos($parsedUrl['controller'], 'mailto:') !== 0 &&
                    !$this->Session->check('Auth.User.Permissions.controllers/' . Inflector::camelize($parsedUrl['controller']) . '/' . $parsedUrl['action']))
                return false;
            elseif ($extern)
                return $title;
            /**
             * End override
             */
    
            // don't touch this >>>
            return sprintf($this->tags['link'], $url, $this->_parseAttributes($options), $title);
        }

Also add at the begining:

::

    
           var $helpers = array("Session");

To store user rights you need to add this in login() or somewhere
where is being executed when user logs in.

::

    
        function login() {
            if ($userId = $this->Session->read('Auth.User.id')) {
                $acos = $this->Acl->Aco->children();
                foreach ($acos as $aco) {
                    $tmpacos = $this->Acl->Aco->getPath($aco['Aco']['id']);
                    $path = array();
                    foreach ($tmpacos as $tmpaco) {
                        $path[] = $tmpaco['Aco']['alias'];
                    }
                    $stringPath = implode('/', $path);
                    if ($this->Acl->check(array('model' => 'User', 'foreign_key' => $userId), $stringPath))
                        $permissions[$stringPath] = true;
                }
                $this->Session->write('Auth.User.Permissions', $permissions);
            }
            if (is_array($this->Session->read('Auth.User'))) {
                $this->redirect('/');
            }
        }

Login code can be improved for faster performance.


.. author:: aalexgabi
.. categories:: articles, helpers
.. tags:: acl,helper,HtmlHelper,user rights,hide links,Helpers

