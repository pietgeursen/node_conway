var cell =  {
  alive: false
}

var Cell = function(){
  this.stuff = 'things'
}
Cell.prototype = cell

exports.Cell = Cell


Board = function(size){
  this.size = size
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


