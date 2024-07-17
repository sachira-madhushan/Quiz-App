let data;
function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
    .then(response => response.json())
    .then((value)=>{
        data=value;
        console.log(data['results']);
    }
    ).catch((e)=>console.log(e));
}