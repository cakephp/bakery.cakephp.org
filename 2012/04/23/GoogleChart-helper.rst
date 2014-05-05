GoogleChart helper
==================

GoogleChart is a helper class for easy generating image charts using
Google Chart API.

I needed simple access to Google Chart API for generating images.
Please see examples below and method comments in source file to see
how it works.

This plugin is for CakePHP 2.x

Example:
`
//Controller:
public$helpers=array('GoogleChart.GoogleChart');
`

`
//View:
//exampleofbarchart
echo$this->GoogleChart->create()
->setType('bar',array('horizontal','grouped'))
->setSize(500,400)
->setMargins(5,5,5,5)
->addData(array(1200.48,432.3,647.21,635.2))
->addMarker('value',array('format'=>'f1','placement'=>'c'))
->addData(array(20,42.3,65.21,95.2))
->addMarker('value',array('size'=>14,'color'=>'000000'))
->addAxis('x',array('labels'=>array('jan2012','feb2012')))
->addAxis('y',array('axis_or_tick'=>'l','size'=>12));

//exampleofpiechart
echo$this->GoogleChart->create()
->setTitle('CHARTTITLE',array('size'=>14,'color'=>'000000'))
->setType('pie',array('3d'))
->setSize(600,300)
->setMargins(10,10,10,10)
->addData(array(20,35,50,10))
->setPieChartLabels(array('first','second','third','andsoon...'));
`
Download the code from `https://github.com/segy/GoogleChart`_


.. _https://github.com/segy/GoogleChart: https://github.com/segy/GoogleChart

.. author:: segy
.. categories:: articles, plugins
.. tags:: plugin,image charts,google chart api,Plugins

