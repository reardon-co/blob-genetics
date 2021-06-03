// CONSTANTS
const GENE_COUNT = 200;
const VELOCITY = 20;

// Represents a blob in the experiment
class Blob {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.radius = 5;
        this.color = "#774C60";
        this.index = 0;
    }

    // Draws the circle onto the canvas
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI), false;
        this.ctx.fillStyle = this.color;
        this.ctx.fill()
    }

    // Setting genes that are already created
    setGenes(genes) {
        this.genes = genes;
    }

    // Creating genes randomly
    // Genes, in this case, are x, y vectors to determine where the blob will travel
    createGenes() {
        this.genes = []
        for (let i = 0; i < GENE_COUNT; i++) {
            this.genes[i] = [Math.random() - 0.5, Math.random() - 0.5];
        }
    }

    // Finds the fitness, meaning how far a blob is from the goal
    // Number between 0 and 1, representing the percent of the way to the goal they got
    findFitness(goal, canvas) {
        var distance = Math.abs(Math.sqrt((goal.x - this.x) ** 2 + (goal.y - this.y) ** 2));
        this.fitness = Math.max(0, 1 - distance / canvas.height / 2);
    }

    // Updates the state of the blob, checking if the blob is done, or if not moves it
    update() {
        this.x += VELOCITY * this.genes[this.index][0];
        this.y += VELOCITY * this.genes[this.index][1];
        this.index++;
    }
}