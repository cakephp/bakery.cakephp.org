Changing Auth to involve username in hashing
============================================

Changing Auth to involve username in hashing
After reading `http://book.cakephp.org/#!/view/1250/Authentication`_
and doing some tests, ive realised that the Auth component doesnt
involve the username in the password hashing.

thats not good for security, suppose a hacker that can see the users
table, he could register a user with the simple password "1234", see
the resulting hash (involving the seeds) and search for a user with
the same resulting hash!

so i think it must be a default to involve username in hashing.

to make this happen i changed the folowing code:

class User extends AppModel {
var $name = 'User';

function hashPasswords($data)
{

if (isset($data['User']['password']))
{
$data['User']['password'] =
Security::hash($data['User']['password'].$data
['User']['username'],'sha256',true);
return $data;
}
return $data;
}

}
-------------------------------------
class AppController extends Controller {

var $components = array('Auth','Session');

function beforeFilter()
{
$this->Auth->authenticate = ClassRegistry::init('User');
}

}

-----------------------

i hope this to be usefull, sorry abut my ugly english :S

.. _http://book.cakephp.org/#!/view/1250/Authentication: http://book.cakephp.org/#!/view/1250/Authentication

.. author:: emicd
.. categories:: articles
.. tags:: Auth,security,login,hash,Articles

