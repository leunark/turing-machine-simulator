class Controller {
	constructor() {
		this.view = new View();
		this.model = new Model();
		this.paused = true;
		this.started = false;
		this.tickStamp = 0;
		this.ticker;
		this.result;
	}

	processStep(){
		// analyse action from model and perform in view
		if(this.result){
			if(this.result["action"] === "l" || this.result["action"] === "L"){
				this.view.moveHeadLeft();
			} else if(this.result["action"] === "r" || this.result["action"] === "R"){
				this.view.moveHeadRight();
			} else {
				this.view.writeSymbol(this.result["action"]);
			}

			// update info with information about following step
			this.result = this.model.analyseMachineAction(this.view.readSymbol());
			if(this.result){
				this.view.setInfo(this.result["currentState"],this.result["subsequentState"],"f("+this.result["currentState"]+","+this.result["symbol"]+")=("+this.result["subsequentState"]+","+this.result["action"]+")");
			}

		 	// simulation end
		} else {
	 		console.log("No more action could be found!");
			// stop machine running
			clearInterval(this.ticker);
			// check if end state is reached
			if(this.model.currentState = this.model.endState){
				console.log("End state reached!");
			}
		}
	}

	/* start simulator */
	startSimulator(){
		// prepare simulator
		this.view.disableInputs();
		this.view.setPauseButton();
		this.model.passMachineConfiguration(this.view.startValueInput,this.view.startStateInput,this.view.endStateInput,this.view.emptyInput);
		this.model.generateStateDictionary(this.view.commandInput);

		// start values
		this.tickStamp = 0;
		this.view.tick = 0;
		this.started = true;

		// update info with information about following step
		this.result = this.model.analyseMachineAction(this.view.readSymbol());
		if(this.result){
			this.view.setInfo(this.result["currentState"],this.result["subsequentState"],"f("+this.result["currentState"]+","+this.result["symbol"]+")=("+this.result["subsequentState"]+","+this.result["action"]+")");
		}

		// process steps
		var that = this;
    this.ticker = setInterval(function() { // this code is executed every 500 milliseconds
    	if(!that.paused){
    		if(that.view.tick >= that.tickStamp){ // this will only happen, when the animation is complete and the callback function increased the tick
    			that.tickStamp++;
    			that.processStep();
    		}
    	}
    }, 10); // increasing this value will lead to stuttering animations when animation speed is low
  }

  /* perform only one step */
  performStep(){
  	if(this.started){
  		this.paused = true;
  		this.view.setPlayButton();
  		this.tickStamp++;
  		this.processStep();
  	}else{
  		this.paused = true;
  		this.startSimulator();
  	}
  }

  /* pause simulator */
  pauseSimulator(){
  	this.paused = true;
  	this.view.setPlayButton();
  }

  /* continue simulator */
  continueSimulator(){
  	this.paused = false;
  	this.view.setPauseButton();
  }

  /* cancel simulator and reset to inital state */
  resetSimulator(){
  	this.paused = true;
  	this.started = false;
  	clearInterval(this.ticker);
  	this.view.prepareView();
  	this.view.setPlayButton();
  }

  /* export simulator as pdf */
  exportSimulator(){

  }
}