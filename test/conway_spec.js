var expect = require ('expect.js')
var Conway = require ('../conway.js')

var Cell = Conway.Cell
//var Board = Conway.Board

describe('Cell', function (){
  it('should start life dead', function(){
	c = new Cell()
	expect(c.alive).to.be(false)
  })

})
