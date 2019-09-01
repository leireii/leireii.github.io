var questions = [
    ["The League of Nations was a predecessor to the United Nations.", "True"],
    ["Promoters of the League of Nations came from the same continent.", "False"],
    ["In 1920, the League of Nations won the Nobel Peace Prize.", "False"],
    ["The League of Nations was destroyed by the First World War.", "False"],
    ["A U.S. President supported the idea of a League of Nations.", "True"],
    ["The U.S. did not join the League of Nations.", "True"],
    ["The United Nations Charter makes the United Nations virtually identical to the League of Nations.", "False"]
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

progress.innerHTML = "Question " + (index+1) + " of 7";

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
    if (index == 6){
        next.display = "none";
        result.innerHTML = "Final score: " + score+"/7";
        result.style.fontSize = "30px";
        result.style.marginTop = "-150px"
        progress.style.display = "none";
        question.style.display = "none";
        document.getElementsByClassName('answers')[0].style.visibility = "hidden";
    }
    index += 1;
    question.innerHTML = questions[index][0];
    progress.innerHTML = "Question " + (index+1) + " of 7";
}

