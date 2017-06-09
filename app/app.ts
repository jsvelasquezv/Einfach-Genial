import * as $ from "jquery";
import { Board } from "./src/Board";
import { Player} from "./src/Player";
import { Piece} from "./src/Piece";
import { Cell} from "./src/Cell";
let pieces: Array<Object>;

pieces = [
    {'leftColor': 'red', 'rightColor': 'red', 'quantity': 5},
    {'leftColor': 'blue', 'rightColor': 'blue', 'quantity': 5},
    {'leftColor': 'green', 'rightColor': 'green', 'quantity': 5},
    {'leftColor': 'yellow', 'rightColor': 'yellow', 'quantity': 5},
    {'leftColor': 'orange', 'rightColor': 'orange', 'quantity': 5},
    {'leftColor': 'violet', 'rightColor': 'violet', 'quantity': 5},
    {'leftColor': 'red', 'rightColor': 'blue', 'quantity': 6},
    {'leftColor': 'red', 'rightColor': 'green', 'quantity': 6},
    {'leftColor': 'red', 'rightColor': 'yellow', 'quantity': 6},
    {'leftColor': 'red', 'rightColor': 'orange', 'quantity': 6},
    {'leftColor': 'red', 'rightColor': 'violet', 'quantity': 6},
    {'leftColor': 'blue', 'rightColor': 'green', 'quantity': 6},
    {'leftColor': 'blue', 'rightColor': 'yellow', 'quantity': 6},
    {'leftColor': 'blue', 'rightColor': 'orange', 'quantity': 6},
    {'leftColor': 'blue', 'rightColor': 'violet', 'quantity': 6},
    {'leftColor': 'green', 'rightColor': 'yellow', 'quantity': 6},
    {'leftColor': 'green', 'rightColor': 'orange', 'quantity': 6},
    {'leftColor': 'green', 'rightColor': 'violet', 'quantity': 6},
    {'leftColor': 'yellow', 'rightColor': 'orange', 'quantity': 6},
    {'leftColor': 'yellow', 'rightColor': 'violet', 'quantity': 6},
    {'leftColor': 'orange', 'rightColor': 'violet', 'quantity': 6},
];


let board = new Board();
board.initialize();

let player1 = new Player("1");
let player2 = new Player("2");
let pieceCounter = 1;

let initialPieces1 = dealFirstPieces(player1.getId());
let initialPieces2 = dealFirstPieces(player2.getId());
$(document).ready(function() {
    placePlayerPieces(initialPieces1, "1");
    placePlayerPieces(initialPieces2, "2");
    player1.showScores();
    player2.showScores();
});

function dealPiece(playerId: string): Piece {
    let index = Math.floor(Math.random() * pieces.length);
    let pieceData = pieces[index];
    let piece: Piece;
    if(pieceData['quantity'] == 1) {
        piece = buildPiece(pieceData, playerId);
        pieces.slice(index, 1);
    } else {
        piece = buildPiece(pieceData, playerId);
        pieces[index]['quantity']--;
    }
    return piece;
}

function buildPiece(pieceData, playerId: string): Piece {
    let pieceId = pieceCounter;
    let leftColor = pieceData['leftColor'];
    let rightColor = pieceData['rightColor'];
    let leftCell = new Cell(pieceId, 'left', leftColor, 0, 0, "1");
    let rightCell = new Cell(pieceId, 'right', rightColor, 0, 0, "1");
    let piece = new Piece(pieceId, leftColor, rightColor, [leftCell, rightCell], playerId);
    pieceCounter++;
    return piece;
}

function dealFirstPieces(playerId: string) {
    let playerPieces = [];
    for (let index = 0; index < 6; index++) {
        playerPieces.push(dealPiece(playerId));
    }
    return playerPieces;
}

function placePlayerPieces(pieces, playerId) {
    pieces.forEach(piece => {
        placePlayerPiece(piece, playerId);
    });
}

function placePlayerPiece(piece: Piece, playerId: string) {
    let images = board.getImages();
    let cells = piece.getCells();
    let leftCell = cells[0];
    let rightCell = cells[1];
    let html = 
    `<ul class="piece" data-role="piece" data-piece-id="${piece.getId()}" data-player-id="${playerId}" data-left-color="${leftCell.getColor()}" data-right-color="${rightCell.getColor()}">
        <li class="hex">
            <div class="hexIn">
                <a href="#" class="hexLink">
                    <img src="${images[leftCell.getColor()]}" alt="">
                </a>
            </div>
        </li>
        <li class="hex">
            <div class="hexIn">
                <a href="#" class="hexLink">
                    <img src="${images[rightCell.getColor()]}" alt="">
                </a>
            </div>
        </li>
    </ul>`;
    $(`#player-${playerId}-pieces`).append($.parseHTML(html));
}

function replacePlayerPlace(toReplaceId: number, playerId: string) {
    let piece = dealPiece(playerId);
    $(`ul[data-role="piece"][data-piece-id="${toReplaceId}"][data-player-id="${playerId}"]`).remove();
    placePlayerPiece(piece, playerId);
}

$(document).on('click', 'img[data-role="board-cell"]', function() {
    let x = $(this).attr('data-coord-x');
    let y = $(this).attr('data-coord-y');
    if(board.getBuffer() != null) {
        board.drawPiece(Number(x), Number(y), board.getBuffer(), $(this));
    }
});

$(document).on('click', `ul[data-role="piece"][data-player-id="${player1.getId()}"]`, function() {
    let pieceId = Number($(this).attr('data-piece-id'));
    let leftColor = $(this).attr('data-left-color');
    let rightColor = $(this).attr('data-right-color');
    let leftCell = new Cell(pieceId, 'left', leftColor, 0, 0, player1.getId());
    let rightCell = new Cell(pieceId, 'right', rightColor, 0, 0, player1.getId());
    let piece = new Piece(pieceId, leftColor, rightColor, [leftCell, rightCell], player1.getId());
    board.setBuffer(piece);
    replacePlayerPlace(piece.getId(), player1.getId());
})

$(document).on('click', `ul[data-role="piece"][data-player-id="${player2.getId()}"]`, function() {
    let pieceId = Number($(this).attr('data-piece-id'));
    let leftColor = $(this).attr('data-left-color');
    let rightColor = $(this).attr('data-right-color');
    let leftCell = new Cell(pieceId, 'left', leftColor, 0, 0, player2.getId());
    let rightCell = new Cell(pieceId, 'right', rightColor, 0, 0, player2.getId());
    let piece = new Piece(pieceId, leftColor, rightColor, [leftCell, rightCell], player2.getId());
    board.setBuffer(piece);
    replacePlayerPlace(piece.getId(), player2.getId());
})