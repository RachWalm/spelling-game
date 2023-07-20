console.log("connected yah")

/**
 * On DOM load sends it to the game or gives the instructions pop up
 */

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startGame").addEventListener("click", function () {
        console.log("go to start game");
        buildLetters();
    });
})

/**
 * build instructions dialogue box
 */

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("click", () => {
    modal.showModal()
})

closeButton.addEventListener("click", () => {
    modal.close()
})

modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close()
    }
})

/**
 * Javascript required to play the game
 */

const wordData = [{
    'word': 'elephant',
    'image': 'images',
    'decs': 'large animal often found in Africa or Asia',
    'hint': 'f and ph often sound the same'
}, ]

let currentWord = wordData[0].word;
console.log(currentWord);
let guess = [];

function buildLetters() {
    console.log("buildLetters activated");
    for (let i = 0; i < currentWord.length; i++) {
        let ltr = `<input type=text id=input${i} placeholder=- maxlength=1;>`;
        document.getElementById("actualGame").innerHTML += ltr;
        console.log(i);
        console.log(ltr);
    };
    firstBox();
}

function lettersOnly(l) {
    let matcher = /^[A-Za-z]+$/;
    console.log('letters only in ' + l);
    console.log('lettersonly input type is' + (typeof (l)));
    console.log('matcher test is ' + matcher.test(l));
    return matcher.test(l);

}

function whichBoxNumber() {
    let guessLen = parseInt(guess.length);
    let len = guessLen;
    console.log('box number  equals ' + len);
    return len;
}

function whichBoxInput() {
    let num = 'input' + whichBoxNumber();
    console.log('input equals ' + num);
    return num;
}

function firstBox() {
    document.getElementById('input0').value.length == 0 ? disableArrayBoxes() : console.log('box full');
    console.log(document.getElementById('input0').value.length)
}


function disableArrayBoxes() {
    for (let i = 0; i < currentWord.length; i++) {
        console.log(whichBoxInput());
        let imp = 'input' + i;
        console.log('imp equals ', imp);
        if (i === whichBoxNumber()) {
            document.getElementById(`${imp}`).disabled = false;
        } else {
            document.getElementById(`${imp}`).disabled = true;
        }
    }

}

function handleKeys(event) {
    //event.preventDefault();
    //if (event.repeat) {
    //  return false;
    //} else 
    console.log('output of lettersOnly is ' + lettersOnly(event.key))
    if (lettersOnly(event.key) === false) {
        alert('you must insert a letter, numbers and special characters are not accepted'); //need an else if for weird characters
    } else if (lettersOnly(event.key) === true) {
        console.log(event);
        //console.log(event.getModifierState("CapsLock")); //NumLock ScrollLock
        //console.log(event.key);
        guess.push(event.key);
        console.log('guess array contains ' + guess);
        console.log('length of guess array is' + guess.length)
        isLetterCorrect();
    } else {
        console.log('problem in lettersOnly possibly');
    }
}

function isLetterCorrect() {
    let number = whichBoxNumber() - 1;
    let boxContent = guess[number];
    let actualLetter = currentWord[number];
    let isCorrect = boxContent === actualLetter;
    console.log('is my letter correct' + isCorrect)
    console.log('the letter from the current word array is ' + actualLetter);
    console.log('the box content is ' + boxContent);
    if (isCorrect) {
        console.log('correct letter match')
        document.getElementById('input0').style.color = "green";
        //disableArrayBoxes();
    } else {
        console.log('not correct letter match')
        document.getElementById('input0').style.color = "red";
        guess = []; //this will need to empty the incorrect answer out of the array
        //lettersOnly(put character in here);
        //see modifier state in handlekey events
        //alert('only letters can be accepted not numbers or special characters')
    }
}

//function showLetter() {
//
//}