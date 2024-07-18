function setName(){
    var name=document.getElementById('name').value;
    if(name==""){
        document.getElementById('error').style="display:block"
    }else{
        document.cookie="username="+name;
        //console.log(document.cookie.split('=')[1]);
        window.location.href = window.location.href.replace("/index.html","")+"/html/questions.html";
    }
}

function aboutMe(){
    window.location.href = "https://www.linkedin.com/in/dev-sachira-madhushan/";
}