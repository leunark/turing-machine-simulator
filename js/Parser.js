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

/*
	False Input Check:
	f(2q0,a)=(q1,ß)
	f(3q1,ß)=(q2,R)
	f(4q2,a)=(q2,R)
	f(5q2,b)=(q3,R)
	f(7q3,b)=(q3,R)
	f(q3,ß)=(6q4,L)
	f(q4,b)=(+q5,ß)
	f(q5,ß)=(#q6,L)
	f(q6,ß)=(?qe,ß)
	f(q6,b)=(ßq7,L)
	f(q7,b)=(5q7,L)
	f(q7,a)=(Qq7,L)
	f(q7,ß)=(.q0,R)
*/