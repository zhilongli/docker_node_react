import React, { Component } from "react"
import pacific from './pacific.jpg'

let start = {x:0, y:0};
let end = {x:0, y:0};
var rect;

class DrawCanvas extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.imgRef = React.createRef();
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.mousedown = Boolean(false);
    }

    
    handleMouseMove(event) {
        rect = this.canvas.getBoundingClientRect();
        this.ctx.strokeStyle = '#BADA55'
        this.setState({
            x: event.nativeEvent.offsetX,
            y: event.nativeEvent.offsetY
        });
        if (this.mousedown){
            start = {
                x: end.x,
                y: end.y
            };
            end = {
                x: event.clientX-rect.left,
                y: event.clientY-rect.top
            };
            this.ctx.beginPath();
            this.ctx.moveTo(start.x, start.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d")
    };

    handleMouseDown(event){
        this.mousedown = true;
        start = {
            x: event.clientX-rect.left,
            y: event.clientX-rect.top
        };
        end = {
            x: event.clientX-rect.left,
            y: event.clientY-rect.top
        };
    }

    handleMouseUp(){
        this.mousedown = false;
    }


    render() {
        return (
            <div className="DrawCanvas">
                <canvas
                    ref={this.canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                />
                <img ref={this.imgRef} src={pacific} width={600} height={400} />
            </div>
        );
    }
}

export default DrawCanvas;