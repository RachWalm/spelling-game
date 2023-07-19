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
        let ltr = `<input type=text id=input${i} placeholder=- maxlength=1 onkeydown=handleKeys(event);>`;
        document.getElementById("actualGame").innerHTML += ltr;
        console.log(i);
        console.log(ltr);
    };
    correctBox();
}

function lettersOnly(l) {
    let matcher = /^[A-Za-z]+$/;
    l.value.match(matcher) ? console.log('is letter is true') : console.log('is letter is false');
}

function correctBox() {
    document.getElementById('input0').value.length == 0 ? disableArrayBoxes(5) : console.log('box 1 full');
    console.log(document.getElementById('input0').value.length)
}


function disableArrayBoxes() {
    for (let i = 0; i < currentWord.length; i++) {
        if (i === 0) {
            continue;
        }
        let imp = 'input' + i;
        console.log('imp equals ', imp);
        document.getElementById(`${imp}`).disabled = true
    }

}

function handleKeys(event) {
    //event.preventDefault();
    if (event.repeat) {
        return false;
    } else { //need an else if for weird characters
        //if (event === 'keydown') {
        console.log(event);
        console.log(event.getModifierState("CapsLock")); //NumLock ScrollLock
        console.log(event.key);
        guess.push(event.key);
        console.log(guess);
        console.log(guess.length)

    }
}

function userLetter() {
    console.log('which user letter add to array')
}