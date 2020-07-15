import React, { Component } from "react";
import { Slider } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class Ball {
    constructor(xPos, yPos, rad, ctx, canvas, gravity) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.rad = rad;
        this.grav = gravity;
        this.vy = 0.1;
        this.vx = 0.1;
        this.rest = 0.9;
        this.ctx = ctx;
        // this.ctx.globalCompositeOperation = 'copy'
        this.canvas = canvas;
        console.log("CREATING BALL: ", this.canvas);
    }


    update = () => {
        this.vy += this.grav;
        this.xPos += this.vx;
        this.yPos += this.vy;
        if (this.yPos > this.canvas.height - this.rad) {
            this.yPos = this.canvas.height - this.rad;
            this.vy *= -this.rest;
        }
        this.drawBall();
        window.requestAnimationFrame(this.update)
    }

    drawBall = () => {
        this.ctx.clearRect(this.xPos - 2 * this.rad, this.yPos - 2 * this.rad, 4 * this.rad, 4 * this.rad);
        this.ctx.beginPath();
        this.ctx.arc(this.xPos, this.yPos, this.rad, 0, Math.PI * 2, true);
        this.ctx.closePath();
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
        // this.ctx.globalCompositeOperation = 'copy'
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
        var ball = new Ball(xPos, yPos, 10, this.ctx, this.canvas, this.gravity);
        window.requestAnimationFrame(ball.update)
    };

    gravSlider = (event, value) => {
        console.log("new gravity is ", value)
        this.gravity = value;
    };



    render() {
        // const [value, setValue] = React.useState(30);

        // const handleChange = (event, newValue) => {
        //   setValue(newValue);
        // };
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
