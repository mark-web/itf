/*
Пользователь вводит 3 числа и тип поиска (минимальное или максимальное). 
Программа выводит результат.
*/

"use strict"

var userNumber1 = parseFloat(prompt('Введите число 1')),
	userNumber2 = parseFloat(prompt('Введите число 2')),
	userNumber3 = parseFloat(prompt('Введите число 3')),
	searchType = prompt('Введите min или max'),
	result;

summ = productCount*productPrice;

if(searchType === 'max'){

	if(userNumber1 > userNumber2 && userNumber1 > userNumber3){
		result = userNumber1;
	}else if(userNumber1 < userNumber2 && userNumber1 > userNumber3){ //userNumber3 < userNumber1 < userNumber2
		result = userNumber2;
	}else{
		result = userNumber3;		
	}
	

}else{

	if(userNumber1 < userNumber2 && userNumber1 < userNumber3){
		result = userNumber1;
	}else if(userNumber1 < userNumber2 && userNumber1 > userNumber3){
		result = userNumber3;
	}else{
		result = userNumber2;		
	}

}

alert(searchType + ': ' + result);