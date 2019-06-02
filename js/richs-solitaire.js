var deck = [];
var currentCard = 0;
var loserFound = false;
var timerVar = 0;
var imageObj = [];
const cardFaces = ['Ace','Two','Three','Four','Five','Six','Seven',
	'Eight','Nine','Ten','Jack','Queen','King'];

let generateDeck = () => {
	let arr = [...Array(52)].map( (elementVal, idx) => idx);
	return arr;
}

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

let displayCard = () => {

	let cardId = 'card' + currentCard;
	let defn = '<div class="face-up" id="' + cardId + '"> <img';
	if (currentCard % 13 == deck[currentCard] % 13) {
		defn += ' id="loser"';
		loserFound = true;
	}
	defn += ' src="/images/card' + deck[currentCard] + '.png" />';
	defn += '<p class="card-name">"' + cardFaces[currentCard % 13] + '"</p></div>';
	++currentCard;
	$( '#cards' ).append( defn );
	$('#' + cardId)[0].scrollIntoView({
		behavior: "smooth", block: "end"
	});
	
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
	
	if (loserFound || currentCard >= 52) {
		clearInterval( timerVar );
		$( '#play-game' ).removeAttr( 'disabled' );
		$( '#show-rules' ).removeAttr( 'disabled' );
	}
	
}

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
	timerVar = setInterval( displayCard, 500);
}

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
