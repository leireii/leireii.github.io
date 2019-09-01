var questions = [
    ["Only a few parts of the world have been affected by the AIDS crisis.", "False"],
    ["At this writing, almost 40 million people in the world are affected with HIV-AIDS.", "True"],
    ["The Security Council had often dealt with medical issues.", "False"],
    ["The Secretary-General said the the AIDS crisis could not compare with the devastating effects of war.", "False"],
    ["There are a total of 13 million orphans in the world.", "False"],
    ["UN aid workers take jobs as hairdressers and farmers in local communities to help fight the spread of AIDS.", "False"],
    ["Orphans never live alone in any country.", "False"],
    ["Sometimes AIDS orphans have to work to support younger brothers and sisters.", "True"],
    ["UNICEF aid workers bring food, money, and advice to the orphans.", "True"],
    ["In Uganda (at this writing) 25 per cent of families take care of AIDS orphans.", "True"],
    ["Families who take care of orphans have enough resources to do so easily.", "False"],
    ["The United Nations has sponsored micro-credit cooperatives to help guardians support orphaned children.", "True"]
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

