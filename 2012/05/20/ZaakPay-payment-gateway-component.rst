ZaakPay payment gateway component
=================================

This is another component that is get used for ZaakPay payment
gateway.

Some info about zaak pay : `http://www.zaakpay.com/`_ Zaak pay is the
payment gateway that operate inside india. It is very easy to
integrate this payment gateway with your e-commerce application. There
are some steps that you need to follow,

::

    Register to Zaakpay : https://www.zaakpay.com/sign-up
    After creating account, login to the customer panel.
    Here you need to provide some information about your business.
    From My Account go to Integration section.
    On the 1st step you can configure the 
    
        your application URLs to get the response back from the zaakpay.
        You can get the Merchant identifier & secret key that to be configured in your application
    
    2nd step is to configure the limits for the transaction
    3rd screen : you can customize a button that you want to use on your site.
    4th step : UI on zaakpay page , you can configure
    
        headings, logo for the payment gateway page

You can use the current account as a test account, until you provide
your business details to zaak pay & zaakpay approves it.

Zaakpay provides an SDK for PHP, but we modified the SDK & created our
own component for the same.

Component : This is another component that is get used for ZaakPay
payment gateway.

For using this component please follow following steps,

::

    Create a ZaakPay.php inside app/Controller/Component/
    Copy paste the below code in this file
    Create a controller payments.php
    Create views

ZaakPay Componenet :

<?php class ZaakPayComponent extends Object { public $config;

::

    public function initialize($controller)
    {
           $this->config = array(‘SiteName’ => ‘your_site_name’, ‘ZaakSecret’ => ‘secret_key_from_zaak_pay’, ‘ZaakMerchantIdentifier’ => ‘merchant_identifier_from_zaak_pay’);
    }
    
    function startup(&$controller)
    {
       $this->controller =& $controller;
    
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
    
    public function getOrderId()
    {
       return $this->config['SiteName'] . time();
    }
    
    public function calculateChecksum($all)
    {
       $hash = hash_hmac('sha256', $all, $this->config['ZaakSecret']);
       $checksum = $hash;
       return $checksum;
    }
    
    
    public function getAllParams()
    {
       //ksort($_POST);
       $all = '';
       foreach ($_POST as $key => $value) {
           if ($key != 'submit') {
               if ($key != 'checksum') {
                   $all .= "'";
                   if ($key == 'returnUrl') {
                       $all .= $this->sanitizedURL($value);
                   } else {
                       $all .= $this->sanitizedParam($value);
                   }
                   $all .= "'";
               }
           }
       }
       return $all;
    }
    
    public function outputForm($checksum)
    {
       //ksort($_POST);
       $html = '';
       foreach ($_POST as $key => $value) {
           if ($key != 'submit') {
               if ($key == 'returnUrl') {
                   $html .= '<input type="hidden" name="' . $key . '" value="' . $this->sanitizedURL($value) . '" />' . "\n";
               } else {
                   $html .= '<input type="hidden" name="' . $key . '" value="' . $this->sanitizedParam($value) . '" />' . "\n";
               }
           }
       }
       $html .= '<input type="hidden" name="checksum" value="' . $checksum . '" />' . "\n";
    
       return $html;
    }
    
    public function verifyChecksum($checksum, $all)
    {
       $cal_checksum = $this->calculateChecksum($all);
       $bool = 0;
       if ($checksum == $cal_checksum) {
           $bool = 1;
       }
    
       return $bool;
    }
    
    public function sanitizedParam($param)
    {
       $pattern[0] = "%,%";
       $pattern[1] = "%#%";
       $pattern[2] = "%\(%";
       $pattern[3] = "%\)%";
       $pattern[4] = "%\{%";
       $pattern[5] = "%\}%";
       $pattern[6] = "%<%";
       $pattern[7] = "%>%";
       $pattern[8] = "%`%";
       $pattern[9] = "%!%";
       $pattern[10] = "%\\$%";
       $pattern[11] = "%\%%";
       $pattern[12] = "%\^%";
       $pattern[13] = "%=%";
       $pattern[14] = "%\+%";
       $pattern[15] = "%\|%";
       $pattern[16] = "%\\\%";
       $pattern[17] = "%:%";
       $pattern[18] = "%'%";
       $pattern[19] = "%\"%";
       $pattern[20] = "%;%";
       $pattern[21] = "%~%";
       $pattern[22] = "%\[%";
       $pattern[23] = "%\]%";
       $pattern[24] = "%\*%";
       $pattern[25] = "%&%";
       $sanitizedParam = preg_replace($pattern, "", $param);
       return $sanitizedParam;
    }
    
    public function sanitizedURL($param)
    {
       $pattern[0] = "%,%";
       $pattern[1] = "%\(%";
       $pattern[2] = "%\)%";
       $pattern[3] = "%\{%";
       $pattern[4] = "%\}%";
       $pattern[5] = "%<%";
       $pattern[6] = "%>%";
       $pattern[7] = "%`%";
       $pattern[8] = "%!%";
       $pattern[9] = "%\\$%";
       $pattern[10] = "%\%%";
       $pattern[11] = "%\^%";
       $pattern[12] = "%\+%";
       $pattern[13] = "%\|%";
       $pattern[14] = "%\\\%";
       $pattern[15] = "%'%";
       $pattern[16] = "%\"%";
       $pattern[17] = "%;%";
       $pattern[18] = "%~%";
       $pattern[19] = "%\[%";
       $pattern[20] = "%\]%";
       $pattern[21] = "%\*%";
       $sanitizedParam = preg_replace($pattern, "", $param);
       return $sanitizedParam;
    }
    
    public function outputResponse($bool)
    {
       $response = '';
       foreach ($_POST as $key => $value) {
           if ($bool == 0) {
               if ($key == "responseCode") {
                   $response .= '<tr><td width="50%" align="center" valign="middle">' . $key . '</td>
                       <td width="50%" align="center" valign="middle"><font color=Red>***</font></td></tr>';
               } else if ($key == "responseDescription") {
                   $response .= '<tr><td width="50%" align="center" valign="middle">' . $key . '</td>
                       <td width="50%" align="center" valign="middle"><font color=Red>This response is compromised.</font></td></tr>';
               } else {
                   $response .= '<tr><td width="50%" align="center" valign="middle">' . $key . '</td>
                       <td width="50%" align="center" valign="middle">' . $value . '</td></tr>';
               }
           } else {
               $response .= '<tr><td width="50%" align="center" valign="middle">' . $key . '</td>
                   <td width="50%" align="center" valign="middle">' . $value . '</td></tr>';
           }
       }
       $response .= '<tr><td width="50%" align="center" valign="middle">Checksum Verified?</td>';
       if ($bool == 1) {
           $response .= '<td width="50%" align="center" valign="middle">Yes</td></tr>';
       }
       else {
           $response .= '<td width="50%" align="center" valign="middle"><font color=Red>No</font></td></tr>';
       }
    
       return $response;
    }
    
    public function error_codes()
    {
     $transaction_errors =  array('100' => 'The transaction was completeted successfully.',
           '101' => 'Merchant not found. Please check your merchantIdentifier field.',
           '102' => 'Customer cancelled transaction.',
           '103' => 'Fraud Detected.',
           '104' => 'Customer Not Found.',
           '105' => 'Transaction details not matched.',
           '106' => 'IpAddress BlackListed.',
           '107' => 'Transaction Amount Limit Not Matched.',
           '108' => 'Validation Successful.',
           '109' => 'Validation Failed.',
           '110' => 'MerchantIdentifier field missing or blank.',
           '111' => 'MerchantIdentifier Not Valid.',
           '129' => 'OrderId field missing or blank.',
           '130' => 'OrderId received with request was not Valid.',
           '110' => 'Order Id Already Processed with this Merchant.',
           '131' => 'ReturnUrl field missing or blank.',
           '132' => 'ReturnUrl received with request was not Valid',
           '133' => 'BuyerEmail field missing or blank.',
           '189' => 'ReturnUrl does not match the registered domain.',
           '134' => 'BuyerEmail received with request was not Valid.',
           '135' => 'BuyerFirstName field missing or blank.',
           '136' => 'BuyerFirstName received with request was not Valid.',
           '137' => 'BuyerLastName field missing or blank.',
           '138' => 'BuyerLastName received with request was not Valid.', '139' => 'BuyerAddress field missing or blank.',
           '140' => 'BuyerAddress received with request was notValid.',
           '141' => 'BuyerCity field missing or blank.',
           '142' => 'BuyerCity received with request was not Valid.',
           '143' => 'BuyerState field missing or blank.',
           '144' => 'BuyerState received with request was not Valid.',
           '145' => 'BuyerCountry field missing or blank.',
           '146' => 'BuyerCountry received with request was not Valid.',
           '147' => 'Buyer PinCode field missing or blank.',
           '148' => 'BuyerPinCode received with request was not Valid.',
           '149' => 'BuyerPhoneNumber field missing or blank.',
           '150' => 'BuyerPhoneNumber received with request was not Valid.',
           '151' => 'TxnType field missing or blank.',
           '152' => 'TxnType received with request was not Valid.',
           '153' => 'ZpPayOption field missing or blank.',
           '154' => 'ZpPayOption received with request was not Valid.',
           '155' => 'Mode field missing or blank.',
           '156' => 'Mode received with request was not Valid.',
           '157' => 'Currency field missing or blank.',
           '158' => 'Currency received with request was not Valid.',
           '159' => 'Amout field missing or blank.',
           '160' => 'Amount received with request was not Valid.',
           '161' => 'BuyerIpAddressfield missing or blank.',
           '162' => 'BuyerIpAddress  received with request was not Valid.',
           '163' => 'Purposefield missing or blank.',
           '164' => 'Purpose received with request was not Valid.',
           '165' => 'ProductDescription field missing or blank.',
           '166' => 'ProductDescription received with request was not Valid.',
           '167' => 'Product1Description received with request was not Valid.',
           '168' => 'Product2Description received with request was not Valid.',
           '169' => 'Product3Description received with request was not Valid.',
           '170' => 'Product4Description received with request was not Valid.',
           '171' => 'ShipToAddress received with request was not Valid.',
           '172' => 'ShipToCity received with request was not Valid.',
           '173' => 'ShipToState received with request was not Valid.',
           '174' => 'ShipToCountry received with request was not Valid.',
           '175' => 'ShipToPincode received with request was not Valid.',
           '176' => 'ShipToPhoneNumber received with request was not Valid.',
           '177' => 'ShipToFirstname received with request was not Valid.',
           '178' => 'ShipToLastname received with request was not Valid.',
           '179' => 'Date is blank or Date received with request was not valid.',
           '180' => 'checksum received with request is not equal to what we calculated.',
           '181' => 'Merchant Data Complete.',
           '182' => 'Merchant Data Not Complete in Our Database.',
           '183' => 'Unfortunately, the transaction failed due to some unexpected reason in our system.',
           '400' => 'The transaction was declined by the issuing bank.',
           '401' => 'The transaction was rejected by the acquiring bank.');
    }

Purchases Controller :

class PurchasesController extends AppController {

::

    public  $components = array('Payments.ZaakPay');
    
    public function beforeFilter()
    {
       parent::beforeFilter();
       //$this->Auth->allow('*');
    }
    
    public function zaakpay(){
    
       $orderId = $this->ZaakPay->getOrderId();
    
       $ZaakMerchantIdentifier = $this->ZaakPay->config['ZaakMerchantIdentifier'];
       $this->set(compact('orderId','item','ZaakMerchantIdentifier'));
    }
    
    public function zaakpay_post_data(){
    
       if(!empty($_POST)){
    
           $all = $this->ZaakPay->getAllParams();
    
           $checksum = $this->ZaakPay->calculateChecksum($all);
    
           $formHtml = $this->ZaakPay->outputForm($checksum);



//create an order & save it to DB if needed

//your code goes here

::

    $this->set(compact('formHtml'));
       }
    }
    
    public function zaakpay_response(){
    
       $original_response = $_POST;
    
       $recd_checksum = $_POST['checksum'];
       $all = $this->ZaakPay->getAllParams();
    
       $checksum_check = $this->ZaakPay->verifyChecksum($recd_checksum, $all);
       $response = $this->ZaakPay->outputResponse($checksum_check);
    
       //update transaction
       if($_POST['responseCode'] == '100'){
            //update your saved order
       }else{
           //delete order
       }
    
       $this->set(compact('response', 'original_response'));
    }
    
    public function zaakpay_updates(){
    
    }
    
    public function zaakpay_check_transaction(){
    
    }

Views for the actions :

For action zaakpay:

<div class="hero-unit"> <h2>Payment Process </h2>

::

    <form action="/payments/purchases/zaakpay_post_data" method="post">
       <input type="hidden" name="merchantIdentifier" value="<?php echo $ZaakMerchantIdentifier;?>"/>
       <input type="hidden" name="orderId" value="<?php echo $orderId;?>"/>
       <input type="hidden" name="txnType" value="1"/>
       <input type="hidden" name="zpPayOption" value="1"/>
       <input type="hidden" name="mode" value="1"/>
       <input type="hidden" name="currency" value="INR"/>
       <input type="hidden" name="amount" value="item price"/>
       <input type="hidden" name="merchantIpAddress" value="<?php echo $_SERVER['SERVER_ADDR']?>"/>
       <input type="hidden" name="purpose" value="1"/>
       <input type="hidden" name="productDescription" value="product description"/>
       <input type="hidden" name="txnDate" id="txnDate" value="<?php echo date('Y-m-d');?>"/>
               <h2>Pay Now via Zaakpay.</h2>
    
       <table width="650px;">
           <tr>
               <td colspan="2"> </td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Song Name</td>
               <td width="50%" align="center" valign="middle"><?php echo $song['Song']['name'];?></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Price</td>
               <td width="50%" align="center" valign="middle"><?php echo $song['Song']['price'];?> Rs</td>
           </tr>
           <tr>
               <td colspan="2"> </td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer Email</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerEmail"
                                                                     value="buyer_email"/></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer First Name</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerFirstName"
                                                                     value=""/></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer Last Name</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerLastName"
                                                                     value="/></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer Address</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerAddress" value=""/></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer City</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerCity" value=""/></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer State</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerState" value=""/></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer Country</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerCountry" value=""/></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer Pincode</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerPincode" value=""/></td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle">Buyer Phone No</td>
               <td width="50%" align="center" valign="middle"><input type="text" name="buyerPhoneNumber" value=""/>
               </td>
           </tr>
           <tr>
               <td width="50%" align="right" valign="middle"> </td>
               <td width="50%" align="center" valign="middle">
                   <input type="submit" name="submit" value="Pay Now"/>
               </td>
           </tr>
    
    
       </table>
    
    </form>

</div> Post data for request creation : Above action get submitted to
the Purchases controller & then zaak pay component creates a request
format & post the data inside form to the payment gateway.

Action : zaak_pay_post_data()

<div class="hero-unit"> <h2>Payment Process </h2>

::

    <div>
       <h3>Please wait we are redirecting you to the payment gateway.....</h3>
    </div>
    
    <form action="https://api.zaakpay.com/transact" method="post" id="paymentForm">
       <?php
       echo $formHtml;
       ?>
    </form>

</div>

<script type="text/javascript"> $(document).ready(function () {
$("#paymentForm").submit(); });</script>

Now User get redirected to the zaakpay site for payment, user
completes the payment & then get returned to the action that is set
inside the zaakpay control panel.

Action : zaakpay_response()

<div class="hero-unit"> <h2><?php echo __('Song'); ?></h2> <table
cellpadding="0" cellspacing="0" width="100%" class="table table-
condensed">

::

    <?php
       if ($original_response['responseCode'] == '100') {
           ?>
           <tr>
               <td>
                   Your transaction for Order Id <?php echo $original_response['orderId'];?> has been successfully
                   completed.
               </td>
           </tr>
           <?php
       } else {
           echo $response;
       }
    
       ?>
    </table>

</div>

This is the flow of successful transaction. We are yet to handle the
errors & display them to the page. This is a basic integration, you
can modify this as per your need.

Suggestions are welcome. Please contact me on kvijay@weboniselab.com



.. _http://www.zaakpay.com/: http://www.zaakpay.com/

.. author:: kvijay
.. categories:: articles, components
.. tags:: Components,payment gateway,zaakpay

