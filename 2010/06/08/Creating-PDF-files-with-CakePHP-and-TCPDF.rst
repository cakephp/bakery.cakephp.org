Creating PDF files with CakePHP and TCPDF
=========================================

With CakePHP 1.2 creating PDFs with CakePHP has just gotten a lot
easier. This tutorial shows how to combine CakePHP and the powerful
TCPDF for easy PDF file creation.

TCPDF is an Open Source PHP class for generating PDF documents. It
continues where FPDF stopped, and contains all its goodies plus
support of UTF-8 Unicode and Right-To-Left languages! Especially the
missing UTF-8 Unicode support in FPDF is a problem for everyone living
outside the English language only countries.


Step 1: Download and install TCPDF
----------------------------------

#. Go to `http://www.tcpdf.org`_ and download the latest version of
   TCPDF.
#. Extract to one of your vendors folders, such as app/vendors. It
   will create a directory tcpdf there with tcpdf.php and more in it. You
   need at least the folders tcpdf/config and tcpdf/fonts in your
   application.
#. Configure TCPDF, see its documentation. You want at least to have a
   look at tcpdf/config/tcpdf_config.php .



Step 2: Extend TCPDF to customize your header and footer
--------------------------------------------------------

There is a default header and footer in TCPDF, defined in a header()
and a footer() method, which is supposed to be overwritten by you, if
needed. This can be done by extending TCPDF and then calling this
extended TCPDF class from your application.

In app/vendors create the file xtcpdf.php with this content:

::

    <?php
    App::import('Vendor','tcpdf/tcpdf');

    class XTCPDF  extends TCPDF
    {

        var $xheadertext  = 'PDF created using CakePHP and TCPDF';
        var $xheadercolor = array(0,0,200);
        var $xfootertext  = 'Copyright Â© %d XXXXXXXXXXX. All rights reserved.';
        var $xfooterfont  = PDF_FONT_NAME_MAIN ;
        var $xfooterfontsize = 8 ;


        /**
        * Overwrites the default header
        * set the text in the view using
        *    $fpdf->xheadertext = 'YOUR ORGANIZATION';
        * set the fill color in the view using
        *    $fpdf->xheadercolor = array(0,0,100); (r, g, b)
        * set the font in the view using
        *    $fpdf->setHeaderFont(array('YourFont','',fontsize));
        */
        function Header()
        {

            list($r, $b, $g) = $this->xheadercolor;
            $this->setY(10); // shouldn't be needed due to page margin, but helas, otherwise it's at the page top
            $this->SetFillColor($r, $b, $g);
            $this->SetTextColor(0 , 0, 0);
            $this->Cell(0,20, '', 0,1,'C', 1);
            $this->Text(15,26,$this->xheadertext );
        }

        /**
        * Overwrites the default footer
        * set the text in the view using
        * $fpdf->xfootertext = 'Copyright Â© %d YOUR ORGANIZATION. All rights reserved.';
        */
        function Footer()
        {
            $year = date('Y');
            $footertext = sprintf($this->xfootertext, $year);
            $this->SetY(-20);
            $this->SetTextColor(0, 0, 0);
            $this->SetFont($this->xfooterfont,'',$this->xfooterfontsize);
            $this->Cell(0,8, $footertext,'T',1,'C');
        }
    }
    ?>

Of course, customize this to show your organization's name etc., and
modify the code as you like. See the TCPDF documentation for details.


Step 3: Create your layout for PDF
----------------------------------

You cannot use your default layout, as it would wrap the PDF file in
your HTML page code. You need a layout such as this one, save it as
app/views/layouts/pdf.ctp :

::

    <?php
    header("Content-type: application/pdf");
    echo $content_for_layout;
    ?>



Step 4: For your Controller
---------------------------

In your controller you will have a method which will output the PDF.
This here is the code as it is used in one of my real world
applications to print a nice PDF page with data and pictures about a
property:

::


        function viewPdf($id = null)
        {
            if (!$id)
            {
                $this->Session->setFlash('Sorry, there was no property ID submitted.');
                $this->redirect(array('action'=>'index'), null, true);
            }
            Configure::write('debug',0); // Otherwise we cannot use this method while developing

            $id = intval($id);

            $property = $this->__view($id); // here the data is pulled from the database and set for the view

            if (empty($property))
            {
                $this->Session->setFlash('Sorry, there is no property with the submitted ID.');
                $this->redirect(array('action'=>'index'), null, true);
            }

            $this->layout = 'pdf'; //this will use the pdf.ctp layout
            $this->render();
        }

Adapt to your needs. The critical part is just to select the PDF
layout before rendering.

::


            $this->layout = 'pdf'; //this will use the pdf.ctp layout
            $this->render();



Step 5: For your View
---------------------

Here is where the magic happens. Because with CakePHP we can load the
vendor directly in the view we do not need to wrap it in a helper. So
the big TCPDF library with currently 9600 lines of code in the main
class tcpdf.php alone will only get loaded when we really need it ,
that is when we actually create the PDF file. The vendor is now used
here like an external helper. Note: I do not know if that was intended
or not, but the more I think about it the more I like it, it's so
elegant and efficient, and demonstrates the power and flexibility of
CakePHP.

But enough said, here's the code for the view:


View Template:
``````````````

::


    <?php
    App::import('Vendor','xtcpdf');
    $tcpdf = new XTCPDF();
    $textfont = 'freesans'; // looks better, finer, and more condensed than 'dejavusans'

    $tcpdf->SetAuthor("KBS Homes & Properties at http://kbs-properties.com");
    $tcpdf->SetAutoPageBreak( false );
    $tcpdf->setHeaderFont(array($textfont,'',40));
    $tcpdf->xheadercolor = array(150,0,0);
    $tcpdf->xheadertext = 'KBS Homes & Properties';
    $tcpdf->xfootertext = 'Copyright Â© %d KBS Homes & Properties. All rights reserved.';

    // add a page (required with recent versions of tcpdf)
    $tcpdf->AddPage();

    // Now you position and print your page content
    // example:
    $tcpdf->SetTextColor(0, 0, 0);
    $tcpdf->SetFont($textfont,'B',20);
    $tcpdf->Cell(0,14, "Hello World", 0,1,'L');
    // ...
    // etc.
    // see the TCPDF examples

    echo $tcpdf->Output('filename.pdf', 'D');

    ?>



That was easy! Yes, that's all.
-------------------------------

The Questions and Answers below are only of interest for users of the
FPDF helper.


Why not FPDF?
`````````````

For me the main reason is that there is no Unicode support. You can
add a limited unicode support to it, as described on the Dievolution
blog , by hacking the Cell method of FPDF, but then, why not go for
TCPDF right away. No hack needed, and the TCPDF author, Nicola Asuni,
is very active, releasing a new update almost every week.

Update: FPDF seems to have full Unicode now, but I haven't tested it.
Also development seems to be going on nicely.


How about the FPDF helper, as shown here in the bakery?
```````````````````````````````````````````````````````

I used this helper quite a lot, it worked fine with CakePHP 1.1.
Somewhere between the 1.2 beta and 1.2 RC it stopped working though.
The reason IMHO is that it is not implemented correctly.

It extends the FPDF class directly, but a Helper should extend a
Helper, such as the AppHelper class.

This is what the FPDF helper does, works worked with CakePHP 1.1, but
wrong:

::

    class FpdfHelper extends FPDF


This would be correct but it does not work:

::

    class FpdfHelper  extends AppHelper


Somewhere in the CakePHP 1.2 development a change happened which was
that helpers receive an array as first argument when they are
initialized. A Helper which extends AppHelper expects that and handles
it correctly, but FPDF does not know what to do with that array, as it
expects as first argument the page orientation.


Can the FPDF Helper be hacked to continue working with CakePHP 1.2?
```````````````````````````````````````````````````````````````````

Yes, it can, but this should be not the solution, as it is not needed
(as shown above). Simply add this line in the FPDF code (the one in
your vendors directory, not the helper), as first line of the FPDF
method, which is in my FPDF version at line 78:

::

    if (is_array($orientation)) return;

it will then be:

::


    function FPDF($orientation='P',$unit='mm',$format='A4')
    {
        if (is_array($orientation)) return;
        ...


This will make it ignore the Helper initialization, but let it run
fine when it is called later, via

::

    $this->FPDF($orientation, $unit, $format);

in the FPDF helper's setup() method.


Why is this FPDF hack not needed in CakePHP 1.2?
````````````````````````````````````````````````

FPDF and TCPDF are external libraries, which you can integrate in
CakePHP under Vendors. Now CakePHP 1.2 changed the way Vendors are
included from

::

    vendor("fpdf/fpdf")

to

::

    App::import('Vendor','fpdf/fpdf');
    - or for TCPDF: -
    App::import('Vendor','tcpdf/tcpdf');


This alone does not change too much though. Still, you would need a
helper to wrap the TCPDF calls to use them in your view, similar to:

Helper Class:
`````````````

::

    <?php  <?php
    App::import('Vendor','xtcpdf');

    class TcpdfHelper extends AppHelper {
        var $pdf;
        function setup() {
            $this->pdf = new XTCPDF();
        }
    }

    ?>?>

and then call $tcpdf->pdf->whatevertcpdfmethodyouneed() from your
view.

Fortunately this is not needed, because in CakePHP 1.2 RC2 you can now
use App::import directly in the view. As shown above :)



.. _http://www.tcpdf.org: http://www.tcpdf.org/

.. author:: kalileo
.. categories:: articles, tutorials
.. tags:: pdf,tcpdf,fpdf,Tutorials

