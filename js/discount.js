/*
Пользователь вводит количество товара и стоимость за штуку.
Определить сумму скидки, если при суммарной стоимости 100 гр скидка составляет 3%,
 200 – 5%, 300 и более – 7%. 
 Предусмотреть некорректный ввод данных - можно вводить только положительные числа, 
кол-во товара не может быть дробным числом.
*/

"use strict"

var productCount = parseInt(prompt('Введите кол-во товаров')),
	productPrice = parseInt(prompt('Введите стоимость товара')),
	summ,	
	totalSumm,
	discount;

summ = productCount*productPrice;

if(!productCount){

	console.log('Не правильно ввели кол-во товаров')

}else if(!productPrice){

	console.log('Не правильно ввели стоимость')

}else if(summ >= 100){
	
	totalSumm = (summ - summ*0.03);
	discount = summ*0.03;

}else if(summ >= 200){

	totalSumm = (summ - summ*0.05);
	discount = summ*0.05;

}else if(summ >= 300){

	totalSumm = (summ - summ*0.07);
	discount = summ*0.07;

}


if(discount !== undefined){
	alert('Дисконт получился: ' + discount + ' \n Итогова стоимость:' + totalSumm);
}