Mpdf component for generating PDF files from HTML
=================================================

Mpdf consists only from one component class that uses mPDF class
(located in vendors) to generate PDF file instead of standard output.

mPDF is a great class that can create PDF files from HTML. For more
information see `mPDF homepage`_.

I wrote this component to easily use mPDF with cake views. You just
need to initialize Mpdf component, set desired layout (view) and
instead of standard output the PDF file will be generated.

Short example in controller:
`
public$components=array('Mpdf.Mpdf');

publicfunctiontestpdf(){
$this->Mpdf->init();
$this->Mpdf->setFilename('file.pdf');
$this->Mpdf->setOutput('D');
//cancallanymPDFmethodvia$this->Mpdf->pdf
$this->Mpdf->pdf->SetWatermarkText("Draft");
}
`
Download the code from `https://github.com/segy/Mpdf`_


.. _mPDF homepage: http://www.mpdf1.com/mpdf/index.php
.. _https://github.com/segy/Mpdf: https://github.com/segy/Mpdf

.. author:: segy
.. categories:: articles, plugins
.. tags:: plugin,pdf,mpdf,Plugins

