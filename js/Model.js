class Model {
	constructor(){
		this.currentState = "";
		this.subsequentState = "";
		this.startState = "q0";
		this.currentSymbol = "";
	}

	/* set state */
	setCurrentState(state){
		this.state = state;
	}

	processCommand(currentState,symbol,subsequentState,action){
		//if(currentState === this.currentState && smy)
	}
	
	/*
		Text wird gesplittet -> Array von Zeilen
		Jede Zeile wird analysiert und Daten werden in ein Array gepackt
		Für jedes Array wird ein Objekt erstellt, dass die Attribute: currentState,symbol,subsequentState,action hat
		erstelle ein Array von Objekten
	*/

}