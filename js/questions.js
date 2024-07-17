var data;
var qIndex=0;
var answerList=[];
var tempList=[];
var correctAnswersList=[];
var selectedAnswerList=[];
var selectedAnswer=5;
var oldSelectedAnswer;
var correctAnswer=3;

function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
    .then(response => response.json())
    .then((value)=>{
        data=value;
        firstQuestion();
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
    document.getElementById('questionNumber').innerText="Questions 1/10";
    answerList=data['results'][0]['incorrect_answers'];
    answerList.push(data['results'][0]['correct_answer']);
    shofleAnswers();
    document.getElementById('question').innerText=(qIndex+1)+"."+data['results'][0]['question'];
    document.getElementById('answer1').innerText=answerList[0];
    document.getElementById('answer2').innerText=answerList[1];
    document.getElementById('answer3').innerText=answerList[2];
    document.getElementById('answer4').innerText=answerList[3];
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
        calFinalScore();

        //console.log(correctAnswersList);
        //console.log(selectedAnswerList);
    }else{
        unselectAllAnswers();
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
getQuestions();
setName();