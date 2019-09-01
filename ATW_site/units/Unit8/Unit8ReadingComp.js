var questions = [
    ["According to the passage, nearly all banks and lending institutions offer micro-credit loans to small business owners in developing regions of the world.", "False"],
    ["Micro-credit loans are generally small.", "True"],
    ["Mohamed Yunus was the founder of the Grameen Bank, which makes micro-credit loans.", "True"],
    ["When he first started, Mohamed Yunus found that all the poor people he made micro-credit loans to paid back the money.", "True"],
    ["The micro-credit loan programmes have worked well only in Bangladesh.", "False"],
    ["According to the passage, each member of a micro-credit cooperative guarantees the loans of the other members.", "True"],
    ["Yunus believes that credit is a human right.", "True"],
    ["Women who benefit from micro-credit loans use the resulting profits to improve their homes and quality of life for their children and families.", "True"]
]

var index = 0;
var question = document.getElementById('question');
var progress = document.getElementById('progress');
var result = document.getElementById('result');
var truth = document.getElementById('true').innerHTML;
var falsity = document.getElementById('false').innerHTML;
var next = document.getElementById('next').style;
var score = 0;

question.innerHTML = questions[index][0];

progress.innerHTML = "Question " + (index+1) + " of 8";

function checkTrue(){
    if (questions[index][1] == truth){
        result.innerHTML = "Correct!"
        score += 1;
    }else{
        result.innerHTML = "Incorrect."
    }
}

function checkFalse(){
    if (questions[index][1] == falsity){
        result.innerHTML = "Correct!"
        score += 1;
    }else{
        result.innerHTML = "Incorrect."
    }

}

function nextOne(){
    result.innerHTML = "____________";
    if (index == 7){
        next.display = "none";
        result.innerHTML = "Final score: " + score+"/8";
        result.style.fontSize = "30px";
        result.style.marginTop = "-150px"
        progress.style.display = "none";
        question.style.display = "none";
        document.getElementsByClassName('answers')[0].style.visibility = "hidden";
    }
    index += 1;
    question.innerHTML = questions[index][0];
    progress.innerHTML = "Question " + (index+1) + " of 8";
}

