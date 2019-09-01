var questions = [
    ["The United Nations Peacekeeping Forces received the UN's 1st Nobel Peace Prize.", "False"],
    ["The main role of the IPCC is to evaluate information about land mines.", "False"],
    ["Mr. Al Gore and the IPCC received the Nobel Peace Prize for their brilliant solutions to stopping climate change.", "False"],
    ["Ralph Bunche was a United Nations official who worked in refugee camps in Korea.", "False"],
    ["Dr. G. J. van Hueven Goedhart said that there can be no peace in the world while hundreds of thousands of people live in misery in refugee camps.", "True"],
    ["Dag Hammarskjold was the director of UNICEF.", "False"],
    ["Kofi Annan said, \"If you desire peace, cultivate justice.\"", "True"],
    ["General Mohammed ElBaradei worked to prevent military use of nuclear energy.", "False"]
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

progress.innerHTML = "Question " + (index + 1) + " of 8";

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
    if (index == 7) {
        next.display = "none";
        result.innerHTML = "Final score: " + score + "/8";
        result.style.fontSize = "30px";
        result.style.marginTop = "-150px"
        progress.style.display = "none";
        question.style.display = "none";
        document.getElementsByClassName('answers')[0].style.visibility = "hidden";
    }
    index += 1;
    question.innerHTML = questions[index][0];
    progress.innerHTML = "Question " + (index + 1) + " of 8";
}

