import * as $ from "jquery";
import { Cell } from "./Cell";
import { Piece } from "./Piece";
/**
 * Board
 */
class Board {

    private board: { [key: string]: Cell} = {};
    private directions: { [key: string]: Array<number>} = {};
    private images: { [key: string]: string} = {};
    private buffer: Piece;
    
    constructor() {
        this.directions['NO'] = [0,-1];
        this.directions['O'] = [-1,0];
        this.directions['SO'] = [-1,1];
        this.directions['NE'] = [1,-1];
        this.directions['E'] = [1,0];
        this.directions['SE'] = [0,1];

        this.images['red'] = 'assets/img/rojo.png';
        this.images['green'] = 'assets/img/verde.png';
        this.images['violet'] = 'assets/img/morado.png';
        this.images['blue'] = 'assets/img/azul.png';
        this.images['yellow'] = 'assets/img/amarillo.png';
        this.images['orange'] = 'assets/img/naranja.png';
    }

    public initialize() {
        let base = 5;
        let emptyCell: Cell;
        for(let i = -base; i <= 0; i++) {
            for(let j = -(base + i); j <= base; j++) {
                emptyCell = new Cell(0, '', '', j, i, '');
                this.insertInBoard(j, i, emptyCell);
            }
        }
        for(let i = base; i > 0; i--) {
            for(let j = -(i - base); j >= -base; j--) {
                emptyCell = new Cell(0, '', '', j, i, '');
                this.insertInBoard(j, i, emptyCell);
            }
        }
        this.insertInBoard(0, -5, new Cell(-1, '', 'red', 0, -5, ''));
        this.insertInBoard(5, -5, new Cell(-1, '', 'green', 5, -5, ''));
        this.insertInBoard(-5, 0, new Cell(-1, '', 'violet', -5, 0, ''));
        this.insertInBoard(5, 0, new Cell(-1, '', 'blue', 5, 0, ''));
        this.insertInBoard(0, 5, new Cell(-1, '', 'yellow', 0, 5, ''));
        this.insertInBoard(5, 5, new Cell(-1, '', 'orange', 5, 5, ''));
    }

    public getBoard(): { [key: string]: Cell} {
        return this.board;
    }

    public getImages(): { [key: string]: string} {
        return this.images;
    }

    public drawPiece(x: number, y: number, piece: Piece, domElement) {
        let cells = piece.getCells();
        if(cells.length > 0) {
            if(this.drawCell(x, y, cells[0], domElement)) {
                cells.shift();
            }
        }
    }

    public drawCell(x: number, y:number, cell: Cell, domElement): boolean {
        let drawn = false;
        if(this.canPlace(x, y, cell)) {
            let tempCell = cell;
            tempCell.setCoords(x, y);
            this.insertInBoard(x, y, tempCell);
            domElement.attr('src', this.images[cell.getColor()]);
            domElement.attr('data-piece-id', cell.getPieceId());
            domElement.attr('data-color', cell.getColor());
            drawn = true;
        }
        return drawn;
    }

    public canPlace(x: number, y: number, cell: Cell): boolean {
        let canPlace = false;
        let endCell = this.getFromBoard(x, y);
        if(cell.getType() == 'right') {
            for(let key in this.directions) {
                let direction = this.directions[key];
                let neighborCell = this.getFromBoard(x + direction[0], y + direction[1]);
                if(neighborCell.getPieceId() == cell.getPieceId() && endCell.getPieceId() == 0) {
                    canPlace = true;
                    break;
                }
            }
        } else if(cell.getType() == 'left' && endCell.getPieceId() == 0) {
            canPlace = true;
        }
        return canPlace;
    }

    public neighbor(direction: string, piece: Array<number>): boolean {
        let neighbor = false;
        let dir = this.directions[direction];
        let tempHex = [piece[0] + dir[0], piece[1] + dir[1]];
        if(piece == tempHex) {
            neighbor = true;
        }
        return neighbor;
    }

    public setBuffer(piece :Piece) {
        this.buffer = piece;
    }

    public getBuffer(): Piece {
        return this.buffer;
    }

    private insertInBoard(x: number, y: number, cell: Cell) {
        let key = `"${x}"/"${y}"`;
        this.board[key] = cell;
    }

    private getFromBoard(x: number, y:number): Cell {
        let key = `"${x}"/"${y}"`;
        return this.board[key];
    }
}

export { Board }