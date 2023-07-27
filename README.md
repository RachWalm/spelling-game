# Spelling game for Children

This spelling game for children was designed so that they can play from an image and description to fill out the letters in the word to boxes. There is also a hint section to let them know what is odd about the spelling of this particular word. This should improve their spelling of difficult or unusual words.

The site can be accessed by this [link](https://rachwalm.github.io/spelling-game/).

## User Experience

### Initial Design

#### Scope and Strategy

The idea is to help children improve the spelling of unusual or particularly difficult to spell words. There are certain conventions or exceptions in English that make the spelling particularly difficult. This is often a long process for children at school and a game that helps them should speed up their learning.

It is not possible to write the word that they have to spell on the screen or they would just copy it. Therefore, the word will be portrayed using an image and a description. If the user cannot figure out the word or spelling their will be a skip button to avoid frustration.

The hint information should help to teach them the rules or exceptions in English spelling that are relevant to that word. Also if unable to spell the word this may give them the information that they require to complete the spelling.

To make the game competitive (and therefore retain interest - to better ones score) there will be a score per letter that is correct.

It is out of scope to actually teach children spelling - this is just a fun game to aid their learning.

### User Stories

First time users will be able to play a selection of words and test themselves against the selection to see how good they are at spelling and learn some rules and exceptions or new spellings.

Repeat users may find that they are coming across some of the same words so can feel an achievement at learning these words or completing them quicker a second time as well as doing a new selection of words. Eventually becoming proficient at recognising the images and descriptions and knowing the correct spelling.

Repeat users should also get a random order to the words so should get different words frequently until they have exhausted the database of words.

### Skeleton

- Landing view will contain the general background and title/logo. Also two buttons to either get instructions and the point of the game (which will appear in a pop up box) or to start the game.
- Game view will contain the general background and title/logo. Additionally there will be the functionality of the game. This will include relevant image, description, box for each letter of the word and a hint. This screen will also contain a skip and quit button AS WELL AS A TIMER. As each word is completed the screen will clear of the old word information and be replaced with the next word.
- If you skip the game view will be retained with the next word replacing the current display.
- If you quit it will check that you want to leave the page and take you to a leave page which says it is sorry you are leaving and gives you the opportunity to return to the start of the game.

### Features

#### Functions Flow Chart

#### Features to ensure game played correctly

letters only
blue and red

### Colour Design

The colour scheme was created to be gentle with clear bright colours where actions was required such as buttons. It was supposed to be reminisent of the sky as we has a fox woodland at the bottom. the BOE2F5 needed to be changed to rgba so that we could introduce a certain amount of opalescence (rgba = 176, 226, 245, 0.7).

![colour scheme](documents/colourscheme.png)

### Font

## Future improvements

Audio hints.
additional words
levels of complexity
levels by theme
more words
different durations on the TIMER
Option to add your name

## Development Bugs

### Unsolved Bugs

All detected bugs were solved.

### Human Errors


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

key up and down from the CI javascript& the dom > handling DOM events > keyboard events to stop repeat event.repeat

to disable input into later boxes https://www.w3schools.com/jsref/prop_text_disabled.asp

is it all letters https://www.w3resource.com/javascript/form/all-letters-field.php#:~:text=You%20can%20write%20a%20JavaScript,HTML%20form%20contains%20only%20letters.&text=To%20get%20a%20string%20contains,%2F)%20which%20allows%20only%20letters.
https://www.w3schools.com/jsref/jsref_regexp_test.asp

modals and dialogues - https://blog.webdevsimplified.com/2023-04/html-dialog/

choose showModal() not just show() so that the rest of the page becomes inert. when testing re-watch the video so that you can test all the features of dialogue
click to close dialogue by button or escape

bug : double listening of handle event where it was in the input HTML and again in the JS
:upper and lower case
if don't delete although it listens for the letter keeps the letter recorded in the box that was first typed - solved letter2input

capitals to lower case

redirect to antoher page W3

https://www.w3schools.com/jsref/event_onbeforeunload.asp to give alert when someone tries to leave the site.

second page doesn't need any javascript so removed it from the html so as to not create errors and add to confusion.


## Acknowledgements

My Mentor - Juliia Konn has been enthusiastic and provided encouragement and a great deal of information.

My family - Pat Walmsley and Sarah Walmsley have tested the site on their personal devices and given very useful feedback.

Children testers - Ben Cowking and Storm Cowking who have given me a great deal of insight into thier perspective.

My Partner - Ian Harris who has been extremely supportive while I have been working on this project.

Code institute - For all the information and course content that has contributed to the creation of this project.

## Testing