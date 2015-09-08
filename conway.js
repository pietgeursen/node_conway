var test = {things: 'stuff'}

var Test = function(){
  this.stuff = 'things'
}
Test.prototype = test

exports.Cell = Test
