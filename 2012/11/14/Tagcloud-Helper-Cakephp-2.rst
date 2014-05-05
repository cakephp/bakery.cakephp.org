Tagcloud Helper Cakephp 2
=========================

Adjustable Helper to build a word/tag cloud.

::

    
    <?php
    
    /*
     *  @author: syl-via@go2.pl & Suhail Doshi
     */
    
    class TagcloudHelper extends Helper {
        /* font sizes */
    
        var $minSize = 10;
        var $maxSize = 50;
    
        /* colors */
        var $red = 110;
        var $green = 105;
        var $blue = 255;
    
        /* div sizes */
        var $div_size = 400;
    
        /* show frequencies */
        var $show_frequencies = false;
    
        /*  @author: syl-via
         *  @param array $tags Tags to build the cloud on. Ex array('name'=>20,'tag2'=>32)
         *  @param (optional) int  $div_size The size of the div for the words
         *  @param (optional) int  $minSize  Minimum size of the font
         *  @param (optional) int  $maxSize  Maximum size of the font
         *  @param (optional) int  $red   
         *  @param (optional) int  $green 
         *  @param (optional) int  $blue 
         * 
         *  returns string div with span of tags.
         */
    
        public function word_cloud($tags, $div_size = null, $show_frequencies = null, $minSize = null, $maxSize = null, $red = null, $green = null, $blue = null) {
            if ($show_frequencies != null)
                $this->show_frequencies = $show_frequencies;
            if ($div_size != null)
                $this->div_size = $div_size;
            if ($minSize != null)
                $this->minSize = $minSize;
            if ($maxSize != null)
                $this->maxSize = $maxSize;
            if ($red != null)
                $this->red = $red;
            if ($green != null)
                $this->green = $green;
            if ($blue != null)
                $this->blue = $blue;
    
            $data = $this->formulateTagCloud($tags);
            $data = $this->shuffleTags($data);
    
            /* Build cloud */
            $cloud = "<div style=\"width: {$this->div_size}px\">";
            foreach ($data as $word => $options) {
                $cloud .= "<span style=\"font-size: {$options['size']}px; color: {$options['color']};\">";
                $cloud .= str_replace(" ", " ", $word);
                if ($this->show_frequencies) {
                    $cloud .= " <small>({$options['score']})</samll> ";
                }
                $cloud .= "</span> ";
            }
            $cloud .= "</div>";
            return $cloud;
        }
    
        /*
         *  @author: Suhail Doshi
         */
    
        public function formulateTagCloud($dataSet) {
            asort($dataSet); // Sort array accordingly.
            // Retrieve extreme score values for normalization
            $minimumScore = intval(current($dataSet));
            $maximumScore = intval(end($dataSet));
    
            // Populate new data array, with score value and size.
            foreach ($dataSet as $tagName => $score) {
                $size = $this->getPercentSize($maximumScore, $minimumScore, $score);
                $color = $this->getColor($maximumScore, $score);
                $data[$tagName] = array('score' => $score, 'size' => $size, 'color' => $color);
            }
    
            return $data;
        }
    
        /*  @author: syl-via
         *  @param int $maximumScore Maximum score value in array.    
         *  @param int $currentValue Current score value for given item.  
         *
         *  returns string Hex(ex: #000012) value of RGB.
         */
    
        public function getColor($maximumScore, $currentValue) {
            $b = floor($this->blue * ($currentValue / $maximumScore));
            return '#' . sprintf('%02s', dechex($this->red)) . sprintf('%02s', dechex($this->green)) . sprintf('%02s', dechex($b));
        }
    
        /*  @author: Suhail Doshi
         *  @param int $maxValue Maximum score value in array.
         *  @param int $minValue Minimum score value in array.
         *  @param int $currentValue Current score value for given item.
         *  @param int [$minSize] Minimum font-size.
         *  @param int [$maxSize] Maximum font-size.
         *
         *  returns int percentage for current tag.
         */
    
        private function getPercentSize($maximumScore, $minimumScore, $currentValue) {
            if ($minimumScore < 1)
                $minimumScore = 1;
            $spread = $maximumScore - $minimumScore;
            if ($spread == 0)
                $spread = 1;
            // determine the font-size increment, this is the increase per tag quantity (times used)
            $step = ($this->maxSize - $this->minSize) / $spread;
            // Determine size based on current value and step-size.
            $size = $this->minSize + (($currentValue - $minimumScore) * $step);
            return $size;
        }
    
        /*  @author: Suhail Doshi
         *  @param array $tags An array of tags (takes an associative array)
         *  
         *  returns shuffled array of tags for randomness.
         */
    
        public function shuffleTags($tags) {
            while (count($tags) > 0) {
                $val = array_rand($tags);
                $new_arr[$val] = $tags[$val];
                unset($tags[$val]);
            }
            if (isset($new_arr))
                return $new_arr;
        }
    
    }
    ?> 



.. author:: syl-via
.. categories:: articles, helpers
.. tags:: tag cloud,word cloud,word-cloud,tagcloud helper,Helpers

