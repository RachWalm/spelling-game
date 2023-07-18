console.log("connected yah")

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startGame").addEventListener("click", function () {
        console.log("go to start game");
        buildLetters();
        handleKeys();
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
    let ltr = "<input class=lettr type=text placeholder=- maxlength=1 onkeydown=handleKeys(event);>";
    console.log("buildLetters activated");
    for (let i = 0; i < currentWord.length; i++) {
        document.getElementById("actualGame").innerHTML += ltr;
        console.log(i);
    };
}

function handleKeys(event) {
    //event.preventDefault();
    //let key = document.getElementsByClassName("lettr");
    if (event.repeat) {
        return false;
    } else {
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