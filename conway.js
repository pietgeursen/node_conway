var cell =  {
  alive: false
}

var Cell = function(alive){
  this.stuff = 'things'
  
  this.alive = alive ? alive : false
}
Cell.prototype = cell

exports.Cell = Cell


Board = function(size){
  this.cells = []
  for(r = 0; r< size; r++){
	var row = []
	for(c = 0; c< size; c++){
	  row.push(new Cell(Math.random() < 0.5))
	}
	this.cells.push(row)
  }
}

Board.prototype = {
  run: ()=>{
	console.log(this)
	this.deathCycle()
	this.birthCycle()
	this.displayBoard()
  },

  displayBoard: ()=>{
	for(i=0; i<this.cells.length; i++){
	  this.displayRow(this.cells[i])
	  process.stdout.write('\n')
	}
  },

  displayRow: (row)=>{
	for(j=0; j<row.length; j++){
	  this.displayCell(row[j])
	}
  },

  displayCell: (cell)=>{
	var char = cell.alive ? '|X|' : '| |'
	process.stdout.write(char)
  },


  neighbours: [[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]],

  cellAlive: (r,c)=>{
	if(this.outOfBounds(r) || this.outOfBounds(c)){
	  return false
	}
	else{
	  return this.cells[r][c].alive
	}
  },

  atEachLocation: (f)=>{
	for(r = 0; r < this.cells.length; r++){
	  for(c = 0; c < this.cells.length; c++){
		f(r, c, this)
	  }
	}
  },

  countAliveNeighbours: (r,c)=>{
	var count = 0;

	for(i = 0; i < this.neighbours.length; i++){
	  if(this.cellAlive(this.neighbours[i][0], this.neighbours[i][1])){
		count++
	  }
	}
	return count
  },

  deathCycle: () =>{
	this.atEachLocation((r,c)=>{
	  var aliveNeighbours = this.countAliveNeighbours(r,c)

	  if(this.over_populated(aliveNeighbours) || this.under_populated(aliveNeighbours)){
		this.cells[r][c].alive = false
	  }
	})
  },

  birthCycle: ()=>{
	this.atEachLocation((r,c)=>{
	  var aliveNeighbours = this.countAliveNeighbours(r,c)
	  if(this.ressurectable(aliveNeighbours)){
		this.cells[r][c].alive = true
	  }
	})
  },

  under_populated: (num_neighbours)=>{
	return num_neighbours < 2
  },

  over_populated: (num_neighbours)=> {
	return num_neighbours > 3
  },

  ressurectable: (num_neighbours)=>{
	return num_neighbours === 3
  },

  outOfBounds: (index)=>{
	return index < 0 || index >= this.cells.length
  }

}

exports.Board = Board


