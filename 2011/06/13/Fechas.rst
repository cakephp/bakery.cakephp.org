Fechas
======

Es un helper que dertermina el tiempo que transcurre entre 2 fechas
dando como salida una array

::

    
    <?php 
    class FechasHelper extends AppHelper{
    	private function segundos($fm = null){
    		if($fm){
    			$fa = date_parse($fm);
    			return mktime($fa["hour"],$fa["minute"],$fa["second"],$fa["month"],$fa["day"],$fa["year"],0);
    		}else{
    			return false;
    		}
    	}
    	public function duracion($inicio, $fin){
    		$div_años = 31125600;
    		$div_dias = 86400;
    		$div_horas = 3600;
    		$div_min = 60;
    		$tiempo = $this->segundos($fin) - $this->segundos($inicio);
    		$duracion = ($tiempo > 0) ? array('años'=>'0000','dias'=>'00','horas'=>'00','min'=>'00','seg'=>'00') : false;
    		if($tiempo > $div_años){
    			$duracion['años'] = round($tiempo / $div_años);
    			$dias_sec = $tiempo % $div_años;
    			$duracion['dias'] round($dias_sec / $div_dias);
    			$horas_sec = $dias_sec % $div_idas;
    			$duracion['horas'] = round($horas_sec / $div_horas);
    			$min_sec = $horas_sec % $div_horas;
    			$duracion['min'] = round($min_sec / $did_min) ;
    			$duracion['seg'] = $min_sec % 60;
    		}else{ 
    			if($tiempo > $div_dias){
    				$duracion['dias'] round($dias_sec / $div_dias);
    				$horas_sec = $dias_sec % $div_dias;
    				$duracion['horas'] = round($horas_sec / $div_horas);
    				$min_sec = $horas_sec % $div_horas;
    				$duracion['min'] = round($min_sec / $div_min);
    				$duracion['seg'] = $min_sec % $div_min;
    			}else{
    				if($tiempo > $div_horas){
    					$duracion['horas'] = round($horas_sec / $div_horas);
    					$min_sec = $horas_sec % $div_horas;
    					$duracion['min'] = round($min_sec / $div_min);
    					$duracion['seg'] = $min_sec % $div_min;
    				}else{
    					if($tiempo > $div_min){
    						$duracion['min'] = round($min_sec / $div_min);
    						$duracion['seg'] = $min_sec % $div_min;
    					}else{
    						if(){
    						}
    					}
    				}
    			}
    		}
    		return $duracion;
    	}
    }
    ?>

prueba ....

::

    
    $this->Fechas->duracion('2011-06-02 00:03:18','2012-03-02 14:10:20'); 
    echo $d['años'].' años '.$d['dias'].' días '.$d['horas'].':'.$d['min'].':'.$d['sec'];



.. author:: ricardosiri68
.. categories:: articles, helpers
.. tags:: duration,fechas,duracion,Helpers

