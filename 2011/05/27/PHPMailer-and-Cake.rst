PHPMailer and Cake
==================

I was looking around eveywhere trying to find a some info on PHPMailer
and cake the problem I was having was that when PHPMailer threw an
exception it stop the header and displayed the error so my app
wouldn't continue. Then if you check app->tmp->logs->error you'll find
a header already output error. This is how to fix this. CakePHP v1.3.6
PHPMailer v5.1
First what you need to do is go through class.phpmailer.php and find
all the lines that have echo in them and change the echo to
$this->SetError('orignal code here without echo ');

Example:

::

    
     private function AddAnAddress($kind, $address, $name = '') {
        if (!preg_match('/^(to|cc|bcc|ReplyTo)$/', $kind)) {
          $this->SetError('Invalid recipient array: ' . kind); //this was echo
          return false;
        }
        $address = trim($address);
        $name = trim(preg_replace('/[\r\n]+/', '', $name)); //Strip breaks and trim
        if (!self::ValidateAddress($address)) {
          $this->SetError($this->Lang('invalid_address').': '. $address); //this was echo
          if ($this->exceptions) {
            throw new phpmailerException($this->Lang('invalid_address').': '.$address);
          }
          $this->SetError($this->Lang('invalid_address').': '.$address); //this was echo
          return false;
        }
        if ($kind != 'ReplyTo') {
          if (!isset($this->all_recipients[strtolower($address)])) {
            array_push($this->$kind, array($address, $name));
            $this->all_recipients[strtolower($address)] = true;
            return true;
          }
        } else {
          if (!array_key_exists(strtolower($address), $this->ReplyTo)) {
            $this->ReplyTo[strtolower($address)] = array($address, $name);
          return true;
        }
      }
      return false;
    }

Next, what you need to do is set up error handleing in your controller
for your functions, then you do $this->setFlash('whatever message
Reason: '.$mail->ErrorInfo);

Example:

::

    
    if($mail->Send()){
    $this->Session->setFlash('Order placed successfully!');	
    }
    else 
    {
    $this->Session->setFlash('Order placed successfully. Email sent to Comapny, but not to you ! Reason: '.$mail->ErrorInfo);
    }
    else 
    {
    $this->Session->setFlash('Order placed successfully, but email neither sent to you nor company ! Reason: '.$mail->ErrorInfo);				
    }



.. author:: scoutmastershake
.. categories:: articles, tutorials
.. tags:: Email PHPMailer,CakePHP,phpmailer,cakephp 1.3,Tutorials

