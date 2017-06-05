/**
 * Cell
 */
class Cell {

    private pieceId: number;
    private type: string;
    private color: string;
    private coordX: number;
    private coordY: number;
    private player: string;

    constructor(pieceId, type, color, coordX, coordY, player) {
        this.pieceId = pieceId;
        this.type = type;
        this.color = color;
        this.coordX = coordX;
        this.coordY = coordY;
        this.player = player;
    }

    public getPieceId() {
        return this.pieceId;
    }

    public getType() {
        return this.type;
    }

    public setColor(color: string) {
        this.color = color;
    }

    public getColor(): string {
        return this.color;
    }

    public setCoordX(x: number) {
        this.coordX = x;
    }

    public setCoordY(y: number) {
        this.coordY = y;
    }

    public setCoords(x: number, y: number) {
        this.coordX = x;
        this.coordY = y;
    }

    public getCoordX(): number {
        return this.coordX;
    }

    public getCoordY(): number {
        return this.coordY;
    }

    public getCoords(): Array<number> {
        return [this.coordX, this.coordY];
    }
}

export { Cell }