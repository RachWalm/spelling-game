/* jshint esversion: 8 */

/**
 * constants definition
 */
const first = document.getElementById("front");
const last = document.getElementById("score");
const buttonA = document.getElementById("skip");
const buttonB = document.getElementById("quit");
const buttonC = document.getElementById("buy");
const buttonD = document.getElementById("hintButton");


/**
 * Array of words and information first iteration
 */
let wordData = [{
    "word": "fox",
    "image": "src='assets/images/fox.png' alt'cartoon incense'",
    "decs": "woodland creature",
    "hint": "x sounds like s",
    "complete": [],
    "firstLetter": ["f"]
}]

/**
 * On DOM load sets up the listeners sends it to the game or gives the instructions pop up, then game interactivity
 */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startGame").addEventListener("click", function () {
        booFirstLetter(); //Player decides if they want the first letter provided
        howDifficult(); // easy or hard level
        buildGameArea();
        hideFront(); //Removes the initial screen features and replaces them with the game
    });
    buttonA.addEventListener("click", function () {
        skip(); // allows player to skip a word and it will be repeated at the end
    });
    buttonB.addEventListener("click", function () {
        window.location.replace("index.html"); //takes user back to the beginning as a restart
    });
    buttonC.addEventListener("click", function () {
        document.getElementById(whichBoxInput()).style.color = "black";
        addLetter();
    });
    document.onkeydown = function (e) {
        handleKeys(e); //allows user to enter a letter into the word
    };
    document.onkeyup = function (e) {
        handleKeys(e); //moves letter focus onto the next word
    };
});

/**
 * global game variables
 */
let pick = rand(); //allows word order to be random
let currentWord = wordData[pick].word; //provides a location for the word in use
let guess = []; //array for letters of this word already guessed
let skipped = []; //words that have been skipped
let currentScore = 0; //starting score 0
let wantFirstLetter = false; //player choice of wanting to receive first letter or not
let repeat = false; //allows program to know if we are rerunning words to include already guessed letters

/**
 * build instructions for the dialogue box see README for code origin
 */
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

/**
 * dialogue box see README for code origin
 */
openButton.addEventListener("click", () => {
    modal.showModal();
});

/**dialogue box see README for code origin */
closeButton.addEventListener("click", () => {
    modal.close();
});

/**
 * dialogue box see README for code origin to allow click outside modal close
 */
modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

/**
 * removes initial screen functionality and replaces it with the game
 */
function hideFront() {
    first.style.display = "none";
    last.style.visibility = "visible";
    last.innerHTML = `Your Score is : <br>` + 0;
    buttonA.style.visibility = "visible";
    buttonB.style.visibility = "visible";
    buttonC.style.visibility = "visible";
    buttonD.style.visibility = "visible";
    const gameBox = document.getElementById("gameBox");
    gameBox.style.visibility = "visible";
    gameBox.style.height = "80%";
}

/**
 * Javascript required to play the game
 */

/**
 * produces a random number that can be fed in to make order picked from array random
 */
function rand() {
    let rndm = Math.floor(Math.random() * wordData.length);
    return rndm;
}

/**
 * builds the necessary HTML depending on the current word picked, if none left in array takes the skipped array or if none left ends
 */
function buildGameArea() {
    if (wordData.length != 0) { //words still available from array to be used
        pick = rand();
        let imge = `<img id="images" ${wordData[pick].image}>`;
        let des = `<div id="dess"><p>${wordData[pick].decs}</p> </div>`;
        let hinty = `<div id="hintys"><p>${wordData[pick].hint}</p> </div>`;
        currentWord = wordData[pick].word;
        document.getElementById("image").innerHTML += imge;
        document.getElementById("description").innerHTML += des;
        buildLetters();
        showHint();
        document.getElementById("hints").innerHTML += hinty;
    } else if (wordData.length = 1) { //no words available so looks in skipped array
        if (skipped.length > 0) {
            wordData = Array.from(skipped, x => x); //gets words from skipped array
            skipped = [];
            repeat = true;
            pick = rand();
            currentWord = wordData[pick].word;
            buildGameArea();
        } else {
            theEnd(); // no words in array or skipped so have to finish
        }
    } else {
        console.log('wordData less than 0');
    }
}

/**
 * for each letter in the current word provides a box to put the letter in
 */
function buildLetters() {
    for (let i = 0; i < currentWord.length; i++) {
        let ltr = `<input class="inputs" type=text id=input${i} placeholder=- maxlength=1;>`;
        document.getElementById("actualGame").innerHTML += ltr;
    }
    disableArrayBoxes(); //focus to correct letter
    wantedFirstLetter(); //checks if user has asked to receive first letter, if so provides
    whatComplete(); //checks if user has put letter in on a previous time then skipped to put back those letters
}

/**
 * checks if user has requested first letter and if so provides it
 */
function wantedFirstLetter() {
    if (wantFirstLetter) {
        document.getElementById('input0').value = wordData[pick].firstLetter[0]; //provides user first letter
        guess = wordData[pick].firstLetter; //puts first letter in guess array to align with screen
        disableArrayBoxes(); //puts focus on second/correct letter
    } else {
        console.log('don"t include first letter');
    }
}


/**
 * checks that the key pressed was not a number or special character
 */
function lettersOnly(l) {
    let matcher = /^[A-Za-z]+$/;
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
            document.getElementById(`${imp}`).disabled = false; //box in focus
            document.getElementById(whichBoxInput()).focus(); //puts focus on correct box
        } else {
            document.getElementById(`${imp}`).disabled = true; //box not in focus
        }
    }

}

/**
 * deals with each key press to put item in box if it is a letter and calls functions to determine if it is correct
 */
function handleKeys(event) {
    event.preventDefault();
    if (event.repeat) {
        return false;
    } else {
        if (event.type === 'keydown') {
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
                console.log('problem in lettersOnly possibly');
            }
        } else if (event.type === 'keyup') {
            moveOn();
        }
    }
}

/**
 * checks if the input letter is the next one in the word to spell correctly
 */
function isLetterCorrect() {
    let whichNumber = whichBoxNumber() - 1; //matches input numbers to array
    let isCorrect = guess[whichNumber] === currentWord[whichNumber];
    if (isCorrect) { //if isCorrect = true
        document.getElementById(whichBoxInputMinusOne()).style.color = "blue";
        currentScore = scores(currentScore);
    } else {
        document.getElementById(whichBoxInputMinusOne()).style.color = "red";
        guess.pop(); //this needed to empty the incorrect answer out of the array
    }
}

/**
 *puts the key pressed in the box on screen
 */
function lettersinput(typed) {
    document.getElementById(whichBoxInput()).value = typed;
}

/**
 * makes keys that aren't relevant not appear in the letter box
 */
function lettersnotInput(typed) {
    let shift = typed.getModifierState("Shift");
    let meta = typed.getModifierState("Meta");
    let control = typed.getModifierState("Control");
    let altg = typed.getModifierState("AltGraph");
    let alt = typed.getModifierState("Alt");
    if (typed.keyCode < 58) {
        return true;
    } else if (typed.keyCode > 90) {
        return true;
    } else {
        console.log('should be legitimate letter')
    }
    let wrong = shift || meta || control || altg || alt;
    return wrong;
}

/**
 * if there are more letters for the user to imput in the word it moves the focus to the next letter or clears screen for next word
 */
function moveOn() {
    if (whichBoxNumber() < currentWord.length) {
        disableArrayBoxes();
    } else {
        wordData.splice((pick), 1); //word completed correctly and removed from array
        clearRestart(); // calls functions to clear the screen and calls the function to build next word

    }
}

/**
 * calls functions to clear screen/guess array and starts next word build
 */
function clearRestart() {
    empty();
    buildGameArea();
}

/**
 * clears screen and guess array
 */
function empty() {
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
}

/**
 * increments and displays score 
 */
function scores(score) {
    last.innerHTML = `Your Score is : ${score + 1}`;
    return score + 1;
}

/**
 * allows uppercase letters typed but changed to lower for display and recognition as correct against array - returns lower case
 */
function lowerCase(letter) {
    let lower = letter.toLowerCase();
    return lower;
}

/**
 * when user skips letters user already provided go from guess into the complete key's pair
 */
function whatComplete() {
    for (i = 0; i < wordData[pick].complete.length; i++) {
        let letter = `input${i}`; //selects onscreen box to put letter
        document.getElementById(letter).value = wordData[pick].complete[i]; //adds letter to box
        guess = wordData[pick].complete; //aligns guess array
        disableArrayBoxes(); // puts focus on the correct / next letter
    }
}

/**
 * allows words to be skipped and stored to be repeated when words run out
 */
function skip() {
    let addOld = structuredClone(wordData[pick]); //deep copy
    guessToComplete(addOld);
    skipped.push(guessToComplete(addOld)); //adds word to skipped array for later
    wordData.splice((pick), 1); //removes word from current array
    clearRestart(); //sets up for next word
}

/**
 * puts the guess array into the complete : key pair of the skipped array
 */
function guessToComplete(got) {
    got.complete = guess;
    return got;
}

/**
 * changes the variable wantFirstLetter to put or not put first letter in each word on screen depending on tick box
 */
function booFirstLetter() {
    let checkBox = document.getElementById('wantFirstTick');
    if (checkBox.checked == true) {
        wantFirstLetter = true;
    } else {
        wantFirstLetter = false;
    }
}

/**
 * allows the next letter to be put in the guess array on on screen
 */
function addLetter() {
    nextLetter = currentWord[guess.length]; //provides user next
    document.getElementById(whichBoxInput()).value = nextLetter; //provides user next
    guess.push(wordData[pick].word[guess.length]); //puts  letter in guess array to align with screen
    moveOn(); //puts focus on correct letter or changes to new word if letters run out
}

/**
 * decides whether to collect the words for wordData array from the easy or hard JSON
 */
function howDifficult() {
    let skillLevel = document.getElementById("difficult").value;
    if (skillLevel === 'hard') {
        fetch('assets/js/hard.json') //get from server
            .then((response) => response.json())
            .then(harder => {
                wordData = Array.from(harder, x => x)
            })
    } else {
        fetch('assets/js/easy.json') //get from server
            .then((response) => response.json())
            .then(easy => {
                wordData = Array.from(easy, x => x)
            });
    }
}

/**
 * makes the hint visible or invisible depending on the option that the user has chosen from the drop down
 */
function showHint() {
    buttonD.addEventListener("change", function () {
        let show = buttonD.value;
        console.log(show);
        if (show === 'hint') {
            hintys.style.visibility = "visible";
        } else if (show === 'no--hint') {
            hintys.style.visibility = "hidden";
        } else {
            console.log('no hint')
        }
    });
}

/**
 *displays final score at end of game 
 */
function finalScores(score) {
    const area = document.getElementById("finalScore");
    area.innerHTML = `Your <br>Score <br>was : ${score}`;
}

/**
 * switches to final screen by display none for game features and calls final score
 */
function theEnd() {
    const end = document.getElementById("gameBox");
    end.style.display = "none";
    end.style.height = "1px";
    last.style.display = "none";
    last.innerHTML = `Your Score is : ` + 0;
    buttonA.style.display = "none";
    buttonC.style.display = "none";
    buttonD.style.display = "none";
    const first = document.getElementById("finalScore");
    first.style.visibility = "visible";
    first.style.height = "auto";
    finalScores(currentScore);
}

/**
 * checks if user wants to leave the page
 */
window.onbeforeunload = function (event) {
    event.returnValue = "leaving site";
};