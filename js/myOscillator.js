class MyOsc {
	//created with a frequency of 
	constructor(freq) {
		if (!MyOsc.verifySampleRate()) return;
		this._freq = freq;
		this.phase = 0;
	}

	sineWave() {
		//calculates the sinewave and increments phase
		let currentSample = Math.sin(this.phase);
		this.phase += MyOsc.PHASE_INC * this._freq;
		return currentSample;
	}

	set freq(frequency) {
		//this way I can set a flag to wait for change
		this._freq = frequency;
	}

	get freq() {
		return this._freq;
	}

	triangle() { }
	sawn() { }
	sqare() { }

	static set sampleRate(sampleRate) {
		MyOsc._sampleRate = sampleRate;
		MyOsc.PHASE_INC = (Math.PI * 2) / sampleRate;
	}
	static get sampleRate() { return MyOsc._sampleRate }

	static verifySampleRate() {
		//Returns true if tests pass
		if ((typeof MyOsc._sampleRate !== "number")
			|| ((Math.abs(MyOsc._sampleRate) === Infinity))
			|| isNaN(MyOsc._sampleRate)
			|| (MyOsc._sampleRate < 0)) {
			console.log('-Please set a correct sample rate for MyOsc (e.g. MyOsc.sampleRate = 48000;).',
				"\n-MyOsc creation aborted.");
			return false;
		} else { return true; }
	}
}