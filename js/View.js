/* class for head that is reading, writing and moving over an endless tape */
class View {
	constructor() {
		this.setTestValues();

		this.startCell;
		this.currentCell;
		this.duration = 5000; // default duration in ms
		this.offset = 30;
		this.standardCell = '<div class="cell z-depth-2">'+this.emptyInput+'</div>'

		this.tick = 0;
		this.prepareView();
	}

	setTestValues(){
		/* Set some standard values */
		$("#emptyInput").val("ß");
		$("#startStateInput").val("q0");
		$("#endStateInput").val("qe");
		$("#startValueInput").val("aaaabbbb");
		$("#speedInput").val("30");
		$("#commandInput").text("f(q0,a)=(q1,ß)\n"+
			"f(q1,ß)=(q2,R)\n"+
			"f(q2,a)=(q2,R)\n"+
			"f(q2,b)=(q3,R)\n"+
			"f(q3,b)=(q3,R)\n"+
			"f(q3,ß)=(q4,L)\n"+
			"f(q4,b)=(q5,ß)\n"+
			"f(q5,ß)=(q6,L)\n"+
			"f(q6,ß)=(qe,ß)\n"+
			"f(q6,b)=(q7,L)\n"+
			"f(q7,b)=(q7,L)\n"+
			"f(q7,a)=(q7,L)\n"+
			"f(q7,ß)=(q0,R)\n");
		$("#commandInput").trigger('autoresize');
	}

	/* instantiate cells */
	prepareView(){
		this.tick = 0;
		this.enableInputs();
		$("#tape").empty();

		this.appendCell(); // create first cell
	 	$("#tape div").attr("id","startCell"); // give unique id to first cell
	 	this.startCell = $("#startCell");
		this.currentCell = this.startCell; // set current cell to start cell

		for(var i = 0; i < this.offset; i++){
			this.prependCell();
			this.appendCell();
		}
		this.centerHead();
		this.updateTape();
	}

	/* update tape with new values: start value and empty value */
	updateTape(){
		// clear all cells
		var emptySymbol = this.emptyInput;
		var children = $("#tape").children();
		
		for(var child of children){
			$(child).text(this.emptyInput);
		}

		// set cells to start value
		var cellIterator = this.startCell; // this temp variable points to a cell in the
		for(var i=0; i<this.startValueInput.length; i++){
			cellIterator.text(this.startValueInput.charAt(i));
			cellIterator = cellIterator.next();
			this.appendCell(); // every time a cell is written on, create a new cell
		}
	}

	/* appends an empty cell to the tape */
	appendCell(){
		$("#tape").append(this.standardCell);
	}

	/* prepends an empty cell to the tape */
	prependCell(){
		$("#tape").prepend(this.standardCell);
	}

	/* move head by 1 cell to the right */
	moveHeadRight(){
		var that = this;
		if(this.currentCell.next().length!=0){
			if(this.currentCell.next().text()===this.emptyInput){
				this.appendCell();
			}
			this.currentCell = this.currentCell.next();
			$("#container").animate({
				scrollLeft: this.currentCell.position().left - $("#container").width()/2 + this.currentCell.width()*0.5
			}, this.duration / this.speedInput, 'linear'
			).promise().done(function(){
				that.tick++;
			});  
		}
	}

	/* move head by 1 cell to the left */
	moveHeadLeft(){
		var that = this;
		if(this.currentCell.prev().length!=0){
			if(this.currentCell.prev().text()===this.emptyInput){
				this.prependCell();
				$("#container").animate({scrollLeft: this.currentCell.position().left - $("#container").width()/2 + this.currentCell.width()*0.5}, 1, 'linear');
			}
			this.currentCell = this.currentCell.prev();
			$("#container").animate({
				scrollLeft: this.currentCell.position().left - $("#container").width()/2 + this.currentCell.width()*0.5
			}, this.duration / this.speedInput, 'linear'
			).promise().done(function(){
				that.tick++;
			});  
		}
	}

	/* move head to the passed cell */
	centerHead(){
		$("#container").animate({scrollLeft: this.currentCell.position().left - $("#container").width()/2 + this.currentCell.width()*0.5}, 10, 'linear');
	}

	/* write symbol in current cell  */
	writeSymbol(symbol){
		this.currentCell.text(symbol);
		this.tick++;
	}

	/* write symbol in current cell  */
	readSymbol(){
		return this.currentCell.text();
	}

	disableInputs(){
		$("#startValueInput").attr("disabled", true);
		$("#emptyInput").attr("disabled", true);
		$("#startStateInput").attr("disabled", true);
		$("#endStateInput").attr("disabled", true);
		$("#commandInput").attr("disabled", true);
	}

	enableInputs(){
		$("#startValueInput").attr("disabled", false);
		$("#emptyInput").attr("disabled", false);
		$("#startStateInput").attr("disabled", false);
		$("#endStateInput").attr("disabled", false);
		$("#commandInput").attr("disabled", false);
	}

	/* get start value of the input box with id=startValueInput*/
	get startValueInput(){
		return Parser.removeSpaces($("#startValueInput").val());
	}

	/* get speed value of the range field with id=speedInput */
	get speedInput(){
		return $("#speedInput").val();
	}

	/* get commands of the text field with id=commandInput */
	get commandInput(){
		return $("#commandInput").val();
	}

	get emptyInput(){
		return Parser.removeSpaces($("#emptyInput").val().charAt(0));
	}

	get startStateInput(){
		return Parser.removeSpaces($("#startStateInput").val());
	}

	get endStateInput(){
		return Parser.removeSpaces($("#endStateInput").val());
	}
}