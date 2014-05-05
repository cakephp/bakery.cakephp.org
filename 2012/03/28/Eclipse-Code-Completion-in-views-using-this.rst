Eclipse Code Completion in views using $this
============================================

If you are having problems getting eclipse to autocomplete helpers in
views. Try this
Create this file ( helper_complete.php ) add to your app/View
directory, refresh your project and all should work. ( it does for me
anyway! ) Add in helpers as you need

PHP Snippet:
````````````

::

    <?php 
    App::uses('AppHelper', 'Helper');
    /**
     * this Helper
     *
     * @property Html $Html
     * @property Session $Session
     * @property Form $Form
     */
    class this extends AppHelper
    {
    	var $Html;
    	var $Session;
    	var $Form;
    	
    	public function __contruct()
    	{
    		$this->Html = new HtmlHelper($View);
    		$this->Session = new SessionHelper($View);		
    		$this->Form = new FormHelper($View);		
    	}
    }
    
    $this = new this();
    ?>



.. author:: leoden
.. categories:: articles
.. tags:: autocomplete,Eclipse,intellisense,Articles

