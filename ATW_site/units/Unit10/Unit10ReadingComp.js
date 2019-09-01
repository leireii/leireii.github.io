var questions = [
    ["Satellites can forewarn people of impending disasters such as hurricanes and earthquakes.", "True"],
    ["Satellites were originally created to provide information on impending natural disasters.", "False"],
    ["The UN Office for Outer Space Affairs (UNOOSA) has helped shift the purpose of satellite technology from peaceful to military uses.", "False"],
    ["The UN must pay a lot of money to use the satellite technology of the US and the Russian Federation.", "False"],
    ["The UNOOSA also deals with education programmes that teach students about space technology.", "True"],
    ["A UNESCO programme allows teachers in developing countries to create multi-media lessons for their students.", "True"],
    ["A science-fiction writer made a speech at the UN UNISPACE III conference.", "True"],
    ["Arthur C. Clarke thinks human beings will eventually abandon space exploration.", "False"]
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

