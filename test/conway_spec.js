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
	})
  })

})


