var questions = [
    ["The founders of the United Nations wanted it to have the same type of organization as the League of Nations.", "False"],
    ["It is mandatory for member-states to act on the decisions of the Security Council.", "True"],
    ["Five nations are represented in the Security Council.", "False"],
    ["All ten rotating members of the Security Council must agree if a resolution is to pass.", "False"],
    ["Member-states must act according to the decisions of the Security Council and the General Assembly.", "False"],
    ["All the countries in the world ratified the United Nations Charter in 1945.", "False"],
    ["All six branches of the United Nations remain fully operational.", "False"],
    ["The International Court of Justice listens to cases that member-states bring to its attention.", "True"]
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

