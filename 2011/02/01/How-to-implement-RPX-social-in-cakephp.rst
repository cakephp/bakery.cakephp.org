How to implement RPX social in cakephp?
=======================================

Whua there, I am Gautam Lakum and I have appeared after many days with
new article. I know, it's been too long. But anyways, let's start
something new. I am here with little new topic, i.e. how to implement
RPX social in cakephp. You can catch me from my blog
www.gautamlakum.com I don't know how to format article content here.
So please visit http://www.gautamlakum.com/how-to-implement-rpx-
social-in-cakephp/ to get this article well formatted.
What is RPX social?

RPX is a third party tool that allows users to log in to our site
using other social site's login details like Google, Yahoo, Facebook,
twitter and more. RPX is now called Janrain. It provides different
services like Social engage/login, social sharing, getting user
profile data and invite friends. Janrain Engage helps connect your
site to the social web through a robust set of APIs and social widget
interfaces. Ultimately, a Janrain Engage solution accelerates your
user registration and sign-in process by quickly and easily converting
anonymous site visitors into active registered users. In addition,
Janrain Engage enables you to import a rich set of profile data and
social graphs from your users' social networks allowing you to gain
both deeper insight into your users, keep their profiles up to date,
and transform your site into a more social destination. Please visit
`http://www.janrain.com/products/engage`_ for more about RPX.
I have implemented Social login using RPX. So I am going to share how
to implement it in your CakePHP application. So, here we go.

There are two methods to implement it.
1) iframe based
2) Popup based

I will start with implementing it iframe base.

Step 1:

Define constants in bootstrap file of your CakePHP application. You
will find it /app/config/bootstrap.php::

    define('TOKEN_URL', urlencode(/* URL you want your token to be sent*/));
    /*
    For e.g. define('TOKEN_URL',
    urlencode('http://localhost/project/users/login'));
    */

    define('RPX_URL',
    'http://webdevbit.rpxnow.com/openid/embed?token_url=');
    define('RPX_KEY', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'); // Get your
    own RPX key from rpxnow.com

Here is few screenshots that will guide you to create RPX application
and get RPX API key and more.

Step 2:

Add following code to your .ctp file where you want the RPX login
form.

" scrolling="no" frameBorder="no" allowtransparency="true"
style="width:400px;height:240px">
Above code will display RPX login form in specific .ctp file. It will
look like this.

That's it. Now let us see, how to get data from RPX token.

Step 3:

RPX will redirect you to the TOKEN_URL that you have defined in
bootstrap.php file. You can extract the profile data using that token.
Here is how you can do it.
We have set token URL /users/login in bootstrap, so we will create
login action in users_controller.php file.

function social_login($token = null) {

if (isset($_POST['token'])) {

$post_data = array('token' => $_POST['token'],
'apiKey' => RPX_KEY,
'format' => 'json');

$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_URL,
'https://rpxnow.com/api/v2/auth_info');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
$raw_json = curl_exec($curl);
curl_close($curl);

$auth_info = json_decode($raw_json, true);

if ($auth_info['stat'] == 'ok') {
$profile = $auth_info['profile'];
// You will get user's social profile information including email,
full name, username, provider, photo url, etc.
// You can use them to log user in or let him/her register in your
site
} else {
// gracefully handle the error. Hook this into your native error
handling system.
echo 'An error occured: ' . $auth_info['err']['msg'];
}
}
}

Now you are done with your RPX implementation.

.. _http://www.janrain.com/products/engage: http://www.janrain.com/products/engage

.. author:: webdevbit
.. categories:: articles
.. tags:: login,CakePHP,social,social media,social login,Articles

