function squareNumber(){
  var num = document.getElementById('square-input').value
  console.log("The result of squaring the number " + num + " is " + num*num + ".")
  return round((num*num), false)
}

function halfNumber(){
  var num = document.getElementById('half-input').value
  console.log("Half of " + num + " is " + num/2 + ".")
  return round((num/2), false)
}

function percentOf(){
  var first = document.getElementById('percent1-input').value
  var second = document.getElementById('percent2-input').value
  var percent = (first / second) * 100
  console.log(first + " is " + percent + "% of " + second + ".")
  return round(percent, true)
}

function areaOfCircle(radius){
  var pi = Math.PI
  var result = (radius * radius) * pi
  console.log("The area for a circle with radius " + radius + " is " + result + ".")
  return round(result, false)
}

// round the numbers
function round(num, isPercent){
  num = Math.round(num * 100) / 100
  if (isPercent == true){
    return document.getElementById('solution').innerText = num +'%'
  }else{
    return document.getElementById('solution').innerText = num
  }
}
