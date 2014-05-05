Get Twitpic RSS Feeds with CakePHP
==================================

Get Twitpics feeds with caching and limits
Download the code below and save in models directory
named(Twitpic.php)
Put the Twitter username.
Use this model in your controller
var $uses = array('Twitpic');
Now Fetch the latest twitpics thumbnail by calling this function

$this->set('twits',$this->Twitpic->find())
Now you have the feeds array in view.

Enjoy!


Model Class:
````````````

::

    <?php 
        /**
         * Get Twitpic Photos
         *
         * $twitpics = $this->Twitpic->find(array('cache'=>true,'limit'=>8));
         *
         * @author        navidurrahman@gmail.com
         * @link          http://www.goodlogics.com
         */
        class Twitpic extends AppModel
        {
            
            /**
             * Remove your name from posts
             * Set to false to not remove your name, otherwise set to your name
             *
             * @var mixed
             * @access public
             */
            public $twitterName = 'nvdo';
            
            /**
             * Show replies to people
             *
             * @var boolean
             * @access public
             */
            public $viewReplies = false;
            
            /**
             * Twitpic RSS URL
             *
             * @var string
             * @access public
             */
            public $rssUrl = 'http://twitpic.com/photos/:twitterName/feed.rss';
            
            /**
             * Turn off table usage
             *
             * @var string
             * @access public
             */
            public $useTable = false;
            
            /**
             * Duration of cache
             *
             * @var string
             * @access public
             */
            public $cacheDuration = '+30 mins';
        
        
            /**
             * Find TwitPics
             *
             * @param array $options Options when getting twits, as followed:
             *                          - cache: Force caching on or off
             *                          - limit: Limit number of records returned
             * @access public
             * @return array
             */
            public function find($options = array())
            {
                //Get TwitPics
                if((isset($options['cache']) && $options['cache'] == false) || ($twits = Cache::read('Twitpic.lines')) == false)
                {
                    $twits = $this->_getTwitPics();
                    Cache::set(array('duration' => $this->cacheDuration));
                    Cache::write('Twitpic.lines',$twits);
                }
                
                //Set to limit
                if(isset($options['limit']) && count($twits) > $options['limit'])
                {
                    $twits = array_slice($twits, 0, $options['limit']);
                }
                
                return $twits;
            }
            
            /**
             * Get Twitpic Photos
             * 
             * @access private
             * @return array
             */
            private function _getTwitPics()
            {        
                //Fetch feed
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL,String::insert($this->rssUrl,array('twitterName'=>$this->twitterName)));
                curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $feed = curl_exec($ch);
                curl_close($ch);
                
                if(!$feed) { return false; }
    
                $xml = new SimpleXmlElement($feed);
                
                foreach($xml->channel->item as $item)
                {
                    $title = (string)$item->title;
                    $description = (string)$item->description;
                    
                    if(!$this->viewReplies && preg_match('/^'.$this->twitterName.': @/',$title))
                        continue;
                
                    //Remove name
                    if($this->twitterName)
                        $title = trim(preg_replace('/^'.$this->twitterName.':/','',$title));
                        $title = trim(preg_replace('@(https?://([-\w\.]+)+(:\d+)?(/([\w/_\.]*(\?\S+)?)?)?)@', '', $title));
                        $description = trim(preg_replace('/^'.$this->twitterName.':/','',$description));
                        
                    $description = trim(preg_replace('@.*?<br>@si','',$description));
                        
                    $out[] = array(
                        'title' => $title,
                        'description' => $description,
                        'pubDate' => strtotime($item->pubDate),
                        'guid' => (string)$item->guid,
                        'link' => (string)$item->link
                    );
                }
                
                return $out;
            }
        
        }
    
    ?>



.. author:: navidurrahman
.. categories:: articles, tutorials
.. tags:: twitter,twitpic,Tutorials

