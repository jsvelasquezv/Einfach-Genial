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
            $(`span[data-player-id="${this.id}"][data-role="score"][data-color="${key}"]`).text(score);
        }
    }

    public setScore(score: number, color: string) {
        this.scores[color] = score;
    }

    public getScore(color: string) {
        return this.scores[color];
    }

    public updateScore(score: number, color: string) {
        let playerScore = this.scores[color] += score;
        $(`span[data-player-id="${this.id}"][data-role="score"][data-color="${color}"]`).text(playerScore);        
    }

    public setId(id: string) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }
}

export { Player }