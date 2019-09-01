var questions = [
    ["Noel had worked in areas ravaged by war before going to Dili.", "False"],
    ["Noel's job was to arrange transportation.", "False"],
    ["Bob's mission in Cambodia was to supervise trainers who would in turn train others.", "True"],
    ["Angkor Watt is the name of the capital city of Cambodia.", "False"],
    ["Bob's motorcycle trip was risky because of its surreal quality.", "False"],
    ["Marie-Francoise worked in many Asian cities during her career.", "False"],
    ["Marie-Francoise says that trainings were held in modern buildings with state-of-the-art classroom facilities.", "False"],
    ["Different kinds of animals sometimes attended the trainings.", "True"],
    ["Marie-Francoise very much valued some written words she received from her translator.", "True"],
    ["According to the Protocol, 'The Rights of the Child,' children under 18 can be made fight in the military if there is a war going on.", "False"],
    ["According to 'Isabelle's Story', most child soldiers are easy to rehabilitate.", "False"],
    ["Isabelle wants the world to know about the plight of child soldiers.", "True"]
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

progress.innerHTML = "Question " + (index+1) + " of 12";

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
    if (index == 11){
        next.display = "none";
        result.innerHTML = "Final score: " + score+"/12";
        result.style.fontSize = "30px";
        result.style.marginTop = "-150px"
        progress.style.display = "none";
        question.style.display = "none";
        document.getElementsByClassName('answers')[0].style.visibility = "hidden";
    }
    index += 1;
    question.innerHTML = questions[index][0];
    progress.innerHTML = "Question " + (index+1) + " of 12";
}

