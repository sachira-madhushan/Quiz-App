function setName(){
    var name=document.getElementById('name').value;
    if(name==""){
        document.getElementById('error').style="display:"
    }else{
        document.cookie="username="+name;
        //console.log(document.cookie.split('=')[1]);
        window.location.href = window.location.href+"/html/questions.html";
    }
}