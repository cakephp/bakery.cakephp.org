The Weather Channel Component
=============================

The Weather.com offers an XML-based API to retrieve information about
the weather around the world. You need an access key, and to get it,
simply register here http://bit.ly/b6paHr. After registration you can
download the documentation for more information.


Component Class:
````````````````

::

    <?php 
    /* The Weather Channel component for Cakephp
     * @author Bruno Bertolini www.brunobertolini.com - www.twitter.com/brunobertolini
     * @version 0.1 some bugs has been fixed.
     * @license http://www.opensource.org/licenses/mit-license.php
     */
    
    App::import ( 'Core' , array( 'Xml' , 'HttpSocket' ) );
    
    /*
     * The Weather Channel component class
     */
    
    class WeatherChannelComponent extends Component
    {
        public $components = array ( 'RequestHandler' );
    
        /*------------------------------------------------------------------------*/
    
        private $par = 'YOUR PARTNER ID';
        private $key = 'YOUR LICENSE KEY';
    
        /*------------------------------------------------------------------------*/
    
        const API_URI           = 'xoap.weather.com';
        const PATH_SEARCH       = '/search/search';
        const PATH_REFRESH_RATE = '/weather/local';
        
        /*------------------------------------------------------------------------*/
    
        /**
         * Get the location code for a particular city.
         *
         * @param string $location
         * @return string Location code
         */
        public function get_location_code( $location )
        {
            $uri = self::PATH_SEARCH . '?where=' . urldecode ( $location );
            $out = $this->_sendRequest ( $uri );
            preg_match_all( "/\<loc id=\"(.*?)\"/s", $out, $id );
            return $id[1][0];        
        }
    
        /**
         * Get the forecast for a city determined by the location code
         *
         * @param string $location_code Returned by get_location_code();
         * @param int [$dayf] previsÃ£o para os proximos {$dayf} days
         * @param string [$cc]
         * @return XMLObject
         */
        public function get_conditions( $location_code , $dayf = 5 , $cc = '*' )
        {
            $uri = self::PATH_REFRESH_RATE . "/{$location_code}?cc={$cc}&dayf={$dayf}&link=xoap&prod=xoap&par={$this->par}&key={$this->key}";
            $out = $this->_sendRequest ( $uri , false );
            $out = new Xml ( $out );
            $out = $out->toArray();
            return $out;
        }
    
        /*------------------------------------------------------------------------*/
    
        private function _sendRequest ( $uri )
        {
            $this->Http =& new HttpSocket();
            $out = $this->Http->get ( 'http://' . self::API_URI . $uri );
            return $out;
        }
    
    }
    ?>



.. author:: brunonlab
.. categories:: articles, components
.. tags:: api,component,weather,Components

