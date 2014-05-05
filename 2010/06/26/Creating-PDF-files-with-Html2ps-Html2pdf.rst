Creating PDF files with Html2ps/Html2pdf
========================================

Html2ps (also known as Html2pdf) is a free PHP tool wich allows users
to create their own PDF files from a complete designed html page. The
different between this version and the one from Kalileo
([url]http://bakery.cakephp.org/articles/view/creating-pdf-files-with-
cakephp-and-tcpdf[/url]) is that this Html2pdf allows complete
websites including all css files, images, tables, divs, etc.


Requirements
~~~~~~~~~~~~

+ CakePHP 1.3.x
+ Html2ps op Tufat (`http://www.tufat.com/s_html2ps_html2pdf.htm`_)
+ Basic knowledge of CakePHP



Step 1: Download and install Html2ps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Go to `http://www.tufat.com/s_html2ps_html2pdf.htm`_ and download
   the latest version of Html2ps.
#. Unzip the files to the vendor map /app/vendors/html2ps/.
#. Open pipeline.class.php and search for "$this->_dispatcher =& new
   Dispatcher();" and replace it with: "$this->_dispatcher =& new
   DispatcherPdf();".
#. Open dispatcher.class.php and change to following lines: "class
   Dispatcher {" into "class DispatcherPdf {" and "function Dispatcher()
   {" into "function DispatcherPdf() {".



Step 2: The Pdf Component
~~~~~~~~~~~~~~~~~~~~~~~~~
Make a file pdf.php in /app/controllers/components and paste the
following code.

Component Class:
````````````````

::

    <?php 
    class PdfComponent extends Object {
    
    	var $p;                     	// The Pdf Class
    	var $media;
    	var $filename = 'invoice';    // Without the .pdf
    	var $output = 'browser';      // browser,file,download
    
      function init() {
    
          // Include the class file and create Html2ps instance
          App::import('vendor', 'Html2PsConfig', array('file' => 'html2ps'.DS.'config.inc.php'));
          App::import('vendor', 'Html2Ps', array('file' => 'html2ps'.DS.'pipeline.factory.class.php'));
          parse_config_file(APP .'vendors'. DS .'html2ps'. DS .'html2ps.config');
    
          global $g_config;
          $g_config = array(
                    'cssmedia'     => 'screen',
                    'renderimages' => true,
                    'renderforms'  => false,
                    'renderlinks'  => true,
                    'mode'         => 'html',
                    'debugbox'     => false,
                    'draw_page_border' => false
                    );
    
        $this->media = Media::predefined('A4');
        $this->media->set_landscape(false);
        $this->media->set_margins(array('left'   => 0,
                                  'right'  => 0,
                                  'top'    => 0,
                                  'bottom' => 0));
        $this->media->set_pixels(1024);
        global $g_px_scale;
        $g_px_scale = mm2pt($this->media->width() - $this->media->margins['left'] - $this->media->margins['right']) / $this->media->pixels;
        global $g_pt_scale;
        $g_pt_scale = $g_pt_scale * 1.43;
        $this->p = PipelineFactory::create_default_pipeline("","");
    
        switch ($this->output) {
          case 'download':
          $this->p->destination = new DestinationDownload($this->filename);
          break;
          case 'file':
          $this->p->destination = new DestinationFile($this->filename);
          break;
          default:
          $this->p->destination = new DestinationBrowser($this->filename);
          break;
        }
        
      }
    
      function process($url) {
        $this->p->process($url, $this->media);
      }
    }
    ?>

The above code is a very basic setup for Html2ps. You can change
whatever you want to fit your PDF requirements.


Step 3: The Pdf layout
~~~~~~~~~~~~~~~~~~~~~~
We will use a different layout for the Pdf files then the default.ctp.
With this we are able to have a different layout then the website
itself. Create the file pdf.ctp in /app/views/layout/ and paste the
following code.

View Template:
``````````````

::

    
    <?php echo $content_for_layout; ?>

You're free to use any css files or images you like. In this example
we only use a white paper for the layout.


Step 4: The Controller functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The rendering of the Pdf files happens in a controller function. In
this example I use the "Invoices" controller with two functions:
view() and download(). The view() displays the normal html file and
the download() renders the view in PDF format.
Paste the following functions in your controller.

Controller Class:
`````````````````

::

    <?php 
    class InvoicesController extends AppController {
    
    	var $name = 'Invoices';
    
    	function view($id = null) {
    		// Be sure that the current user can download this Invoice...
    		$this->set('invoiceNumber', '1234');
    	}
    
    	function download($id = null) {
    		// Include Component
    		App::import('Component', 'Pdf');
    		// Make instance
    		$Pdf = new PdfComponent();
    		// Invoice name (output name)
    	    $Pdf->filename = 'your_invoice'; // Without .pdf
    	    // You can use download or browser here
    	    $Pdf->output = 'download';
    	    $Pdf->init();
    	    // Render the view
    		$Pdf->process(Router::url('/', true) . 'invoices/view/'. $id);
    		$this->render(false);
    	}
    }
    ?>



Step 5: That's it!
~~~~~~~~~~~~~~~~~~
Make a nice view of your invoice in /app/views/invoices/view.ctp and
open `http://www.fellicht.nl/invoices/download/1234`_.

If you have any questions, suggestions or mistakes in the above
article please submit them!

.. _http://www.tufat.com/s_html2ps_html2pdf.htm: http://www.tufat.com/s_html2ps_html2pdf.htm
.. _http://www.fellicht.nl/invoices/download/1234: http://www.fellicht.nl/invoices/download/1234

.. author:: Casmo
.. categories:: articles, components
.. tags:: pdf,htmlps,invoices,htmlpdf,Components

