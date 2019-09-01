function checkAnswer(){
    var input1 = document.getElementById('input1');
    var input2 = document.getElementById('input2');

    if (input1.value != 'has been') {
        input1.value = 'has been'
        input1.style.backgroundColor = 'pink'
    } else {
        input1.style.backgroundColor = '#e6ffec'
    }

    if (input2.value != 'has served') {
        input2.value = 'has served'
        input2.style.backgroundColor = 'pink'
    } else {
        input2.style.backgroundColor = '#e6ffec'
    }
}