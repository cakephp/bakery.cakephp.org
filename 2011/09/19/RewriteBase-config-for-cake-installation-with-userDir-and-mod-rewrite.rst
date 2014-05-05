RewriteBase config for cake installation with userDir and mod_rewrite
=====================================================================

This article shows how to configure RewriteBase in 3 .htaccess files
in cake installation located in userDir ~/user/cake_install
If the cake app is installed in ~/user/cake_install/, than to
correctly configure the RewriteBase you will need to edit 3 .htaccess
files:
~/user/cake_install/.htaccess
~/user/cake_install/app/.htaccess
~/user/cake_install/app/webroot/.htaccess

adding the directive: RewriteBase as follow:

::

    
    Path  ---->  RewriteBase
    	
    ~/user/cake_install/.htaccess   ---->     RewriteBase /~user/cake_install/
    ~/user/cake_install/app/.htaccess  ---->    RewriteBase /~user/cake_install/app/
    ~/user/cake_install/app/webroot/.htaccess   ---->  
    RewriteBase  /~user/cake_install/app/webroot/
     





.. author:: syl-via
.. categories:: articles, tutorials
.. tags:: Tutorials

