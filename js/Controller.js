class Controller {
	constructor() {
		this.view = new View();
		this.model = new Model();
		this.paused = false;
		this.canceled = false;
		this.tickStamp = 0;
		this.ticker;
	}

	processStep(){
		// analyse action from model and perform in view
		var result = this.model.analyseMachineAction(this.view.readSymbol());
		if(result){
			if(result["action"] === "l" || result["action"] === "L"){
				this.view.moveHeadLeft();
			} else if(result["action"] === "r" || result["action"] === "R"){
				this.view.moveHeadRight();
			} else {
				this.view.writeSymbol(result["action"]);
			}
	 	// simulation end
		}else{
			console.log("No more action could be found!");
			clearInterval(this.ticker);
			if(this.model.currentState = this.model.endState){
				console.log("End state reached!");
			}
		}
	}

	/* start simulator */
	startSimulator(){
		// prepare simulator
		this.view.disableInputs();
		this.model.passMachineConfiguration(this.view.startValueInput,this.view.startStateInput,this.view.endStateInput,this.view.emptyInput);
		this.model.generateStateDictionary(this.view.commandInput);

		// set start values
		this.canceled = false;
		this.paused = false;
		this.tickStamp = 0;
		this.view.tick = 0;

		// process steps
		var that = this;
    this.ticker = setInterval(function() { // this code is executed every 500 milliseconds
    	if(!that.paused){
    		if(that.view.tick == that.tickStamp){ // this will only happen, when the animation is complete and the callback function increased the tick
    			that.tickStamp++;
    			that.processStep();
    		}
    	}
    }, 10);
  }

  /* pause simulator */
  pauseSimulator(){
  	this.paused = true;
  }

  /* continue simulator */
  continueSimulator(){
  	this.paused = false;
  }

  /* cancel simulator and reset to inital state */
  resetSimulator(){
  	clearInterval(this.ticker);
  	this.view.prepareView();
  }

  /* export simulator as pdf */
  exportSimulator(){

  }
}