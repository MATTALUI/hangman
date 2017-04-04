var wordEntered
var theMagicWord;
var gameOver;
var remainingLetters;
var answerArray = [];
var strikes = [];
var lettersGuessed = [];
var buzzer = new Audio("wrong.mp3");
var beeper = new Audio("correct.mp3");

window.onload = setup;


function setup(){
	pickWord();
	setupAnswerArray(theMagicWord);
	showPlayerProgress();
	document.getElementById("guessForm").onsubmit = getGuess;
}
function pickWord() {
	wordEntered = prompt("What's the magic Word?");
	if ( wordEntered === null){
		alert("You Don't want to play? :(");
		theMagicWord = null;
		return;
	}else if (wordEntered === ''){
		alert("You didn't type anything in!");
		pickWord();
		return;
	}
	
	theMagicWord = wordEntered.toUpperCase();

	remainingLetters = theMagicWord.length;
}
function setupAnswerArray(word){
	if (word===null){
		gameOver = true;
		return;
	}
	for(i=0; i<word.length; i++ ) {
		answerArray.push("_");
	}
	remainingLetters = word.length;
}
function showPlayerProgress() {
	document.getElementById("misses").innerHTML = strikes.join(" ");
	document.getElementById("status").innerHTML= answerArray.join(" ");
	if (lettersGuessed.length > 0){
		document.getElementById("lettersGuessed").innerHTML= `Letters that you've already guessed:<br>${lettersGuessed.join(" ")}`;
	}
	if (remainingLetters === 0 || strikes.length === 5){
		showAnswerAndCongratulatePlayer();
	}
}
function getGuess(){
	if (gameOver){
		document.getElementById("guesser").value = '';
		playAgain();
		return false;
	}
	let guess = document.getElementById("guesser").value.toUpperCase();
	document.getElementById("guesser").value = '';
	if(guess === theMagicWord){
		document.getElementById("status").innerHTML = theMagicWord;
		remainingLetters = 0;
		showAnswerAndCongratulatePlayer();
		return false;
	}
	let hasBeenGuessed = checkIfGuessed(guess);
	if(!hasBeenGuessed){
		if (guess.length !== 1){
			alert("Please guess a single letter.");
		} else {
			updateGameState(guess);
			showPlayerProgress();
		}
	}else{
		alert("You have already guessed that letter!");
	}

	return false;
}
function updateGameState(whatToCheckFor){
	var start = remainingLetters
	lettersGuessed.push(whatToCheckFor.toUpperCase());
	for(i=0; i<theMagicWord.length; i++){
		if(whatToCheckFor === theMagicWord[i]){
			answerArray[i] = whatToCheckFor.toUpperCase();
			remainingLetters--;
			beeper.play();
		}

	}
	if (start === remainingLetters){
		strikes.push("X");
		buzzer.play();
	}
}
function showAnswerAndCongratulatePlayer() {
	if(remainingLetters === 0){
		document.getElementById("status").style.color = "green";
		document.getElementById("title").style.color = "green";
		document.getElementById("misses").style.color = "green";
		document.getElementById("lettersGuessed").style.color = "green";
		document.getElementById("misses").innerHTML = "You Did It!";
		setTimeout(playAgain, 1500);
	}else if(strikes.length === 5){
		document.getElementById("status").style.color = "red";
		document.getElementById("title").style.color = "red";
		document.getElementById("misses").innerHTML = "You Lose!"
		document.getElementById("status").innerHTML = theMagicWord;
		setTimeout(playAgain, 1500);
	}
}
function playAgain(){
	var playAgain = confirm("Do you want to play again?");
	if (playAgain){
		window.location.reload();
	}else{
		//document.getElementById("guessForm").style.visibility = "hidden";
		gameOver = true;
	}
}
function checkIfGuessed(toCheck){
	if (lettersGuessed.length === 0){
		return false;
	}
	for (i=0; i<lettersGuessed.length; i++){
		if (toCheck === lettersGuessed[i]){
			return true;
		}
	}
	return false;
}