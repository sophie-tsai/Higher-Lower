function success(json){
	const img = document.querySelector("#deckOfCards");
	console.log(json);
	img.src = json.cards[0].image;
}

function error(err){
	const errorMessage = document.querySelector("#errorMsg");
	errorMessage.innerText = "Error" + err;
}

function drawNew(){

	const promise = fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
	promise.then((response)=> response.json())
		.then(success);
	promise.catch(error);
}

drawNew();

document.querySelector("#deckOfCards").addEventListener("click", drawNew);