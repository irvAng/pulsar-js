//====LISTENERS.JS

//-------------------------------------
function addListeners() {
	//====FUNCTIONS 2

	let connectSoundB = document.querySelector('#connect-sound');
	connectSoundB.onclick = connectSound;//testing this form

	let disconnectSoundB = document.querySelector('#disconnect-sound');
	disconnectSoundB.addEventListener('click', disconnectSound);

	// window.onmousemove = processMouseMouve;

	// When the buffer source stops playing, disconnect everything
	source.onended = disconnectSound;

	//====FUNCTIONS 1
	addLstnrsObjectProperties();

	let trigger1 = document.querySelector('#trigger1');
	trigger1.addEventListener('click', trigger);

	let attack1 = document.querySelector('#attack1');
	attack1.addEventListener('input', changeAttack1);

	let release1 = document.querySelector('#release1');
	release1.addEventListener('input', changeRelease1);

	let trainFreq1 = document.querySelector('#trainFreq1');
	trainFreq1.addEventListener('input', changeTrainFreq1);

	let formantFreq1 = document.querySelector('#formantFreq1');
	formantFreq1.addEventListener('input', changeFormant1);
}

//-------------------------------------
//==== initialize LISTENERS' OBJECT
function addLstnrsObjectProperties() {
	lstnrs.trigger1 = true;
	lstnrs.attack1 = 50;
	lstnrs.release1 = 50;
	lstnrs.trainFreq1 = Math.round(48000/6); // in samples
	lstnrs.formantFreq1 = 0.225;

	lstnrs.attack1out = document.querySelector('#attack1out');
}

//====LISTENERS' FUNCTIONS 1
//  -----------------------------------
function trigger() {
	lstnrs.trigger1 = !lstnrs.trigger1;
	// myArEnv.triggerEnv();
	turnGrainOn();
	// getOn();
}
//  -----------------------------------
function changeAttack1(evt) {
	lstnrs.attack1 = parseFloat(evt.target.value);
	lstnrs.attack1out.value = lstnrs.attack1;

	for (let i = 0; i < numberOfItems; i++) {
		envelopes[i].attack = lstnrs.attack1;
	}
}
//  -----------------------------------
function changeRelease1(evt) {
	lstnrs.release1 = parseFloat(evt.target.value);
	document.querySelector('#release1out').value = lstnrs.release1;

	for (let i = 0; i < numberOfItems; i++) {
		envelopes[i].release = lstnrs.release1;
	}
}
//  -----------------------------------
function changeTrainFreq1(evt) {
	//Hz, how many grains per second
	let Hz = parseFloat(evt.target.value);
	//curve, so there's more control on lower numbers
	Hz = Math.pow(Hz, 5);
	//map from 0..1 to 1..5000
	//(input, in_min, in_max, out_min, out_max)
	Hz = mapNumber(Hz, 0, 1, 1, 5000);
	//frequency of these grains in ms
	let msDur = 1000.0 / Hz;
	//convert ms to samples
	lstnrs.trainFreq1 = convert.msDurToSampDur(msDur);

	//display values
	document.querySelector('#trainFreqHz1out').value = Hz;
	// document.querySelector('#trainFreqMs1out').value = msDur;
}

//  -----------------------------------
function changeFormant1(evt) {
	lstnrs.formantFreq1 = parseFloat(evt.target.value);
	document.querySelector('#formantFreqOut1').value = lstnrs.formantFreq1;
}


//====LISTENERS' FUNCTIONS 2
//-------------------------------------
function disconnectSound() {
	source.disconnect(scriptNode);
	scriptNode.disconnect(audioCtx.destination);
	console.log('ended');
}

//-------------------------------------
function connectSound() {
	source.connect(scriptNode);
	scriptNode.connect(audioCtx.destination);
}

//-------------------------------------
function triggerEnvelope() {
	myEnv1.triggerEnv();
	myEnv2.triggerEnv();
}

//-------------------------------------
function processMouseMouve(evt) {

	let clientX, clientY, pageX, pageY;
	clientX = evt.clientX;
	clientX = mapNumber(clientX, 0, window.innerHeight, 200, 5000);

	// myOsc1._freq = clientX;

	var mousePositions = document.querySelector('#mousePositions');
	mousePositions.innerHTML =
		"clientX: " + clientX.toFixed(2) +
		" clientY: " + evt.clientY + "<br>" +
		" pageX : " + evt.pageX +
		"  pageY : " + evt.pageY +
		"<br>";

	var mouseScreenPositions = document.querySelector('#mouseScreenPositions');
	mouseScreenPositions.innerHTML = "screenX: " + evt.screenX +
		" screenY: " + evt.screenY +
		"<br>";
}

