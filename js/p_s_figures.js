/*
Пользователь вводит тип фигуры (треугольник или прямоугольник) и ее размеры.
Программа считает площадь и периметр фигуры.
*/

"use strict"

var figureType = parseInt(prompt('Введите тип фигуры: 1 (прямоугольник) или 2 (треугольник)'));

if(figureType == 1){
	var heigth = parseFloat(prompt('Введите высоту')),
	 	weight = parseFloat(prompt('Введите ширину')),
	 	P=0,
	 	S=0;

	P = heigth*2 + weight*2;
	S = heigth * weight;

	console.log('периметр = ' + P + ', площадь = ' + S); 	
}else if(figureType == 2){
	var side1 = parseFloat(prompt('Введите сторону 1')),
	 	side2 = parseFloat(prompt('Введите сторону 2')),
	 	side3 = parseFloat(prompt('Введите сторону 3')),
	 	P=0,
	 	S=0;

	P = (side1 + side2 + side3) / 2;
	S = Math.sqrt( P*(P - side1)*(P - side2)*(P - side3) );

	console.log('периметр = ' + P + ', площадь = ' + S); 	
}else{
	console.log('Нет такой фигуры'); 	
}