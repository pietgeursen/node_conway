Conway = require('./conway.js')

var Board = Conway.Board

var b = new Board(10)

setInterval(function(){b.run()}, 1000)

