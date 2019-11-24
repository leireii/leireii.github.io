function checkAnswer(){
    var input1 = document.getElementById('input1');
    var input2 = document.getElementById('input2');

    if (input1.value != 'Rising') {
        input1.value = 'Rising'
        input1.style.backgroundColor = 'pink'
    } else {
        input1.style.backgroundColor = '#e6ffec'
    }

    if (input2.value != 'Growing') {
        input2.value = 'Growing'
        input2.style.backgroundColor = 'pink'
    } else {
        input2.style.backgroundColor = '#e6ffec'
    }

    if (input3.value != 'Increasing') {
        input3.value = 'Increasing'
        input3.style.backgroundColor = 'pink'
    } else {
        input3.style.backgroundColor = '#e6ffec'
    }

    if (input4.value != 'Participating') {
        input4.value = 'Participating'
        input4.style.backgroundColor = 'pink'
    } else {
        input4.style.backgroundColor = '#e6ffec'
    }

    if (input5.value != 'developing') {
        input5.value = 'developing'
        input5.style.backgroundColor = 'pink'
    } else {
        input5.style.backgroundColor = '#e6ffec'
    }
}