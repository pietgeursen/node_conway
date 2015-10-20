var expect = require ('expect.js')
var Conway = require ('../conway.js')
var simple = require('simple-mock')

var Cell = Conway.Cell
var Board = Conway.Board

describe('Cell', function (){
    it('should start life dead', function(){
        c = new Cell(false)
        expect(c.alive).to.be(false)
    })

    it('should start life alive', function(){
        c = new Cell(true)
        expect(c.alive).to.be(true)
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

    describe('#outOfBounds', function(){
        it('returns false if the array index is out of bounds', function(){
            var size = 10
            b = new Board(size)
            expect(b.outOfBounds(-1)).to.be(true)
            expect(b.outOfBounds(0)).to.be(false)
            expect(b.outOfBounds(1)).to.be(false)
            expect(b.outOfBounds(size)).to.be(true)
            expect(b.outOfBounds(size - 1 )).to.be(false)
        })
    })

    describe('#cellAlive', function(){
        it('returns true when a cell is alive, false when it is dead',function(){
            b = new Board(10)
            b.cells[1][1].alive = false
            expect(b.cellAlive(1,1)).to.be(false)
            b.cells[1][1].alive = true
            expect(b.cellAlive(1,1)).to.be(true)
        })
        it('returns false when the index is out of bounds',function(){
            b = new Board(10)
            expect(b.cellAlive(-1,-1)).to.be(false)
        })
    })

    describe('#countAliveNeighbours', function(){
        it('returns 8 when all neighbours are alive',function(){
            b = new Board(10)
            simple.mock(b, 'cellAlive').returnWith(true) // Stub
            b.countAliveNeighbours(1,1)
            expect(b.cells[1][1].neighbours).to.be(8)
        })

        it('returns 0 when all neighbours are dead',function(){
            b = new Board(10)
            simple.mock(b, 'cellAlive').returnWith(false) // Stub
            b.countAliveNeighbours(1,1)
            expect(b.cells[1][1].neighbours).to.be(0)
        })
        after(function(){
            simple.restore();
        })
    })
})


