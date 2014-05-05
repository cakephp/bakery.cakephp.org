Integrate Amazon Simple Email Service (SES) into existing application
=====================================================================

The release of Amazon's Simple Email Service (SES) was a god send to
me. There was always this dilemma between sendmail and SMTP (usually
through Google Apps). The deliverability of sendmail always sucked and
SMTP (with Google Apps) had a 500/day limit. I developed a simple
Component that integrates SES into your existing application with
minimal code changes.
I have an existing application that I wanted to integrate Amazon SES
into. I of course, wanted to change as little code as possible. The
most unobtrusive way is to configure sendmail to use SES and not the
default relay transport method. No code has to be changed and you're
up and running. However, SES sends back error messages and message IDs
that I wanted to capture about my system's emails. Also, from an
architecture perspective I think it's better to have the API calls in
the code and not rely on a system level configuration.

This code is simple and demonstrates the extensibility of the
EmailComponent.

::

    
    <?php
    App::import('Vendor','aws-sdk', array('file' => 'sdk.class.php'));
    App::import('Component','Email');
    class EmailServiceComponent extends EmailComponent {
       
       function _aws_ses() {
          $ses = new AmazonSES();
          $destination = array(
             'ToAddresses' => explode(',', $this->to)
          );
          $message = array(
             'Subject' => array(
                'Data' => $this->subject
             ),
             'Body' => array()
          );
          if($this->textMessage != NULL) {
             $message['Body']['Text'] = array(
                'Data' => $this->textMessage
             );
          }
          if($this->htmlMessage != NULL) {
             $message['Body']['Html'] = array(
                'Data' => $this->htmlMessage
             );
          }
          
          $response = $ses->send_email($this->from, $destination, $message);
          
          $ok = $response->isOK();
          if(!$ok) {
             $this->log('Error sending email from AWS SES: '.$response->body->asXML(), 'debug');
          }
          return $ok;
       }
       
    }

Then you need to replace every occurrence of EmailComponent with
EmailServiceComponent, and set the delivery like this:

::

    
    $this->EmailService->delivery = 'aws_ses';

This code also utilizes Amazon's SDK for PHP - you'll have to hunt
that down and install in app/vendors. This code works because the
EmailComponent just reflects the delivery attribute to a private
method call ( _delivery() ), which makes it nice and easy to extend.
Kudos to the Cake team for creating an extensible component and kudos
to Amazon for solving my email dilemma. I hope the code helps someone
out!


.. author:: Dankroad
.. categories:: articles
.. tags:: email,email component,amazon web services,Articles

