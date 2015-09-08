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
  neighbours: [[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]],

  cellAlive: function(r,c){
	if(this.outOfBounds(r) || this.outOfBounds(c)){
	  return false
	}
	else{
	  return this.cells[r][c].alive
	}
  },

  atEachLocation: function(f){
	for(r = 0; r < this.cells.length; r++){
	  for(c = 0; c < this.cells.length; c++){
		f(r, c)
	  }
	}
  },

  deathCycle: function(){
	this.atEachLocation(function(r,c){
	  var aliveNeighbours = this.countAliveNeighbours(r,c)

	  if(over_populated(aliveNeighbours) || under_populated(aliveNeighbours)){
		this.cells[r][c].alive = false
	  }
	})
  },

  birthCycle: function(){
	this.atEachLocation(function(){
	  var aliveNeighbours = this.countAliveNeighbours(r,c)
	  if(ressurectable(aliveNeighbours)){
		this.cells[r][c].alive = true
	  }
	})
  },

  countAliveNeighbours: function(r,c){
	var count = 0;

	for(i = 0; i < this.neighbours.length; i++){
	  if(this.cellAlive(this.neighbours[i][0], this.neighbours[i][1])){
		count++
	  }
	}
	return count
  },
  under_populated: function(num_neighbours){
	return num_neighbours < 2
  },

  over_populated: function(num_neighbours){
	return num_neighbours > 3
  },

  ressurectable: function(num_neighbours){
	return num_neighbours === 3
  },

  outOfBounds: function(index){
	return index < 0 || index >= this.cells.length
  }

}

exports.Board = Board


