class Model {
	constructor(){

		/* unflexible */
		this.stateDictionary = {};
		this.startValue = "";
		this.startState = "";
		this.endState = "";
		this.emptySymbol = "";

		/* flexible */
		this.currentState = "";
		this.logs = {}; // this logfile will save each step
	}

	passMachineConfiguration(startValueInput,startStateInput, endStateInput, emptyInput){
		this.startValue = startValueInput;
		this.startState = startStateInput;
		this.endState = endStateInput;
		this.emptySymbol = emptyInput;
		this.currentState = startStateInput; // at the beginning current state is start state
	}

	/* updates the machine state, according to the symbol */
	analyseMachineAction(cellSymbol){	
		if(this.stateDictionary[this.currentState]){
			if(this.stateDictionary[this.currentState][cellSymbol]){
				this.stateDictionary[this.currentState][cellSymbol]["action"];
				var result = new Object;
				result["action"] = this.stateDictionary[this.currentState][cellSymbol]["action"];
				result["subsequentState"] = this.stateDictionary[this.currentState][cellSymbol]["subsequentState"];
				this.currentState = this.stateDictionary[this.currentState][cellSymbol]["subsequentState"];
				return result;
			}else{
				console.log("No fitting symbol for current state was found in state dictionary!");
				return null;
			}
		}else{
			console.log("No function for current state was found in state dictionary!");
			return null;
		}

	}

	generateStateDictionary(commandInput){
		// empty stateDictionary
		this.stateDictionary = {};

		// split command input into several lines and save them in an array
		var commandArray = Parser.splitText(commandInput);
		
		//console.log(commandArray);

		// loop through every line 
		for (var commandLine of commandArray){
			// fetch parameters from command line with the parser
			var commandParameters = Parser.parseLine(commandLine);

			// if parser cant match the line on regex, reject further process with this line
			if(commandParameters.length == 0){
				continue;
			}

			// load data in an "associative array"
			var parameterObject = new Object;
			parameterObject["currentState"]=commandParameters[1];
			parameterObject["symbol"]=commandParameters[2];
			parameterObject["subsequentState"]=commandParameters[3];
			parameterObject["action"]=commandParameters[4]; // ignore case 
			//console.log(parameterObject);

			// load parameters into the state tree
			if(!this.stateDictionary.hasOwnProperty(commandParameters[1])){
				this.stateDictionary[commandParameters[1]]= new Object;
				this.stateDictionary[commandParameters[1]][commandParameters[2]]=parameterObject;
			}else{
				this.stateDictionary[commandParameters[1]][commandParameters[2]]=parameterObject;
			}

		}
		//console.log(this.stateDictionary);
	}

	/* find with the read symbol and the current state the right entry and return the result */
	scanDictionary(state,symbol){
		return this.stateDictionary[state][symbol];
	}

}