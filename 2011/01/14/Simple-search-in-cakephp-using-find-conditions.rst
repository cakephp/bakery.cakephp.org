Simple search in cakephp using find() conditions.
=================================================

This is a simple search using cakephp. I have used only cakephp find
conditions with video and profiles table. Table structures CREATE
TABLE IF NOT EXISTS `videos` ( `id` int(11) NOT NULL AUTO_INCREMENT,
`created` date NOT NULL, `name` varchar(255) NOT NULL DEFAULT '',
`size` int(11) NOT NULL DEFAULT '0', `desc` text, `tags` text,
`can_comment` tinyint(1) NOT NULL DEFAULT '1', `thumbnailpath`
varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) )
create a controller file searches_controller.php in app/controllers/..

create a model file search.php in app/models/..

app/models/search.php::

    class Search extends AppModel {

    var $name = 'Search';



    }
    ?>

app/controllers/searches_controller.php::

    class SearchesController extends AppController {

    var $name = 'Searches';
    var $components = array('Auth');
    var $uses = array('Video','Rating','Category');

    function beforeFilter()
    {
    parent::beforeFilter();
    }

    function simple_search()
    {
    Configure::write('debug',0);
    $conditions = array();
    $or_conditions = array();
    $final_conditions = array();
    $search_fields = array('Video.name','Video.tags','Video.desc');
    //fields to search 'Video.tags','Video.desc'
    $this->layout= "";
    $value = $this->data["Search"]["value"];
    $searches = explode(" ",$value);

    foreach($search_fields as $f)
    {

    array_push($conditions,array("$f Like"=>"%$value%"));
    for($i=0;$i
    {
    if($searches[$i] !="")
    {
    array_push($conditions,array("$f Like"=>"%$searches[$i]%"));
    }
    }

    array_push($or_conditions,array('OR'=>$conditions));
    $conditions = array();

    }
    $final_conditions = array('OR'=>$or_conditions);
    // $final_conditions =$or_conditions;
    $videos = $this->Video->find('all',array('limit'=>10,'conditions'=>$fi
    nal_conditions,'fields'=>array('Video.*')));
    }

    }


$search_fields = array('Video.name','Video.tags','Video.desc');

Instead of Video you can use any table name like users,profiles etc.

name,tags,desc are fields //you can add any number of fields there

$videos = $this->Video->find('all',array('limit'=>10,'conditions'=>$fi
nal_conditions,'fields'=>array('Video.*')));

It will return video array which related to your keywords.

create a form with name 'Search' and create a input field with name
'value'

*.ctp coding*::

    echo $this->Form->create('Search',array('url'=>array('controller'=>'se
    arches','action'=>'video'),'type'=>'get')); ?>
    echo $this->Form->input('value',array('label'=>'','value'=>''));

    echo $this->Form->submit('Search');
    ?>




.. author:: saravana
.. categories:: articles
.. tags:: search,CakePHP,find,findAll,simple,order,binary search,Articles

