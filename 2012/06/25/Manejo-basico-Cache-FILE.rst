Manejo básico Cache FILE
========================

Un componente simple y corto que permite manejar las funciones básicas
de caché, así veremos que nuestra aplicación tendrá un mejor
rendimiento
'File', //[required] //'duration'=> 3600, //[optional]
//'probability'=> 100, //[optional] 'path' => CACHE, //[optional] use
system tmp directory - remember to use absolute path 'prefix' => '',
//[optional] prefix every cache file with this string 'lock' => false,
//[optional] use file locking //'serialize' => true, //[optional] ));
Cache::write($nombre_cache, $data); return true; } function
obtenerCache($nombre_cache = null){ $data = null;
if(empty($nombre_cache)){ return $data; } $data =
Cache::read($nombre_cache); return($data); } function
borrarCache($nombre_cache = null){ if(!empty($nombre_cache)){
Cache::delete($nombre_cache); //return true; } } } ?> En el
controlador var $components = array('Manejocache'); para borrar:
$this->Manejocache->borrarCache('NOMBRECACHE'); para obtener cache:
$this->Manejocache->obtenerCache('NOMBRECACHE'); para guardar cache:
$this->Manejocache->guardarCache('NOMBRECACHE');


.. author:: aantigual
.. categories:: articles, components
.. tags:: cache,file,manejo cache,Components

