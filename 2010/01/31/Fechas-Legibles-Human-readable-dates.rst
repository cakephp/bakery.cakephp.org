Fechas Legibles (Human readable dates)
======================================

Un sencillo helper que convierte una fecha en formato de base de
datos: yyyy-mm-dd en un formato legible para usuarios, por ejemplo: 29
de Enero del 2009. A simple helper that transforms data base dates
(yyyy-mm-dd) in human readable dates, for example: January 29, 2009


Helper Class:
`````````````

::

    <?php

    /*
     * Fechas helper.
     * Author: Fernando Dingler
     */

    class MyHelper extends Helper{

            var $helpers = array();

            /****** For English just uncomment the lines indicated. ******/

            //Dada una fecha en formato yyyy-mm-dd devuelve la fecha en un formato legible, ejemplo: 29 de
            //Enero del 2009

            function fecha($date){

                    if($date == '' || empty($date))
                        return '';

    		$meses = array("Ene" , "Feb" , "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct",
                    "Nov", "Dic"); //Spanish
                    /* $meses = array("Jan" , "Feb" , "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct",
                    "Nov", "Dec");*/ //English

    		list($anio, $mes, $dia) = preg_split('/-/', $date);

    		$month = $meses[((int)$mes)-1];

    		$fechaLegible = $dia." de ".$month." del ".$anio; //Spanish
                    /* $fechaLegible = $month.' '.$dia.", ".$anio; */ //English

    		return $fechaLegible;
    	}

    }
    ?>



.. author:: chakuako
.. categories:: articles, helpers
.. tags:: date,fechas legibles,fechas,human readable dates,dingler,readable,legible,dates,fecha,Helpers

