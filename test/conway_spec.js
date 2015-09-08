var expect = require ('expect.js')
var Conway = require ('../conway.js')

var Cell = Conway.Cell
var Board = Conway.Board

describe('Cell', function (){
  it('should start life dead', function(){
	c = new Cell()
	expect(c.alive).to.be(false)
  })

})

describe('Board', function (){
  describe('#under_populated', function(){
	it('returns true when neighbour count < 2', function(){
	  b = new Board()
	  expect(b.under_populated(2)).to.be(false)
	  expect(b.under_populated(1)).to.be(true)
	})
  })
  describe('#over_populated', function(){
	it('returns true when neighbour count > 3', function(){
	  b = new Board()
	  expect(b.over_populated(3)).to.be(false)
	  expect(b.over_populated(4)).to.be(true)
	})
  })

  describe('#ressurectable', function(){
	it('returns true when neighbour count == 3', function(){
	  b = new Board()
	  expect(b.ressurectable(3)).to.be(true)
	  expect(b.ressurectable(1)).to.be(false)
	})
  })

  describe('cells array', function(){
	it('has both dimensions set by the constructor', function(){
	  var size = 23
	  b = new Board(size)
	  expect(b.cells.length).to.be(size) 
	  expect(b.cells[0].length).to.be(size) 
	})
  })
})


