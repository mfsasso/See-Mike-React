/*
 * JavaScript for SeeMikeReact.com
 */

var deck = [];
var currentCard = 0;
var loserFound = false;
var timerVar = 0;
var imageObj = [];
const cardFaces = ['Ace','Two','Three','Four','Five','Six','Seven',
	'Eight','Nine','Ten','Jack','Queen','King'];


// A deck is an array of length 52 containing the values 0 to 51
let generateDeck = () => {
	let arr = [...Array(52)].map( (elementVal, idx) => idx);
	return arr;
}


// Shuffle the deck: work through the deck randomly swapping pairs of cards
let shuffleDeck = () => {
	for (let i = 51; i >= 1; --i) {
		let j = Math.floor(Math.random() * (i + 1));
		if (i != j) {
			let temp = deck[i];
			deck[i] = deck[j];
			deck[j] = temp;
		}
	}
}


// DisplayCard is called to display a single card and determine if play should continue
let displayCard = () => {

	// Build a <div> containing an image of the card to display and the text of its value
	let cardId = 'card' + currentCard;
	let defn = '<div class="face-up" id="' + cardId + '"> <img';
	if (currentCard % 13 == deck[currentCard] % 13) {
		// Code runs if this card causes the game to be lost
		defn += ' id="loser"';
		loserFound = true;
	}
	defn += ' src="/images/card' + deck[currentCard] + '.png" />';
	defn += '<p class="card-name">"' + cardFaces[currentCard % 13] + '"</p></div>';
	
	++currentCard;
	
	// Get the card image into the DOM and make sure it's visible
	$( '#cards' ).append( defn );
	$('#' + cardId)[0].scrollIntoView({
		behavior: "smooth", block: "end"
	});
	
	// If game has been won or lost, add node to DOM indicating the result
	if (loserFound) {
		$( '#cards' ).after( '<h2 id="game-result">Sorry, you lose</h2>' );
		$( '#game-result' )[0].scrollIntoView({
			behavior: "smooth", block: "end"
		});
	}
	else if (currentCard >= 52) {
		$( '#cards' ).after( '<h2 id="game-result">WINNER!!</h2>' );
		$( '#game-result' )[0].scrollIntoView({
			behavior: "smooth", block: "end"
		});
	}
	
	// If game was just won or lost, reset for another play
	if (loserFound || currentCard >= 52) {
		clearInterval( timerVar );
		$( '#play-game' ).removeAttr( 'disabled' );
		$( '#show-rules' ).removeAttr( 'disabled' );
	}
	
}


// Kick off game play when the Play button is clicked
let playIt = () => {

	$( '#play-game' ).attr( 'disabled', true );
	$( '#show-rules' ).attr( 'disabled', true );

	deck = generateDeck();
	
	for( let i = 0; i < 100; ++i ) {
		shuffleDeck();
	}
	
	$( '#cards' ).empty();
	$( '#game-result' ).remove();
	
	currentCard = 0;
	loserFound = false;
	
	// Display a card every half second till the game is won or lost
	timerVar = setInterval( displayCard, 500);
}


// Preload card images so game isn't slowed down the first time it's played after page load
$( document ).ready( () => {
	var imageSrc = ''
	var i = 0;
	for( i = 0; i < 52; ++i ) {
		//console.log(i);
		imageSrc = '/images/card' + i + '.png';
		imageObj[i] = new Image;
		imageObj[i].src = imageSrc;
	}
});
