Component For Google Custom Search
==================================

This is a pretty simple component for retrieving your Google Custom
Search Engine results and returning them to cake wrapped in an array.
This will only work for a Business account which grants you access to
the custom search api. Usage is quite simple, add the component to
your controller and pass the search term to the run_search() method.


Component Class:
````````````````

::

    <?php 
    
    class GoogleComponent extends Object {
    //File: /app/controllers/components/google.php
    
    /**
     * Google component simple class for retrieving Google
     * custom search results and returning them in an array (with other properties)
     *
     * Requires PHP5 (simple xml) and the cURL library
     * 
     * @author Paul thompson
     * @version 1.0
     * @category Components
     */ 
    	
    	
    	
    	//set your parameters
    	var $token = "0oihiop9405hfyjkf95giyg7822458khkl834:xtmyr30y-w"; //your CSE token
    	var $result_format = "xml_no_dtd"; //xml_no_dtd
    	var $rpp = 10; //results per page
    	var $search_url = "/search"; //path to your site's search results page
    	 
    	/**
    	 * Retrives the xml result set from google
    	 *
    	 *@uri - the full uri of the search request
    	 *@debug - if true will use cake's debug function to output the full xml response
    	 **/
    	private function get_result_xml($uri, $debug=false)
    	{ 
    		
    		$ch = curl_init();
    		curl_setopt($ch, CURLOPT_URL, $uri);
    		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    		curl_setopt($ch, CURLOPT_REFERER, $_SERVER['REQUEST_URI']);
    		$body = curl_exec($ch);
    		curl_close($ch);
    		
    		if(!$doc = new SimpleXmlElement($body, LIBXML_NOCDATA))
    		{
    			echo "Could not parse the xml.";	
    		}
    		
    		if($debug){debug($doc);}
    		
    		return $doc;
    	}
    	
    	/**
    	 * Retrieves the spelling suggestion - if there is one
    	 *
    	 * @xml = the simple xml object
    	 **/
    	 private function get_spelling_suggestion($xml)
    	 {
    	 	return strip_tags($xml->Spelling->Suggestion);
    	 }
    	 
    	
    	/**
    	 * Gets the total results based upon what is returned
    	 *
    	 * @xml = the simple xml object
    	 **/
    	private  function get_total_results($xml)  
    	{  
    		return $xml->RES->M;
    	}
    	
    	
    	/**
    	 * Builds a simple array out of the xml result set
    	 *
    	 * @xml = the simple xml object
    	 **/
    	private function get_results_array($xml)
    	{
    		$r_ar = array();
    		$i = 0;
    		foreach($xml->RES->R as $res)
    		{
    			$r_ar[$i]['link'] = $res->U;
    			$r_ar[$i]['title'] = $res->T;
    			$r_ar[$i]['description'] = $res->S;
    			
    			$i++;
    		}
    		return $r_ar;	
    	}
    	
    	/**
    	 * gets the "viewing results x - xx text"
    	 *
    	 * */
    	function get_result_text($start, $page_count)
    	{
    		return "Viewing results ".($start+1)." to ".($start+$page_count);
    	}
    	
    	/**
    	 * returns the html links for paging
    	 *
    	 **/
    	private function get_paging_links($start, $term, $page_count)
    	{
    		$prev= "";
    		$next = "";
    		$curr_page = " Page 1 ";
    		
    		
    		//get the current page
    		if($start > 0)
    		{
    			$curr_page = "Page ".(1 + ($start / $this->rpp));
    		}
    		
    		
    		if($start > 0)
    		{
    			$prev = "<a href='".$this->search_url."?term=".$term."&start=".($start-$this->rpp)."'>‹ Previous</a> ";
    		}
    		
    		if($page_count >= $this->rpp)
    		{
    			$next = " <a href='".$this->search_url."?term=".$term."&start=".($start+$this->rpp)."'>Next ›</a>";
    		
    		}
    		
    		if($next != "" && $prev != "")
    		{
    			$split = "";
    		}
    		
    		return $prev."<strong>".$curr_page."</strong>".$next;	
    	}
    	
    	/**
    	 * run_search = call this from the controller
    	 * @term- the term to search for
    	 * @start - which result to start at (for paging)
    	 * @debug - setting to true will output the xml to the screen
    	 * */
    	public function run_search($term, $start=0, $debug=false)
    	{
    		$return = array();
    		
    		$end = $start+$this->rpp;
    		$search_uri = "http://www.google.com/cse?cx=".urlencode($this->token)."&client=google-csbe&start=".$start."&num=".$this->rpp."&output=".$this->result_format."&q=".urlencode($term);
    		$results = $this->get_result_xml($search_uri, $debug);
    		
    		
    		$return['spelling'] = $this->get_spelling_suggestion($results);
    		$return['total'] = $this->get_total_results($results);
    		$return['results'] = $this->get_results_array($results);
    		$return['paging'] = $this->get_paging_links($start, $term, sizeof($return['results']));
    		$return['result_text'] = $this->get_result_text($start, sizeof($return['results']));
    		
    		return $return;
    	} 
       
    }
    
    
    ?>

After including the component in your $components array, you would
call it in your action as so (controller names are hypothetical, it
can be whatever you wish):


Controller Class:
`````````````````

::

    <?php 
    class SearchController extends AppController {
    	
    	var $uses = array();
    	var $components = array("Google");
    	var $name = "Search";
    	
    	function index()
    	{
    		$start = (empty($this->params['url']['start']) ? 0 : $this->params['url']['start']);
    		$term = $this->params['url']['term'];
    		$search_results = array();
    	
    		
    		
    		
    		//just send them back if the search is empty
    		if(empty($term))
    		{
    			$this->redirect($this->referer());
    		}
    		else
    		{
    			$search_results = $this->Google->run_search($term, $start, false);
                            //debug($search_results) //uncomment to see return's structure
    		}
    		
    		
    		$this->set("search_results", $search_results);
    		
    		$this->render();
    
    	}
    }
    
    ?>

The run_search() function returns an array not just of the results,
but other useful info. A hypothetical view using this array would look
like this (assumes the array is set to view as $search_results).


View Template:
``````````````

::

    
    <? if(!empty($search_results['spelling'])){ ?>
    <p>
    	Did you mean <a href="/search?term=<?=$search_results['spelling']?>"><?=$search_results['spelling']?></a>?
    </p>
    <? } ?>
    
    
    <div>
    
    <p>
    <?=$search_results['result_text']?>
    </p>
    
    <?
    foreach($search_results['results'] as $result)
    {
    ?>
    <div>
    	<h3><a href="<?=$result['link']?>"><?=$result['title']?></a></h3>
    	<p>
    		<?=$result['description']?><br />
    		<a href="<?=$result['link']?>"><?=$result['link']?></a>
    	</p>
    </div>
    <?
    }
    ?>
    
    <p><?=$search_results['paging']?></p>
    </div>



.. author:: rpupkin77
.. categories:: articles, components
.. tags:: google,search,component,google custom search,Components

