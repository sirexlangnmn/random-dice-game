
/* 
|----------------------------------------------------------------------------------|
| Coding Challenge                                                                 |          
|----------------------------------------------------------------------------------|
|   1. A player looses his ENTIRE score when he rolls two 6 in a row.              |
|      After that, it's the next player's turn.                                    |
|      (Hint: Always save the previous dice roll in a separate variable)           |
|   2. Add an userInput field to the HTML where players can set the winning score, |
|      so that they can change the predefined score of 100.                        |
|      (Hint: you can read that value with the .value property in Javascript.      |
|      This is the good oportunity to use google to figure this out.)              |
|   3. Add another dice to the game, so that there are two dices now.              |
|      The player looses his current score when one of them is a 1.                |
|      (Hint: you will need CSS to position the second dice,                       |
|      so take a look at the CSS code for the first one.)                          |
|----------------------------------------------------------------------------------|
*/


/* 
|---------------------------------------------------
| 046 Coding Challenge 3_ Solution_ Part 2
|---------------------------------------------------
*/

var globalScores, roundScores, activePlayer, gamePlaying;

// in this function lies the fresh set before start the game
init();

var lastDiceRandomOutput;
// roll the dice
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // Random Number
        var diceRandomOutput = Math.floor((Math.random() * 6) + 1);

        // Display the dice and output/result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + diceRandomOutput + '.png';

        
        if (diceRandomOutput === 6 && lastDiceRandomOutput === 6){
            //  if rolls two 6 in a row, player loses entire score
            globalScores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
    
        } else if (diceRandomOutput !== 1) {
            // update the round score IF the rolled number was not a 1
            // add roundScore
            roundScores += diceRandomOutput;
            document.getElementById('current-' + activePlayer).textContent = roundScores;
        } else {
            // next player
            nextPlayer();
        }

        // stored the last value of roll dice
        lastDiceRandomOutput = diceRandomOutput;
    }

});


// hold the score
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        globalScores[activePlayer] += roundScores;

        // Update the UI  (DOM Manipulation)
        document.querySelector('#score-' + activePlayer).textContent = globalScores[activePlayer];

        // get the userInput of user about the defined winning/final score
        var userInput = document.querySelector('.final-score').value;
        // Note: undefined, 0, null or "" are COERCED to false. Anything else is COERCED to true
        var winningScore;
        if (userInput) {
            winningScore = userInput;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (globalScores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';

            // change the CSS class panel of the winner player  
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // state variable
            gamePlaying = false;
        } else {
            // if get 1 in roll dice.. check next player function code
            nextPlayer();
        }
    }
});

// new game
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    // this is the value of the content in beginning of the game
    globalScores = [0, 0];
    roundScores = 0;
    activePlayer = 0;

    // state variable
    gamePlaying = true;

    // this is the value of the content in beginning of the game
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // button roll and hold visible
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

    // name of player
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // reset: remove class winner and add class active
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // then declare active class again
    document.querySelector('.player-0-panel').classList.add('active');

}


function nextPlayer() {
    // next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;

    // reset the round score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle the class active
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // hide the dice every turn of the player
    document.querySelector('.dice').style.display = 'none';

}











