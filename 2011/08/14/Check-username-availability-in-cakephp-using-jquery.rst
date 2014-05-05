Check username availability in cakephp using jquery
===================================================

here's a snippets by which you can check username availability in
cakephp environment using jquery!
You can view complete tutorial on this website...
`Go to the main tutorial....`_
> <b>snippet for javascript:< b>

::

    
    
    $(document).ready(function(){
    
            $('#name').focus(function(){
    
                $('#username_feedback').hide();
    
            });
    
            $('#name').blur(function(){
    
    //Below post function is using check_username method of users controller.            
    
           $.post('/users/check_username',{username:$('#name').val()},function(result){
    
            $('#username_feedback').html(result).show('1000');
    
           }); 
    
        });
    
    });
    
    

**for controller is:**

::

    
    
    function check_username()
    
    {
    
    $this->autoRender=false;
    
    if($this->RequestHandler->isAjax()) {
    
    mb_internal_encoding("UTF-8");
    
    $username=trim($this->params['form']['username']);
    
    $conditions = array("User.username" =>$username);
    
    //either you use cake's query method or find method....
    
    //using find method...
    
    $query=$this->User->find('first', array('conditions' => $conditions));
    
    //using query method...
    
    $query=$this->User->query("SELECT username FROM users
    
    WHERE username= 'mysql_real_escape_string($username)'");
    
    if(mb_strlen($username)==0){
    
    echo "Choose a username";
    
    }
    
    else if(mb_strlen($username)<5){
    
    echo "Too Short Username!";
    
    }
    
    else if(mb_strlen($query)!=0){
    
    echo "Username Taken!";
    
    }
    
    else{
    
    echo "You Entered Correctly!";
    
    }
    
    }
    
    }
    
    ?>

for more details you can visit complete tutorial here

`Go to the main tutorial....`_

.. _Go to the main tutorial....: http://www.instatutorial.com/check-username-availability-using-jquery-in-cakephp

.. author:: instatutorial
.. categories:: articles
.. tags:: javascript,user,users,CakePHP,jquery,Articles

