Conway = require('./conway.js')

var Board = Conway.Board

var b = new Board(10)

b.run()
setInterval(b.run, 20)

