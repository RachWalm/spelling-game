//console.log("connected yah")

/**
 * On DOM load sends it to the game or gives the instructions pop up
 */

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startGame").addEventListener("click", function () {
        //console.log("go to start game");
        buildGameArea();
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

let wordData = [{
        'word': 'elephant',
        'image': 'src="assets/images/elephant.png" alt"cartoon elephant"',
        'decs': 'large animal often found in Africa or Asia',
        'hint': 'f and ph often sound the same'
    },
    {
        'word': 'station',
        'image': 'src="assets/images/station.png" alt"cartoon station"',
        'decs': 'place where trains or buses stop for passengers',
        'hint': 'tion sounds like shun'
    },
    {
        'word': 'pharaoh',
        'image': 'src="assets/images/pharoah.png" alt"cartoon pharoah"',
        'decs': 'egyptian king',
        'hint': 'f and ph often sound the same'
    },
    {
        'word': 'quarter',
        'image': 'src="assets/images/quarter.png" alt"cartoon quarter pie chart"',
        'decs': '1/4 of something',
        'hint': 'q usually has a u after it'
    },
    {
        'word': 'incense',
        'image': 'src="assets/images/incense.png" alt"cartoon incense"',
        'decs': 'burnt to give a smell',
        'hint': 's and c are difficult to place in this word'
    },

]

let pick = rand();
let currentWord = wordData[pick].word;
console.log(currentWord);
let guess = [];

function rand() {
    let rndm = Math.floor(Math.random() * wordData.length);
    console.log(wordData.length);
    console.log('random array number is ' + rndm);
    return rndm;
}

function buildGameArea() {
    let imge = `<img ${wordData[pick].image}>`;
    let des = `<p>${wordData[pick].decs}</p>`;
    let hinty = `<p>${wordData[pick].hint}</p>`
    console.log(imge);
    console.log(des)
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
        console.log('keydown')
        if (lettersOnly(event.key) === false) {
            alert('You must insert a letter. As numbers and special characters are not accepted'); //need an else if for weird characters
        } else if (lettersOnly(event.key) === true) {
            //console.log(event);
            //console.log(event.getModifierState("CapsLock")); //NumLock ScrollLock
            //console.log(event.key);
            guess.push(event.key);
            console.log('guess array contains ' + guess);
            console.log('length of guess array is' + guess.length)
            isLetterCorrect();
        } else {
            //console.log('problem in lettersOnly possibly');
        }
    } else if (event.type === 'keyup') {
        console.log('keyup')
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
    //console.log('the box content is ' + boxContent);
    if (isCorrect) {
        //console.log('correct letter match')
        console.log('to choose colour of box ' + whichBoxInputMinusOne());
        document.getElementById(whichBoxInputMinusOne()).style.color = "green";
    } else {
        //console.log('not correct letter match')
        document.getElementById(whichBoxInputMinusOne()).style.color = "red";
        guess.pop(); //this will need to empty the incorrect answer out of the array
        console.log(guess);
        //see modifier state in handlekey events
    }
}

function moveOn() {
    console.log('move on activated');
    if (whichBoxNumber() < currentWord.length) {
        disableArrayBoxes();
    } else {
        console.log('time for next word');
        let rm = pick;
        wordData.splice((rm), 1);
        skipped = wordData.splice((rm), 1); // for skip function
        console.log(wordData);
        empty();
        pick = rand()
        buildGameArea();
    }
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