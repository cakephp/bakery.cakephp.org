GoogleChart API Helper
======================

I need in a project a lightweight way to embed Charts from the Google
Chart Tool. New version coming soon (axis automation, legend,
etc...)....but you can work with it
Helper Class file google_chart.php :

Helper Class:
`````````````

::

    <?php 
    /**
    * Google Charts Helper class file.
    *
    * Simplifies creating charts with the google charts api.
    *
    * Copyright (c) 2010 Remi DUDREUIL
    *
    * Licensed under The MIT License
    * Redistributions of files must retain the above copyright notice.
    *
    * @filesource
    * @copyright     Copyright (c) 2010 Remi DUDREUIL
    * @link          http://net.productions.free.fr
    * @license       http://www.opensource.org/licenses/mit-license.php The MIT License
    */
    class GoogleChartHelper extends AppHelper
    {
        var $helpers    = array('Html');
    	
    	// Constants
        public $BASE = 'http://chart.apis.google.com/chart?';
    
    	// Variables
    	public $types = array(
    							'pie' => 'p',
    							'line' => 'lc',
    							'sparkline' => 'ls',
    							'bar-horizontal' => 'bhg',
    							'bar-vertical' => 'bvg',
    						);
    
    	public $type;
    	public $title;
    	public $data 		= array();
    	public $size 		= array();
    	public $color 		= array();
    	public $fill 		= array();
    	public $labelsXY 	= false;
    	public $legend;
    	public $useLegend 	= true;
    	public $background 	= 'a,s,ffffff';
    	
    	// scale parameters
    	public $min 		= array();
    	public $max 		= array();
    	
    	// data parameters
    	public $data_size	= 0;
    	
    	public $query 		= array();
    	
    	/** Create chart
    	*/
    	public function __toString()
    	{
    		// Create query
    		$this->query = array(
    							'cht'	=> $this->types[strtolower($this->type)],					// Type
    							'chtt'	=> $this->title,											// Title
    							'chd' 	=> 't:'.$this->data['values'],								// Data
    							'chl'   => $this->data['names'],									// Data labels
    							'chdl' 	=> ( ($this->useLegend) && (is_array($this->legend)) ) ? implode('|',$this->legend) : null, // Data legend
    							'chs'   => $this->size[0].'x'.$this->size[1],						// Size
    							'chco'  => preg_replace( '/[#]+/', '', implode(',',$this->color)), // Color ( Remove # from string )
    							'chm'   => preg_replace( '/[#]+/', '', implode('|',$this->fill)),   // Fill ( Remove # from string )
    							'chxt' 	=> ( $this->labelsXY == true) ? 'x,y' : null,				// X & Y axis labels
    							'chf' 	=> preg_replace( '/[#]+/', '', $this->background),			// Background color ( Remove # from string )
    							'chds'	=> $this->getScale(),
    							'chxr'	=> '1,'.min($this->min).','.max($this->max),
    							'chbh'	=> 'a'
    		);
    		
    		// Return chart
    		return $this->img(
    					$this->BASE.http_build_query($this->query),
    					$this->title
    				);
    	}
    
    	/** Set attributes
    	*/
    	public function setChartAttrs( $attrs )
    	{
    		foreach( $attrs as $key => $value )
    		{
    			$this->{"set$key"}($value);
    		}
    	}
    	
    	/** get automatique scale
    	*/
    	protected function getScale()
    	{
    		$scale = '';
    		for($i = 0 ; $i < $this->data_size ; $i++)
    		{
    			$scale .= $this->min[$i].','.$this->max[$i];
    			if($i <> ($this->data_size-1))
    				$scale .= ',';
    		}
    		return $scale;
    	}
    	
    	/** Set Min
    	*/
    	protected function setMin( $min )
    	{
    		$this->min = $min;
    	}
    	
    	/** Set Max
    	*/
    	protected function setMax( $max )
    	{
    		$this->max = $max;
    	}
    	
    	/** Set type
    	*/
    	protected function setType( $type )
    	{
    		$this->type = $type;
    	}
    
    
    	/** Set title
    	*/
    	protected function setTitle( $title )
    	{
    		$this->title = $title;
    	}
    
    
    	/** Set data
    	*/
    	protected function setData( $data )
    	{
    		// Clear any previous data
    		unset( $this->data );
    		$this->data_size = 0;
    		
    		// Check if multiple data
    		if( is_array(reset($data)) )
    		{
    			/** Multiple sets of data
    			*/
    			foreach( $data as $key => $value )
    			{
    				// Add data values
    				$this->data['values'][] = implode( ',', $value );
    				
    				// Add data names
    				$this->data['names'] = implode( '|', array_keys( $value ) );
    				
    				$this->data_size++;
    			}
    			
    			/** Implode data correctly
    			*/
    			$this->data['values'] = implode('|', $this->data['values']);
    			/** Create legend
    			*/
    			$this->legend = array_keys( $data );
    		}
    		else
    		{
    			/** Single set of data
    			*/
    			// Add data values
    			$this->data['values'] = implode( ',', $data );
    			
    			// Add data names
    			$this->data['names'] = implode( '|', array_keys( $data ) );
    			$this->data_size++;
    		}
    	}
    
    	/** Set legend
    	*/
    	protected function setLegend( $legend )
    	{
    		$this->legend = $legend;
    	}
    
    	/** Set size
    	*/
    	protected function setSize( $width, $height = null )
    	{
    		// check if width contains multiple params
    		if(is_array( $width ) )
    		{
    			$this->size = $width;
    		}
    		else
    		{
    			// set each individually
    			$this->size[] = $width;
    			$this->size[] = $height;
    		}
    	}
    
    	/** Set color
    	*/
    	protected function setColor( $color )
    	{
    		$this->color = $color;
    	}
    
    	/** Set labels
    	*/
    	protected function setLabelsXY( $labels )
    	{
    		$this->labelsXY = $labels;
    	}
    
    	/** Set fill
    	*/
    	protected function setFill( $fill )
    	{
    		// Fill must have atleast 4 parameters
    		if( count( $fill ) < 4 )
    		{
    			// Add remaining params
    			$count = count( $fill );
    			for( $i = 0; $i < $count; ++$i )
    				$fill[$i] = 'b,'.$fill[$i].','.$i.','.($i+1).',0';
    		}
    		
    		$this->fill = $fill;
    	}
    
    
    	/** Set background
    	*/
    	protected function setBackground( $background )
    	{
    		$this->background = 'bg,s,'.$background;
    	}
    
    	/** Create img html tag
    	*/
    	protected function img( $url, $alt = null )
    	{
    		return $this->Html->image($url,array('alt' => $alt, 'style' => 'width:'.$this->size[0].'px;height:'.$this->size[1].';'));
    	}
    }
    ?>

use in view :

View Template:
``````````````

::

    
    <?php
       	$color = array(
    		'#687e9b',
    		'#c4ccd8',
    	);
    	
    	$dataMultiple = array(array(0,1,2,3), array(4,5,6,7));
    	
    	$googleChart->setChartAttrs( 
    		array(
    			'type' 		=> 'bar-vertical',
    			'title' 	=> '',
    			'data' 		=> $dataMultiple,
    			'size' 		=> array( 400, 200 ),
    			'color' 	=> $color,
    			'labelsXY' 	=> true,
    			'min'		=> array(min(rray(0,1,2,3)),min(array(4,5,6,7))),
    			'max'		=> array(max(array(0,1,2,3)),max(array(4,5,6,7))),
    			'legend'	=> array('2008', '2009')
    		)
    	);
    	
    	// Print chart
    	echo $googleChart;
        ?>



.. author:: ixu38
.. categories:: articles, helpers
.. tags:: google,helper,CakePHP,api,charts,Helpers

