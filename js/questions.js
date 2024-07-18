var data;
var qIndex=0;
var answerList=[];
var tempList=[];
var correctAnswersList=[];
var selectedAnswerList=[];
var selectedAnswer=5;
var oldSelectedAnswer;
var correctAnswer=3;
var timer=30;

function countTimer(){
    timer--;
    if(timer<0){
        timerReset();
        nextQuestion();
    }
    if(timer<10){
        document.getElementById('timer').innerText="00:0"+timer;
    }else{
        document.getElementById('timer').innerText="00:"+timer;
    }
    
    
}

function timerReset(){
    timer=30;
}
setInterval(() => {
    countTimer();
}, "1000");

function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
    .then(response => response.json())
    .then((value)=>{
        data=value;
        firstQuestion();
        mapCorrectAnswers();
    }
    ).catch((e)=>console.log(e));
}
function shofleAnswers(){
    tempList= answerList.slice();
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
    correctAnswersList.push(correctAnswer);
}

function firstQuestion(){
    timerReset();
    document.getElementById('questionNumber').innerText="Questions 1/10";
    answerList=data['results'][0]['incorrect_answers'];
    answerList.push(data['results'][0]['correct_answer']);
    shofleAnswers();
    document.getElementById('question').innerHTML=(qIndex+1)+"."+data['results'][0]['question'];
    document.getElementById('answer1').innerHTML=answerList[0];
    document.getElementById('answer2').innerHTML=answerList[1];
    document.getElementById('answer3').innerHTML=answerList[2];
    document.getElementById('answer4').innerHTML=answerList[3];
}

function calFinalScore(){
    var score=0;
    for(var i=0;i<10;i++){
        if(selectedAnswerList[i]===correctAnswersList[i]){
            score++;
        }
    }
    document.getElementById('score').innerText=score+"/10";
}
function nextQuestion(){
    selectedAnswerList.push(selectedAnswer);
    qIndex++;
    if(qIndex===10){
        document.getElementById('formcontent').style="display:none";
        document.getElementById('questionNumber').style="display:none";
        document.getElementById('nextButton').style="display:none";
        document.getElementById('result').style="display:block";
        document.getElementById('form').style="margin-top:100px";
        document.getElementById('timer').style="display:none"
        document.getElementById('correctanswers').style="display:block"
        calFinalScore();
        //console.log(correctAnswersList);
        //console.log(selectedAnswerList);
    }else{
        unselectAllAnswers();
        document.getElementById('questionNumber').innerHTML="Questions "+(qIndex+1)+"/10";
        answerList=data['results'][qIndex]['incorrect_answers'];
        answerList.push(data['results'][qIndex]['correct_answer']);
        shofleAnswers();
        document.getElementById('question').innerHTML=(qIndex+1)+"."+data['results'][qIndex]['question'];
        document.getElementById('answer1').innerHTML=answerList[0];
        document.getElementById('answer2').innerHTML=answerList[1];
        document.getElementById('answer3').innerHTML=answerList[2];
        document.getElementById('answer4').innerHTML=answerList[3];
    }
    
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
    selectedAnswerList.push(selectedAnswer);
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

function unselectAllAnswers(){
    document.getElementById('answer1div').classList.remove('selectedAnswer');
    document.getElementById('answer2div').classList.remove('selectedAnswer');
    document.getElementById('answer3div').classList.remove('selectedAnswer');
    document.getElementById('answer4div').classList.remove('selectedAnswer');
    document.getElementById('answer1radio').checked=false;
    document.getElementById('answer2radio').checked=false;
    document.getElementById('answer3radio').checked=false;
    document.getElementById('answer4radio').checked=false;
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
function mapCorrectAnswers(){
    var resultWindow=document.getElementById('correctanswers');
    for(var i=0;i<10;i++){
        var q=document.createElement('div');
        var a=document.createElement('div');
        var qnumber=document.createElement('p');
        q.classList.add('questions');
        a.classList.add('correctanswer');
        qnumber.classList.add('qnumber');
        q.innerHTML=(i+1)+"."+data['results'][i]['question'];
        a.innerHTML=data['results'][i]['correct_answer'];

        resultWindow.appendChild(qnumber);
        resultWindow.appendChild(q);
        resultWindow.appendChild(a);
    }
}
function replay(){
    window.location.href = window.location.href.replace("/html/questions.html","");
}
getQuestions();
setName();
