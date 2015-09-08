var cell =  {
  alive: false
}

var Cell = function(){
  this.stuff = 'things'
}
Cell.prototype = cell

exports.Cell = Cell


Board = function(size){
  this.cells = []
  for(r = 0; r< size; r++){
	var row = []
	for(c = 0; c< size; c++){
	  row.push(new Cell())
	}
	this.cells.push(row)
  }
}

Board.prototype = {
  under_populated: function(num_neighbours){
	return num_neighbours < 2
  },

  over_populated: function(num_neighbours){
	return num_neighbours > 3
  },

  ressurectable: function(num_neighbours){
	return num_neighbours === 3
  }

}

exports.Board = Board


