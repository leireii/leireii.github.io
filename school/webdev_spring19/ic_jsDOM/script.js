function total(){
  var tags = document.getElementsByTagName('h1').length
  alert("There are " + tags + " h1s in this page.")
}

function firstAmount(){
  var total = document.getElementById('first').getElementsByTagName('h1').length
  alert("There are " + total + " h1s in this div.")
  return total
}

function secondAmount(){
  var total = document.getElementById('second').getElementsByTagName('h1').length
  alert("There are " + total + " h1s in this div.")
  return total
}

function show(num){
  document.getElementById('display').innerText = num
}
