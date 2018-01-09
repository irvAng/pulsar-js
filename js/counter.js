class Counter {
	constructor () {
		this.counter = 0;
		this.trainFreqMs = 0;
		this.flag = false;
	}

	count () {
		this.counter++;
		this.counter %= this.trainFreqMs;
		if(this.counter > this.trainFreqMs) {
			this.counter = 0;
		}
		
		return this.counter;
	}
}