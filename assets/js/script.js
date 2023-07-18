console.log("connected yah")

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startGame").addEventListener("click", function () {
        console.log("go to start game");
        buildLetters();
        //document.getElementById("instructions").addEventListener("click", function () {
        //console.log("go to instructions");
    });
})



const wordData = [{
    'word': 'elephant',
    'image': 'images',
    'decs': 'large animal often found in Africa or Asia',
    'hint': 'f and ph often sound the same'
}, ]

let currentWord = wordData[0].word;
console.log(currentWord);

function buildLetters() {
    console.log("buildLetters activated");
    for (let i = 0; i < currentWord.length; i++) {
        let ltr = `<input type=text id=input${i} placeholder=- maxlength=1 onkeydown=handleKeys(event);>`;
        document.getElementById("actualGame").innerHTML += ltr;
        console.log(i);
        console.log(ltr);
    };
}

function handleKeys(event) {
    //event.preventDefault();
    if (event.repeat) {
        return false;
    } else { //need an else if for weird characters
        //if (event === 'keydown') {
        //console.log(event.code);
        console.log(event);
        console.log(event.getModifierState("CapsLock")); //NumLock ScrollLock
        //}
    }
}

function userLetter() {
    console.log('which user letter add to array')
}