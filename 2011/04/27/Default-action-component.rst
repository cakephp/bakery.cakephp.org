Default action component
========================

I created a component to fallback onto a default action (if not
found), so arbitrary URLs could be handled for pretty URLs (slug-
based), such as having "/pages/pricing" call Pages->view('pricing').
Using this approach (instead of traditional routing), I can use both
pretty URLs and typical controller actions (delete, resort, index,
edit, etc). The problem I came across is that I had too many shared
methods (put in AppController for various AJAX and requestAction
calls) to list them for exclusion in my routing. The 'missing action'
parameter will be pushed back onto the parameter list::


    <? class DefaultActionComponent extends Object { function
    startup(&$controller) { if (!method_exists($controller,
    $controller->action)) { if (isset($controller->defaultAction) &&
    method_exists($controller, $controller->defaultAction)) { # Use the
    'admin_' version if desired. $prefix =
    !empty($controller->params['prefix']) ? $controller->params['prefix']
    : null; $action = !empty($prefix) ?
    "{$prefix}_{$controller->defaultAction}" : $controller->defaultAction;


    array_unshift($controller->params['pass'], $controller->action); # Put old 1st param into passed list...
                                $params = array_merge($controller->params['pass'], $controller->params['named']);
                                $controller->action = $action;
                                $output = call_user_func_array(array(&$controller, $controller->action), $params);
                                if ($controller->autoRender) {
                                        $controller->output = $controller->render();
                                } else if (empty($controller->output)) {
                                        $controller->output = $output;
                                }
                                $controller->shutdownProcess();

                                if (isset($controller->params['return'])) {
                                        return $controller->output;
                                }
                                echo($controller->output);

                                exit(); // To prevent double rendering
                        }
                }
        }

    } ?>



.. author:: tomas_maly
.. categories:: articles, components
.. tags:: default action slug,Components

