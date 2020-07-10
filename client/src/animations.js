import React, { Component } from "react"
import logo from './logo.svg';
import pacific from './pacific.jpg'


class Canvas extends Component {
    
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.imgRef = React.createRef();
    }

    componentDidMount() {
        console.log("canvas component mounted")
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext("2d")
        const img = this.imgRef.current
    };


    render() {
        console.log("Rendering canvas page")
        return (
            <div className="Canvas">
                <canvas ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight}/>
                <img ref={this.imgRef} src={pacific} width={600} height={400}/>               
            </div>
        );
    }
}

export default Canvas;