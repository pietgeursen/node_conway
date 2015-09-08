var expect = require ('expect.js')
var Conway = require ('../conway.js')

var Cell = Conway.Cell
//var Board = Conway.Board

describe('Test', function (){
  it('should work', function(){
	c = new Cell()
	expect(c.things).to.be('stuff')
  })

})
