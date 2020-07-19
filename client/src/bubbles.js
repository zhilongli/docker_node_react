import React, { Component } from "react";
import { Slider } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Ball {
    constructor(xPos, yPos, rad, gravity, ctx, canvas) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.rad = rad;
        this.grav = gravity;
        this.vy = 0;
        this.vx = 0;
        this.rest = 0.9;
        console.log("CREATING BALL: ", xPos, yPos);
        this.ctx = ctx;
        this.canvas = canvas;
        this.color = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';

    }

}

class Balls {
    constructor(ctx, canvas) {
        this.allBalls = [];
        this.ctx = ctx;
        // this.ctx.globalCompositeOperation = 'copy'
        this.canvas = canvas;
    }


    updateBall = (ball) => {
        ball.vy += ball.grav;
        ball.xPos += ball.vx;
        ball.yPos += ball.vy;
        if (ball.yPos > this.canvas.height - ball.rad) {
            ball.yPos = this.canvas.height - ball.rad;
            ball.vy *= -ball.rest;
        }
    }

    update = () => {
        this.allBalls.forEach(this.updateBall);
        this.ctx.fillStyle = 'rgba(1, 1, 1, 0.25)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.allBalls.forEach(this.drawBall);
        window.requestAnimationFrame(this.update)

    }

    drawBall = (ball) => {
        // this.ctx.clearRect(this.xPos - 2 * this.rad, this.yPos - 2 * this.rad, 4 * this.rad, 4 * this.rad);
        this.ctx.beginPath();
        this.ctx.arc(ball.xPos, ball.yPos, ball.rad, 0, Math.PI * 2, true);
        this.ctx.closePath();
        // this.ctx.fillStyle = 'Tomato'
        this.ctx.fillStyle = ball.color;
        this.ctx.fill();
    }

}

class BubbleCanvas extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.drawCircle = this.drawCircle.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.gravity = 0.5
    };

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d")
        this.balls = new Balls(this.ctx, this.canvas);
        // this.ctx.globalCompositeOperation = 'copy'
        this.balls.update();

    };

    drawCircle(radius, ev) {
        console.log('mouse clicked: ', ev.clientX, ev.clientY)
        const rect = this.canvas.getBoundingClientRect();
        const xPos = ev.clientX - rect.left;
        const yPos = ev.clientY - rect.top;
        const dx = 1;
        const dy = 1;
        this.ctx.beginPath();
        this.ctx.arc(xPos, yPos, radius, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.fill();

    };

    clickHandler(ev) {
        const rect = this.canvas.getBoundingClientRect();
        const xPos = ev.clientX - rect.left;
        const yPos = ev.clientY - rect.top;
        let ball = new Ball(xPos, yPos, 10, this.gravity, this.ctx, this.canvas);
        this.balls.allBalls.push(ball);
        console.log('all balls now: ', this.balls.allBalls)
        // this.balls.update();
        // window.requestAnimationFrame(this.balls.update)
    };

    gravSlider = (event, value) => {
        console.log("new gravity is ", value)
        this.gravity = value;
    };



    render() {
        return (
            <div className="BubbleCanvas">
                <canvas
                    ref={this.canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onClick={ev => this.clickHandler(ev)}
                />
                <Typography id="continuous-slider" gutterBottom>
                    Gravity
                </Typography>
                <Slider
                    aria-labelledby="continuous-slider"
                    defaultValue={0.5}
                    step={0.01}
                    max={1}
                    min={0}
                    valueLabelDisplay="on"
                    onChange={this.gravSlider}
                />
            </div>
        );
    };
}

export default BubbleCanvas
