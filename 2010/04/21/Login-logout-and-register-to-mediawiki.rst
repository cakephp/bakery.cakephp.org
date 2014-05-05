Login, logout and register to mediawiki
=======================================

Using Mediawiki and common login for cakephp and mediawiki.
To user mediawiki with cakephp install mediawiki in the webroot. At
this location
/app/webroot/mediawiki

And create file wiki_login.php and place in
/app/webroot/mediawiki/wiki_login.php

Paste following code in the file

::


    <?PHP
            global $preIP ;
            $preIP = dirname( __FILE__ );
            apache_setenv('MW_INSTALL_PATH',$preIP);
            require_once( "$preIP/includes/WebStart.php" );

            #Initialize MediaWiki base class
            require_once( "$preIP/includes/Wiki.php" );
            include("includes/specials/SpecialUserlogin.php");
            include("includes/User.php");

            global $wgRequest;
            if( session_id() == '' ) {
                    wfSetupSession();
            }
            $form = new LoginForm( $wgRequest, NULL );

            if(isset($_REQUEST['logout']))
            {
                    $obj_user = new User();
                    $obj_user->logout();
            }
            elseif(isset($_GET['wpLoginattempt']) && $_GET['wpLoginattempt']=="Log in")
            {
                    //Login
                    $form->processLogin();

            }
            elseif(isset($_GET['wpCreateaccount']) && $_GET['wpCreateaccount']=="Create account")
            {
                    //Create account
                    $form->addNewAccount();
            }

    ?>

Call this url to login
`http://yourdomain.com/mediawiki/wiki_login.php?wpName={USERNAME}={PASSWORD}=Log+in`_
CAll this url to logout
`http://yourdomain.com/mediawiki/wiki_login.php?logout=yes`_
Call this url to register
`http://yourdomain.com/mediawiki/wiki_login.php?wpName={USERNAME}={PASSWORD}={RPASSWORD}={EMAIL}={REALNAME}=Create+account`_


.. _http://yourdomain.com/mediawiki/wiki_login.php?logout=yes: http://yourdomain.com/mediawiki/wiki_login.php?logout=yes
.. _http://yourdomain.com/mediawiki/wiki_login.php?wpName={USERNAME}={PASSWORD}=Log+in: http://yourdomain.com/mediawiki/wiki_login.php?wpName={USERNAME}&wpPassword={PASSWORD}&wpLoginattempt=Log+in
.. _http://yourdomain.com/mediawiki/wiki_login.php?wpName={USERNAME}={PASSWORD}={RPASSWORD}={EMAIL}={REALNAME}=Create+account: http://yourdomain.com/mediawiki/wiki_login.php?wpName={USERNAME}&wpPassword={PASSWORD}&wpRetype={RPASSWORD}&wpEmail={EMAIL}&wpRealName={REALNAME}&wpCreateaccount=Create+account

.. author:: imran
.. categories:: articles, tutorials
.. tags:: wiki,mediawiki,login hack,Tutorials

