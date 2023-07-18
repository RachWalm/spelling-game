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
    correctBox();
}

function lettersOnly(l) {
    let matcher = /^[A-Za-z]+$/;
    l.value.match(matcher) ? console.log('is letter is true') : console.log('is letter is false');
}

function correctBox() {
    document.getElementById('input0').value.length == 0 ? document.getElementById('input1').disabled = true : console.log('box 1 full');
    console.log(document.getElementById('input0').value.length)
}

function disableArrayBoxes() {
    let total = currentWord.length;

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