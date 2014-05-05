Ticket Model for CakePHP
========================

This model will create a simple one-off ticket which can be used for
user password resetting to activation and moderation. With an activate
account example you might send a url like
http://domain.tld/users/activate/6d9c79a15255


Overview
~~~~~~~~
Use this model to create tickets or tokens so you can match a url link
in an email to reset a users password, activate an account, moderate
content or anything else you can think of.

I saw there were a few alternatives but using components. This is a
cleaned up and more basic version. Thanks to mndeaves for a starting
block :)

You're welcome to alter the code to your needs. You may want to
destroy a ticket after it's been checked.



Installation
~~~~~~~~~~~~

+ Create the table
+ Save this script below into your models directory
+ Add to your $uses controller variable, public $uses =
  array('Ticket')



Usage
~~~~~

+ $this->Ticket->generate([$data]); // Create ticket, returns created
  ticket record
+ $this->Ticket->check([$hash]); // Check a hash exists, returns
  boolean
+ $this->Ticket->void([$hash]); // Delete ticket



Database
~~~~~~~~

::


    CREATE TABLE `tickets` (
      `id` int(11) NOT NULL auto_increment,
      `hash` varchar(255) default NULL,
      `data` varchar(120) default NULL,
      `expires` datetime NOT NULL,
      `modified` timestamp NULL default NULL,
      `created` datetime default NULL,
      PRIMARY KEY  (`id`),
      UNIQUE KEY `hashs` (`hash`)
    ) ENGINE=MyISAM  DEFAULT CHARSET=latin1;



Model
~~~~~


Model Class:
````````````

::

    <?php
      /**
       * Ticket Model
       *
       * @version       1.0
       * @author        Darren Moore, zeeneo@gmail.com
       * @link          http://www.zeen.co.uk
       */
      class Ticket extends AppModel
      {
        /**
         * Name of model
         *
         * @access public
         * @var string
         */
        public $name = 'Ticket';


        /**
         * Hours
         *
         * Number of hours a ticket should last until it expires
         *
         * @access private
         * @var int
         */
        private $_hours = 24;


        /**
         * Create Ticket
         *
         * @param array $data Data to be saved
         * @access public
         * @return array
         */
        public function generate($data = null)
        {
          $ticketHash = substr(Security::hash(microtime()*12345),0,12);

          return $this->save(array(
            'hash'      => $ticketHash,
            'expires'   => date('Y-m-d H:i:s', strtotime('+'.$this->_hours.' hour')),
            'data'      => $data
          ));
        }


        /**
         * Purge Tickets
         *
         * @access public
         * @return boolean
         */
        public function purge()
        {
          return $this->deleteAll('Ticket.expires <= NOW()');
        }


        /**
         * Void Ticket
         *
         * @param string $hash Hash to remove
         * @access public
         * @return boolean
         */
        public function void($hash)
        {
          return $this->deleteAll(array('hash' => $hash));
        }


        /**
         * Check Ticket
         *
         * @param string $hash Hash to check
         * @access public
         * @return boolean
         */
        public function check($hash)
        {
          $this->purge();

          $record = $this->findByHash($hash);

          if(empty($record))
          {
            return false;
          }
          else
          {
            return $record;
          }
        }

      }
    ?>



.. author:: Firecreek
.. categories:: articles, models
.. tags:: model,Ticket,forgotten password,activate account,token,forgotten,Models

