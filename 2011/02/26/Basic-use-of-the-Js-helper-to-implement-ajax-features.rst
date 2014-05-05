Basic use of the Js helper to implement ajax features
=====================================================

An overview on how to use the new Js helper to implement ajax
features.
I wanted to implement ajax features into my project but I was not sure
on how to do this and so I researched for hours and I finally managed
to piece together several articles to reach my result. This may seem
obvious and easy to most users but to me this was problem for me at
first. First thing is to add a Js link to your page: `
echo$this->Js->link('Page2',array('page'=>2),array('update'=>'#content
'));
` (I just copied this from the cakePHP book). The main problem I was
having was when I clicked the link, the whole page was rendered within
the update element so there was a page within a page. I finally
figured out where I was going wrong. What you need to do is specify a
view you want to render. At first I was calling a function from the Js
link that contained this code: `
$this->layout='MyLayout';
` This layout was for the whole page, this was why it was rendering a
whole page in the specified update element. What I did not realise to
do was to create a view for the element I wanted to update. e.g I
wanted to update the content within UL tags so I created a view that
looked like this: `
<?phpforeach($diariesas$diary):?>
<liclass="entry">
//ContentoftheListitem
</li>
<?phpendforeach;?>
` I would then in the controller have a function that handled the ajax
request and render the new view as such: `
functionrecent_entries(){
$diaries=$this->Diary->find('all',array('conditions'=>array('Diary.use
r_id'=>$this->Session->read('User.id')),'order'=>array('Diary.createdd
esc')));
$this->set('diaries',$diaries);
$this->render('listView','ajax');
}
` This code would just get the diary entries added in the last two
weeks. The last line is the main key as to why I was having problems.
The last line renders just the view you just created and lets cakePHP
know to also use the ajax view. Also don't forget to add the Js helper
to your controller like so: `
var$helpers=array('Js'=>array('Jquery'));
` cakePHP 1.3 will use Jquery by default but check out the cakePHP 1.3
book for more details on supported libraries. Another way of achieving
ajax is by using the Jquery.ajax function itself instead of using the
Js helper. `
$.ajax({action:"search",dataType:"html",
success:function(data,textStatus){
//UsingbasicJquerytochangethehtmlinsidethe
//specifiedelementandaddalittleeffecttoit.
$("#updatedElement").html(data).hide().fadeIn(1000);
},
type:"post",url:"url/to/controll/function"}
);
returnfalse;
});
` Like I said at the start, this may appear easy and trivial to most
users but for user like me who are just starting out with cakePHP this
may help you and save you a lot of time googling for answers. Please
let me know if this helps you or if I have anything wrong, also let me
know if you notice anything I could have done in an easier or more
efficient way.


.. author:: casualman
.. categories:: articles, helpers
.. tags:: AJAX,helper,js,JsHelper,Helpers

