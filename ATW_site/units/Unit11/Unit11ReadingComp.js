var questions = [
    ["UNESCO's World Heritage List solely celebrates human cultures and their accomplishments throughout history.", "False"],
    ["The Pyramids of Egypt are part of the list.", "True"],
    ["The UNESCO World Heritage List preserves the greatest structures of only certain cultures.", "False"],
    ["Beautiful natural structures and formations are also part of the World Heritage List.", "True"]
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

progress.innerHTML = "Question " + (index + 1) + " of 4";

function checkTrue() {
    if (questions[index][1] == truth) {
        result.innerHTML = "Correct!"
        score += 1;
    } else {
        result.innerHTML = "Incorrect."
    }
}

function checkFalse() {
    if (questions[index][1] == falsity) {
        result.innerHTML = "Correct!"
        score += 1;
    } else {
        result.innerHTML = "Incorrect."
    }

}

function nextOne() {
    result.innerHTML = "____________";
    if (index == 3) {
        next.display = "none";
        result.innerHTML = "Final score: " + score + "/4";
        result.style.fontSize = "30px";
        result.style.marginTop = "-150px"
        progress.style.display = "none";
        question.style.display = "none";
        document.getElementsByClassName('answers')[0].style.visibility = "hidden";
    }
    index += 1;
    question.innerHTML = questions[index][0];
    progress.innerHTML = "Question " + (index + 1) + " of 4";
}

