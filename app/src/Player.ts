import * as $ from "jquery";
/**
 * Player
 */
class Player {

    private id: string;
    private scores: { [key: string]: number } = {};

    constructor(id: string) {
        this.id = id;
        this.scores["red"] = 0;
        this.scores["green"] = 0;
        this.scores["violet"] = 0;
        this.scores["blue"] = 0;
        this.scores["yellow"] = 0;
        this.scores["orange"] = 0;
    }

    public showScores() {
        for (let key in this.scores) {
            let score = this.scores[key];
            let domElement = $(`span[data-player-id="${this.id}"][data-role="score"][data-color="${key}"]`);
            console.log($(domElement));
        }
    }

    public setScore(score: number, color: string) {
        this.scores[color] = score;
    }

    public getScore(color: string) {
        return this.scores[color];
    }
}

export { Player }