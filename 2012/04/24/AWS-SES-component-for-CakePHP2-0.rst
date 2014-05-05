AWS SES component for CakePHP2.0 +
==================================

This is an Amazon SES component. Developed to help developers to move
& integrate faster the AWS services. In future we will come up with
the aws plugin with all the services

We use Amazon services for our day today applications & we use their
SDK & write normal code to required controllers, So we planned to
create a component for AWS service.

Amazon Simple Email Service (Amazon SES) is a very popular email SMTP
service by Amazon. It has lots of advantages like,

::

    Easy to use
    Good documentation
    Good fault tolerance
    Easy to integrate with existing architecture
    Detailed reporting about email deliveries
    Highly scalable

Once you go with AWS services, it is advised to use their services
throughout your application. like EC2 for hosting your application,
SES for sending email via authenticated & trusted SMTP server. You can
use AWS SES service alone also.

So for using Amazon Simple Email Service (Amazon SES) service use
following steps, 1. You need an AWS account. `http://aws.amazon.com/`_
2. Login to the account & go to the SES dashboard. 3. Add email
address to verify. Which can be used in From header of outgoing
emails. 4. After adding email, AWS sends an verification email to the
email address. You need to verify this email address. Then it will
appear in the verified email list.

`http://docs.amazonwebservices.com/ses/latest/DeveloperGuide/InitialSetup.EmailVerification.html`_

By default in the 1st go AWS gives you a sandbox testing account. In
this mode it will only send emails to & from the verified email
addresses only.

For using SES with your application you need production access. So
first up all request to activate the production mode. It will take one
business day to activate. After this activation you can send emails
through your application.

Now there is a Verified email address section in the SES dashboard.
These email addresses you can use in the From header of your outgoing
email. If the email address is not verified you can not use that email
address.

Now the Implementation part comes in the picture with CakePHP app.
It's very easy to integrate SES with the application.

::

    Download the SDK (PHP) from AWS. http://aws.amazon.com/code
    Extract the sdk to your ‘app/Vendor’ directory.
    Rename it as ‘aws’ from ‘aws-sdk’
    Create a component file in the components directory. name : AWSSESComponent.php
    Copy paste the code to this file
    Add the line to Appcontroller :

include_once(APP.DS.'Vendor'.DS.'aws/sdk.class.php'); or
App::import('Vendor', 'aws/sdk.class');

::

    Add ‘AWSSES’ in the public $components = array('AWSSES');
    Now you can use this in any controller. If you want to use this controller specific then in every controller you can add the component array.

Currently this component only supports the HTML email formats, but we
are going to improve this further. This is the inspiration from
Swiftmailer component & SES::

    <?php App::import('Vendor', 'aws/sdk.class.php');
    App::import('Vendor', 'aws/services/ses.class.php');

    class AWSSESComponent extends Object {

        public $ses;
        public $emailViewPath = '/Emails';
        public $emailLayouts = 'Emails';
        public $htmlMessage;
        public $from = 'from_email_address';
        public $to;

        public function initialize($controller)
        {

        }


        function startup(&$controller)
        {
           $this->controller =& $controller;

           $this->ses = new AmazonSES(array('certificate_authority' => false,
               'key' => 'AWS_Key',
               'secret' => 'AWS_secrete'));

        }

        public function beforeRender()
        {
        }

        public function shutdown()
        {
        }

        public function beforeRedirect()
        {
        }

        public function _aws_ses($viewTemplate, $mailContent = null)
        {
               if(!empty($this->controller->request->data) && $mailContent == null){
               $mailContent = $this->controller->request->data[$this->controller->modelClass];
           }

           $mail = $this->email_templates($viewTemplate);

           $destination = array(
               'ToAddresses' => explode(',', $this->to)
           );
           $message = array(
               'Subject' => array(
                   'Data' => $mail['Subject']
               ),
               'Body' => array()
           );


           $this->controller->set('data', $mailContent);

           $this->htmlMessage = $this->_getHTMLBodyFromEmailViews($mail['ctp']);

           if ($this->htmlMessage != NULL) {
               $message['Body']['Html'] = array(
                   'Data' => $this->htmlMessage
               );
           }

           $response = $this->ses->send_email($this->from, $destination, $message);

           $ok = $response->isOK();

           if (!$ok) {
               $this->log('Error sending email from AWS SES: ' . $response->body->asXML(), 'debug');
           }
           return $ok;
        }

        public function email_templates($name)
        {
           $this->templates = array('email_name' => array(
               'ctp' => 'ctp_file_name', 'Subject' => 'email_subject'
           ),'email_name' => array('ctp' => 'reset_passwordctp_file_name 'Subject' => 'email_subject'));

           return $this->templates[$name];
        }

        public function _getHTMLBodyFromEmailViews($view)
        {
           $currentLayout = $this->controller->layout;
           $currentAction = $this->controller->action;
           $currentView = $this->controller->view;
           $currentOutput = $this->controller->output;

           ob_start();
           $this->controller->output = null;

           $viewPath = $this->emailViewPath . DS . 'html' . DS . $view;
           $layoutPath = $this->emailLayouts . DS . 'html' . DS . 'default';

           $bodyHtml = $this->controller->render($viewPath, $layoutPath);

           ob_end_clean();

           $this->controller->layout = $currentLayout;
           $this->controller->action = $currentAction;
           $this->controller->view = $currentView;
           $this->controller->output = $currentOutput;

           return $bodyHtml;
        }

    }


So CakePHP 2.0 + uses an Email views to store all the email templates.
You can change the location & you can use your own too.

Template views from View/Emails/html/email.ctp’ as defined in the
component : $emailViewPath Layouts from your
‘View/Layouts/Emails/default.ctp’ as defined in the component :
$emailLayouts

This component catches the post data itself & you can use that data in
your emails. If you don't want to capture the data from post request &
you want to set your data that is also possible, only add the second
param as array & you can get that in your email view as ‘$data’ array.

How to use n controller :<?php //email to //you can send comma
separated email addresses if you want to send email to multiple
people.

$this->AWSSES->to = $this->request->data['User']['username'];

if ($this->AWSSES->_aws_ses('email tempate name', ‘optional param’)) {
//optional param : can be an array of the data that you want to access
in email view.

//your code } ?>



.. _http://docs.amazonwebservices.com/ses/latest/DeveloperGuide/InitialSetup.EmailVerification.html: http://docs.amazonwebservices.com/ses/latest/DeveloperGuide/InitialSetup.EmailVerification.html
.. _http://aws.amazon.com/: http://aws.amazon.com/

.. author:: kvijay
.. categories:: articles, components
.. tags:: CakePHP,email,component,aws,Ses,Components

