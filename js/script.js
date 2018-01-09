window.onload = init;
// let playButton;

function init() {
	addListeners();
	createAll(numberOfItems, oscillators, envelopes, grains);
}

//-------------------------------------
// Create AudioContext and buffer source
let audioCtx = new AudioContext();
let source = audioCtx.createBufferSource();
const SAMPLE_RATE = audioCtx.sampleRate;
const BUFFER_SIZE = 512;

// Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
//(bufSize, in, out)
let scriptNode = audioCtx.createScriptProcessor(BUFFER_SIZE, 0, 2);
source.connect(scriptNode);
scriptNode.connect(audioCtx.destination);
source.start();
console.log('SAMPLE_RATE:', SAMPLE_RATE, 'bufferSize:', scriptNode.bufferSize);

//set sample rate for envelope and oscillator
MyOsc.sampleRate = SAMPLE_RATE;
Ar_env.sampleRate = SAMPLE_RATE;

let amp = 0.1; //scales output


//====IMPORTED
let numberOfItems = 64;//number of voices
let oscillators = [];
let envelopes = [];
let grains = [];
let lstnrs = {};//holds listeners stats / initialized with listeners


let counter1 = 0;//in samplesPerSecond
var counter2 = 0;

//-------------------------------------
//====AUDIO LOOP - this is where the magic happens
// Give the node a function to process audio events
scriptNode.onaudioprocess = function (audioProcessingEvent) {

	// The output buffer contains the samples that will be modified and played
	var outputBuffer = audioProcessingEvent.outputBuffer;

	var leftOut = audioProcessingEvent.outputBuffer.getChannelData(0);
	var rightOut = audioProcessingEvent.outputBuffer.getChannelData(1);

	//if so many samples, trigger
	//fill buffer
	for (var i = 0; i < leftOut.length; i++) {//i = sample

		let currentSample = 0;

		

		for (let i = 0; i < numberOfItems; i++) {
			if (envelopes[i].trigger === true) {
				// toOut = ;
				// currentSample += envelopes[i].envelope(oscillators[i].sinewave(grains[i].freq));
				oscillators[i].freq = grains[i].freq;
				currentSample += envelopes[i].returnEnv() * oscillators[i].sineWave();
			}
		}

		counter1++;
		counter1 = counter1 % lstnrs.trainFreq1;//value in samples
		if(!counter1) { //if (counter1 === 0)
			turnGrainOn();//turn a grain on
			// getOn();
		}

		currentSample *= amp;//scale output
		leftOut[i] = currentSample;
		rightOut[i] = currentSample;
	}
}

//-------------------------------------
let convert = {
	sampleRate : SAMPLE_RATE,
	samplesPerMs: SAMPLE_RATE / 1000.0,

	msDurToSampDur (ms) {
		let durationInSamples = Math.round(ms * this.samplesPerMs);
		if (durationInSamples < 4) durationInSamples = 4;
		return durationInSamples;
	},

	samplesToHz (samples) {
		return this.sampleRate / samples;
	}
}
//-------------------------------------
function turnGrainOn() {
	for (let i = 0; i < numberOfItems; i++) {
		if (envelopes[i].trigger === false) {
			//turn on the first one that is off and break the loop
			envelopes[i].triggerEnv();
			grains[i].freq = Math.random() * 1000 + 300;
			break;
		}
	}
}

//  -----------------------------------
function getOn() {
	//display how many grains are on at a time
	let howManyOn = 0;
	for (let i = 0; i < envelopes.length; i++) {
		if (envelopes[i].trigger) howManyOn += 1;
	}
	console.log(howManyOn);
}

// // load in an audio track via XHR and decodeAudioData

// function getData() {
// 	request = new XMLHttpRequest();
// 	request.open('GET', 'viper.ogg', true);
// 	request.responseType = 'arraybuffer';
// 	request.onload = function () {
// 		var audioData = request.response;

// 		audioCtx.decodeAudioData(audioData, function (buffer) {
// 			myBuffer = buffer;
// 			source.buffer = myBuffer;
// 		},
// 			function (e) { "Error with decoding audio data" + e.err });
// 	}
// 	request.send();
// }
// // getData();