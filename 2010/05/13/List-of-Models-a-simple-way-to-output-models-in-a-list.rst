List of Models - a simple way to output models in a list.
=========================================================

test

::

    
    <?php
    	$defaults = array(
    		'list_id_prefix' => 'tos',
    		'url' => '/',
    		'url_suffix_key' => null,
    		'display_fields' => array(),
    		'actions' => array(),
    		'list_actions' => array(),
    		'model' => null
    	);
    
    	$settings = array_merge($defaults, $settings);
    	$even = false;
    
    	function peel($path, $elem) {
    		if(is_array($elem) && $path) {
    			$pArr = explode('.', $path);
    			$p = array_shift($pArr);
    			$path = implode($pArr, '.');
    			return peel($path, $elem[$p]);
    		}
    		return $elem;
    	}
    ?>
    <h1>
    	<?php
    		echo isset($settings['title']) ? $settings['title'] : 'List of ' . Inflector::pluralize($settings['model']);
    		if(count($settings['list_actions']) > 0) {
    			echo '<span>';
    			foreach($settings['list_actions'] as $action => $options) {
    				echo @$html->link('[' . $action . ']', $html->url($options['url'], true), $options['options']) . ' ';
    			}
    			echo '</span>';
    		}
    	?>
    </h1>
    <table id="<?= $settings['list_id_prefix'] ?>-list">
    	<thead>
    		<tr>
    			<th>ID</th>
    			<?php
    				foreach($settings['display_fields'] as $title => $info) {
    					echo '<th>' . $title . '</th>';
    				}
    
    				if(count($settings['actions']) > 0) {
    					echo '<th class="{sorter: false}">Actions</th>';
    				}
    			?>
    		</tr>
    	</thead>
    	<tbody>
    	<?php
    		foreach($items as $item) {
    			$defaultItem = $item[$settings['model']];
    			$url_suffix = isset($item[$settings['url_suffix_key']]) ? $defaultItem[$settings['url_suffix_key']] : '';
    			echo '<tr class="model-list-item ' . (($even = !$even) == true ? 'even' : 'odd') . '">';
    			echo '<td>' . str_pad($defaultItem['id'], 5, '0', STR_PAD_LEFT) . '</td>';
    
    			foreach($settings['display_fields'] as $title => $info) {
    				$type = isset($info['type']) ? $info['type'] : 'string';
    				switch($type) {
    					case 'string':
    						if(isset($info['url'])) {
    							echo '<td>' . $html->link(peel($info['key'], $item), $info['url'] . $defaultItem[$info['url_suffix_key']]) . '</td>';
    						} else {
    							echo '<td>' . peel($info['key'], $item) . '</td>';
    						}
    					break;
    					case 'boolean':
    						$img = peel($info['key'], $item) ? 'icons/16x16/tick.png' : 'icons/16x16/cross.png';
    						if(isset($info['url'])) {
    							echo '<td>' . $html->image($img, array('url'=> $info['url'] . peel($info['url_suffix_key'], $item))) . '</td>';
    						} else {
    							echo '<td>' . $html->image($img) . '</td>';
    						}
    					break;
    				}
    			}
    
    			if(count($settings['actions']) > 0) {
    				echo '<td>';
    				foreach($settings['actions'] as $action => $options) {
    					echo @$html->link('[' . $action . ']', $html->url($options['url'] . peel($options['options']['url_suffix_key'], $item), true), $options['options']) . ' ';
    				}
    				echo '</td>';
    			}
    			echo '</tr>';
    		}
    	?>
    	</tbody>
    </table>


::

    
    table { width: 100%; }
    table th { text-align: left; font: bold 12px/1.2em arial, sans-serif; min-width: 50px; }
    table tr { font: 12px/1.2em arial, sans-serif; background-color: #F3F3F3; }
    table tr .header { background: transparent url('../img/bg.gif') no-repeat scroll center right; cursor: pointer; }
    table tr .header.headerSortUp { background-image: url('../img/asc.gif'); }
    table tr .header.headerSortDown { background-image: url('../img/desc.gif'); }
    table tr:nth-child( odd ) { background-color: #FFF; }
    table tr td { padding: 3px 0 3px 5px; }



.. author:: severeon
.. categories:: articles, snippets
.. tags:: Element,list,models,Snippets

