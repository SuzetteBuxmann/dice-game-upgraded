/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
Have used Jonas' solution for the first challenge to add onto for the second - my code was sadly a mess!

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, dice1, dice2, lastDice1, lastDice2, playUntil;
//for console.log 
var thisActivePlayer;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
		document.querySelector('.dice1').style.border = 'none';
		document.querySelector('.dice2').style.border = 'none';
		document.querySelector('#score-' + activePlayer).style.fontWeight = 200;
		document.querySelector('#score-' + activePlayer).style.fontWeight = 200;
        // 1. Random number
        dice1 = Math.floor(Math.random() * 6) + 1;
		dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM1 = document.querySelector('.dice1');
		var diceDOM2 = document.querySelector('.dice2');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
		diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

		//for console.log 
		thisActivePlayer = parseInt(activePlayer);
		thisActivePlayer += 1;
		
		//3. If 2 sixes were rolled, remove score totally
		if(((dice1===6 && lastDice1===6) || (dice1===6 && lastDice2===6) || (dice2===6 && lastDice1===6) || (dice2===6 && lastDice2===6)) && (dice1 !== 1 && dice2 !==1)) {
			
			scores[activePlayer] = 0;	
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			document.querySelector('#score-' + activePlayer).style.fontWeight = 900;
			nextPlayer();
			
		//4. Update the round score IF the rolled number was NOT a 1	
		} else if (dice1 !== 1 && dice2 !==1) {
            //Add score
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			if(dice1 === 1) {
				document.querySelector('.dice1').style.border = '1px solid red';
			} else {
				document.querySelector('.dice2').style.border = '1px solid red';
			}		
			
            nextPlayer();
        }
		lastDice1 = dice1;
		lastDice2 = dice2;
		console.log("btnRoll: player: "+thisActivePlayer+" rand nums: "+dice1+", "+dice2+" last dice: "+lastDice1+", "+lastDice2);
    } 
	
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
				
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var inputMax = document.querySelector(".input-max").value;
		if(inputMax && isNaN(inputMax)) {
			playUntil = 100;
		} else {
			playUntil = inputMax;
		}
		console.log(playUntil);
		
        // Check if player won the game
        if (scores[activePlayer] >= playUntil) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
	
	console.log("nextPlayer: player: "+thisActivePlayer+" rand nums: "+dice1+", "+dice2+" last dice: "+lastDice1+", "+lastDice2);
	
	//Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
	
	lastDice1 = 0;
	lastDice2 = 0;
	
	document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	
    for(var i=0; i<scores.length; i++) {
		document.querySelector("#current-"+i).textContent = 0;
		document.querySelector("#score-"+i).textContent = 0;
		document.getElementById("name-"+i).textContent = "Player "+(i+1);
		document.querySelector(".player-"+i+"-panel").classList.remove('winner');
		document.querySelector(".player-"+i+"-panel").classList.remove('active');
	}	
    document.querySelector('.player-0-panel').classList.add('active');
}