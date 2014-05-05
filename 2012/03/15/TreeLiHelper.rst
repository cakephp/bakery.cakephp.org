TreeLiHelper
============

Helper para criar lista html com links nos nós sem filhos gerados por
uma tree->generateTreeList() no cakephp 2.1
No controller coloque:

PHP Snippet:
````````````

::

    <?php 
    public function index(){
    	$this->loadModel('Model');
    	$this->set('data',$this->Model->generateTreeList());
    }
    ?>

na View:


PHP Snippet:
````````````

::

    <?php 
    echo '<ul data-role="listview" data-divider-theme="a" data-inset="true">';
    echo $this->TreeView->createTree($data,array('controller'=>'Categorias','action'=>'view'));
    echo '</ul>';
    ?>

Crie um arquivo com o nome TreeLiHelper.php na pasta /app/View/Helper/
com o seguinte conteudo:

PHP Snippet:
````````````

::

    <?php 
    App::uses('AppHelper', 'View/Helper');
    class TreeLiHelper extends AppHelper {
    	public $helpers = array('Html');
        public $link;
        public function createTree($tree,$link){
        	$this->link = $link;
    		$out = '';
    		$count = 0;
    		$buffer = null;
    		foreach($tree as $id => $item){
    			$depth = strrpos($item, '_');
    			if ($depth === false) {
    				$depth = 0;
    				$clean_item = $item;
    			} else {
    				$depth = $depth + 1;
    				$clean_item = substr($item, strrpos($item, '_')+1);
    			}
    			if($buffer != null){
    				$out .= $this->makeLi($buffer,$depth,$id);
    			}
    			$buffer['item'] = $clean_item;
    			$buffer['depth'] = $depth;
    		}
    		$out .=$this->makeLi($buffer,0,$id);
    		return $out;
        }
        
        protected function makeLi($buffer,$depth,$id){
        	if($buffer['depth']==$depth){
        		$out = '<li>'.$this->makeLabel($buffer['item'],$id)."</li>\n";
        	}elseif($buffer['depth']<$depth){
        		$out = '<li>'.$this->makeLabel($buffer['item'])."\n<ul>\n";
        	}elseif($buffer['depth']>$depth){
        		$out = "<li>".$this->makeLabel($buffer['item'],$id)."</li>\n";
        		$diff = $buffer['depth']-$depth;
        		for($i=0; $i<$diff;$i++){
        			$out .= "</ul> \n </li>\n";
        		}
        			
        	}
        	return $out;
        }
    
        protected function makeLabel($item, $id = null){
        	if($id!=null){
        		$return = $this->Html->link($item, $this->mountLink($id));
        	}else{
        		$return = $item;
        	}
        	return $return;
        }
        
        protected function mountLink($id){
        	if(is_array($this->link)){
        		$link = $this->link;
        		$link[] = $id;
        	}else{
        		$link = rtrim($this->link,'/').'/'.$id;
        	}
        	return $link;
        }
        
    }
    ?>



.. author:: filippi
.. categories:: articles, helpers
.. tags:: tree,list,generateList,tree behavior,Helpers

