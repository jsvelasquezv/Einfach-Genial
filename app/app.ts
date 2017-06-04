import * as $ from "jquery";

let buffer = [];
let images: { [key: string]: string} = {};
let directions: { [key: string]: Array<number>} = {};
let board: { [key: string]: Array<number>};

directions['NO'] = [0,-1];
directions['O'] = [-1,0];
directions['SO'] = [-1,1];
directions['NE'] = [1,-1];
directions['E'] = [1,0];
directions['SE'] = [0,1];

images['red'] = 'assets/img/rojo.png';
images['green'] = 'assets/img/verde.png';
images['violet'] = 'assets/img/morado.png';
images['blue'] = 'assets/img/azul.png';
images['yellow'] = 'assets/img/amarillo.png';
images['orange'] = 'assets/img/naranja.png';

function neighbor(direction: string, piece: Array<number>): boolean {
    let neighbor = false;
    let dir = directions[direction];
    let tempHex = [piece[0] + dir[0], piece[1] + dir[1]];
    if(piece == tempHex) {
        neighbor = true;
    }
    return neighbor;
}

function canPlace(piece, x: number, y: number): boolean {
    let canPlace = false;
    if(piece.type == 'right') {
        console.log('right');
        for(let key in directions) {
            let direction = directions[key];
            let tempPiece = getPiece(x + direction[0], y + direction[1]);
            // console.log(tempPiece);
            if(tempPiece.pieceId == piece.pieceId) {
                canPlace = true;
                break;
            }
        }
    } else if(piece.type == 'left') {
        canPlace = true;
    }
    return canPlace;
}

function getPiece(x: number, y: number) {
    // let selector = 
    // let domElement = $(selector);
    let piece = {
        'pieceId': $(`img[data-coord-x="${x}"][data-coord-y="${y}"]`).attr('data-piece-id')
    }
    // console.log(`td[data-coord-x="${x}"][data-coord-y="${y}"]`);
    // console.log($(`td[data-coord-x="${x}"][data-coord-y="${y}"]`));
    console.log(piece);
    return piece;
}

$(document).on('click', 'img[data-role="board-cell"]', function() {
    let x = $(this).attr('data-coord-x');
    let y = $(this).attr('data-coord-y');
    if(buffer.length > 0) {
        let piece = buffer[0];
        let imageSrc = images[piece.color];
        if(canPlace(piece, Number(x), Number(y))) {
            $(this).attr('src', imageSrc);
            $(this).attr('data-piece-id', piece.pieceId);
            $(this).attr('data-color', piece.color);
            buffer.shift();
        }
    }
});

$(document).on('click', 'ul[data-role="piece"]', function() {
    let pieceId = $(this).attr('data-piece-id');
    let leftPiece = {
        'pieceId': pieceId,
        'type': 'left',
        'color': $(this).attr('data-left-color')
    };
    let rightPiece = {
        'pieceId': pieceId,
        'type': 'right',
        'color': $(this).attr('data-right-color')
    }
    buffer = [leftPiece, rightPiece];
    console.log(buffer);
})