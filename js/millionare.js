//миллионер до пер вого не правильного ответа

var question=Math.floor(Math.random(0,10)*10),	
	userAnswer = prompt('Введите число от 0 до 10'),
	answerFlag = 1;


if(answerFlag && parseInt(userAnswer) === question){

	question=Math.floor(Math.random(0,10)*10);

	userAnswer = prompt('Введите число от 0 до 10');

}else{

	answerFlag = 0;

}


if(answerFlag && parseInt(userAnswer) === question){

	question=Math.floor(Math.random(0,10)*10);

	userAnswer = prompt('Введите число от 0 до 10');

}else{

	answerFlag = 0;

}


if(answerFlag && parseInt(userAnswer) === question){

	question=Math.floor(Math.random(0,10)*10);

	userAnswer = prompt('Введите число от 0 до 10');
}else{
	answerFlag = 0;
}

//результат
if(answerFlag>0){
	alert('Поздрявляем! Вы миллионер!!!');
}else{
	alert('К сожалению Вы проиграли... Ответ был: '+question);
}




//миллионер сумма баллов
var question=Math.floor(Math.random(0,10)*10),	
	userAnswer = prompt('Введите число от 0 до 10'),
	answerSumm = 0;

if(parseInt(userAnswer) === question){

	answerSumm +=5;

}else{

	answerSumm = answerSumm - 10;

	if(answerSumm<0)
		answerSumm = 0;
}


question=Math.floor(Math.random(0,10)*10);

userAnswer = prompt('Введите число от 0 до 10');



if(parseInt(userAnswer) === question){

	answerSumm +=5;	

}else{

	answerSumm = answerSumm - 10;

	if(answerSumm<0)
		answerSumm = 0;
}


question=Math.floor(Math.random(0,10)*10);

userAnswer = prompt('Введите число от 0 до 10');


if(parseInt(userAnswer) === question){

	answerSumm +=5;

}else{

	answerSumm = answerSumm - 10;

	if(answerSumm<0)
		answerSumm = 0;
}


alert('Ваш результат: ' + answerSumm + ' Баллов ');

