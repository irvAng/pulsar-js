class Ar_env {
	constructor(attack, release, amplitude) {
		if (!Ar_env.verifySampleRate()) return;

		this._attackDurationSamples = Ar_env.msDurToSampDur(attack);
		this._releaseDurationSamples = Ar_env.msDurToSampDur(release);
		this.ampTarget = amplitude;
		this.trigger = false;
		this.increments = 0;
		this.currentIncrement = 0;
		this.triggerFlag = false;
		this.calculateIncrements(
			0, this.ampTarget, this._attackDurationSamples);
	}

	static msDurToSampDur(ms) {
		//change duration in miliseconds to duration in samples
		//1 ms = x many samples = ArEnv.samplesPerMs
		let durationInSamples = Math.round(ms * Ar_env.samplesPerMs);
		if (durationInSamples < 4) durationInSamples = 4;
		return durationInSamples;
	}

	static set sampleRate(sampleRate) {
		//returns if there is already a sample rate set
		if (Ar_env.sampleRate !== undefined) return;

		Ar_env._sampleRate = sampleRate;
		Ar_env.samplesPerMs = Ar_env._sampleRate / 1000.0;
	}

	static get sampleRate() { return Ar_env._sampleRate }

	static verifySampleRate() {
		//Returns true if tests pass
		if ((typeof Ar_env.sampleRate !== "number")
			|| ((Math.abs(Ar_env.sampleRate) === Infinity))
			|| isNaN(Ar_env.sampleRate)
			|| (Ar_env.sampleRate < 0)) {
			console.log('-Please set a correct sample rate before constructing Ar_env using (e.g. Ar_env.sampleRate = 48000).',
				"\n-Ar_env creation aborted.");
			return false;
		} else { return true; }
	}
}

//  -----------------------------------
//====STATIC PROPERTIES
Ar_env._sampleRate;//sampleRate
Ar_env.samplesPerMs = 0;// samples per millisecond

//  -----------------------------------
//====ARENV FUNCTIONS

//  -----------------------------------
Ar_env.prototype.triggerEnv = function () {
	if (!this.trigger) {
		this.trigger = true;
		this.currentIncrement = 0;
	} else {
		this.triggerFlag = true;
	}
}

//  -----------------------------------
Ar_env.prototype.calculateIncrements = function (from, to, durationInSamples) {
	//for Ar_Env, when incrementing from should be 0, to the target;
	//	when decrementing from should be the taget, to should be 0
	this.increments = (to - from) / durationInSamples;
}

//  -----------------------------------
//Better, because there is less to calculate
Ar_env.prototype.returnEnv = function () {
	if (!this.trigger) {
		return 0;
	} else {//if (trigger===1)/ while trigger is on

		//first: increment
		//second a: check if it reaches any of the amplitude's targets
		this.currentIncrement += this.increments;

		//second a: check if it reaches any of the amplitude's targets
		//return if it does
		if (this.currentIncrement >= this.ampTarget) {
			//make equal to target
			this.currentIncrement = this.ampTarget;
			//calculate decrements, which is the release
			//going from target to 0 (i.e. 1..0)
			this.calculateIncrements(
				this.ampTarget, 0, this._releaseDurationSamples);
			return this.currentIncrement;

		} else if (this.currentIncrement <= 0) {
			//make equal to 0, and return after calculations
			this.currentIncrement = 0;
			//calculate increments, which is the attack
			//going from 0 to target (i.e. 0..1)
			this.calculateIncrements(
				0, this.ampTarget, this._attackDurationSamples);

			this.trigger = false;// wait for next trigger
			if (this.triggerFlag) {
				//will return before being called again
				this.triggerEnv();
				this.triggerFlag = false;
			}

			//second b: return if no destination has been reached
			return this.currentIncrement;
		}

		//second c: return the calculation if not at any of the targets
		return this.currentIncrement;
	}
}

//  -----------------------------------
Ar_env.prototype.envelopeInput = function (input) {

	//if no trigger, just return 0
	if (!this.trigger) {
		return 0;
	} else {//if (trigger===1)/ while trigger is on

		//first, increment; them return one of the three options
		this.currentIncrement += this.increments;

		//second a: check if it reaches any of the amplitude's targets
		//return if it does
		if (this.currentIncrement >= this.ampTarget) {
			//make equal to target
			this.currentIncrement = this.ampTarget;
			//calculate decrements, which is the release
			//going from target to 0 (i.e. 1..0)
			this.calculateIncrements(
				this.ampTarget, 0, this._releaseDurationSamples);
			return this.currentIncrement * input;

		} else if (this.currentIncrement <= 0) {
			//make equal to 0, and return after calculations
			this.currentIncrement = 0;
			//calculate increments, which is the attack
			//going from 0 to target (i.e. 0..1)
			this.calculateIncrements(
				0, this.ampTarget, this._attackDurationSamples);

			this.trigger = false;// wait for next trigger
			if (this.triggerFlag) {
				//will return before being called again
				this.triggerEnv();
				this.triggerFlag = false;
			}

			//second b: return if no destination has been reached
			return this.currentIncrement * input;
		}

		//second c: return the calculation if not at any of the targets
		return this.currentIncrement * input;
	}
}



/** NOTE 1
* when using multiple ampTargets, this value will be a different
* amp target every time instead of 0
*/