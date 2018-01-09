//====UTILITIES.JS
//  -----------------------------------
function createAll(numberOfItems, oscArr, envArr, grainArr) {
	for (let i = 0; i < numberOfItems; i++) {
		oscArr.push(new MyOsc());
		envArr.push(new Ar_env(50, 50, 1));
		grainArr.push(new Grain(Math.random() * 500 + 100, 1, 50, 50));
	}
}

//  -----------------------------------
function trainFreqChanged(trainFreq) {

}

//  -----------------------------------
function turnGrainOn(grainArray, grainQty) {

}

//  -----------------------------------
function setOut(toDisplay) {
	toDisplayOut = toDisplay;
}

let outputDisplay;//  <output>  #countDisplay
//  -----------------------------------
function displayOut() {
	outputDisplay.innerHTML = toDisplayOut;
}

	//  -----------------------------------
	//calculate performance of function

	// let t0 = performance.now();
	//doSomething()
	// let t1 = performance.now();
	// console.log('calculateIncrements() took : ', t1 - t0, ' ms to perform.')