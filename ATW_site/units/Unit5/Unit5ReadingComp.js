var questions = [
    ["UN peacekeepers consist solely of soldiers from many countries.", "False"],
    ["A goal of peacekeeping missions is to allow the normal life of a society to function despite the conflict.", "True"],
    ["A goal of UN peacekeepers is to enforce compliance with Security Council resolutions.", "True"],
    ["Peacekeepers can fulfill their missions in any circumstances.", "False"],
    ["These days, most violent conflicts occur between different countries.", "False"],
    ["East Timor and Sierra Leone are examples of countries where successful UN missions have been carried out.", "True"],
    ["Before a peacekeeping mission is undertaken, all 15 members of the Security Council must vote in favour of it.", "False"],
    ["Usually, one member-state agrees to pay all the costs for a peacekeeping mission.", "False"]
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

