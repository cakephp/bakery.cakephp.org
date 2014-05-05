First Data Global Gateway API Plugin Component
==============================================

The Ggapi component simplifies credit card processing using the First
Data/Yourpay/Linkpoint Global Gateway API. It supports testing and
live configurations, along with local to remote field mapping. Once
configured, all you have to do is feed the component an array of order
data (fields used are up to you) and it will map the fields, build the
XML string, submit the string, read the response from the gateway, and
convert the response back into an array.
Requirements: PHP5 with curl support and a Global Gateway API account
(live or testing).

Example controller code:


Controller Class:
`````````````````

::

    <?php
    // attempt the charge (array $data, boolean $testing)
    $response = $this->Ggapi->ggProcess($data, true);

    // update the order table with the response
    if ($response) {
        if ($response['r_approved'] == 'APPROVED') {
            // merge the response data with the order data
            $this->data['Order'] = array_merge($this->data['Order'], $response);
        } else {
            // card was DECLINED
            $error = explode(':', $response['r_error']);
            $this->Session->setFlash(
                'Your credit card was declined. The message was: '.$error[1],
                'modal',
                array('class' => 'modal error')
            );
            $this->redirect(array('controller' => 'orders', 'action' => 'checkout'));
        }
    } else {
        // no response from the gateway
        $this->Session->setFlash(
            'There was a problem connecting to our payment gateway, please try again.',
            'modal',
            array('class' => 'modal error')
        );
        $this->redirect(array('controller' => 'orders', 'action' => 'checkout'));
    }
    ?>

Download/git clone at `http://github.com/chronon/ggapi`_.

.. _http://github.com/chronon/ggapi: http://github.com/chronon/ggapi

.. author:: chronon
.. categories:: articles, components
.. tags:: yourpay,payment processing,linkpoint,global gateway,first data,Components

