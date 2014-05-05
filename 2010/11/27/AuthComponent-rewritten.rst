AuthComponent rewritten
=======================

The AuthComponent::startup() method is not eanough readable and
extendable. Also it does not handle bare requests as it should.
Below is a rewritten AuthComponent. It is provided as a subclass of
the core AuthComponent.
The component's logic is pretty much the same. However it has two
pretty helpful add-ons:
- it handles bare requests. The mechanism is simle - the component
renders $bareAction from your view elements, just like for the
ajaxLogin.
- it provides a "default Aro" functionality. For the original
AuthComponent one had to put some code in the controller in order to
make some actions allowed for unauthenticated users. Now you can just
set up the permissions in your Acl implementation. I usually create a
PUBLIC Aro node for this purpose.


Component Class:
````````````````

::

    <?php 
    App::import('Component','Auth');
    class AuthorizationComponent extends AuthComponent {
    
        /**
         * Name of the view element that will be rendered for unauthorized bare requests.
         * 
         * @var string
         */
        var $bareAction = 'empty';
    
        /**
         * Aro for unauthenticated users.
         *
         * @var string
         */
        var $unauthenticatedAro = 'PUBLIC';
    
        /**
         * Checks if request requires authorization.
         *
         * Error controller, tests or missing action does not require authorization.
         *
         * @param Controller $controller
         * @return boolean
         */
        function __requiresAuthorization(&$controller) {
            // Error
            if (strtolower($controller->name) == 'cakeerror') {
                return false;
            }
            // Test
            if (strtolower($controller->name) == 'tests' && Configure::read() > 0) {
                return false;
            }
            // Missing action
            $methods = array_flip($controller->methods);
            if ($controller->scaffold === false && !isset($methods[strtolower($controller->params['action'])])) {
                return false;
            }
    
            return true;
        }
    
        /**
         * Checks if contrller action is on the white list.
         *
         * @param Controller $controller
         * @return boolean
         */
        function isAllowedAction(&$controller) {
            $action = strtolower($controller->params['action']);
            $allowedActions = array_map('strtolower', $this->allowedActions);
    
            return (
                    $this->allowedActions == array('*') ||
                            in_array($action, $allowedActions)
            );
        }
    
        /**
         * Handles requests to loginAction, automatically redirects on successful login.
         *
         * @param Controller $controller
         * @return boolean
         */
        function __handleLoginAction(&$controller) {
            $model =& $this->getModel();
            if (empty($controller->data) || !isset($controller->data[$model->alias])) {
                if (!$this->Session->check('Auth.redirect') && !$this->loginRedirect && env('HTTP_REFERER')) {
                    $this->Session->write('Auth.redirect', $controller->referer(null, true));
                }
                return false;
            }
    
            $isValid = !empty($controller->data[$model->alias][$this->fields['username']]) &&
                    !empty($controller->data[$model->alias][$this->fields['password']]);
    
            if ($isValid) {
                $username = $controller->data[$model->alias][$this->fields['username']];
                $password = $controller->data[$model->alias][$this->fields['password']];
    
                $data = array(
                        $model->alias . '.' . $this->fields['username'] => $username,
                        $model->alias . '.' . $this->fields['password'] => $password
                );
    
                if ($this->login($data)) {
                    if ($this->autoRedirect) {
                        $controller->redirect($this->redirect(), null, true);
                    }
                    return true;
                }
            }
    
            $this->Session->setFlash($this->loginError, $this->flashElement, array(), 'auth');
            $controller->data[$model->alias][$this->fields['password']] = null;
    
            return false;
        }
    
        /**
         * Handles requests to unauthorized actions.
         *
         *
         * @param Controller $controller
         * @return boolean
         */
        function __handleUnauthorizedAction(&$controller) {
            if (!$this->user()) {
                if (!$this->RequestHandler->isAjax()) {
                    $this->Session->setFlash($this->authError, $this->flashElement, array(), 'auth');
                    $url = '';
                    if (isset($controller->params['url']['url'])) {
                        $url = $controller->params['url']['url'];
                    }
                    $url = Router::normalize($url);
                    if (!empty($controller->params['url']) && count($controller->params['url']) >= 2) {
                        $query = $controller->params['url'];
                        unset($query['url'], $query['ext']);
                        $url .= Router::queryString($query, array());
                    }
                    $this->Session->write('Auth.redirect', $url);
                    $controller->redirect($this->loginAction);
                    return false;
                } elseif (!empty($controller->params['bare'])) {
                    $controller->viewPath = 'elements';
                    echo $controller->render($this->bareAction);
                    $this->_stop();
                    return false;
                } elseif (!empty($this->ajaxLogin)) {
                    $controller->viewPath = 'elements';
                    echo $controller->render($this->ajaxLogin, $this->RequestHandler->ajaxLayout);
                    $this->_stop();
                    return false;
                } else {
                    $controller->redirect(null, 403);
                }
            }
    
            $this->Session->setFlash($this->authError, $this->flashElement, array(), 'auth');
            $controller->redirect($controller->referer(), null, true);
            return false;
        }
    
        /**
         * Sets up authorization type.
         *
         * @param Controller $controller
         * @return string $type
         */
        function __setupAuthorizationType(&$controller) {
            extract($this->__authType());
            switch ($type) {
                case 'controller':
                    $this->object =& $controller;
                    break;
                case 'crud':
                case 'actions':
                    if (isset($controller->Acl)) {
                        $this->Acl =& $controller->Acl;
                    } else {
                        trigger_error(__('Could not find AclComponent. Please include Acl in Controller::$components.', true), E_USER_WARNING);
                    }
                    break;
                case 'model':
                    if (!isset($object)) {
                        $hasModel = (
                                isset($controller->{$controller->modelClass}) &&
                                        is_object($controller->{$controller->modelClass})
                        );
                        $isUses = (
                                !empty($controller->uses) && isset($controller->{$controller->uses[0]}) &&
                                        is_object($controller->{$controller->uses[0]})
                        );
    
                        if ($hasModel) {
                            $object = $controller->modelClass;
                        } elseif ($isUses) {
                            $object = $controller->uses[0];
                        }
                    }
                    $type = array('model' => $object);
                    break;
            }
    
            return $type;
        }
    
        function startup(&$controller) {
            $this->data = $controller->data = $this->hashPasswords($controller->data);
    
            if (!$this->__requiresAuthorization($controller)) {
                return true;
            }
            if (!$this->__setDefaults()) {
                return false;
            }
    
            $url = '';
            if (isset($controller->params['url']['url'])) {
                $url = $controller->params['url']['url'];
            }
            $url = Router::normalize($url);
            $loginAction = Router::normalize($this->loginAction);
    
            if ($loginAction != $url && $this->isAllowedAction($controller)) {
                return true;
            } else if ($loginAction == $url) {
                return $this->__handleLoginAction($controller);
            }
    
            if ($this->user() && !$this->authorize) {
                return true;
            } else if (!$this->authorize) {
                return $this->__handleUnauthorizedAction($controller);
            }
    
            $authType = $this->__setupAuthorizationType($controller);
    
            if ($this->user() && $this->isAuthorized($authType)) {
                return true;
            } else if (!empty($this->unauthenticatedAro) && $this->isAuthorized($authType,null,$this->unauthenticatedAro)) {
                return true;
            }
    
            return $this->__handleUnauthorizedAction($controller);
        }
    
    }
    ?>



.. author:: prond
.. categories:: articles, components
.. tags:: Auth,component,Components

