
    $.get('./colleges.json', function colleges(data) {
     
        data.forEach((college,i) => {
       var x= document.createElement('option')
       var parent=document.getElementById('colleges-datalist');
        parent.appendChild(x);
        x.id=i;
        x.value=college;
       }); 
       console.log(data) 
       $.get('./collegelist.json', function colleges(datalist) {
           console.log(datalist)
       $(document).ready(function() {
        // process the form
        $('form').submit(function(event) {   
            // get the form data
            // there are many ways to get this data using jQuery (you can use the class or id also)
            var formData = {
                'name'              : $('input[name=name]').val(),
                'email'             : $('input[name=email]').val(),
                'phone'    : $('input[name=phone]').val(),
                'stream'    : $('input[name=stream]').val(),
                'college'    : $('input[name=college]').val()
            };
    //         document.getElementById('button').onclick = function(){
    //             document.getElementsByClassName('button')[0].classList.toggle("active");
    //        } 
    //        document.getElementById('button').transitionend = function(){
    //         document.getElementsByClassName('button')[0].classList.toggle("finished");
    //    } 
    $('#button').click(function(){
        document.getElementsByClassName('button')[0].classList.toggle("active");
        document.getElementById('button').transitionend = function(){
            document.getElementsByClassName('button')[0].classList.toggle("finished");
       } 
   });
       $('#button').trigger('click');
            // process the form
            $.ajax({
                type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url         : 'https://staging-mern-endpoint.herokuapp.com/webinar.php', // the url where we want to POST
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                            encode          : true
            })

                // using the done promise callback
                .done(function(college_data) {  
                    // log data to the console so we can see
                    console.log(JSON.stringify(college_data.user.college)); 
                    console.log(data);
                   function checkindex(college){
                       return college==college_data.user.college;
                   }
                   var index=data.findIndex(checkindex);
                    location.href = datalist[index]
                    console.log(datalist[index])
                    // here we will handle errors and validation messages
                });
            // stop the form from submitting the normal way and refreshing the page
            event.preventDefault();
        });
     })
});
});