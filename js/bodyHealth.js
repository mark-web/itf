/*
Пользователь вводит температуру. 
Ему показывают сообщение о состоянии организма. 
Больше 41 или меньше 35 - труп, 
меньше 36.6 - упадок сил, 
больше 37 - болен,
 в промежутке 36,6 - 37 - здоров.
*/

"use strict"

var currentTemperature = parseFloat(prompt('Введите текущую температуру тела')),
	result = '';

if(currentTemperature>41 || currentTemperature<35){
	result = 'труп';
}else if(currentTemperature>37){
	result = 'болен';
}else if(currentTemperature<36.6){
	result = 'упадок сил';
}else{
	result = 'здоров';
}

alert(result);