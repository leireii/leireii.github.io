var questions = [
    ["The Goodwill Ambassadors are all movie actors who use their fame to bring attention to good causes.", "False"],
    ["The Goodwill Ambassadors use their celebrity status to spotlight some of the most serious problems in the world.", "True"],
    ["Angelina Jolie said the most shocking thing about refugee camps is the lack of proper housing.", "False"],
    ["Jolie spoke only with people in the refugee camps in Ecuador.", "False"],
    ["Mr. N’Dour has been to refugee camps in Kenya.", "True"],
    ["Maria Sharapova wrote a letter to the people living in Chernobyl-affected areas.", "False"],
    ["Dikembe Mutombo makes televsion advertisements.", "True"],
    ["Mutombo is monolingual.", "False"],
    ["Mr. N’Dour heads an initiative to gather ideas from Africa’s elders.", "False"]
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

progress.innerHTML = "Question " + (index+1) + " of 9";

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
    if (index == 8){
        next.display = "none";
        result.innerHTML = "Final score: " + score+"/9";
        result.style.fontSize = "30px";
        result.style.marginTop = "-150px"
        progress.style.display = "none";
        question.style.display = "none";
        document.getElementsByClassName('answers')[0].style.visibility = "hidden";
    }
    index += 1;
    question.innerHTML = questions[index][0];
    progress.innerHTML = "Question " + (index+1) + " of 9";
}

