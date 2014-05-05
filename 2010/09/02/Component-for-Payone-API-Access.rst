Component for Payone-API Access
===============================

Payone (http://www.payone.de/) is a german payment system with several
product options and clearings. This Component started by implementing
the Payone API just from scratch using curl.
Thus it doesn't feature the whole API yet. You should be able to
process checkouts on creditcards for both the "Shop" and "Access"
based solutions.

The component itself can be obtained from git
`git://github.com/mashpie/PayoneComponent.git`_. Checkout/clone it and
move the files to the appropriate directories inside your cake app.
Basic usage examples are included as docblock in the code itself. To
use this component you'll have to sign up with Payone and setup the
config file accordingly.


Sample config/payone.php
~~~~~~~~~~~~~~~~~~~~~~~~

Component Class:
````````````````

::

    <?php
    $config['payone'] = array(

    	/**
    	 * Payone provides a test-mode for time of implementation
    	 */
    	'mode' => "test",

    	/**
    	 * This is the unique Merchant-ID as provided by Payone, see "Zahlungsportale / URLs"
    	 */
    	'mid' => 0,

    	/**
    	 * This is the portal Id as configured in "Zahlungsportale".
    	 */
    	'portalid' => 0,

    	/**
    	 * This is the Account-Id as configured in "Sub-Accounts"
    	 */
    	'aid' => 0,

    	/**
    	 * This is a 'secret' key configured in "Zahlungsportale / Erweitert"
    	 */
    	'portal_key' => "<put in your secret key>",

    	/**
    	 * This is the URL all requests are posted to, see "Zahlungsportale / URLs"
    	 */
    	'api_url'	=> "https://api.pay1.de/post-gateway/",

    	/**
    	 * The language of the customer (ie.: for error messages). Default: en
    	 */
    	'language' => 'en',

    	/**
    	 * Encoding for all messages.Default: UTF-8
    	 */
    	'encoding' => 'UTF-8',

    	);
    ?>



Usage in "shop" mode
~~~~~~~~~~~~~~~~~~~~

Controller Class:
`````````````````

::

    <?php
    // 1) set CC
    $this->Payone->setCC(
       '4111111111111111',
       'V',
       1002, // for 2010-02
       '123'
    );

    // 2) add a person as address
    $this->Payone->setPerson(array(
       'company'   => 'My Company',
       'firstname' => 'Marcus',
       'lastname'  => 'Spiegel'
       'street'    => 'Some Street 20a'
       'country'   => 'DE',
       'language'  => 'en',
       'zip'       => '10123',
       'city'      => 'Berlin',
       'email'     => <enter E-Mail here>,
    ));

    // 3) setup the invoice
    $this->Payone->setInvoice('RE-0001');

    // 4) add an article
    $this->Payone->addArticle($articleNr, $singleprice, $articleDescription, $amount, $vat);

    // 5) authorize the payment, which processes the payment on success. Returns error on failure
    $this->Payone->authorization('RE-0001', $overallprice, $currency, $sometext, 'cc');
    ?>



Usage in "access" mode
~~~~~~~~~~~~~~~~~~~~~~

Controller Class:
`````````````````

::

    <?php
    // 1) set CC
    $this->Payone->setCC(
       '4111111111111111',
       'V',
       1002, // for 2010-02
       '123'
    );

    // 2) add a person as address
    $this->Payone->setPerson(array(
       'company'   => 'My Company',
       'firstname' => 'Marcus',
       'lastname'  => 'Spiegel'
       'street'    => 'Some Street 20a'
       'country'   => 'DE',
       'language'  => 'en',
       'zip'       => '10123',
       'city'      => 'Berlin',
       'email'     => <enter E-Mail here>,
    ));

    // 3) setup the product
    $this->Payone->setProduct(<PRODUCTID>);

    // 4)
    $this->Payone->createaccess(<PORTALID>, 'RE-0001');
    ?>

To handle recurring payment workflows in different controllers, be
advised to setup another PaymentComponent handling these instead of
invoking payone methods directly from inside a controller.

Feedback strongly appreciated!
This was originally posted at `http://mashpie.de/2010/06/03/cakephp-component-for-payone-api-access`_.
Please check here for updates.

.. _git://github.com/mashpie/PayoneComponent.git: http://github.com/mashpie/PayoneComponent
.. _http://mashpie.de/2010/06/03/cakephp-component-for-payone-api-access: http://mashpie.de/2010/06/03/cakephp-component-for-payone-api-access

.. author:: mashpie
.. categories:: articles, components
.. tags:: Components

