Session based pagination
========================

When i was working on my project, i had to implement search
functionality for my project's list. So i wanted to make use of
pagination, but when i search for something, i got the result
appropriate, but the pagination sort didn't work. I had this error of
"undefined variable paginator". The reason for this, data is which is
received by controller ($this->data) is lost afterwards. So here's the
solution for it.
When you get the data after submitting, try saving the data, here's
what i did.

In my search option there is a search field and a drop down box for
the criteria

so when the data is submitted i save that data on to session, so now
when i click next time for pagination sort i pass the session
variables data.


View Template:
``````````````

::


    <?php echo $form->create('Project', array('action' => 'search','inputDefaults' => array('div' => false, 'label' => false)));?>

            <h4><?php __('Search Project');?></h4>

            <?php echo $form->input('search', array('id' => 'search'));?>

            <h6><?php __('Search By'); ?></h6>

            <?php
            $options = array('project_id' => 'Project #', 'name' => 'Project Name', 'city' => 'Project City', 'state' => 'Project State', 'modified' => 'Project Last Updated');

            echo $form->select('search_by', $options, '', array('empty' => false));

            echo $form->submit('Search', array('div' => false, 'class' => 'search'));

            echo $form->end();?>



now in controller, i wrote one function search


Controller Class:
`````````````````

::

    <?php
    class ProjectsController extends AppController {

    function search() {

             if(!empty($this->data)) {

                $this->Session->write('Search', $this->data);
                $searchkey = $this->data['Project']['search'];
                $searchby = $this->data['Project']['search_by'];

            }
            else {

                   $searchkey= $this->Session->read('Search.Project.search');
                   $searchby = $this->Session->read('Search.Project.search_by');
            }

                    switch ($searchby)  {
                            case 'project_id' : $this('projects',$this->paginate('Project', array('Project.project_id LIKE' => '%'.$searchkey.'%')));
                                                break;

                            case 'name'     :   $this->set('projects',$this->paginate('Project', array('Project.name LIKE' => '%'.$searchkey.'%')));
                                                break;

                            case 'state'    :   $state = $this->Project->State->findByName($searchkey);
                                                $this->set('projects', $this->paginate('Project', array('Project.state_id ' => $state['State']['id'])));
                                                break;

                            case 'city'     :   $this->set('projects', $this->paginate('Project', array('Project.city LIKE' => '%'.$searchkey.'%')));
                                                break;

                            case 'modified' :   $datetime = date_create($searchkey);  $date = $datetime->format("Y-m-d");
                                                $this->set('projects',$this->paginate('Project', array('Project.modified LIKE' => '%'.$date.'%')));
                                                break;
                            }
                   $this->set(compact('searchby'));
        }

    ?>


Thats it !! and you are done !!


.. author:: avinashbangar
.. categories:: articles, tutorials
.. tags:: pagination,search,paginator,pagination sorting,session based pagina,Tutorials

