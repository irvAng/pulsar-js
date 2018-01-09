//====LISTENERS.JS

//-------------------------------------
function addListeners() {
	//====FUNCTIONS 1
	let envelope1 = document.querySelector('#env1');
	envelope1.addEventListener('click', triggerEnvelope);

	let connectSoundB = document.querySelector('#connect-sound');
	connectSoundB.onclick = connectSound;//testing this form

	let disconnectSoundB = document.querySelector('#disconnect-sound');
	disconnectSoundB.addEventListener('click', disconnectSound);

	window.onmousemove = processMouseMouve;

	// When the buffer source stops playing, disconnect everything
	source.onended = disconnectSound;

	//====FUNCTIONS 2
	addLstnrsObjectProperties();

	let trigger1 = document.querySelector('#trigger1');
	trigger1.addEventListener('click', trigger);

	let attack1 = document.querySelector('#attack1');
	attack1.addEventListener('change', changeAttack1);

	let release1 = document.querySelector('#release1');
	release1.addEventListener('change', changeRelease1);

	let trainFreq1 = document.querySelector('#trainFreq1');
	trainFreq1.addEventListener('input', changeTrainFreq1);
}

//-------------------------------------
//==== initialize LISTENERS' OBJECT
function addLstnrsObjectProperties() {
	lstnrs.trigger1 = true;
	lstnrs.attack1 = 50;
	lstnrs.release1 = 50;
	lstnrs.trainFreq1 = 8; // in ammount per second
	lstnrs.phaserFreq = 0.225;
	lstnrs.filterLoFreq = 200;
	lstnrs.filterStepSize = 0;

	lstnrs.attack1out = document.querySelector('#attack1out');
}

//====LISTENERS' FUNCTIONS 1
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

	myOsc1._freq = clientX;

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

//====LISTENERS' FUNCTIONS 2
//  -----------------------------------
function trigger() {
	lstnrs.trigger1 = !lstnrs.trigger1;
	// myArEnv.triggerEnv();
	turnGrainOn();
	console.log('triggered');
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
	lstnrs.release1 = parseFloat(evt.target.value);
	document.querySelector('#release1out').value = lstnrs.release1;
	console.log(lstnrs.release1);
}
//  -----------------------------------
function changePhaserFreq(evt) {
	lstnrs.phaserFreq = parseFloat(evt.target.value);
	document.querySelector('#phFreqOut').value = lstnrs.phaserFreq;
}
//  -----------------------------------
function filterStepSize(evt) {//sets filter step size
	lstnrs.filterStepSize = parseFloat(evt.target.value);
	document.querySelector('#filterStepOut').value = lstnrs.filterStepSize;
}
//  -----------------------------------
function filterLoFreq(evt) {
	//curved for better control at lower frequencies
	lstnrs.filterLoFreq = Math.pow(parseFloat(evt.target.value), 2.5);
	lstnrs.filterLoFreq *= 2000;
	lstnrs.filterLoFreq += 20;
	lstnrs.filterLoFreq = Math.round(lstnrs.filterLoFreq);
	document.querySelector('#filterLoOut').value = lstnrs.filterLoFreq;
}