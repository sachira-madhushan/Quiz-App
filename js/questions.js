var data;
var qIndex=0;
var answerList=[];
var tempList=[];
var correctAnswersList=[];
var selectedAnswerList=[];
var selectedAnswer;
var oldSelectedAnswer;
var correctAnswer=3;

function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
    .then(response => response.json())
    .then((value)=>{
        data=value;
        console.log(data['results']);
        firstQuestion();

    }
    ).catch((e)=>console.log(e));
}
function shofleAnswers(){
    tempList= answerList.slice();
    console.log(tempList);
    correctAnswer =Math.floor(Math.random() * 4);
    for(var i=0;i<4;i++){
        if(i===correctAnswer){
            answerList[i]=tempList[3];
        }else{
            if(i===3){
                answerList[i]=tempList[correctAnswer];
            }else{
                answerList[i]=tempList[i];
            }
            
        }
    }
    console.log("Suffled");
}
function firstQuestion(){
    
    document.getElementById('questionNumber').innerText="Questions 1/10";
    answerList=data['results'][0]['incorrect_answers'];
    answerList.push(data['results'][0]['correct_answer']);
    shofleAnswers();
    console.log(answerList);
    document.getElementById('question').innerText=(qIndex+1)+"."+data['results'][0]['question'];
    document.getElementById('answer1').innerText=answerList[0];
    document.getElementById('answer2').innerText=answerList[1];
    document.getElementById('answer3').innerText=answerList[2];
    document.getElementById('answer4').innerText=answerList[3];
}

function nextQuestion(){
    qIndex++;
    document.getElementById('questionNumber').innerText="Questions "+(qIndex+1)+"/10";
    answerList=data['results'][qIndex]['incorrect_answers'];
    answerList.push(data['results'][qIndex]['correct_answer']);
    shofleAnswers();
    document.getElementById('question').innerText=(qIndex+1)+"."+data['results'][qIndex]['question'];
    document.getElementById('answer1').innerText=answerList[0];
    document.getElementById('answer2').innerText=answerList[1];
    document.getElementById('answer3').innerText=answerList[2];
    document.getElementById('answer4').innerText=answerList[3];
}

function setName(){
    document.getElementById('username').innerText="Hello "+document.cookie.split('=')[1]+"!";
}

function answer1(){
    oldSelectedAnswer=selectedAnswer;
    selectedAnswer=0;
    selectAnswer();
    unselectAnswer();
}
function answer2(){
    oldSelectedAnswer=selectedAnswer;
    selectedAnswer=1;
    selectAnswer();
    unselectAnswer();
}
function answer3(){
    oldSelectedAnswer=selectedAnswer;
    selectedAnswer=2;
    selectAnswer();
    unselectAnswer();
}
function answer4(){
    oldSelectedAnswer=selectedAnswer;
    selectedAnswer=3;
    selectAnswer();
    unselectAnswer();
}

function selectAnswer(){
    switch(selectedAnswer){
        case 0:
            document.getElementById('answer1div').classList.add('selectedAnswer');
            document.getElementById('answer1radio').checked=true;
            break;
        case 1:
            document.getElementById('answer2div').classList.add('selectedAnswer');
            document.getElementById('answer2radio').checked=true;
            break;
        case 2:
            document.getElementById('answer3div').classList.add('selectedAnswer');
            document.getElementById('answer3radio').checked=true;
            break;
        case 3:
            document.getElementById('answer4div').classList.add('selectedAnswer');
            document.getElementById('answer4radio').checked=true;
            break;
    }
}

function unselectAnswer(){
    if(selectedAnswer!==oldSelectedAnswer){
        switch(oldSelectedAnswer){
            case 0:
                document.getElementById('answer1div').classList.remove('selectedAnswer');
                break;
            case 1:
                document.getElementById('answer2div').classList.remove('selectedAnswer');
                break;
            case 2:
                document.getElementById('answer3div').classList.remove('selectedAnswer');
                break;
            case 3:
                document.getElementById('answer4div').classList.remove('selectedAnswer');
                break;
        }
    }
    
}
getQuestions();
setName();