'use strict';
let modal_container = document.getElementById('modal-container');
let btn = document.querySelectorAll('.btn');
let count = 0;
let num_items = 0;
let limit = 5;
let correctAnswer = [];

const reset = () => {
    num_items = 0;
    correctAnswer = [];
}

const getRandomItems = (data) => {
    count = Math.floor(Math.random() * data.length);
}

const chooseQuiz = () => {
    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => {
            switch (i) {
                case 0:
                    getRandomItems(hiragana_characters);
                    elementState(modal_container, 'flex');
                    showContent(modal_container, hiragana_characters);
                    hideParentModal();
                    break;
                case 1:
                    getRandomItems(katakana_characters);
                    elementState(modal_container, 'flex');
                    showContent(modal_container, katakana_characters);
                    hideParentModal();
                    break;
                case 2:
                    getRandomItems(kanji_characters);
                    elementState(modal_container, 'flex');
                    showContent(modal_container, kanji_characters);
                    hideParentModal();
                    break;
                case 3:
                    getRandomItems(math);
                    elementState(modal_container, 'flex');
                    showContent(modal_container, math);
                    hideParentModal();
                    break;
                case 4:
                    getRandomItems(calendar);
                    elementState(modal_container, 'flex');
                    showContent(modal_container, calendar);
                    hideParentModal();
                    break;
                case 5:
                    getRandomItems(random);
                    elementState(modal_container, 'flex');
                    showContent(modal_container, random);
                    hideParentModal();
                    break;
                case 6:
                    elementState(modal_container, 'flex');
                    showSettings(modal_container);
                    break;
            }
        }
    }
}
chooseQuiz();

function hideParentModal() {
    document.querySelector('.btn-exit').onclick = () => {
        reset();
        modal_container.innerHTML = '';
        elementState(modal_container, 'none');
    }
}

function playAgain(data) {
    reset();
    showContent(modal_container, data);
    hideParentModal();
}

function elementState(el, value) {
    return el.style.display = value;
}

function showContent(parent, data) {
    parent.innerHTML = '';
    let div = document.createElement('div');
    let btn_exit = document.createElement('button');
    let p = document.createElement('p');
    let p1 = document.createElement('p');
    div.setAttribute('class', 'option-container');
    let h2 = document.createElement('h2');
    h2.setAttribute('class', 'item');
    h2.textContent = data[count].item;
    p.textContent = data[count].meaning;
    p1.textContent = data[count].question;
    parent.appendChild(p1);
    parent.appendChild(h2);
    parent.appendChild(p);
    for (let x = 0; x < data[count].choices.length; x++) {
        let btn = document.createElement('button');
        btn.setAttribute('class', 'btn-option');
        btn.textContent = data[count].choices[x];
        div.appendChild(btn);
    }

    btn_exit.setAttribute('class', 'btn-exit');
    btn_exit.textContent = 'EXIT';
    parent.appendChild(btn_exit);
    parent.appendChild(div);
    checkAnswer(data);
}

function checkAnswer(data) {
    let btn_option = document.querySelectorAll('.btn-option');
    for (let i = 0; i < btn_option.length; i++) {
        btn_option[i].onclick = () => {
            num_items += 1;
            if (btn_option[i].textContent == data[count].answer) {
                correctAnswer.push(data[count].answer);
                btn_option[i].style.backgroundColor = 'green';
                nextItem(data);
            }
            else {
                btn_option[i].style.backgroundColor = 'red';
                nextItem(data);
            }
        }
    }
}

function nextItem(data) {
    setTimeout(function () {
        if (num_items == limit) {
            correctAnswer.length <= Math.round((limit / 100) * 50) ? showResult(modal_container, 'More Practice', 'assets/img/apple.png', `${correctAnswer.length} out of ${limit}`, data) : showResult(modal_container, 'Nice One', 'assets/img/congrats.gif', `${correctAnswer.length} out of ${limit}`, data);
        } else {
            getRandomItems(data);
            showContent(modal_container, data);
            hideParentModal();
        }
    }, 500);

}

function showResult(parent, text, source, score, data) {
    parent.innerHTML = '';
    let div = document.createElement('div');
    div.setAttribute('class', 'result-container')
    let img = document.createElement('img');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let btn1 = document.createElement('button');
    let btn2 = document.createElement('button');
    img.src = source;
    img.setAttribute('class', 'result-img');
    btn1.setAttribute('class', 'btn_result');
    btn2.setAttribute('class', 'btn_result');
    p1.textContent = text;
    p2.textContent = score;
    btn1.textContent = 'Play Again';
    btn2.textContent = 'Exit';
    div.append(img, p2, p1, btn1, btn2);
    parent.appendChild(div);

    btn1.onclick = () => playAgain(data);
    btn2.onclick = () => {
        reset();
        modal_container.innerHTML = '';
        elementState(modal_container, 'none');
    }
}



function showSettings(parent) {
    let limit_range = document.createElement('select');
    let header = document.createElement('h3');
    let music = document.createElement('button');
    let switch_music = true;
    music.textContent = 'Audio OFF'
    header.textContent = 'Settings';
    header.style.fontSize = '2em';
    header.style.padding = '1em';
    music.onclick = () => {
        switch_music = !switch_music;
        switch_music ?  music.textContent = 'Audio OFF' :  music.textContent = 'Audio ON';
    }

    let btn_save = document.createElement('button');
    let p_range = document.createElement('p');
    p_range.textContent = 'Range Limit:'
    btn_save.setAttribute('id', 'btn_save');
    music.setAttribute('class', 'btn_music');
    btn_save.textContent = 'Done';
    for(let i = 1; i <= 3; i++){
        let option = document.createElement('option');
        option.textContent = i * 5;
        option.value = i * 5;
        limit_range.append(option);
    }
    console.log(limit);
    btn_save.onclick = () => {
        modal_container.innerHTML = '';
        elementState(modal_container, 'none');
        limit = limit_range.value;
        console.log(limit);
    }
    parent.append(header, music, p_range, limit_range, btn_save);
}

function loadingScreen() {
    let loading = document.getElementById('loading');
    const loader = setInterval(() => {
        loading.value += 1;
        if(loading.value == 100){
           clearInterval(loader);
           document.querySelector('.loading-screen').style.display = 'none';
           console.log('Stop');
        }
        document.getElementById('percent').innerHTML = `${loading.value}%`;
    }, 100);
    
}
loadingScreen();