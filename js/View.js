/* class for head that is reading, writing and moving over an endless tape */
class View {
	constructor() {
		this.startCell = $("#startCell");
		this.currentCell = startCell;
		this.duration = 1000; // default duration in ms
		this.emptySymbol = "-";
		this.standardCell = '<div class="cell z-depth-2">'+this.emptySymbol+'</div>'
	}

	/* delete symbol in current cell */
	deleteSymbol(){
		currentCell.val(this.emptySymbol);
	}

	/* write symbol in current cell  */
	writeSymbol(symbol){
		currentCell.val(symbol);
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
		if(currentCell.next().length!=0){
			currentCell = currentCell.next();
			moveHeadTo(currentCell);
		}
	}

	/* move head by 1 cell to the left */
	moveHeadLeft(){
		if(currentCell.prev().length!=0){
			currentCell = currentCell.prev();
			moveHeadTo(currentCell);
		}
		console.log(currentCell);
	}

	/* move head to the passed cell */
	moveHeadTo(cell){
		if(cell.length!=0){
			currentCell = cell;
			$("#container").animate({scrollLeft: cell.position().left - $("#container").width()/2 + cell.width()/2}, this.duration / this.speedInput, 'linear');  
		}
	}

	/* move head very fast tp the passed cell */
	moveHeadInstantlyTo(cell){
		if(cell.length!=0){
			$("#container").animate({scrollLeft: cell.position().left - $("#container").width()/2 + cell.width()/2}, 5);  
		}
	}

	/* get start value of the input box with id=startInput*/
	get startInput(){
		return $("#startInput").val();
	}

	/* get speed value of the range field with id=speedInput */
	get speedInput(){
		return $("#speedInput").val();
	}

	/* get commands of the text field with id=commandsInput */
	get commandsInput(){
		return $("#commandsInput").val();
	}
}

/*
	give possibility to change emptySymbol
	give possibility to set startState
*/