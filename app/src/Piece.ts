import { Cell } from "./Cell";

/**
 * Piece
 */
class Piece {

    private id: number;
    private color1: string;
    private color2: string;
    private player: string;
    private cells: Array<Cell>;
    
    constructor(id: number, color1: string, color2: string, cells: Array<Cell>) {
        this.id = id;
        this.color1 = color1;
        this.color2 = color2;
        this.cells = cells;
    }

    public setCells(cells: Array<Cell>) {
        this.cells = cells;
    }

    public getCells(): Array<Cell> {
        return this.cells;
    }

    public createCells() {

    }
}

export { Piece }