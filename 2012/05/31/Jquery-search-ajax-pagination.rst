Jquery search ajax pagination
=============================

This is my first article, i've been working on this very component to
build dynamics conditions for paginates based on the data entered in a
form on the index page.

The component, create file build_conditions.php

::

    <?php
    /**
     *
     * Build conditions for search
     * @author Geneller Naranjo
     * @version 1.0
     * @license This content is released under the MIT License (http://www.opensource.org/licenses/mit-license.php)
     *
     */
    class BuildConditionsComponent extends Object {
    
        function initialize(&$controller) {
            $this->controller =& $controller;
        }
    
        function startup(&$controller) {    }
    
    
        /**
         *
         * Funcion que arma las condiciones para los buscadores.
         * Tener cuidado, solo usar para listados que usan el like como comparador.
         * @param Strin $modelName Modelo con las condiciones.
         */
        function buildConditions($modelName) {
            $conditions = array();
            foreach ($this->controller->data['Search'] as $field => $value) {
                if(!empty($value)) {
                    if(substr($field, -3, 3) == '_id') {
                        $conditions["$modelName.$field"] = $value;
                    } else {
                        $conditions[] = "$modelName.$field like '$value%'";
                    }
                }
            }
            return $conditions;
        }
    
        /**
         *
         * Funcion que arma las condiciones para los buscadores.
         * Tener cuidado, solo usar para listados que usan el like como comparador.
         * Arma las condiciones dependiendo de los campos del formulario.
         */
        function buildComplexConditions() {
            $conditions = array();
            foreach ($this->controller->data['Search'] as $model => $fields) {
                foreach ($fields as $field => $value) {
                    if(!empty($value)) {
                        if(substr($field, -3, 3) == '_id') {
                            $conditions["$model.$field"] = $value;
                        } else {
                            $conditions[] = "$model.$field like '$value%'";
                        }
                    }
                }
            }
            return $conditions;
        }
    
    }
    ?>

Create a file jquery.paginate_form.js under webroot/js/.

::

    /**
     *
     * Triggers search
     * @author Geneller Naranjo
     * @version 1.0
     * @license This content is released under the MIT License (http://www.opensource.org/licenses/mit-license.php)
     *
     */
    // Teclas que no deben disparar la busqueda.
    var unavailableKeyCodes = [9, 13, 16, 17, 18, 19, 20, 27, 35, 36, 37, 38, 39, 40, 45, 93, 106, 107, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 186, 187, 189, 190, 191, 192, 219, 220, 221, 222];
    
    // Variables para abortar peticiones ajax.
    var requesting = true;
    var request = new $.ajax();
    var focused = '';
    
    function paginator(url, domId, targetDomId) {
        var ajaxDelay = 8;
        var params = {};
    
        function paginate(params) {
            if(requesting == true) {
                request.abort();
            }
            if(typeof(params.url) != 'undefined') {
                url = params.url;
            }
            request = $.ajax({
                data: params.data,    type: 'post',    async: true,    url: url,
                beforeSend: function() {requesting = true;    },
                complete: function(data) {
                    $('#' + targetDomId).html(data.responseText);
                    requesting = false;
                }
            });
        }
    
        setInterval(function() {
            ajaxDelay++;
            if(ajaxDelay == 8) {
                params.data = $('#' + domId).serialize();
                paginate(params);
            }}, 100);
    
        $('#' + domId + ' div input').keyup(function(e) {
            if(requesting == true) {
                request.abort();
            }
        });
    
        $('#' + domId + ' div input').keyup(function(e) {
            delete params.url;
            if(unavailableKeyCodes.indexOf(e.keyCode) == -1) {
                if(typeof(e.currentTarget.attributes[1].nodeValue) != 'undefined') {
                    focused = e.currentTarget.attributes[1].nodeValue;
                }
                ajaxDelay = 1;
            }
        });
    
        $('#' + domId + ' div select').change(function(e) {
            params.data = $('#' + domId).serialize();
            paginate(params);
        });
    
        $('#' + domId + ' div input:checkbox').change(function(e) {
            params.data = $('#' + domId).serialize();
            paginate(params);
        });
        
        $('#' + domId).submit(function() {
            delete params.url;
            params.data = $('#' + domId).serialize();
            paginate(params);
            return false;
        });
    
        $('#' + targetDomId + ' .paging a').live('click', function(e) {
            e.preventDefault();
            delete params.url;
            params.data = $('#' + domId).serialize();
            var href = $(this).attr('href');
            params.url = href.replace('index/', 'index_ajax/');
            paginate(params);
        });
    
        $('#' + targetDomId + ' table th a').live('click', function(e) {
            e.preventDefault();
            delete params.url;
            params.data = $('#' + domId).serialize();
            var href = $(this).attr('href');
            params.url = href.replace('index/', 'index_ajax/');
            paginate(params);
        });
    
    }

in your view (i suppose the index) put this.

::

    <?php echo $javascript->link('jquery.paginate_form'); ?>
    <script type="text/javascript">
    $(function() {
        paginator('<?php echo $this->base . '/<controller>/<action>'?>', 'SearchIndexForm', 'indexAjax');
    
    });
    </script>

This is an html sample code for the index.

::

    <div class="header">
            <h2>Carrocerías</h2>
        </div>
        <div id="hideableSearch">
            <div id="showSearchImages">
    <?php
    echo $html->image('Search-index.png', array('style'=>'height: 35px;'));
    ?>
            </div>
            <div id="searchFormDiv">
                <fieldset class="fieldset-search-index">
    <?php
    echo $form->create('Search', array('id'=>'SearchIndexForm', 'encoding'=>'UTF-8'));
    echo $form->input('nombre', array('type'=>'text', 'size'=>10));
    echo $form->input('codigo', array('type'=>'text', 'size'=>10));
    echo $form->input('descripcion', array('type'=>'text', 'size'=>20));
    echo $form->end();
    ?>
                </fieldset>
            </div>
        </div>
    <div id="indexAjax">
    <table cellpadding="0" cellspacing="0">
        <tr>
            <th>#</th>
            <th><?php echo $this->Paginator->sort('Nombre','nombre', array('url'=>$url));?></th>
            <th><?php echo $this->Paginator->sort('Codigo','codigo', array('url'=>$url));?></th>
            <th><?php echo $this->Paginator->sort('Descripcion','descripcion', array('url'=>$url));?></th>
            <th class="actions">Acciones</th>
        </tr>
    <?php
    $i = 0;
    foreach ($carrocerias as $item):
        $class = null;
        if ($i++ % 2 == 0) $class = ' class="altrow"';
    ?>
        <tr<?php echo $class; ?> id="<?php echo $item['Carroceria']['id']?>">
            <td><?php echo $i; ?> </td>
            <td><?php echo $item['Carroceria']['nombre']; ?> </td>
            <td><?php echo $item['Carroceria']['codigo']; ?> </td>
            <td><?php echo $item['Carroceria']['descripcion']; ?> </td>
            <td class="actions">
                <?php echo $this->Html->link($html->image('Edit.png'), array('action' => 'edit', $item['Carroceria']['id']), array('escape'=>false, 'class'=>'index-actions')); ?>
            </td>
        </tr>
    <?php endforeach; ?>
    </table>
    <p>
    <?php
    echo $this->Paginator->counter(array(
    'format' => 'Pag %page% de %pages%, %current% registros de %count% en total, desde %start% hasta %end%'
    ));
    ?></p>
    <div class="paging">
    <?php
    $paginator->options(array('url'=> $url));
    echo $this->Paginator->prev('<< '.'Prev', array(), null, array('class'=>'disabled')).' | ';
    echo $this->Paginator->numbers() .' | ';
    echo $this->Paginator->next('Sig'.' >>', array(), null, array('class' => 'disabled'));
    ?></div>
    </div>

The code in your view should be the answer you want into #indexAjax

In your controller should be something like

::

    var $components = array('BuildConditions');

And the funcion you said in the url of the request, for this example
"carrocerias/index_ajax"

::

    function index_ajax() {
        $this->Carroceria->recursive = 0;
        $this->layout = 'ajax';
        $conditions = $this->BuildConditions->buildConditions($this->modelClass);
        $this->set('carrocerias', $this->paginate(null, $conditions));
    }

for simple conditions, if you would create conditions for different
models you should use "buildComplexConditions" instead of
"buildConditions".

I hope i made myself clear, please comment and let me know any issue
or how to make better this component.

I hope i made myself clear, please comment and let me know how to fix
any issue like the first u



.. author:: geneller
.. categories:: articles
.. tags:: jquery,index search,ajax paginate,Articles

