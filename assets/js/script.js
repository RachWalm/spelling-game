console.log("connected yah")

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startGame").addEventListener("click", function () {
        console.log("go to start game");
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
    //let inputs = currentWord.length;
    //for (let input of inputs) {ltr.innerHTML +=};
    let ltr = document.getElementById("actual--game");
    ltr.innerHTML = "input type=text placeholder=-"
}