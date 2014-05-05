TwitterComponent for CakePHP
============================

Since longer time I searched for solution to connect my app with
Twitter via their OAuth-Authentication. But there was nothing what was
so good for me, beacause most of this code snippets had no correct
solution for OAuth and the connection to Twitter. Together with with
the **http_socket_oauth**
(`https://github.com/neilcrookes/http_socket_oauth`_) by Neil Crookes
and the CakePHP HttpSocket I created an easy component to connect your
CakePHP-App via OAuth with your own Twitter-App.


**1. Installation, setup and authentication**
---------------------------------------------

**1.** First you need to visit (if you haven't already)
`https://dev.twitter.com/apps/new`_ and register your new Twitter App.
**2.** Next you need to download the CakePHP-TwiterComponent from
GitHub (`https://github.com/fnitschmann/CakePHP-TwitterComponent`_)
and extract the files in ` /app/controllers/components` and create
there a folder called Twitter .
**3.** Now you're able to use the TwitterComponent like an 'usual'
component (e.g. Email or Auth) in every controller you like. My tip is
to use the component directly in your app_controller.php . So you just
have to call it once in your app.

`
/app/controllers/app_controller.php
<?php
classAppControllerextendsController{
var$components=array('Twitter');
}
?>
`
**4.** Next you need a action in your controller where the functions
setup($consumer_key, $consumer_secret, $cookie) and connect($callback)
are called.

`
<?php
classMyControllerextendsAppController{

publicfunctionconnectToTwitter(){
$this->Twitter->setup('my_consumer_key','my_consumer_secret',true);
$this->Twitter->connect('www.myurl.com/twittercallback');
}

}
?>
`
With this little snippet of code 'magic' happens. If you have insert
the right consumer key and consumer secret correctly in
$this->Twitter->setup() (You can set $cookie in this action to false
if your keys shouldn't be stored in a local cookie) and added
$this->Twitter->connect() with an url that redirects to another action
in your controller or app, this will redirect the user to a
authorization page where your app can be authorized by the user.
And if if the authorization was sucessfull Twitter will automatically
redirect the user back to your website.
**4.** The next you need is an action in your controller where the
function callback($oauth_token, $oauth_vertifier) is called.

`
<?php
publicfunctioncallback(){
$this->Twitter->callback($this->params['url']['oauth_token'],$this->pa
rams['url']['oauth_verifier']);
}
?>
`
With this little snippet of code you get the the user token and token
secret for the authorized app by the url Twitter has generated.
These two keys are unique for every user and are stored in a local
session. You also can set them manuell by calling the method
$this->setOauthUserKeys($oauth_token, $oauth_token_secret) in a
controller.



.. _https://dev.twitter.com/apps/new: https://dev.twitter.com/apps/new
.. _https://github.com/fnitschmann/CakePHP-TwitterComponent: https://github.com/fnitschmann/CakePHP-TwitterComponent
.. _https://github.com/neilcrookes/http_socket_oauth: https://github.com/neilcrookes/http_socket_oauth

.. author:: nitsche
.. categories:: articles, components
.. tags:: HTTP,twitter,oauth,twitter api,Components

