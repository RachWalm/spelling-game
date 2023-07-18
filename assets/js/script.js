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
    'image': 'url',
    'decs': 'large animal often found in Africa or Asia',
    'hint': 'f and ph often sound the same'
}, ]

let currentWord = wordData[0].word;
console.log(currentWord);

function buildLetters() {
    let ltr = "<input type=text placeholder=- >";
    console.log("buildLetters activated");
    for (let i = 0; i < currentWord.length; i++) {
        document.getElementById("actualGame").innerHTML += ltr;
        console.log(i);
    };
}