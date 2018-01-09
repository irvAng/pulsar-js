//  ------------------------
//  Map function. Will produce values out of range if input is out of range
//  https://gist.github.com/AugustMiller/85b54d49493bb71ba81e
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function mapNumber(input, in_min, in_max, out_min, out_max) {
	return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//-------------------------------------
//  both ways work
function randNum(min, max) {
	//  generate a random number
	//  not inclusive of max though
	return (Math.random() * (max - min)) + min;
}

//-------------------------------------
function randNum2(min, max) {
	//  another way to randomize, the map function would be needed for this one, unless I encapsulate it here
	return (Math.random() - 0) * (max - min) / (1 - 0) + min; // map embedded here
	// return Math.random().map(0, 1, min, max);
}
//-------------------------------------
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

//reverse string algorithm
function reverse(string) {
	//https://stackoverflow.com/questions/41582256/javascript-reverse-string-algorithm
	return string.split('').reverse().join('');
}

