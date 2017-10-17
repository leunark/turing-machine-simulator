(function($){
  $(function(){

    var startCell = $("#start"); // sets the start cell
    var currentCell = startCell; // saves the current cell
    var speed = 300; // defines the duration in ms that the head needs to go to next cell

    /* default head is on start cell */
    moveHeadInstantlyTo(startCell);

    /* resizing window will update head's position */
    $(window).resize(function() {
      moveHeadInstantlyTo(currentCell);
    });

    /* moves head by 1 cell to the right */
    function moveHeadRight(){
      if(currentCell.next().length!=0){
        currentCell = currentCell.next();
        moveHeadTo(currentCell);
      }
    }

    /* moves head by 1 cell to the left */
    function moveHeadLeft(){
      if(currentCell.prev().length!=0){
        currentCell = currentCell.prev();
        moveHeadTo(currentCell);
      }
      console.log(currentCell);
    }

    /* moves head to the passed cell */
    function moveHeadTo(cell){
      if(cell.length!=0){
        currentCell = cell;
        $("#container").animate({scrollLeft: cell.position().left - $("#container").width()/2 + cell.width()/2}, speed, 'linear');  
      }
    }

    /* moves head very fast tp the passed cell */
    function moveHeadInstantlyTo(cell){
      if(cell.length!=0){
        $("#container").animate({scrollLeft: cell.position().left - $("#container").width()/2 + cell.width()/2}, 5);  
      }
    }

  }); // end of document read
})(jQuery); // end of jQuery name space

/*

To-do:

Catch bound error!!!

*/

