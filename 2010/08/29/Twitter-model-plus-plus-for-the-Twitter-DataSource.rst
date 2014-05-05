Twitter model plus plus (for the Twitter DataSource)
====================================================

I've added a few helpful functions to the Twitter model for the
Twitter DataSource example in the 1.3 CakePHP Cookbook. Specifically,
the auto detection and shrinking of URLs in a string intended for
Twitter.
The CakePHP.org Cookbook has a great little example for a Twitter
DataSource: `http://book.cakephp.org/view/1077/An-Example`_
I've expanded on the model in the example to add a few helpful
methods. Figured I would share it with the world as shrinking URL's
for twitter is pretty commonplace today.

Once you are familiar with the CookBook example (link above) my model
is really easy to use.


The code and example
~~~~~~~~~~~~~~~~~~~~

First the model:

::

    <?php
    /**
     * Model for use with Tweet datasource (http://book.cakephp.org/view/1077/An-Example)
     * Requires PHP 5.2+
     *
     * Based on http://book.cakephp.org/view/1077/An-Example 
     * with help from http://snipplr.com/view/36992/improvement-of-url-interpretation-with-regex/
     * 
     * big ups to regexpal.com and tinyurl.com
     * 
     * Exmaples:
     * 
     * $this->Tweet->find('all');
     * 
     * $conditions= array('username' => 'caketest');
     * $otherTweets = $this->find('all', compact('conditions'));
     * 
     * $this->save(array('status' => 'This is an update'));
     * 
     * @author		  rynop
     * @link          http://bakery.cakephp.org/articles/view/twitter-model-plus-plus-for-the-twitter-datasource, http://rynop.com
     * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
     *
     */
    class Tweet extends AppModel {
    	public $useDbConfig = 'twitter';
    
    	/**
    	 * Convert a URL to a tinyurl
    	 * @param string $url
    	 * @return string URL
    	 */
    	public function getTinyURL($url){
    		App::import('Core', 'HttpSocket');
    		$conn = new HttpSocket();
    		return $conn->get("http://tinyurl.com/api-create.php","url=$url");
    	}
    	
    	/**
    	 * Post something to your twitter account. Member it truncates at 160.
    	 * @param string $theTweet
    	 * @param boolean $shrinkURLs
    	 */
    	public function statusUpdate($theTweet,$shrinkURLs=true){
    		if(true===$shrinkURLs){			
    			$regex = '@((https?://)?([-\w]+\.[-\w\.]+)+\w(:\d+)?(/([-\w/_\.]*(\?\S+)?)?)*)@';
    			$theTweet = preg_replace_callback($regex, array(&$this, 'createTinyURLCallback'), $theTweet);
    		}
    		
    		if(Configure::read('debug') == 0) $this->save(array('status' => $theTweet));
    		else debug($theTweet);
    	}
    	
    	private function createTinyURLCallback($matches){
    		return $this->getTinyURL($matches[0]);	
    	}	
    }
    ?>

Now an example controller:

::

    <?php
    class NewsController extends AppController {
       var $name = 'News';
       function index(){   		
          $this->set('title_for_layout', 'Home');
          $this->loadModel('Tweet');
    	   	
          $this->Tweet->statusUpdate('Sites I like - http://rynop.com http://leaguelogix.com http://news.ycombinator.com/');
       }
    }
    ?>

In short, what this does is converts the long URLs into tinyurl.com
ones - automatically.

So why tinyurl.com instead of bit.ly? bit.ly requires api creds, and I
don't care about tracking URLS. Plus, consuming the tinyurl.com
service is a 1 liner and is not resource intensive! (thanks
HttpSocket)

Note: If you have a high traffic site - bit.ly may be better, as I'm
guessing they have a batch conversion of a json array of urls (only
requires 1 socket connection vs X in my example).

Oh, and if its not posting your tweet to your twitter account, change
your debug level in core.php to 0, or rip out the line of code where I
check debug level ;)

Hope this helps someone else out.


.. _http://book.cakephp.org/view/1077/An-Example: http://book.cakephp.org/view/1077/An-Example

.. author:: rynop
.. categories:: articles, models
.. tags:: url,datasource,twitter,tinyurl,bit,bitly,tiny,ly,Models

