(function($){
	$(function(){

		/* Instantiate Controller */
		var controller = new Controller();

		/* Events */

		/* resizing window will update head's position */
		$(window).resize(function() {
			controller.view.centerHead();
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
			if(controller.started){
				if(controller.paused){
					controller.continueSimulator();
				}else{
					controller.pauseSimulator();
				}
			}else{
				controller.paused = false;
				controller.startSimulator();
			}
		});

		/* reset simulator */
		$("#resetButton").click(function(){
			controller.resetSimulator();
			controller.view.setPlayButton();
		});

		$("#stepButton").click(function(){
			controller.performStep();
		});

  }); // end of document read
})(jQuery); // end of jQuery name space