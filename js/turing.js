(function($){
  $(function(){

    /* surface */
    var startCell = $("#start"); // sets the start cell
    var currentCell = startCell; // saves the current cell
    var duration = 1000; // defines the duration in ms that the head needs to go to next cell
    var speed = $("#speedInput").val(); // the factor speed^-1 is the factor for the duration

    /* logic */
    var alphabet = ""; // stores the start value to set it on surface
    var state = ""; // e.g. z0

    /* default head is on start cell */
    moveHeadInstantlyTo(startCell);

    /* resizing window will update head's position */
    $(window).resize(function() {
      moveHeadInstantlyTo(currentCell);
    });

    $("#testButton").click(function(){
      console.log($("#commandsInput").val());
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
        $("#container").animate({scrollLeft: cell.position().left - $("#container").width()/2 + cell.width()/2}, duration * speed, 'linear');  
      }
    }

    /* moves head very fast tp the passed cell */
    function moveHeadInstantlyTo(cell){
      if(cell.length!=0){
        $("#container").animate({scrollLeft: cell.position().left - $("#container").width()/2 + cell.width()/2}, 5);  
      }
    }

    /* change state */
    function setState(){

    }

    /* delete cell */
    function deleteSymbol(){

    }

  }); // end of document read
})(jQuery); // end of jQuery name space

/*
  Structure:
  f(actualState,readSymbol)=(newState,direction)
  actualState && newSate: String word, begins with letter
  readSymbol: L (moveLeft), R (moveRight), ß (delete)

  Example input:
  f(q2,a)=(q1,R)
  f(q34,6)=(q21,L)
  f(q2,y)=(q4,ß)
*/

