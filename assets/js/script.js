//console.log("connected yah")

/**
 * On DOM load sends it to the game or gives the instructions pop up
 */

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startGame").addEventListener("click", function () {
        //console.log("go to start game");
        buildGameArea();
        hideFront();
    });
    document.getElementById("skip").addEventListener("click", function () {
        console.log("skip function needed");
        skip();
    });
    document.getElementById("quit").addEventListener("click", function () {
        window.location.replace("score.html");
        //finalScores(currentScore);
        //console.log = ("currentScore")
    });
})

function hideFront() {
    let first = document.getElementById("front");
    first.style.display = "none";
    let last = document.getElementById("score");
    last.style.visibility = "visible";
    let buttonA = document.getElementById("skip");
    buttonA.style.visibility = "visible";
    let buttonB = document.getElementById("quit");
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
        'complete': ['k,j']
    },
    {
        'word': 'station',
        'image': 'src="assets/images/station.png" alt"cartoon station"',
        'decs': 'place where trains or buses stop for passengers',
        'hint': 'tion sounds like shun',
        'complete': ['k,j']
    },
    {
        'word': 'pharaoh',
        'image': 'src="assets/images/pharoah.png" alt"cartoon pharoah"',
        'decs': 'egyptian king',
        'hint': 'f and ph often sound the same',
        'complete': ['k,j']
    },
    {
        'word': 'quarter',
        'image': 'src="assets/images/quarter.png" alt"cartoon quarter pie chart"',
        'decs': '1/4 of something',
        'hint': 'q usually has a u after it',
        'complete': ['k,j']
    },
    {
        'word': 'incense',
        'image': 'src="assets/images/incense.png" alt"cartoon incense"',
        'decs': 'burnt to give a smell',
        'hint': 's and c are difficult to place in this word',
        'complete': ['k,j']
    },

]

let pick = rand();
let currentWord = wordData[pick].word;
console.log(currentWord);
let guess = [];
let skipped = [];
let currentScore = 0;

function rand() {
    let rndm = Math.floor(Math.random() * wordData.length);
    //console.log(wordData.length);
    console.log('random array number is ' + rndm);
    return rndm;
}

function buildGameArea() {
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

}

function buildLetters() {
    //console.log("buildLetters activated");
    for (let i = 0; i < currentWord.length; i++) {
        let ltr = `<input type=text id=input${i} placeholder=- maxlength=1;>`;
        document.getElementById("actualGame").innerHTML += ltr;
        //console.log(i);
        //console.log(ltr);
    };
    firstBox();
}

function lettersOnly(l) {
    let matcher = /^[A-Za-z]+$/;
    //console.log('letters only in ' + l);
    //console.log('lettersonly input type is' + (typeof (l)));
    //console.log('matcher test is ' + matcher.test(l));
    return matcher.test(l);

}

function whichBoxNumber() {
    let guessLen = parseInt(guess.length);
    let len = guessLen;
    //console.log('box number  equals ' + len);
    return len;
}

function whichBoxInput() {
    let num = 'input' + whichBoxNumber();
    //console.log('input equals ' + num);
    return num;
}

function whichBoxInputMinusOne() {
    let math = whichBoxNumber() - 1;
    let out = 'input' + math;
    //console.log('input equals ' + out);
    return out;
}

function firstBox() {
    document.getElementById('input0').value.length == 0 ? disableArrayBoxes() : console.log('box full');
    //console.log(document.getElementById('input0').value.length)
}


function disableArrayBoxes() {
    for (let i = 0; i < currentWord.length; i++) {
        //console.log(whichBoxInput());
        let imp = 'input' + i;
        //console.log('imp equals ', imp);
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
    //console.log('output of lettersOnly is ' + lettersOnly(event.key))
    if (event.type === 'keydown') {
        //console.log('keydown')
        if (lettersOnly(event.key) === false) {
            alert('You must insert a letter. As numbers and special characters are not accepted'); //need an else if for weird characters
        } else if (letter2notInput(event) === true) {
            console.log('letters to not input');
            document.getElementById(whichBoxInput()).value = '-';
        } else if (lettersOnly(event.key) === true) {
            //console.log(event);
            //console.log(event.key);
            let low = lowerCase(event.key);
            letter2input(low);
            guess.push(low);
            console.log('guess array contains ' + guess);
            //console.log('length of guess array is' + guess.length)
            isLetterCorrect();
        } else {
            //console.log('problem in lettersOnly possibly');
        }
    } else if (event.type === 'keyup') {
        //console.log('keyup')
        moveOn()
    }
}

function isLetterCorrect() {
    let whichNumber = whichBoxNumber() - 1;
    let boxContent = guess[whichNumber];
    let actualLetter = currentWord[whichNumber];
    let isCorrect = boxContent === actualLetter;
    //console.log('is my letter correct' + isCorrect)
    //console.log('the letter from the current word array is ' + actualLetter);
    //console.log('current word array ' + currentWord);
    //console.log('the box content is ' + boxContent);
    if (isCorrect) {
        //console.log('correct letter match')
        console.log('to choose colour of box ' + whichBoxInputMinusOne());
        document.getElementById(whichBoxInputMinusOne()).style.color = "lightblue";
        currentScore = scores(currentScore);
    } else {
        //console.log('not correct letter match')
        document.getElementById(whichBoxInputMinusOne()).style.color = "red";
        guess.pop(); //this will need to empty the incorrect answer out of the array
        //console.log(guess);
        //see modifier state in handlekey events
    }
}

function letter2input(typed) {
    document.getElementById(whichBoxInput()).value = typed;
}

function letter2notInput(typed) {
    let shift = typed.getModifierState("Shift");
    let meta = typed.getModifierState("Meta");
    let control = typed.getModifierState("Control");
    let altg = typed.getModifierState("AltGraph");
    let alt = typed.getModifierState("Alt");
    let wrong = shift || meta || control || altg || alt;
    console.log(shift);
    console.log(wrong);
    return wrong;
}

function moveOn() {
    //console.log('move on activated');
    if (whichBoxNumber() < currentWord.length) {
        disableArrayBoxes();
    } else {
        console.log('time for next word');
        if (wordData.length != 0) {
            let rm = pick;
            wordData.splice((rm), 1);
            console.log(wordData);
            clearRestart();
        } else {
            console.log('out of words return to skipped if any');
            window.location.replace("score.html");

        }
    }
}

function clearRestart() {
    empty();
    pick = rand()
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
    console.log(guess);
}

function scores(last) {
    let area = document.getElementById("score");
    area.innerHTML = `Your Score is : ${last + 1}`;
    return last + 1;
}

function finalScores(last) {
    let area = document.getElementById("finalScore");
    area.innerHTML = `Your Score was : ${last}`;
}

function lowerCase(letter) {
    let lower = letter.toLowerCase();
    return lower;
}

function skip() {
    let rm = pick;
    addOld = wordData.splice((rm), 1);
    console.log(addOld);
    skipped.push(addOld);
    let final = (skipped.length) - 1;
    skipped[final].complete = [guess];
    console.log(skipped[final]);
    clearRestart();
}

window.onbeforeunload = function (event) {
    event.returnValue = "leaving site";
};