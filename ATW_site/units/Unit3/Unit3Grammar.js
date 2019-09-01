function checkAnswer(){
    var input1 = document.getElementById('input1');
    var input2 = document.getElementById('input2');

    if (input1.value != 'had seen') {
        input1.value = 'had seen'
        input1.style.backgroundColor = 'pink'
    } else {
        input1.style.backgroundColor = '#e6ffec'
    }

    if (input2.value != 'had been') {
        input2.value = 'had been'
        input2.style.backgroundColor = 'pink'
    } else {
        input2.style.backgroundColor = '#e6ffec'
    }
}