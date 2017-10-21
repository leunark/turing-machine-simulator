(function($){
	$(function(){

		/* Instantiate Controller */
		var controller = new Controller();
		var initialStart = true; // first start of the current machine (true) or has it already started (false)

		/* Events */

		/* resizing window will update head's position */
		$(window).resize(function() {
			controller.view.moveHeadTo(controller.view.currentCell);
		});

		/* changing start value will automatically update view */
		$("#startValueInput").change(function(){
			controller.view.updateTape();
		});

		/* changing empty value will automatically update view */
		$("#emptyInput").change(function(){
			controller.view.updateTape();
		});

		/* start simulator */
		$("#playPauseButton").click(function(){
			if($(this).find("i").text() === "play_arrow"){
				if(initialStart == true){
					initialStart = false; // once simulator is started, set inital start to false
					controller.startSimulator();
				}
				$(this).find("i").text("pause");
				controller.continueSimulator();
			}else{
				$(this).find("i").text("play_arrow");
				controller.pauseSimulator();
			}
		});

		/* cancel simulator */
		$("#resetButton").click(function(){
			controller.resetSimulator();
			initialStart = true; // canceling simulator will make an initial start again possible OMGOGOGMGMO RESETBTTON UND NICHT CANCELBUTTON
		});

		$("#rightButton").click(function(){
			controller.view.moveHeadRight();
		});

		$("#writeButton").click(function(){
			controller.view.writeSymbol('?');
		});

		$("#leftButton").click(function(){
			controller.view.moveHeadLeft();
		});		

  }); // end of document read
})(jQuery); // end of jQuery name space