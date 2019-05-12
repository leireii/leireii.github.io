var hat = document.getElementById('cowboy-hat');
var emo = document.getElementById('emo-hair');
var bro = document.getElementById('bro-hat');
var chef = document.getElementById('chef-hat');
var airpod = document.getElementById("airpod");



function yeeHaw(){
  if (hat.style.visibility="hidden"){
    hat.style.visibility="visible"
  }
  airpod.style.visibility="hidden"
  emo.style.visibility="hidden"
  bro.style.visibility="hidden"
  chef.style.visibility="hidden"
}

function emoHair(){
  if (emo.style.visibility="hidden"){
    emo.style.visibility="visible"
  }
  airpod.style.visibility="hidden"
  hat.style.visibility="hidden"
  bro.style.visibility="hidden"
  chef.style.visibility="hidden"
}

function broCat(){
  if (bro.style.visibility="hidden"){
    bro.style.visibility="visible"
  }
  airpod.style.visibility="visible"
  hat.style.visibility="hidden"
  emo.style.visibility="hidden"
  chef.style.visibility="hidden"
}

function chefCat(){
  if (chef.style.visibility="hidden"){
    chef.style.visibility="visible"
  }
  airpod.style.visibility="hidden"
  hat.style.visibility="hidden"
  emo.style.visibility="hidden"
  bro.style.visibility="hidden"
}

function clearCat(){
  airpod.style.visibility="hidden"
  hat.style.visibility="hidden"
  emo.style.visibility="hidden"
  bro.style.visibility="hidden"
  chef.style.visibility="hidden"
}
