function checkAnswer(){
    var input1 = document.getElementById('input1');
    var input2 = document.getElementById('input2');

    if (input1.value != 'wish') {
        input1.value = 'wish'
        input1.style.backgroundColor = 'pink'
    } else {
        input1.style.backgroundColor = '#e6ffec'
    }

    if (input2.value != 'hope') {
        input2.value = 'hope'
        input2.style.backgroundColor = 'pink'
    } else {
        input2.style.backgroundColor = '#e6ffec'
    }

    if (input3.value != 'hope') {
        input3.value = 'hope'
        input3.style.backgroundColor = 'pink'
    } else {
        input3.style.backgroundColor = '#e6ffec'
    }

    if (input4.value != 'wish') {
        input4.value = 'wish'
        input4.style.backgroundColor = 'pink'
    } else {
        input4.style.backgroundColor = '#e6ffec'
    }

    if (input5.value != 'hope') {
        input5.value = 'hope'
        input5.style.backgroundColor = 'pink'
    } else {
        input5.style.backgroundColor = '#e6ffec'
    }
}