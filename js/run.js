(function($){
	$(function(){

		/* Instantiate Controller */
		var controller = new Controller();

		/* Events */

		/* resizing window will update head's position */
		$(window).resize(function() {
			moveHeadInstantlyTo(currentCell);
		});

		/* test button for testing functions */
		$("#testButton").click(function(){
			Parser.splitText($("#commandsInput").val());
		});

		/* start simulator */
		$("#startButton").click(function(){
			controller.startSimulator();
		});

		/* pause simulator */
		$("#pauseButton").click(function(){
			controller.pauseSimulator();
		});

		/* cancel simulator */
		$("#cancelButton").click(function(){
			controller.startSimulator();
		});






  }); // end of document read
})(jQuery); // end of jQuery name space