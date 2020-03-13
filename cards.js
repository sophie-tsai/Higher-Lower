let deckCode;
const errorMessage = document.querySelector("#errorMsg");
setup();

function setup() {
	newDeck();
	document.querySelector("#deckOfCards").addEventListener("click", drawCard);
}

function newDeck() {
	//fetches a brand new deck
	const promise = fetch("https://deckofcardsapi.com/api/deck/new/");
	promise.then((response) => response.json())
		.then(newDeckSuccess);
	promise.catch(error);
}

function newDeckSuccess(json) {
	deckCode = json.deck_id;
	shuffleCards();
	drawCard();
}

function drawCard() {
	const promise = fetch(`https://deckofcardsapi.com/api/deck/${deckCode}/draw/?count=1`);
	promise.then((response) => response.json())
		.then(drawSuccess);
	promise.catch(error);
}

function drawSuccess(json) {
	if (json.cards.remaining === 0) {
		shuffleCards();
		return;
	}
	const img = document.querySelector("#deckOfCards");
	img.src = json.cards[0].image;
}

function error(err) {
	errorMessage.innerText = 'error:' + err;
}

function shuffleCards() {
	const promise = fetch(`https://deckofcardsapi.com/api/deck/${deckCode}/shuffle/`)
	promise.then((response) => response.json());
	promise.catch(error);
}


