Number Plus Helper
==================

A helper that extends the Number Helper for more readability of large
numbers.

I needed a method of making very large numbers more readable. For
instance, taking a number like 7000 and making it 7K. It allows for
setting a precision decimal value as well making 7500 look like 7.5K.

::

    
    App::import('Helper', 'Number');
    // app/views/helpers/number_plus.php
    class NumberPlusHelper extends NumberHelper {
    	
    	function toReadableQuantity($num = null, $decimals = 0){
    		if($num){
    			switch(true){
    				case ($num >= 1000 && $num < 1000000):
    					return $this->precision($this->precision($num,0)/1000,$decimals).'K';
    				case ($num >= 1000000 && $num < 1000000000):
    					return $this->precision($this->precision($num,0)/1000000,$decimals).'M';
    				case ($num >= 1000000000):
    					return $this->precision($this->precision($num,0)/1000000000,$decimals).'B';
    				default:
    					return $num;
    			}
    		}
    		return $num;
    	}
    }



.. author:: xsaint
.. categories:: articles, helpers
.. tags:: helper,helpers,number,Helpers

