class Controller {
	constructor() {
		this.view = new View();
		this.model = new Model();
		this.offset = 10;
		this.prepareSimulator();
	}

	/* instantiate cells */
	prepareSimulator(){
		for(var i = 0; i < this.offset; i++){
			this.view.prependCell();
			this.view.appendCell();
		}
	}

	/* start simulator */
	startSimulator(){
		
	}

	/* pause simulator */
	pauseSimulator(){

	}

	/* cancel simulator and reset to inital state */
	cancelSimulator(){

	}

	/* empty simulator, empty all input values and tape */
	emptySimulator(){

	}

	/* export simulator as pdf */
	exportSimulator(){

	}
}