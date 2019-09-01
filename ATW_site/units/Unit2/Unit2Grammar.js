function check1() {
    var input1 = document.getElementById('input1');

    if (input1.value != 'was to serve') {
        input1.value = 'was to serve'
        input1.style.backgroundColor = 'pink'
    } else {
        input1.style.backgroundColor = '#e6ffec'
    }


}

function check2() {
    var input2 = document.getElementById('input2');
    if (input2.value != 'would abide') {
        input2.value = 'would abide'
        input2.style.backgroundColor = 'pink'
    } else {
        input2.style.backgroundColor = '#e6ffec'
    }
}