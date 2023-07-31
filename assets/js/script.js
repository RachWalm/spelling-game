/* jshint esversion: 8 */

/**
 * On DOM load sends it to the game or gives the instructions pop up
 */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startGame").addEventListener("click", function () {
        buildGameArea();
        hideFront();
    });
    document.getElementById("skip").addEventListener("click", function () {

        skip();
    });
    document.getElementById("quit").addEventListener("click", function () {
        window.location.replace("index.html");
    });
    document.onkeydown = function (e) {
        handleKeys(e);
    }
    document.onkeyup = function (e) {
        handleKeys(e);
    }
})

function hideFront() {
    const first = document.getElementById("front");
    first.style.display = "none";
    const last = document.getElementById("score");
    last.style.visibility = "visible";
    last.innerHTML = `Your Score is : ` + 0;
    const buttonA = document.getElementById("skip");
    buttonA.style.visibility = "visible";
    const buttonB = document.getElementById("quit");
    buttonB.style.visibility = "visible";
}

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

let wordData = [{
        'word': 'elephant',
        'image': 'src="assets/images/elephant.png" alt"cartoon elephant"',
        'decs': 'large animal often found in Africa or Asia',
        'hint': 'f and ph often sound the same',
        'complete': [],
        'firstLetter': ['e']
    },
    {
        'word': 'station',
        'image': 'src="assets/images/station.png" alt"cartoon station"',
        'decs': 'place where trains or buses stop for passengers',
        'hint': 'tion sounds like shun',
        'complete': [],
        'firstLetter': ['s']
    },
    {
        'word': 'pharaoh',
        'image': 'src="assets/images/pharoah.png" alt"cartoon pharoah"',
        'decs': 'egyptian king',
        'hint': 'f and ph often sound the same',
        'complete': [],
        'firstLetter': ['p']
    },
    {
        'word': 'quarter',
        'image': 'src="assets/images/quarter.png" alt"cartoon quarter pie chart"',
        'decs': '1/4 of something',
        'hint': 'q usually has a u after it',
        'complete': [],
        'firstLetter': ['q']
    },
    {
        'word': 'incense',
        'image': 'src="assets/images/incense.png" alt"cartoon incense"',
        'decs': 'burnt to give a smell',
        'hint': 's and c are difficult to place in this word',
        'complete': [],
        'firstLetter': ['i']
    },

]

let pick = rand();
let currentWord = wordData[pick].word;
//console.log(currentWord);
let guess = [];
let skipped = [];
let currentScore = 0;
let wantFirstLetter = false;


function rand() {
    let rndm = Math.floor(Math.random() * wordData.length);
    //console.log(wordData.length);
    //console.log('random array number is ' + rndm);
    return rndm;
}

function buildGameArea() {
    if (wordData.length != 0) {
        pick = rand();
        console.log(wordData)
        let imge = `<img id="images" ${wordData[pick].image}>`;
        let des = `<div id="dess"><p>${wordData[pick].decs}</p> </div>`;
        let hinty = `<div id="hintys"> <p>${wordData[pick].hint}</p> </div>`
        currentWord = wordData[pick].word;
        //console.log(imge);
        //console.log(des)
        document.getElementById("image").innerHTML += imge;
        document.getElementById("description").innerHTML += des;
        buildLetters();
        document.getElementById("hints").innerHTML += hinty;
    } else if (wordData.length = 1) {
        //console.log('out of words return to skipped if any');
        //wordData = skipped.concat(wordData);
        //wordData = wordData.shift()
        wordData = Array.from(skipped, x => x);
        console.log('wordData refilled from skipped now' + wordData)
        console.log('wordData refilled from skipped now')
        console.log(wordData)
        skipped = [];
        console.log('skipped emptied now ')
        console.log(skipped);
        pick = rand();
        console.log(pick);
        currentWord = wordData[pick].word;
        console.log(currentWord);
        buildGameArea();
    } else {
        console.log('wordData less than 0')
    }
}

function buildLetters() {
    //console.log("buildLetters activated");
    for (let i = 0; i < currentWord.length; i++) {
        let ltr = `<input class="inputs" type=text id=input${i} placeholder=- maxlength=1;>`;
        document.getElementById("actualGame").innerHTML += ltr;
        //whatComplete();
        //console.log(i);
        //console.log(ltr);
    };
    disableArrayBoxes();
    wantedFirstLetter();
}

function wantedFirstLetter() {
    if (wantFirstLetter) {
        console.log(wordData[pick].firstLetter);
        console.log(wordData[pick].firstLetter[0]);
        document.getElementById('input0').value = wordData[pick].firstLetter[0];
        guess = wordData[pick].firstLetter;
        disableArrayBoxes();
    } else {
        console.log('don"t include first letter')
    }
}

function lettersOnly(l) {
    let matcher = /^[A-Za-z]+$/;
    //console.log('letters only in ' + l);
    //console.log('lettersonly input type is' + (typeof (l)));
    //console.log('matcher test is ' + matcher.test(l));
    return matcher.test(l);

}

/**
 * Provides the number of the box that is currently in focus to have a letter added
 */
function whichBoxNumber() {
    let guessLen = parseInt(guess.length);
    let len = guessLen;
    return len;
}

/**
 * Provides the id 'input'number of the box that is currently in focus to have a letter added
 */
function whichBoxInput() {
    let num = 'input' + whichBoxNumber();
    return num;
}

/**
 * Provides the id 'input'number of the box that is currently in focus to have a letter added so that it can be matched to the number in the array
 */
function whichBoxInputMinusOne() {
    let minus = whichBoxNumber() - 1;
    let out = 'input' + minus;
    return out;
}

/**
 * disables all the letter input boxes except the one in focus
 */
function disableArrayBoxes() {
    for (let i = 0; i < currentWord.length; i++) {
        let imp = 'input' + i;
        if (i === whichBoxNumber()) {
            document.getElementById(`${imp}`).disabled = false;
            document.getElementById(whichBoxInput()).focus();
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
    if (event.type === 'keydown') {
        //console.log('keydown')
        if (lettersOnly(event.key) === false) {
            alert('You must insert a letter. As numbers and special characters are not accepted'); //need an else if for weird characters
        } else if (lettersnotInput(event) === true) {
            document.getElementById(whichBoxInput()).value = '-';
        } else if (lettersOnly(event.key) === true) {
            let low = lowerCase(event.key);
            lettersinput(low);
            guess.push(low);
            isLetterCorrect();
        } else {
            //console.log('problem in lettersOnly possibly');
        }
    } else if (event.type === 'keyup') {
        moveOn()
    }
}


function isLetterCorrect() {
    let whichNumber = whichBoxNumber() - 1;
    let boxContent = guess[whichNumber];
    let actualLetter = currentWord[whichNumber];
    let isCorrect = boxContent === actualLetter;
    if (isCorrect) { //if isCorrect = true
        document.getElementById(whichBoxInputMinusOne()).style.color = "blue";
        currentScore = scores(currentScore);
    } else {
        document.getElementById(whichBoxInputMinusOne()).style.color = "red";
        guess.pop(); //this need to empty the incorrect answer out of the array
    }
}

function lettersinput(typed) {
    document.getElementById(whichBoxInput()).value = typed;
}

function lettersnotInput(typed) {
    let shift = typed.getModifierState("Shift");
    let meta = typed.getModifierState("Meta");
    let control = typed.getModifierState("Control");
    let altg = typed.getModifierState("AltGraph");
    let alt = typed.getModifierState("Alt");
    let wrong = shift || meta || control || altg || alt;
    //console.log(shift);
    //console.log(wrong);
    return wrong;
}

function moveOn() {
    if (whichBoxNumber() < currentWord.length) {
        disableArrayBoxes();
    } else {
        console.log('time for next word');
        //if (wordData.length != 0) {
        console.log('wordData items left' + wordData.length);
        wordData.splice((pick), 1);
        console.log('wordData equals : ');
        console.log(wordData);
        clearRestart();

    }
}

function clearRestart() {
    empty();
    buildGameArea();
}


function empty() {
    console.log('empty activated');
    const empimg = document.getElementById("image");
    empimg.removeChild(empimg.firstElementChild);
    const empDesc = document.getElementById("description");
    empDesc.removeChild(empDesc.firstElementChild);
    const letterRemove = document.getElementById("actualGame");
    for (let i = 0; i < currentWord.length; i++) {
        letterRemove.removeChild(letterRemove.firstElementChild);
    }
    const emphint = document.getElementById("hints");
    emphint.removeChild(emphint.firstElementChild);
    guess = [];
    //console.log(guess);
}

function scores(last) {
    const area = document.getElementById("score");
    area.innerHTML = `Your Score is : ${last + 1}`;
    return last + 1;
}

function finalScores(last) {
    const area = document.getElementById("finalScore");
    area.innerHTML = `Your Score was : ${last}`;
}

function lowerCase(letter) {
    let lower = letter.toLowerCase();
    return lower;
}

function skip() {
    let addOld = structuredClone(wordData[pick]);
    //console.log('structured clone is ')
    //console.log(addOld);
    guessToComplete(addOld);
    skipped.push(guessToComplete(addOld));
    wordData.splice((pick), 1);
    console.log('skipped equals ');
    console.log(skipped);
    clearRestart();
}

function guessToComplete(got) {
    //console.log('into guess to complete.complete is and should be first letter')
    //console.log(got.complete)
    got.complete = guess;
    //console.log(got);
    return got;
}

//window.onbeforeunload = function (event) {
//    event.returnValue = "leaving site";
//};