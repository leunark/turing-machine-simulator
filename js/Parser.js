class Parser {
	
	/* split the text into lines, remove empty lines and return an array of the lines */
	static splitText(text){
		var regex = /([^\n\r]+)/g;
		var result = text.match(regex);
		return result;
	}

	/* parse line with regex to fit the right format and return an array */
	static parseLine(line){
		var regex = /f\(([a-zA-Z][a-zA-Z0-9]*)\,(.)\)\=\(([a-zA-Z][a-zA-Z0-9]*)\,(.)\)/;
		var result = Parser.removeSpaces(line).match(regex); // ignore spaces and use regex
		return result;
	}

	/* remove spaces from string */
	static removeSpaces(string){
		var regex =  /\s/g;
		var result = string.replace(/\s/g,'');
		return result;
	}
}