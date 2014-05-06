Increase contrast of an Image (Image processing, Histogram Equalization using gd library and cakephp)
=====================================================================================================

!!! important !!! Php is an intrepreted language, one amongst many
reasons to avoid using it for image processing. I personally prefer
using MATLAB (more so than c/c++) when it comes to image processing.
But if you must know, the image processing is a time consuming process
and when done on server over a network traffic the processing times
are enourmous. say you have an image of size 128 x 128 pixels, for
image processing you will have to map the entire pixel map onto an
array (or logical array). This mapping process will be done for 128 *
128 = 16384 pixels and for a colour image. 16384 * 3 = 49152. These
are just the pixel mapping numbers, the process involved in reading
the pixel also adds up the processing time. All of this for one pass,
most often in image processing one has to repeatedly iterate and
manipulate these pixels. If you are not scared with the number above,
let me give you some real time data. A standard photo that you wish
normalized would be at least 800 x 600 pixels. 800 * 600 = 480,000 * 3
= 1,440,000 Ok, lets begin the work, first of all make sure you have
gd library for php. (http://php.net/manual/en/image.installation.php)
What is Histogram Normalization ?
(http://en.wikipedia.org/wiki/Histogram_equalization) also read this h
ttp://en.wikipedia.org/wiki/Histogram_equalization#Histogram_equalizat
ion_of_color_images in this case however i have not implemented
luminance (HSV/HSL) i have done it in RGB mode and hence you might
have issues with hue and saturation in some of the images. This
prototype works for jpg only, however others can be derived using gd
library's imagefrompng, imagefromgif etc After Historam equalisation,
we can increase the contrast of an image. Before
After

::


    <?php
    /*
     * @author: kishor kundan
     * created: 15 Mar, 2011
     * mail : kishor_kn@hotmail.com
     * http://kishorkundan.blogspot.com
     */

    class ImageHelper extends AppHelper {

          private $Image;

          public function histeq($ImagePath) {
                $this->Image['Path'] = $ImagePath;
                list($this->Image['width'], $this->Image['height'], $this->Image['type'])
                    = getimagesize($this->Image['Path']);

                $this->Image['pixels'] = $this->Image['width'] * $this->Image['height'];
            $this->Image['Resource'] = imagecreatefromjpeg($this->Image['Path']);

            if($this->Image['Resource']) {
                $this->Image['reds'] = '';
                $this->Image['greens'] = '';
                $this->Image['blues'] = '';

                $this->generateHistogram();
                $this->generateCDF();
                $this->normalize();
            }

                private function generateHistogram() {
            for($colindex = 0; $colindex <= 255; $colindex++) {
                $this->Image['blues'][$colindex]['count'] = 0;
                $this->Image['reds'][$colindex]['count'] = 0;
                $this->Image['greens'][$colindex]['count'] = 0;
            }
            for($x = 0; $x < $this->Image['width']; $x++) {
                for($y = 0; $y < $this->Image['height']; $y++) {
                    $rgb = imagecolorat($this->Image['Resource'], $x, $y);
                    $r = ($rgb >> 16) & 0xFF;
                    $g = ($rgb >> 8) & 0xFF;
                    $b = $rgb & 0xFF;
                    $this->Image['reds'][$r]['count']++;
                    $this->Image['greens'][$g]['count']++;
                    $this->Image['blues'][$b]['count']++;
                }
            }
            return true;
        }


        private function generateCDF() {
            $sumR = 0;
            $sumG = 0;
            $sumB = 0;


            $this->Image['minR'] = 0;
            $this->Image['minG']= 0;
            $this->Image['minB']= 0;


            $this->Image['reds']['cdf_min'] = 0;
            $this->Image['blues']['cdf_min'] = 0;
            $this->Image['greens']['cdf_min'] = 0;

            for($i = 0; $i <= 255; $i++) {
                $sumR += $this->Image['reds'][$i]['count'];
                $sumB += $this->Image['blues'][$i]['count'];
                $sumG += $this->Image['greens'][$i]['count'];

                $this->Image['reds'][$i]['cdf'] = $sumR;
                if($sumR > 0 && $this->Image['reds']['cdf_min'] == 0) {
                    $this->Image['reds']['cdf_min'] = $sumR;
                    $this->Image['reds']['minR'] = $i;
                }

                $this->Image['blues'][$i]['cdf'] = $sumB;
                if($sumB > 0 && $this->Image['blues']['cdf_min'] == 0) {
                    $this->Image['blues']['cdf_min'] = $sumB;
                    $this->Image['minB']  = $i;
                }

                $this->Image['greens'][$i]['cdf'] = $sumG;
                if($sumR > 0 && $this->Image['greens']['cdf_min'] == 0) {
                    $this->Image['greens']['cdf_min'] = $sumG;
                    $this->Image['minG']  = $i;
                }
            }

          private function normalize() {
              $img_contrast = imagecreatetruecolor($this->Image['width'], $this->Image['height']);
            for($x= 0; $x < $this->Image['width']; $x++) {
                for($y=0; $y < $this->Image['height']; $y++) {
                    $rgb = imagecolorat($this->Image['Resource'], $x, $y);
                    $r = ($rgb >> 16) & 0xFF;
                    $g = ($rgb >> 8) & 0xFF;
                    $b = $rgb & 0xFF;

                    $cont_r = $this->generalizedHistogram($this->Image['reds'][$r]['cdf'], $this->Image['reds']['cdf_min']);
                    $cont_b = $this->generalizedHistogram($this->Image['blues'][$b]['cdf'], $this->Image['blues']['cdf_min']);
                    $cont_g = $this->generalizedHistogram($this->Image['greens'][$g]['cdf'], $this->Image['greens']['cdf_min']);

                    $color = imagecolorallocate($img_contrast , $cont_r, $cont_g, $cont_b);
                    imagesetpixel($img_contrast, $x, $y, $color);

                }
            }
              header('Content-Type: image/jpg');
              imagejpeg($img_contrast, NULL, 100);
              imagedestroy($img_contrast);

        }

        private function generalizedHistogram($cdf_v, $cdf_v_min) {
            return round((($cdf_v - $cdf_v_min) / ($this->Image['pixels'] - $cdf_v_min)) * 255);
        }

    }

include it in controller using

::


    <?php
    var $helpers = array('Image'); // followed by all the other helpers you might need
    ?>;

invoke histeq by

::


    <?php
     $this->Image->histeq('path-to-image');
    ?>

*** one of my colleague had asked me how to normalize histogram using
php, he was in all sorts of dire-strait about to get a hammering for
not finishing his work on time. I demonstrated him and i also took the
oppurtunity of sharing it out here, i hope this helps lot, if i get a
time off, i will add more features to it and correct the problems if
any. for the time being i request you all to contribute. ***



.. author:: kishorkundan
.. categories:: articles, helpers
.. tags:: image processing,gd library,histogram equalization,enhance contrast,Helpers

