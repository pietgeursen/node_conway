class Cell {

    constructor(alive_){
        this.alive = alive_
            this.neighbours = 0;
    }
}

exports.Cell = Cell

class Board {
    constructor(size){
        this.cells = [];
        this.neighbours = [[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]];
        let r = 0;
        let c = 0;
        for(r = 0; r < size; r++){
            var row = []
                for(c = 0; c< size; c++){
                    row.push(new Cell(Math.random() < 0.5))
                }
            this.cells.push(row)
        }
    }
    run(){
        this.countNeighbours();
        this.birthCycle()
            this.displayBoard()
    }

    displayBoard(){
        let i = 0;
        for(i=0; i<this.cells.length; i++){
            this.displayRow(this.cells[i])
                process.stdout.write('\n')
        }
    }

    displayRow(row){
        let j = 0;
        for(j=0; j<row.length; j++){
            this.displayCell(row[j])
        }
    }

    displayCell(cell){
        var char = cell.alive ? '|X|' : '| |'
            process.stdout.write(char)
    }


    cellAlive(r,c){
        if(this.outOfBounds(r) || this.outOfBounds(c)){
            return false
        }
        else{
            return this.cells[r][c].alive
        }
    }

    atEachLocation(f){
        let r = 0;
        let c = 0;
        for(r = 0; r < this.cells.length; r++){
            for(c = 0; c < this.cells.length; c++){
                f(r, c)
            }
        }
    }
    countNeighbours(){
        this.atEachLocation((r,c) => {
            this.cells[r][c].neighbours = this.countAliveNeighbours(r,c)
        })
    }
    countAliveNeighbours(r,c){
        let count = 0;
        let i = 0
            for(i = 0; i < this.neighbours.length; i++){
                if(this.cellAlive(this.neighbours[i][0] + r, this.neighbours[i][1] + c)){
                    count++
                }
            }
        return count
    }

    deathCycle(){
        this.atEachLocation((r,c)=>{
            var aliveNeighbours = this.cells[r][c].neighbours
            if(this.overPopulated(aliveNeighbours) || this.underPopulated(aliveNeighbours)){
                this.cells[r][c].alive = false
            }
        })
    }

    birthCycle(){
        this.atEachLocation((r,c)=>{
            let aliveNeighbours = this.cells[r][c].neighbours
            console.log(aliveNeighbours, r , c)
            if(this.ressurectable(aliveNeighbours)){
                this.cells[r][c].alive = true
            }
        })
    }

    underPopulated(num_neighbours){
        return num_neighbours < 2
    }

    overPopulated(num_neighbours){
        return num_neighbours > 3
    }

    ressurectable(num_neighbours){
        return num_neighbours == 3
    }

    outOfBounds(index){
        return index < 0 || index >= this.cells.length
    }

}

exports.Board = Board


