 
/* Black Jack
2 карты 
в колоде 52 карты

Очки по правилам:
2-10 - соответственно 2-10 очков
Валет - 2
Дама - 3
Король - 4
Туз - 1 или 11


Масть		Номинал		Колв-во очков
0
.ПИКА
12

13
.Трефа
25

26
.Бубна
38

39
.Чирва
51

*/

"use strict"

//var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Валет', 'Дама', 'Король', 'Туз'];

var cards = [
				[2, 3, 4, 5, 6, 7, 8, 9, 10, 'Валет', 'Дама', 'Король', 'Туз'],
				[2, 3, 4, 5, 6, 7, 8, 9, 10, 'Валет', 'Дама', 'Король', 'Туз'],
				[2, 3, 4, 5, 6, 7, 8, 9, 10, 'Валет', 'Дама', 'Король', 'Туз'],
				[2, 3, 4, 5, 6, 7, 8, 9, 10, 'Валет', 'Дама', 'Король', 'Туз']
			],
	card;


var playerCard, 
	playerTotalSumm = 0,
	playerCards = [],
	dealerCard, 
	dealerTotalSumm,
	dealerSCards = [];



userWantOneCard();



function userWantOneCard(){

playerCards = addCardToUser(playerCards);

playerTotalSumm = getTotalSumm(playerCards, playerTotalSumm);

$("#player_cards").html( getCardsHtml(playerCards) );
$("#player_total").html('Всего:' + playerTotalSumm);

	if(playerTotalSumm>=21){
		$("#user_want_one_card_btn").prop('disabled',true);
		$("#dealer_want_one_card_btn").prop('disabled',false);
		
	}

	if(playerTotalSumm>21){
		alert('Вы проиграли')
		
	}

}


function dealerWantOneCard(){

dealerSCards = addCardToUser(dealerSCards);

dealerTotalSumm = getTotalSumm(dealerSCards, dealerTotalSumm);

$("#dealer_cards").html( getCardsHtml(dealerSCards) );
$("#dealer_total").html('Всего:' + dealerTotalSumm);

	if(dealerTotalSumm>=21){
		$("#user_want_one_card_btn").prop('disabled',true);
		$("#dealer_want_one_card_btn").prop('disabled',false);
		
	}

}









//функция, которая печатает HTML;
function getCardsHtml(cardsArr = []){
	
	var html = '';

		html += '<ul>';
	for (var i = 0; i < cardsArr.length; i++) {
		html += '<li>' + cardsArr[i] + '</li>';		
	}

	html += '</ul>';
	return html;
}



//функция, которая выдаёт номинал
function addCardToUser(userCards = []){
	var card;

		card = getCard();
		
		userCards.push(card);

	return userCards;
}


//функция, которая выдаёт номинал
function getTotalSumm(userCards = [], totalSumm = 0){
	
	for (var i = 0; i < userCards.length; i++) {
		totalSumm  += getCardNominal(userCards[i], totalSumm);
	}

	return totalSumm;
}


//функция, которая выдаёт номинал
function getCardNominal(card, totalSumm = 0){

	var result = 0;

	if(Number(card) && parseInt(card)){
		result = card;
	}else if(card == 'Валет'){
		card = 2;
	}else if(card == 'Дама'){
		card = 3;
	}else if(card == 'Король'){
		card = 4;
	}else if(totalSumm < 10){
		card = 11;
	}else{
		card = 1;
	}

	return card;
}


//функция, которая выдаёт карту из массива
function getCard(){

	var firstRandom = randomInteger(0,3) ,
		secondRandom = randomInteger(0, 12),
		randomCard;

	randomCard = cards[firstRandom]	[secondRandom];

	if(randomCard !== undefined){
		cards[firstRandom][secondRandom] = undefined;
		return randomCard;
	}else{
		return getCard();
	}

}


function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.floor(Math.round(rand));
  return rand;
}