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
let turno = player1.getId();
let initialPieces1 = dealFirstPieces(player1.getId());
let initialPieces2 = dealFirstPieces(player2.getId());
let clicks = 0;
$(document).ready(function() {
    placePlayerPieces(initialPieces1, "1");
    placePlayerPieces(initialPieces2, "2");
    player1.showScores();
    player2.showScores();
});

$(document).keypress(function(event) {
    if (event.which == 13) {
        // let moves = board.getAllMoves(initialPieces2[0]);
        // console.log(moves);
        let move = board.getBestMove(initialPieces2);
        let left = move[0];
        let leftX = left[0];
        let leftY = left[1];
        let leftCell = left[2];
        let leftDomElement = $(`img[data-role="board-cell"][data-coord-x="${leftX}"][data-coord-y="${leftY}"]`);
        board.drawCell(leftX, leftY, leftCell, leftDomElement);
        let right = move[1];
        let rightX = right[0];
        let rightY = right[1];
        let rightCell = right[2];
        let rightDomElement = $(`img[data-role="board-cell"][data-coord-x="${rightX}"][data-coord-y="${rightY}"]`);
        board.drawCell(rightX, rightY, leftCell, rightDomElement);
        // console.log(Math.max.apply(Math,moves.map(function(o){return o[2];})));
    };
}) ;

function juegaPc() {
    let move = board.getBestMove(initialPieces2);
    let left = move[0];
    let leftX = left[0];
    let leftY = left[1];
    let leftCell = left[2];
    let leftDomElement = $(`img[data-role="board-cell"][data-coord-x="${leftX}"][data-coord-y="${leftY}"]`);
    board.drawCell(leftX, leftY, leftCell, leftDomElement);
    let score = board.calculateCellScore(Number(leftX), Number(leftY));
    updatePlayerScore(turno, score['color'], score['score']);
    let right = move[1];
    let rightX = right[0];
    let rightY = right[1];
    let rightCell = right[2];
    let rightDomElement = $(`img[data-role="board-cell"][data-coord-x="${rightX}"][data-coord-y="${rightY}"]`);
    board.drawCell(rightX, rightY, leftCell, rightDomElement);
    turno = player2.getId();
    score = board.calculateCellScore(Number(rightX), Number(rightY));
    updatePlayerScore(turno, score['color'], score['score']);
    replacePlayerPlace(leftCell.getPieceId(), player2.getId());
}

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

function updatePlayerScore(playerId: string, color: string, score: number) {
    if(player1.getId() == playerId) {
        player1.updateScore(score, color);
    }

    if(player2.getId() == playerId) {
        player2.updateScore(score, color);
    }
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
        let score = board.calculateCellScore(Number(x), Number(y));
        updatePlayerScore(turno, score['color'], score['score']);
    }
    clicks ++;
    if(clicks == 2) {
        juegaPc();    
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
    turno = player1.getId();
    clicks = 0;
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
    turno = player2.getId();
})

// let minimax = function (depth, game, isMaximisingPlayer) {
//     if (depth === 0) {
//         return -evaluateBoard(game.board());
//     }
//     var newGameMoves = game.ugly_moves();
//     if (isMaximisingPlayer) {
//         var bestMove = -9999;
//         for (var i = 0; i < newGameMoves.length; i++) {
//             game.ugly_move(newGameMoves[i]);
//             bestMove = Math.max(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
//             game.undo();
//         }
//         return bestMove;
//     } else {
//         var bestMove = 9999;
//         for (var i = 0; i < newGameMoves.length; i++) {
//             game.ugly_move(newGameMoves[i]);
//             bestMove = Math.min(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
//             game.undo();
//         }
//         return bestMove;
//     }
// };