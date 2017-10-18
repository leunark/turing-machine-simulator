class Parser {
	
	/* split the text into lines, remove empty lines and return an array of the lines */
	static splitText(text){
		var regex = /(.*)[\n\r]/ig; // IMPROVEMENTS
		var result = text.match(regex);
		console.log(result);
		return result;
	}

	/* parse line with regex and return an array */
	static parseLine(line){
		var regex = /f\(([a-z]+[a-z0-9]*)\,(.)\)\=\(([a-z]+[a-z0-9]*)\,([l|r|ß])\)/ig;
		var result = text.match(regex);
		console.log(result);
		return result;
	}
}