Password Validation in Cakephp
==============================

Password validation is very important for the tasks like resetting
password.

As we all know cakephp comes with many built in validations. Working
on validation for password could be tricky.

The Auth component in cakephp converts the password into hash
automatically if it is able to find username and password value from
form.

So value of $this->data['User']['password'] in model will be
40characters and not the one you really gave in form.

So how to get it verified with confirm password(without hash) and
current password field(stored in hash in database). Yeah, you guessed
it right, we can call cakephp's password function in controller to
convert characters into hash.

So in controller, we can compare password Hash password with Unhash
password as below :

$this->data['User']['password'] == $this->Auth->password(
$this->data['User']['confirm_password']);

Validations are preferred to be kept in models rather than in
controllers. So in models, unhashed password can be converted to its
hash using Security::hash function of php. You simply can create a
custom validation function. Field for which, this function is called,
will be passed by default and can be accessed as $check in function.

Do make sure to supply your correct security.salt, else hashed value
will not be correct. Comparision can be done as :

$check['password'] == Security::hash(Configure::read('Security.salt').
$this->data['User']['confirm_password']);

Another very common thing while working with validation is to skip
updating passwords if passwords are not entered by user. This is quite
simple and can be done by using unset in beforeValidate function.

Function beforeValidate() {

if(empty($this->data['User']['confirm_password']))

{

unset($this->data['User']['password']);

}

return true;

}



.. author:: rajender120
.. categories:: articles
.. tags:: Auth,validation,password,Unset,Articles

