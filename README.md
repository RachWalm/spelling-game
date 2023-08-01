# Spelling game for Children

This spelling game for children was designed so that they can play from an image and description to fill out the letters in the word to boxes. There is also a hint section to let them know what is odd about the spelling of this particular word. This should improve their spelling of difficult or unusual words.

The site can be accessed by this [link](https://rachwalm.github.io/spelling-game/).

## How to play
Once you start the game it will provide you with an image, description and boxes to fill out to spell out the word that is required. There will be one box for each letter and the focus will start on the first letter required. As each letter is typed if you have the correct letter for spelling the word it will go blue and move you to the next box. Otherwise, the letter will go red and you will have to keep trying till you get the correct letter / skip the word or quit. As score will increment with each correct letter entered. 
When you have completed the word it will provide you with an new image and description for a new word. Till you have completed all the words or quit.

## User Experience

### Initial Design

#### Scope and Strategy

The idea is to help children improve the spelling of unusual or particularly difficult to spell words. There are certain conventions or exceptions in English that make the spelling particularly difficult. This is often a long process for children at school and a game that helps them should speed up their learning.

It is not possible to write the word that they have to spell on the screen or they would just copy it. Therefore, the word will be portrayed using an image and a description. If the user cannot figure out the word or spelling there will be a skip word button to avoid frustration.

The hint information should help to teach them the rules or exceptions in English spelling that are relevant to that word. Also if unable to spell the word this may give them the information that they require to complete the spelling.

To make the game competitive (and therefore retain interest - to better ones score) there will be a score per letter that is correct.

It is out of scope to actually teach children spelling - this is just a fun game to aid their learning.

### User Stories

First time users will be able to play a selection of words and test themselves against the selection to see how good they are at spelling and learn some rules and exceptions for new spellings.

Repeat users may find that they are coming across some of the same words so can feel an achievement at learning these words or completing them quicker a second time as well as doing a new selection of words. Eventually becoming proficient at recognising the images and descriptions and knowing the correct spelling.

Repeat users should also get a random order to the words so should get different words frequently until they have exhausted the database of words, or at least in a different order to last time.

### Skeleton

- Landing view will contain the general background and title/logo. Also two buttons to either get instructions and the point of the game (which will appear in a pop up box) or to start the game.
- Game view will contain the general background and title/logo. Additionally there will be the functionality of the game. This will include relevant image, description, box for each letter of the word and a hint. This screen will also contain a skip and quit button as well as a timer (timer feature later decided against after discussion with potential users). As each word is completed the screen will clear of the old word information and be replaced with the next word.
- If you skip the word the game view will be retained with the next word replacing the current display. The skipped word will be saved for if words are run out of or if user just keeps skipping.
- If you quit it will check that you want to leave the page and take you back to the beginning, which gives you the opportunity to return to the start of the game.
- If you try to leave the page it will check that is what you intended so you don't loose your score.

## Functions

### Functions Flow Chart

#### Initial Plan for Flow Chart

As I initially proposed my plans to my mentor I provided some images (I was unaware at this time I could do it all on one page) to show my thoughts and intentions:

pages

-[landing page](documents/page1.png)

-[instructions page](documents/page2.png)

-[game page](documents/page3.png)

-[score page](documents/page4.png)

-[thank you page](documents/page5.png)

written thoughts/explanations:

-[explanation](documents/first-thoughts.png)

which lead us to draw up this flow chart:

![initial flow chart](documents/first-flow-chart.png)

#### Final Flow Chart

As the development progressed there it evolved to include the below decision tree (overview not every decision, but groups of decisions - like acceptable key pressed?):

![current flow chart](documents/current-flow-chart.png)

#### Functions to ensure game played correctly

The first function that the user will access will be front screen with the instructions button. This leads to a dialogue box containing all the instructions. This was something that I was unfamiliar with and used the code from this :

[modal vs dialogue blog](https://blog.webdevsimplified.com/2023-04/html-dialog/)

From which I copied the code:

```js 
dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})
```

The rest of the code for the dialogue can also be ascertained from the video included in this blog.

I choose 'showModal()' not just 'show()' so that the rest of the page becomes inert.

CSS code was written to make the backdrop of the page of the dialog slightly opalescent and a darker colour. I liked the opalescence of 0.7 on experimentation.

```css
dialog::backdrop {
    background-color: rgba(176, 226, 245, 0.7);
}
```

All the buttons were activated by click event listener functionality which called the relevant function. For example:

```js
document.getElementById("skip").addEventListener("click", function () {
        skip(); // allows player to skip a word and it will be repeated at the end
```

As everything took place within one page index.html it was necessary to to hide and/or use visibility to only have the current things on the page. This was done through a combination of CSS to set things to their original state then make changes at certain points using JavaScript. Anything not required at time of landing was put as hidden and some elements had to have their areas reduced to very small so they didn't affect the positioning of the currently visible material.

```CSS
#gameBox {
    visibility: hidden;
    height: 1px;
}
```

The use of the Javascript 'style.display = "none";' could only be used once the area was not to be used again as it removes the item from the page. So this was done to hide the front page buttons once they were no longer required.

An important piece of functionality that was decided upon was the use of an array and key pairs to store all the data that the game would require to draw upon:

Use of arrays meant that a lot of the work for finding information could be done either using indexing or the key of the key pair.

So that it would be a different order (not just iterate through the array) each time the user played a random number was generated using:

```JS
function rand() {
    let rndm = Math.floor(Math.random() * wordData.length);
    return rndm;
}
```

This number could then be used to pick from the array at random using indexing.

Three arrays are used to hold information, wordData - holds the words yet to be used, skipped - holds the words that were skipped (therefore incomplete) and finally guess - holds the letters of the current word that have been correctly guessed.

It was necessary to write functions to link the point that we wanted to access of the array and the input boxes that were on the screen for the user. These functions were whichBoxNumber (output int), whichBoxInput (output 'input'int as these were the id's of the inputs in HTML), and whichBoxInputMinusOne (output 'input'int to align id's with the correct box at certain points in the code). These function linked the array indexes and text on screen to allow various other functions to operate on the correct bit of code.

As keyboard entries had to be manipulated, it was essential to utilise the keyboard events, onkeydown and onkeyup.

In the code institute tutorial the javascript for the onkeyup and onkeydown was put in the html. 

```HTML
<body onkeypress="handleKeys(event);"
        onkeydown="handleKeys(event);"
        onkeyup="handleKeys(event);">
```

As my mentor said that it would be better practise for HTML to contain HTML only and the javascript to be in script.js I moved this functionality to the javascript, although I couldn't find an example on the internet of the syntax so had to experiment. Eventually, I found an example taking onkeyup and onkeydown out of html into Javascript from slack entry on 31st July 2021 AnthonyK in the project-milestone-2 under code institute.

This lead to the addition of the code:

```JS
<body onkeypress="handleKeys(event);"
        onkeydown="handleKeys(event);"
        onkeyup="handleKeys(event);">
```

To avoid bugs that would cause the user inconvenience or confusion, it was necessary to eliminate the code accepting the wrong key entries and performing tasks. Therefore the onkeydown was used to assess the key pressed and if correct then the onkeyup would allow the user to progress to the next letter.

# key up and down from the CI javascript& the dom > handling DOM events > keyboard events to stop repeat event.repeat

# build game and build letters

# disable array

## to disable input into later boxes https://www.w3schools.com/jsref/prop_text_disabled.asp

Several functions were used to assess the if the letter was correct. It needed to be a letter or not accepted. Special character, numbers and other keys needed to be avoided. 'lettersOnly' checks if the key relates to a letter, this was adapted from [W3 code to take letter only from](https://www.w3resource.com/javascript/form/all-letters-field.php#:~:text=You%20can%20write%20a%20JavaScript,HTML%20form%20contains%20only%20letters.&text=To%20get%20a%20string%20contains,%2F). This allowed me to identify '/^[A-Za-z]+$/'.

# lettersnotinput

# upper lower case

# islettercorrect

# moveon

# clearrestart

# empty

# scores and final score

# skip

# guess to complete

# wantedFirst letter and boofirst letter

# the end and redirect to antoher page W3

# https://www.w3schools.com/jsref/event_onbeforeunload.asp to give alert when someone tries to leave the site.

## Features

### Colour Design

The colour scheme was created to be gentle with clear bright colours where actions was required such as buttons. It was supposed to be reminisent of the sky as we has a fox woodland at the bottom. the BOE2F5 needed to be changed to rgba so that we could introduce a certain amount of opalescence (rgba = 176, 226, 245, 0.7).

![colour scheme](documents/colourscheme.png)

It was also decided that for accessibility of colour blind users it would be worth changing the initial idea of red and green as the colours that the letters changed when incorrect or correct, to red and blue. These colours are more distinguishable for people with certain colour blind conditions.

### Font

For the font Poppins was chosen for the bulk of the text with Quicksand being chosen for the title.

The title using Quicksand is a slightly rounder font which is similar to a lot of fonts used in a lot material aimed at children. The Poppins as choice for the bulk of it is extremely simple as a font to make it easy to read for children without any serif or handwriting or gothic styling that could be difficult and therefore detract from a child's experience.

## Future improvements

Audio hints.
additional words
levels of complexity
levels by theme
more words
different durations on the TIMER
Option to add your name

## Development Bugs

# letters input if don't delete although it listens for the letter keeps the letter recorded in the box that was first typed - solved letter2input

https://www.geeksforgeeks.org/how-to-clone-an-array-in-javascript/ - skipped back into word array

shallow copy vs deep copy  - tried concat push '=' etc but didn't get the copy that I wanted. putting things in indexed places or taking from indexed places.
//let addOld = JSON.parse(JSON.stringify(wordData.splice((pick), 1)));
https://www.youtube.com/watch?v=E3dboLSBeJc
https://www.youtube.com/shorts/XK0V0E3bA-M 

### Unsolved Bugs

All detected bugs were solved.

### Human Errors

One error that required the assistance of the tutors at code institute was that an event listener was calling 'handleKeys' function where it appeared that an input was occurring twice. After watching many tutorials and trying various fixes nothing worked when I changed the function. The tutor quickly spotted I was calling the function in the handleKeys function and right at the top of the code when I was calling the 'handleKeys' function. Unfortunately, I had got too focused on the function to look at whole code. This is a learning experience to take a look at the whole process, not just what you are currently doing.

## Deployment to Github

The site was deployed to GitHub pages. It was deployed by the following actions:

1. In the git hub repository, the settings tab was selected.
2. 'Pages' was selected from the left hand side menu.
3. Under Build and deployment Source section had 'Deploy from Branch' and the 'main' branch was selected.
4. Save was selected.

Here is the link https://rachwalm.github.io/spelling-game/ to the deployed page.

### Local deployment

1. In the git hub repository, code button clicked
2. clicked local
3. choose HTTPS
4. link copied
5. went to terminal (version control) and input the following :git clone https://github.com/RachWalm/spelling-game.git

The project was be cloned.

## Atribution

mentor /* jshint esversion: 8 */

https://www.w3schools.com/jsref/jsref_regexp_test.asp

https://pythontutor.com/render.html#mode=edit

## Acknowledgements

My Mentor - Juliia Konn has been enthusiastic and provided encouragement and a great deal of information.

My family - Pat Walmsley and Sarah Walmsley have tested the site on their personal devices and given very useful feedback.

Children testers - Ben Cowking and Storm Cowking who have given me a great deal of insight into thier perspective.

My Partner - Ian Harris who has been extremely supportive while I have been working on this project.

Code institute - For all the information and course content that has contributed to the creation of this project. Also to the tutor who solved my problem with a function running twice by spotting that I had called it twice.

## Testing

For testing, validators and accessibility see [Testing](TESTING.md)