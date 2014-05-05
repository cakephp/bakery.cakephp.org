ExcelHelper
===========

Simply export your data to Excel. Based on code:
http://code.google.com/p/php-excel/


::

	classExcelHelperextendsAppHelper
	{
	var $filename = 'arquive';

	var $rows=array();

	var $header="<?xmlversion=\"1.0\"encoding=\"UTF-8\"?\>
	<Workbookxmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"
	xmlns:x=\"urn:schemas-microsoft-com:office:excel\"
	xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"
	xmlns:html=\"http://www.w3.org/TR/REC-html40\">";

	var$footer="</Workbook>";

	var$worksheet_title="Table";

	functiongetHeaders(){
	header("Content-Type:application/vnd.ms-excel;charset=UTF-8");
	header("Content-
	Disposition:inline;filename=\"".$this->filename.".xls\"");
	}

	functionaddRow($data=array()){

	foreach($dataas$key=>$value){
	$data[$key]="<Cell><Datass:Type=\"String\"><![CDATA[".$value."]]></Dat
	a></Cell>\n";
	}

	$this->rows[]=$data;
	}

	functionsetTitle($title){
	$title=preg_replace("/[\\\|:|\/|\?|\*|\[|\]]/","",$title);
	$title=substr($title,0,31);
	$this->worksheet_title=$title;
	}

	functionrender($file=null){
		$this->filename=($file)?$file:$this->filename;
		$this->getHeaders();

		$out=array();
		foreach($this->rowsas$row){
		$out[]="<Row>\n".implode('',$row)."</Row>\n";
		}

		$data=implode("\n",$out);

		echostripslashes($this->header);
		echo"\n<Worksheetss:Name=\"".$this->worksheet_title."\">\n<Table>\n";
		echo"<Columnss:Index=\"1\"ss:AutoFitWidth=\"0\"ss:Width=\"110\"/>\n";
		echo$data;
		echo"</Table>\n</Worksheet>\n";
		echo$this->footer;
	}
	}


Example::

	foreach($dataas$i=>$register)
	{
	if($i==0)
	{
	$header=array();
	foreach($register['Register']as$field=>$value)
	{
	$header[]=$labels[$field];
	}
	$excel->addRow($header);
	}
	$excel->addRow($register['Register']);
	}

	$file='register-'.date('d-m-Y');
	$excel->render($file);



.. author:: thiagosf
.. categories:: articles, helpers
.. tags:: export,excel,Helpers

