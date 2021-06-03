// CONSTANTS
GOAL_WIDTH = 20;
GOAL_HEIGHT = 20;

class Goal {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.color = "#FF9000"
        this.width = GOAL_WIDTH;
        this.height = GOAL_HEIGHT;
    }

    // Draws the goal
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}