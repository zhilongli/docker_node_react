import React, { Component } from "react";

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
        this.ctx.beginPath();
        this.ctx.arc(this.xPos, this.yPos, 7, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };

    comRule = (allBoids) => {
        var cgx = 0;
        var cgy = 0;
        // boids move towards the COM of the flock 
        for (let i = 0; i < allBoids.length; i++) {
            if (this.idx == allBoids[i].idx) {
                continue;
            };
            cgx += allBoids[i].xPos;
            cgy += allBoids[i].yPos;
        };
        cgx /= allBoids.length - 1;
        cgy /= allBoids.length - 1;
        this.xVel += cgx - this.xPos;
        this.yVel += cgy - this.yPos;
    };

    collisionRule = (allBoids) => {
        // boids avoid collision with others
        var xOffset = 0;
        var yOffset = 0;
        for (let i = 0; i < allBoids.length; i++) {
            const otherBoid = allBoids[i];
            if (this.idx == otherBoid.idx) {
                continue;
            };
            if (Math.sqrt((this.xPos - otherBoid.xPos) ^ 2 + (this.yPos - otherBoid.yPos) ^ 2) > 12) {
                continue;
            }
            xOffset -= this.xPos - allBoids[i].xPos;
            yOffset -= this.yPos - allBoids[i].yPos;
        };
        this.xVel += xOffset;
        this.yVel += yOffset;
    };

    velocityRule = (allBoids) => {
        // boids match velocity of others
        var xVelOffset = 0;
        var yVelOffset = 0;
        for (let i = 0; i < allBoids.length; i++) {
            const otherBoid = allBoids[i];
            if (this.idx == otherBoid.idx) {
                continue;
            };
            xVelOffset += otherBoid.xVel;
            yVelOffset += otherBoid.yVel;
        };
        xVelOffset /= allBoids.length - 1;
        yVelOffset /= allBoids.length - 1;
        this.xVel += xVelOffset/10;
        this.yVel += yVelOffset/10;
    };

};

class Boids {
    constructor() {
        this.allBoids = [];
        this.ctx = ctx;
        this.canvas = canvas;
    };

    update = () => {
        this.allBalls.forEach(this.updateBoid);
        this.ctx.fillStyle = 'rgba(1, 1, 1, 0.25)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.allBoids.length; i++) {
            this.allBoids[i].draw();
        }
        window.requestAnimationFrame(this.update)
    };

    updateBoid = (boid) => {
        boid.comRule(this.allBoids);
        boid.collisionRule(this.allBoids);
        boid.velocityRule(this.allBoids);
    };
}

