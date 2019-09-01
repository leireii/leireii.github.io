var questions = [
    ["UN radio has invited staff members to share work-related experiences in honour of the sixtieth anniversary of the United Nations.", "True"],
    ["The staff member sharing her story is a diplomat.", "False"],
    ["The Kitengesa Community Library is meant to serve only those who are completely illiterate.", "False"],
    ["A college professor started the village library in Kitengesa.", "True"],
    ["The library provides users with access to a variety of reading materials.", "True"],
    ["One library user’s favourite book was Animal Farm by George Orwell.", "True"],
    ["One of the library programmes has young people recite traditional folk tales to older people.", "False"],
    ["Angela joined the Kitengesa Community Library.", "True"],
    ["Angela married a man less educated than herself.", "False"],
    ["A book sale to support literacy and the Kitengesa Library was held at the UN.", "True"],
    ["All the buildings in Kitengesa have electricity.", "False"],
    ["The library was able to buy solar panels.", "True"],
    ["The library is the only building in the village that is illuminated at night.", "True"],
    ["Pat feels that visiting Kitengesa was an important experience.", "True"]
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

progress.innerHTML = "Question " + (index+1) + " of 14";

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
    if (index == 13){
        next.display = "none";
        result.innerHTML = "Final score: " + score+"/14";
        result.style.fontSize = "30px";
        result.style.marginTop = "-150px"
        progress.style.display = "none";
        question.style.display = "none";
        document.getElementsByClassName('answers')[0].style.visibility = "hidden";
    }
    index += 1;
    question.innerHTML = questions[index][0];
    progress.innerHTML = "Question " + (index+1) + " of 14";
}

