import * as $ from "jquery";
import { Board } from "./src/Board";
import { Player} from "./src/Player";
import { Piece} from "./src/Piece";
import { Cell} from "./src/Cell";

// let player = new Player("1");
// player.showScores();

let pieces: Array<Piece>;



let board = new Board();
board.initialize();

function dealPieces() {
    
}

$(document).on('click', 'img[data-role="board-cell"]', function() {
    let x = $(this).attr('data-coord-x');
    let y = $(this).attr('data-coord-y');
    if(board.getBuffer() != null) {
        board.drawPiece(Number(x), Number(y), board.getBuffer(), $(this));
    }
});

$(document).on('click', 'ul[data-role="piece"]', function() {
    let pieceId = Number($(this).attr('data-piece-id'));
    let leftColor = $(this).attr('data-left-color');
    let rightColor = $(this).attr('data-right-color');
    let leftCell = new Cell(pieceId, 'left', leftColor, 0, 0, "1");
    let rightCell = new Cell(pieceId, 'right', rightColor, 0, 0, "1");
    let piece = new Piece(pieceId, leftColor, rightColor, [leftCell, rightCell]);
    board.setBuffer(piece);
})