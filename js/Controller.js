class Controller {
	constructor() {
		this.view = new View();
		this.model = new Model();
		this.paused = false;
		this.canceled = false;
		this.tickStamp = 0;
	}

	processStep(){
		var result = this.model.analyseMachineAction(this.view.readSymbol());
		if(result !== null){
			if(result["action"] === "l" || result["action"] === "L"){
				this.view.moveHeadLeft();
			} else if(result["action"] === "r" || result["action"] === "R"){
				this.view.moveHeadRight();
			} else {
				this.view.writeSymbol(result["action"]);
			}
		}else{
			console.log("Machine doesnt find");
		}
	}

	/* start simulator */
	startSimulator(){
		this.model.passMachineConfiguration(this.view.startValueInput,this.view.startStateInput,this.view.endStateInput,this.view.emptyInput);
		this.model.generateStateDictionary(this.view.commandInput);

		var that = this;
    var ticker = setInterval(function() { // this code is executed every 500 milliseconds
    	if(that.canceled){
    		clearInterval(ticker);
    	}
    	if(!that.paused){
    		console.log("TickStamp:"+that.tickStamp);
    		console.log("Tick:"+that.view.tick);
    		if(that.view.tick == that.tickStamp){
    			that.tickStamp++;
    			that.processStep();
    		}
    	}
    }, 500);
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
  	console.log("clicked");
  	this.canceled = true;
  	this.paused = true;
  	this.view.resetMachine();
  }

  /* empty simulator, empty all input values and tape */
  emptySimulator(){

  }

  /* export simulator as pdf */
  exportSimulator(){

  }
}