import React, { useEffect } from "react";
import { Slider, Switch } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const allColors = ['AliceBlue', 'Aqua', 'Aquamarine', 'Beige',
    'Brown', 'HotPink', 'Lavender'];

class Boid {
    constructor(xPos, yPos, ctx, idx) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = 0;
        this.yVel = 0;
        this.color = allColors[Math.floor(Math.random() * allColors.length)];
        this.ctx = ctx;
        this.idx = idx; //to keep track of distinct boids in the array
    };

    draw = () => {
        // console.log('drawing!')
        this.xPos += this.xVel;
        this.yPos += this.yVel;
        this.ctx.beginPath();
        this.ctx.arc(this.xPos, this.yPos, 7, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };

    comRule = (allBoids, simSpeed, cohesion) => {
        var cgx = 0;
        var cgy = 0;
        const simSpeedScaled = Math.pow(10, simSpeed);
        const comScaled = Math.pow(10, cohesion)
        // boids move towards the COM of the flock 
        if (allBoids.length === 1) {
            return;
        }
        for (let i = 0; i < allBoids.length; i++) {
            if (this.idx === allBoids[i].idx) {
                continue;
            };
            cgx += allBoids[i].xPos;
            cgy += allBoids[i].yPos;
        };
        cgx = cgx / (allBoids.length - 1);
        cgy = cgy / (allBoids.length - 1);
        this.xVel += (cgx - this.xPos) / 100 * simSpeedScaled * comScaled;
        this.yVel += (cgy - this.yPos) / 100 * simSpeedScaled * comScaled;
        // console.log('after comRule: ', this.xVel)
    };

    collisionRule = (allBoids, simSpeed, repulsion) => {
        // boids avoid collision with others
        var xOffset = 0;
        var yOffset = 0;
        const simSpeedScaled = Math.pow(10, simSpeed);
        const repScale = Math.pow(10, repulsion);
        if (allBoids.length === 1) {
            return;
        }
        for (let i = 0; i < allBoids.length; i++) {
            const otherBoid = allBoids[i];
            if (this.idx === otherBoid.idx) {
                continue;
            };
            if (Math.sqrt(Math.pow((this.xPos - otherBoid.xPos), 2) + Math.pow((this.yPos - otherBoid.yPos), 2)) < 50) {
                const dist = Math.sqrt(Math.pow((this.xPos - otherBoid.xPos), 2) + Math.pow((this.yPos - otherBoid.yPos), 2));
                xOffset -= (this.xPos - allBoids[i].xPos) / Math.pow((dist + 1), 1);
                yOffset -= (this.yPos - allBoids[i].yPos) / Math.pow((dist + 1), 1);
                // console.log('xOffset, yOffset: ', xOffset, yOffset)
            }

        };
        this.xVel -= xOffset / 3 * simSpeedScaled * repScale;
        this.yVel -= yOffset / 3 * simSpeedScaled * repScale;
        // console.log('after collisionRule: ', this.xVel)

    };

    velocityRule = (allBoids, simSpeed, velSim) => {
        // boids match velocity of others
        var xVelOffset = 0;
        var yVelOffset = 0;
        const simSpeedScaled = Math.pow(10, simSpeed);
        const velScale = Math.pow(10, velSim)
        if (allBoids.length === 1) {
            return;
        }
        for (let i = 0; i < allBoids.length; i++) {
            const otherBoid = allBoids[i];
            if (this.idx === otherBoid.idx) {
                continue;
            };
            xVelOffset += otherBoid.xVel;
            yVelOffset += otherBoid.yVel;
        };
        xVelOffset /= allBoids.length - 1;
        yVelOffset /= allBoids.length - 1;
        this.xVel += (xVelOffset - this.xVel / 2.2) / 100 * simSpeedScaled * velScale;
        this.yVel += (yVelOffset - this.yVel / 2.2) / 100 * simSpeedScaled * velScale;
        // console.log('after velocityRule: ', this.xVel)
    };

    // checkBorders = (canvWidth, canvHeight) => { //should use a inverse square force law
    //     var xDisp = 0;
    //     var yDisp = 0;
    //     if (this.xPos<50 || canvWidth-this.xPos<50) {

    //     };

    //     if (this.yPos<50 || canvHeight-this.yPos<50){

    //     };
    // };
    followMouse = (mouseX, mouseY) => {
        this.xVel += (mouseX - this.xPos) / 1000 - this.xVel / 25;
        this.yVel += (mouseY - this.yPos) / 1000 - this.yVel / 25;
    };

};

class Boids {
    constructor(ctx, canvas, speed, mouseX, mouseY, cohesion, repulsion, velSim) {
        this.allBoids = [];
        this.ctx = ctx;
        this.canvas = canvas;
        this.speed = speed;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.cohesion = cohesion;
        this.repulsion = repulsion;
        this.velSim = velSim;
    };

    update = () => {
        this.allBoids.forEach(this.updateBoid);
        this.ctx.fillStyle = 'rgba(1, 1, 1, 0.25)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.allBoids.length; i++) {
            this.allBoids[i].draw();
        }
        window.requestAnimationFrame(this.update)
    };

    updateBoid = (boid) => {
        boid.comRule(this.allBoids, this.speed, this.cohesion);
        boid.collisionRule(this.allBoids, this.speed, this.repulsion);
        boid.velocityRule(this.allBoids, this.speed, this.velSim);
        boid.followMouse(this.mouseX, this.mouseY);
    };
}

// define functional component for the canvas
function BoidsCanvas() {

    const canvasRef = React.createRef();
    var canvas = null;
    var ctx = null;
    var counter = 0;
    var simSpeed = 0;
    var cohesion = 0;
    var repulsion = 0;
    var velSim = 0;
    var mouseX = 0;
    var mouseY = 0;
    var boids = new Boids(null, null, simSpeed, mouseX, mouseY, cohesion, repulsion, velSim);


    // const [counter, setCount] = useState(0);

    useEffect(() => { //want to control this to only run on didMount and not didUpdate
        canvas = canvasRef.current;
        ctx = canvas.getContext('2d');
        boids.canvas = canvas;
        boids.ctx = ctx;
        boids.update();
    }, []);

    function clickHandler(ev) {
        console.log(canvas)
        counter += 1;
        const rect = canvas.getBoundingClientRect();
        const xPos = ev.clientX - rect.left;
        const yPos = ev.clientY - rect.top;
        let boid = new Boid(xPos, yPos, ctx, counter);
        boids.allBoids.push(boid);
        console.log('all boids now: ', boids.allBoids)
    };

    function speedHandler(ev, val) {
        boids.speed = val;
    };

    function cohesionHandler(ev, val) {
        boids.cohesion = val;
    };

    function repulsionHandler(ev, val) {
        boids.repulsion = val;
    };

    function velHandler(ev, val) {
        boids.velSim = val
    };

    function mousePosUpdate(ev) {
        const rect = canvas.getBoundingClientRect();
        boids.mouseX = ev.clientX - rect.left;
        boids.mouseY = ev.clientY - rect.top;
    };

    function switchChange(ev){
        
    };

    return (
        <div className="BubbleCanvas">
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={ev => clickHandler(ev)}
                onMouseMove={ev => mousePosUpdate(ev)}
            />
            <Typography id="mouse-switch" gutterBottom>
                Toggle follow mouse
                </Typography>
            <Switch
                checked={true}
                onChange={switchChange}
                name="Mouse switch"
                color="primary"
            />
            <Typography id="speed-slider" gutterBottom>
                Simulation Speed
                </Typography>
            <Slider
                aria-labelledby="speed-slider"
                defaultValue={simSpeed}
                step={0.01}
                max={2}
                min={-2}
                valueLabelDisplay="auto"
                onChange={speedHandler}
            />
            <Typography id="cohesive-slider" gutterBottom>
                Flock Cohesiveness
                </Typography>
            <Slider
                aria-labelledby="cohesive-slider"
                defaultValue={cohesion}
                step={0.01}
                max={2}
                min={-2}
                onChange={cohesionHandler}
            />
            <Typography id="repulsive-slider" gutterBottom>
                Mutual Repulsion
                </Typography>
            <Slider
                aria-labelledby="repulsive-slider"
                defaultValue={repulsion}
                step={0.01}
                max={2}
                min={-2}
                onChange={repulsionHandler}
            />
            <Typography id="sim-slider" gutterBottom>
                Speed Similarity
                </Typography>
            <Slider
                aria-labelledby="sim-slider"
                defaultValue={velSim}
                step={0.01}
                max={2}
                min={-2}
                onChange={velHandler}
            />
        </div>
    );
}

export default BoidsCanvas;