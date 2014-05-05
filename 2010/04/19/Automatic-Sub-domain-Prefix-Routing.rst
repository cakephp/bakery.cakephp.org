Automatic Sub-domain Prefix Routing
===================================

Have you ever wished you could automatically link a sub-domain to
prefix routing? Well, this short listing provides that functionality.
It modifies existing routes by adding the sub-domain as a routing
prefix, if the sub-domain matches one of the routing prefixes defined
in "core.php". It does not modify routes that already contain a
routing prefix.
Copy and paste the following code into a file named
"sub_domain_prefix_route.php", located in "app -> libs -> routes". If
the "routes" folder does not exist, then you will need to create it.

::


    <?php

    	/*
    	 *	This class allows automatic adding of "prefix" to a route using a sub-domain as the "prefix route".
    	 *	It will not interfere with any existing prefix routes.
    	 *
    	 *	Basically, if a sub-domain matches one of the defined "prefix routes", then currently defined
    	 *	routes that do not contain a prefix will be modified to use the sub-domain as the prefix.
    	 *	Routes with a pre-existing prefix will not be modified.
    	 */

    	class		SubDomainPrefixRoute extends CakeRoute
    	{

    		function		parse($url)
    		{
    			//	Get an instance of the Router
    			$router		=& Router::getInstance();

    			//	Get an array of all defined prefixes
    			$prefixes		= $router->prefixes();

    			// Only proceed if prefixes have been defined...
    			if ((is_array($prefixes)) && (count($prefixes, COUNT_RECURSIVE) > 0))
    			{
    				//	Get the sub-domain from the current URL, and convert to lower-case
    				$url_parts	= explode('.', env('HTTP_HOST'));

    				$subdomain	= strtolower(trim($url_parts[0]));

    				//	Assuming all routing prefixes are lower-case, check for a match between a prefix and the current URL sub-domain
    				if (in_array($subdomain, $prefixes))
    				{
    					//	Iterate each defined route...
    					foreach ($router->routes as $route)
    					{
    						//	Check to make sure we are not trying to modify our own route definition...
    						if (!($route instanceof SubDomainPrefixRoute))
    						{
    							//	Check, just in case...
    							if (isset($route->defaults))
    							{
    								//	If a prefix has not been defined for this particular route, then we can add a prefix using the current URL sub-domain...
    								if (!isset($route->defaults['prefix']))
    								{
    									$route->defaults['prefix']		= $subdomain;
    									$route->defaults[$subdomain]	= true;
    								}
    							}
    						}
    					}
    				}
    			}

    			return false;		// We do not want this route to be matched, so we return false in order that Cake can continue checking routes for a match

    		}

    	}

    ?>

This class extends the CakeRoute class and overrides the "parse"
function.

Then, in your "routes.php" located in "app -> config", copy and paste
the following code before any other "Router::connect" statements :

::


    	App::import('Lib', 'routes/SubDomainPrefixRoute');

    	Router::connect(
    					'*'
    					,array(
    							)
    					,array(
    							'routeClass'		=>	'SubDomainPrefixRoute'
    							)
    				);

This means that this routing definition will match all routes.
Normally, this is not what you would want, but the "parse" function in
"SubDomainPrefixRoute.php" returns false, which means that this
routing definition will never be accepted by Cake as matching any
routes. The result is that our code modifies existing routes, and then
permits Cake to continue checking the routing definitions to find a
match.

All we have done is a bit of manipulation of the routes before Cake
handles our routes in the usual manner.

Hopefully, as this does not perform any underhand trickery, it is an
acceptable way of achieving some influence over prefix routing without
needing to modify any of your existing code, nor the Cake core.

I will update this to add the "match" function in the near future, if
required.


.. author:: Techie42
.. categories:: articles, snippets
.. tags:: Snippets

