import React, { createRef, Component } from 'react';
import update from 'react-addons-update'; // ES6
import {sigmoid} from './Utils.js';

class Game extends Component
{
    width = 1000;
    height = 600;
    canvas = createRef();
    tileWidth = 50;
    speedStep = 0.01;
    state = {
        square: {
            x: 500,
            y: 300,
            accelX: 0,
            accelY: 0,
            deltaX: 0,
            deltaY: 0,
            towards: {
                x: 500,
                y: 300,
            }
        }
    }


    draw = (context) =>
    {
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(0, 0, this.width, this.height);
        context.lineWidth = 2;

        for (let i = 0; i <= this.height; i += this.tileWidth)
        {
            context.moveTo(0, i);
            context.lineTo(this.width, i)
        }
        context.stroke();

        for (let i = 0; i <= this.width; i += this.tileWidth)
        {
            context.moveTo(i, 0);
            context.lineTo(i, this.height)
        }
        context.stroke();

        context.fillStyle = "red";
        context.fillRect(this.state.square.x - this.tileWidth, this.state.square.y - this.tileWidth, this.tileWidth, this.tileWidth);
    }


    move = (event) =>
    {
        let say = this.state.square.accelY;
        let sax = this.state.square.accelX;
        let sty = this.state.square.towards.y;
        let stx = this.state.square.towards.x;
        if (this.state.square.x === this.state.square.towards.x && this.state.square.y === this.state.square.towards.y)
        {
            switch (event.keyCode)
            {
                case 40://up
                    if (this.state.square.towards.y < this.height - this.tileWidth)
                    {
                        sty += this.tileWidth;
                        say = this.tileWidth / 2;
                    }
                    break;
                case 38://down
                    if (this.state.square.towards.y > this.tileWidth)
                    {
                        sty -= this.tileWidth;
                        say = this.tileWidth / 2;
                    }
                    break;
                case 39://left
                    if (this.state.square.towards.x < this.width - this.tileWidth)
                    {
                        stx += this.tileWidth;
                        sax = this.tileWidth / 2;
                    }
                    break;
                case 37://right
                    if (this.state.square.towards.x > this.tileWidth)
                    {
                        stx -= this.tileWidth;
                        sax = this.tileWidth / 2;
                    }
                    break;
                default:
                    break;
            }
            this.setState({ square: update(this.state.square, { towards: { x: { $set: stx } } }) });// isn't there a shorter way to do this ???
            this.setState({ square: update(this.state.square, { towards: { y: { $set: sty } } }) });
            this.setState({ square: update(this.state.square, { accelX: { $set: sax } }) });
            this.setState({ square: update(this.state.square, { accelY: { $set: say } }) });

        }
    }

    updatesquareaccel = (step = 1) =>
    {//I am so fucking sorry for this
        let ssx = this.state.square.x;
        let sdx = this.state.square.deltaX;
        let sax = this.state.square.accelX;
        let sty = this.state.square.towards.y;
        let stx = this.state.square.towards.x;
        let ssy = this.state.square.y;
        let sdy = this.state.square.deltaY;
        let say = this.state.square.accelY;
        if (ssx !== stx)
        {
            let stepX = step;
            if (Math.abs(ssx - stx) < this.tileWidth / 2)
            {
                sax = 0;
            }
            this.setState({ square: update(this.state.square, { accelX: { $set: sax } }) });
            sax = this.state.square.accelX;
            if (sax > sdx)
            {
                sdx += stepX;
            }
            else
            {
                sdx -= stepX;
                if (sdx < 0)
                {
                    sdx = 0;
                }
            }

            if (ssx < stx)
            {
                if (ssx + sdx < stx && sdx > 0)
                {
                    ssx += sdx;
                }
                else
                {
                    ssx = stx;
                }
            }
            else if (ssx > stx)
            {
                if (ssx - sdx >= stx && sdx > 0)
                {
                    ssx -= sdx;
                }
                else
                {
                    ssx = stx;
                }
            }

            this.setState({ square: update(this.state.square, { x: { $set: ssx } }) });
            ssx = this.state.square.x;
            if (ssx === stx)
            {
                sax = 0;
                sdx = 0;
            }
            this.setState({ square: update(this.state.square, { accelX: { $set: sax } }) });
            this.setState({ square: update(this.state.square, { deltaX: { $set: sdx } }) });
        }

        // Y axis
        if (ssy !== sty)
        {
            let stepY = step;
            if (Math.abs(ssy - sty) < this.tileWidth / 2)
            {
                say = 0;
            }
            this.setState({ square: update(this.state.square, { accelY: { $set: say } }) });
            say = this.state.square.accelY;
            if (say > sdy)
            {
                sdy += stepY;
            }
            else
            {
                sdy -= stepY;
                if (sdy < 0)
                {
                    sdy = 0;
                }
            }

            if (ssy < sty)
            {
                if (ssy + sdy < sty && sdy > 0)
                {
                    ssy += sdy;
                }
                else
                {
                    ssy = sty;
                }
            }
            else if (ssy > sty)
            {
                if (ssy - sdy >= sty && sdy > 0)
                {
                    ssy -= sdy;
                }
                else
                {
                    ssy = sty;
                }
            }

            this.setState({ square: update(this.state.square, { y: { $set: ssy } }) });
            ssy = this.state.square.y;
            if (ssy === sty)
            {
                say = 0;
                sdy = 0;
            }
            this.setState({ square: update(this.state.square, { accelY: { $set: say } }) });
            this.setState({ square: update(this.state.square, { deltaY: { $set: sdy } }) });
        }

    }

    update = () =>
    {
        this.updatesquareaccel(this.speedStep);
    }

    componentDidMount()
    {
        document.addEventListener("keydown", this.move, true);
        const context = this.canvas.current.getContext("2d");
        // this.update();
        // this.draw(context);
        setInterval(() =>
        {
            this.update();
            this.draw(context);
        }, 1000 / 60);
    }

    componentDidUpdate()//not really sure what I'll put there yet
    {
    };

    render()
    {
        return (
            <div>
                <canvas ref={this.canvas} width={this.width} height={this.height} />
            </div>
        )
    }
}

export default Game;