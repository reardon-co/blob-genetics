// CONSTANTS
const BLOBS = 50;
const MUTATION_RATE = 0.02;

// Global Vars
var blobList = []
var generation = 0;

// Starting the experiment
function start() {
    var canvas = document.getElementById("experiment");
    var ctx = canvas.getContext("2d");

    var bg = document.getElementById("bg");
    var height = bg.offsetHeight * 0.75;
    var width = bg.offsetWidth * 0.75;

    canvas.style.height = height + "px";
    canvas.style.width = width + "px";

    var scale = window.devicePixelRatio;
    canvas.width = width * scale;
    canvas.height = height * scale;
    
    ctx.scale(scale, scale);

    for (i = 0; i < BLOBS; i++) {
        var blob = new Blob((canvas.width / 2) * 0.1, (canvas.height / 2) * 0.5, ctx);
        blob.createGenes();
        blobList.push(blob);
    }

    animate();
}

function animate() {
    var canvas = document.getElementById("experiment");
    var ctx = canvas.getContext("2d");

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (i = 0; i < BLOBS; i++) {
        var blob = blobList[i];
        blob.update();
        blob.draw();
    }

    var goal = new Goal((canvas.width / 2) * 0.9, (canvas.height / 2) * 0.5, ctx);
    goal.draw();

    if (blobList[0].index == blob.genes.length) {
        nextGeneration(goal);
    }
}

function nextGeneration(goal) {
    generation++;
    console.log("Generation: " + generation);

    var canvas = document.getElementById("experiment");
    var ctx = canvas.getContext("2d");

    var lottery=[]
    var totalFitness = 0;
    for(let i = 0; i < BLOBS; i++) {
        var blob = blobList[i];
        blob.findFitness(goal, canvas);
        totalFitness += blob.fitness;

        // The more fit the blob is, the more of the blob will be added to the lottery
        for (let j = 0; j < (Math.floor(blob.fitness * 100)); j++) {
            lottery.push(blob)
        }
    }
    var averageFitness = totalFitness / BLOBS;

    // Printing stats
    console.log("Total fitness: " + totalFitness);
    console.log("Average fitness: " + averageFitness);


    // Breeding
    var blobChildren = [];
    for (let i = 0; i < BLOBS; i++) {
        var father = lottery[Math.floor(Math.random() * lottery.length)];
        var mother = lottery[Math.floor(Math.random() * lottery.length)];
        var child = new Blob((canvas.width / 2) * 0.1, (canvas.height / 2) * 0.5, ctx);
        child.createGenes();

        for (let j = 0; j < child.genes.length; j++) {
            if (Math.random() < MUTATION_RATE) {
                child.genes[j] = [Math.random() - 0.5, Math.random() - 0.5];
            }
            else if (j % 2 == 0) {
                child.genes[j] = father.genes[j];
            }
            else {
                child.genes[j] = mother.genes[j];
            }
        }

        blobChildren.push(child)
    }

    blobList = blobChildren;
}


start();
