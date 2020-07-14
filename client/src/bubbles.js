import React, { Component } from "react"



class Ball {
    constructor(xPos, yPos, rad, ctx, canvas) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.rad = rad;
        this.grav = 0.1;
        this.vy = 0.1;
        this.vx = 0.1;
        this.rest = 0.9;
        this.ctx = ctx;
        // this.ctx.globalCompositeOperation = 'copy'
        this.canvas = canvas;
        console.log("CREATING BALL: ", this.canvas);
    }


    animate = () => {
        // setInterval(this.update, 1000 / 60);
        window.requestAnimationFrame(this.update)
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
        this.ctx.clearRect(this.xPos-1.5*this.rad, this.yPos-1.5*this.rad, 3*this.rad, 3*this.rad);
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
        var ball = new Ball(xPos, yPos, 10, this.ctx, this.canvas);
        window.requestAnimationFrame(ball.update)
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
            </div>
        );
    };
}

export default BubbleCanvas
