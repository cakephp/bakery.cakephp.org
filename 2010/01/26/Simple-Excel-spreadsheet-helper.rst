Simple Excel spreadsheet helper
===============================

I made this Excel helper because I wanted to generate reports of data
easily, without having to specify column names and other stuff. You
just need one line in your view and throw an array with data and a
title to the helper and you're done.
Off course, the fact that this is a simple basic helper created in a
short amount of time means it has some limitations:

+ The spreadsheet it generates is very basic. It contains a title, a
  header row with al collumn names and then the data as it is.
+ It doesn't catch errors. If there's an PHP error message along the
  way, it will be inside the Excel sheet it generates
+ You can only change the colours and fonts inside the helper's code
+ The library used for the Excel file generation requires PHP 5.2 or
  newer to be installed on your server

Well, if you're still interested and can live with these limitations,
then welcome aboard! Installation is very easy and just takes 3 simple
steps.

Let's see how we can generate a participants list for an event. In
this example, there's a model called Event that is connected to the
model Participant. If the participant model has the fields id,
firstname, lastname and phone the result will look like this:


Step 1
~~~~~~
All the hard work is done by the PHPExcel class. You can download it
from the project's website: `http://phpexcel.codeplex.com`_. Create a
folder called 'excel' in your Vendors folder. Extract the zip file and
copy the contents of the 'Classes' folder to the 'excel' folder. This
helper was written for the 1.7.0 version of PHPExcel. Newer versions
might not be compatible.


Step 2
~~~~~~
Here's the helper class. Store it in a file called excel.php in the
views/helpers directory.

Helper Class:
`````````````

::

    <?php 
    App::import('Vendor','PHPExcel',array('file' => 'excel/PHPExcel.php'));
    App::import('Vendor','PHPExcelWriter',array('file' => 'excel/PHPExcel/Writer/Excel5.php'));
    
    class ExcelHelper extends AppHelper {
    	
    	var $xls;
    	var $sheet;
    	var $data;
    	var $blacklist = array();
    	
    	function excelHelper() {
    		$this->xls = new PHPExcel();
    		$this->sheet = $this->xls->getActiveSheet();
    		$this->sheet->getDefaultStyle()->getFont()->setName('Verdana');
    	}
    				 
    	function generate(&$data, $title = 'Report') {
    	 	$this->data =& $data;
    	 	$this->_title($title);
    	 	$this->_headers();
    	 	$this->_rows();
    	 	$this->_output($title);
    	 	return true;
    	}
    	
    	function _title($title) {
    		$this->sheet->setCellValue('A2', $title);
    		$this->sheet->getStyle('A2')->getFont()->setSize(14);
    		$this->sheet->getRowDimension('2')->setRowHeight(23);
    	}
    
    	function _headers() {
    		$i=0;
    		foreach ($this->data[0] as $field => $value) {
    			if (!in_array($field,$this->blacklist)) {
    				$columnName = Inflector::humanize($field);
    				$this->sheet->setCellValueByColumnAndRow($i++, 4, $columnName);
    			}
    		}
    		$this->sheet->getStyle('A4')->getFont()->setBold(true);
    		$this->sheet->getStyle('A4')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
    		$this->sheet->getStyle('A4')->getFill()->getStartColor()->setRGB('969696');
    		$this->sheet->duplicateStyle( $this->sheet->getStyle('A4'), 'B4:'.$this->sheet->getHighestColumn().'4');
    		for ($j=1; $j<$i; $j++) {
    			$this->sheet->getColumnDimension(PHPExcel_Cell::stringFromColumnIndex($j))->setAutoSize(true);
    		}
    	}
    		
    	function _rows() {
    		$i=5;
    		foreach ($this->data as $row) {
    			$j=0;
    			foreach ($row as $field => $value) {
    				if(!in_array($field,$this->blacklist)) {
    					$this->sheet->setCellValueByColumnAndRow($j++,$i, $value);
    				}
    			}
    			$i++;
    		}
    	}
    			
    	function _output($title) {
    		header("Content-type: application/vnd.ms-excel"); 
    		header('Content-Disposition: attachment;filename="'.$title.'.xls"');
    		header('Cache-Control: max-age=0');
    		$objWriter = new PHPExcel_Writer_Excel5($this->xls);
    		$objWriter->setTempDir(TMP);
    		$objWriter->save('php://output');
    	}
    }
    ?>



Step 3
~~~~~~
In your view, you just need one line of code. The generate function
has two parameters: the array with the data you want in the report and
the title. You should include the model name in the data variable, in
this example 'Participant'.

View Template:
``````````````

::

    <?php
    	$excel->generate($event['Participant'], 'Participants list '.$event['Event']['name']);
    ?>

Here's the controller action for this view. Note that you should use
an empty layout since we just want the excel file and no html. You can
use the ajax layout for this. It's build into CakePHP, so you don't
have to create it.

Controller Class:
`````````````````

::

    <?php 
    class EventsController extends AppController {
    	$helpers = array('Report');
    	
    	function participants($id = null) {
    		$this->layout = 'ajax';
    		$this->set('event', $this->Events->findById($id));
    	}
    }
    ?>

If you want to skip some fields, you can include them in the blacklist
array. It's better to select the fields you want to display in the
controller or in the model, but if for some reason you can't do that
you can use this code:

View Template:
``````````````

::

    <?php
    	$excel->blacklist = arary('id','phone');
    	$excel->generate($participants['Participant'],'Participants list '.$event['Event']['name']);
    ?>



You're done!
~~~~~~~~~~~~
This was it, everything should be running fine now. Well, just one
more thing then:


Bonus: .xlsx
~~~~~~~~~~~~
If you want to use the new Excel 2007 file format, you just need to
change a few lines in the helper class. The php_zip and php_xml
extensions for PHP should be enabled for this to work. Check to the
PHPExcel documentation for more information.


Helper Class:
`````````````

::

    <?php 
    //Change the first two lines to:
    App::import('Vendor','PHPExcel',array('file' => 'excel/PHPExcel.php'));
    App::import('Vendor','PHPExcelWriter',array('file' => 'excel/PHPExcel/Writer/Excel2007.php'));
    
    //Replace the _output function with this one:
    function _output($title) {
    	header('Content-Type: application/vnd.openXMLformats-officedocument.spreadsheetml.sheet');
    	header('Content-Disposition: attachment;filename="'.$title.'.xlsx"');
    	header('Cache-Control: max-age=0');
    	$objWriter = new PHPExcel_Writer_Excel2007($this->xls);
    	$objWriter->save('php://output');
    }
    ?>



.. _http://phpexcel.codeplex.com: http://phpexcel.codeplex.com/

.. author:: melgior
.. categories:: articles, helpers
.. tags:: excel,spreadsheet,report,Helpers

