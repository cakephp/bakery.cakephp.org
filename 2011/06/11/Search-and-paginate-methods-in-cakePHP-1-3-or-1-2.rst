Search and paginate methods in cakePHP 1.3 or 1.2
=================================================

Some times users need to search trough our data and then navigate to
result pages, but when they click on next page the result lost. How
can we fix it? I want to show how easily we can paginate through our
search result without losing our searched data.
In this toturial we will use GET method to submit our search keyword.
In controller you should create Search function using an argument like
this:

::

    
    class ItemsController extends AppController {
    
    ...
    
    
    
    function search($keyword = null){
    
              ...
    
    		  //This is an example code to gain the Keyword from argument or querystring or data array
    
    		if(!empty($_GET['keyword']))
    
    			$keyword = (empty($keyword))? Sanitize::clean($_GET['keyword'], array('encode' => false)):Sanitize::clean($keyword, array('encode' => false));
    
    		$keyword = (empty($keyword))?Sanitize::clean($this->data['Item']['keyword'], array('encode' => false)):Sanitize::clean($keyword, array('encode' => false));
    
    		
    
    		$this->Item->recursive = 0;
    
    		$or = '';
    
    		if(!empty($keyword))
    
    		{
    
    			$or	= array( 'or'=> array(
    
    						 'Item.title Like'		=> '%'.$keyword.' %'
    
    						,'Item.keywords Like'	=> '%'.$keyword.' %'
    
    						,'Item.description Like'	=> '%'.$keyword.' %'
    
    					));
    
    					
    
    			$condition = (array('Item.enable' => 'yes',$or));
    
    			
    
    			$_GET['keyword'] = $keyword;
    
    			
    
    			$this->paginate = array('Item'=>array(
    
     						'fields' => array('Item.title', 'Item.summary'),
    
    						'limit' => 20,
    
    						'order' => array( 'Item.title' => 'DESC')
    
    						'conditions'=>$conditions
    
    						)
    
    					);
    
    			
    
    			$this->set('items', $this->paginate());
    
    		
    
    		...
    
    }
    
    ...
    
    }
    
    
    
    Now in View you should add this line before pagination code
    
    Form->create('Item',array('action'=>'search','type'=>'get') );?>
    
    
    Form->input('keyword', array('div'=>false,
    
    		'label'=>array('text'=>__('Search for:',true),'style'=>'display:inline'),
    
    		'size' => '50', 
    
    		'maxlength'=>35, 
    
    		'style'=>'display:inline', 
    
    		'value'=>!empty($_GET['keyword'])?$_GET['keyword']:null));?>
    ...
    
    	Paginator->options(array('url' => array($_GET['keyword'])));?>
    	//I send pagination element and just call it everywhere I need
    
    	element('site_pagination'); ?>
    ...
    
    	
    		
    		Paginator->sort(__('Name',true),'title');?>	
    
    	
    ...
    
    Form->end(__('Search',true));?>

It is done!
Now you can search and navigate trought its result pages or also sort
your result.
In the first page you get the "Keyword" from qury string and if you
click to sort you result or in the other pages you will get the
"Keyword" from argument


.. author::
.. categories:: articles, tutorials
.. tags:: Tutorials

