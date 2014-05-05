SQL Dump Task for Shells
========================

If you need to dump your SQL queries from a Shell then this is for
you.
When using shells there is no standard interface to dump out your SQL
queries like there is in the controller. To do this I have created the
SqlDump task that you can use in your shell. This code was taken
directly from the built in cake\libs\view\elements\sql_dump.ctp code.
You can use it to get a dump in array format or have it create a .csv
file.

::

    
    <?php
    /**
     * SQL Dump Task.  Dumps out SQL log information in array format or to a CSV file
     */
    App::Import('ConnectionManager');
    
    class SqlDumpTask extends Shell {
        
        /**
         * Dump SQL commands as an array
         * @return  array
         */
        function dump_array() {
            if (!class_exists('ConnectionManager') || Configure::read('debug') < 2) {
                return false;
            }        
            $a = array();
            $noLogs = !isset($logs);
            if ($noLogs):
                $sources = ConnectionManager::sourceList();
            
                $logs = array();
                foreach ($sources as $source):
                    $db =& ConnectionManager::getDataSource($source);
                    if (!$db->isInterfaceSupported('getLog')):
                        continue;
                    endif;
                    $logs[$source] = $db->getLog();
                endforeach;
            endif;
            
            if ($noLogs || isset($_forced_from_dbo_)):
                foreach ($logs as $source => $logInfo):
                    $text = $logInfo['count'] > 1 ? 'queries' : 'query';
                    // Write the stats header
                    $a[] = array('Database','Query Count','Query Type','Took');                
                    // Write the stats
                    $p = array();
                    $p[]= $source;
                    $p[]= $logInfo['count'];
                    $p[]= $text;
                    $p[]= $logInfo['time'] . ' ms';
                    $a[] = $p;
                    // Write the second header
                    $a[] = array('Num','Query','Error','Affected','Num. rows','Took (ms)');                
                    foreach ($logInfo['log'] as $k => $i) :
                        $p = array();
                        $p[] = ($k + 1);
                        $p[] = html_entity_decode(h($i['query']));
                        $p[] = $i['error'];
                        $p[] = $i['affected'];
                        $p[] = $i['numRows'];
                        $p[] = $i['took'];
                        $a[] = $p;
                    endforeach;
                endforeach;
            else:
                return false;
            endif;
            return $a;
        }
        
        /**
         * Output SQL dump to a CSV file
         *
         * @param   string    $fileName       File name to dump to
         * @return  boolean     True on success, otherwise false
         */
        function dump_csv($fileName) {
            if ( ! $fileName) {  return false; }
            $data = $this->dump_array();
            if ( ! $data ) {
                return false;
            }
            $fp = fopen($fileName, 'w');
            if ( ! $fp ) { return false; }
            foreach ($data as $fields) {
                fputcsv($fp, $fields);
            }        
            fclose($fp);
            return true;
        }
    }
    ?>



.. author:: carcus88
.. categories:: articles, snippets
.. tags:: shells tasks sql dump,Snippets

