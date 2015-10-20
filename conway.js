'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Cell = function Cell(alive_) {
    _classCallCheck(this, Cell);

    this.alive = alive_;
    this.neighbours = 0;
};

exports.Cell = Cell;

var Board = (function () {
    function Board(size) {
        _classCallCheck(this, Board);

        this.cells = [];
        this.neighbours = [[-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0]];
        var r = 0;
        var c = 0;
        for (r = 0; r < size; r++) {
            var row = [];
            for (c = 0; c < size; c++) {
                row.push(new Cell(Math.random() < 0.5));
            }
            this.cells.push(row);
        }
    }

    _createClass(Board, [{
        key: 'run',
        value: function run() {
            this.countNeighbours();
            this.birthCycle();
            this.displayBoard();
        }
    }, {
        key: 'displayBoard',
    value: function displayBoard() {
        var i = 0;
        for (i = 0; i < this.cells.length; i++) {
            this.displayRow(this.cells[i]);
            process.stdout.write('\n');
        }
    }
    }, {
        key: 'displayRow',
    value: function displayRow(row) {
        var j = 0;
        for (j = 0; j < row.length; j++) {
            this.displayCell(row[j]);
        }
    }
    }, {
        key: 'displayCell',
        value: function displayCell(cell) {
            var char = cell.alive ? '|X|' : '| |';
            process.stdout.write(char);
        }
    }, {
        key: 'cellAlive',
        value: function cellAlive(r, c) {
            if (this.outOfBounds(r) || this.outOfBounds(c)) {
                return false;
            } else {
                return this.cells[r][c].alive;
            }
        }
    }, {
        key: 'atEachLocation',
        value: function atEachLocation(f) {
            var r = 0;
            var c = 0;
            for (r = 0; r < this.cells.length; r++) {
                for (c = 0; c < this.cells.length; c++) {
                    f(r, c);
                }
            }
        }
    }, {
        key: 'countNeighbours',
        value: function countNeighbours() {
            var _this = this;

            this.atEachLocation(function (r, c) {
                _this.countAliveNeighbours(r, c);
            });
        }
    }, {
        key: 'countAliveNeighbours',
        value: function countAliveNeighbours(r, c) {
            var count = 0;
            var i = 0;
            for (i = 0; i < this.neighbours.length; i++) {
                if (this.cellAlive(this.neighbours[i][0] + r, this.neighbours[i][1] + c)) {
                    count++;
                }
            }
            this.cells[r][c].neighbours = count;
        }
    }, {
        key: 'deathCycle',
        value: function deathCycle() {
            var _this2 = this;

            this.atEachLocation(function (r, c) {
                var aliveNeighbours = _this2.cells[r][c].neighbours;
                if (_this2.over_populated(aliveNeighbours) || _this2.under_populated(aliveNeighbours)) {
                    _this2.cells[r][c].alive = false;
                }
            });
        }
    }, {
        key: 'birthCycle',
        value: function birthCycle() {
            var _this3 = this;

            this.atEachLocation(function (r, c) {
                var aliveNeighbours = _this3.cells[r][c].neighbours;
                console.log(aliveNeighbours, r, c);
                if (_this3.ressurectable(aliveNeighbours)) {
                    _this3.cells[r][c].alive = true;
                }
            });
        }
    }, {
        key: 'under_populated',
        value: function under_populated(num_neighbours) {
            return num_neighbours < 2;
        }
    }, {
        key: 'over_populated',
        value: function over_populated(num_neighbours) {
            return num_neighbours > 3;
        }
    }, {
        key: 'ressurectable',
        value: function ressurectable(num_neighbours) {
            return num_neighbours == 3;
        }
    }, {
        key: 'outOfBounds',
        value: function outOfBounds(index) {
            return index < 0 || index >= this.cells.length;
        }
    }]);

    return Board;
})();

exports.Board = Board;
