import React, {useEffect, useRef} from 'react';

function Game(props)
{
    const width = 1800;
    const height = 850;
    const canvas = useRef();
    const tileWidth = 50;
    const speedStep = 1;
    const state = {
        square: {
            x : 500,
            y: 300,
            accelX : 0,
            accelY : 0,
            deltaX : 0,
            deltaY : 0,
            towards : {
                x : 500,
                y : 300,
            }
        }
    }

    const draw = (context) => {
        context.beginPath();
        context.fillStyle= "white";
        context.fillRect(0, 0, width, height);
        context.lineWidth = 2;

        for (let i = 0; i<=height; i+=tileWidth)
        {
            context.moveTo(0, i);
            context.lineTo(width, i)
        }
        context.stroke();

        for (let i = 0; i<=width; i+=tileWidth)
        {
            context.moveTo(i, 0);
            context.lineTo(i, height)
        }
        context.stroke();
        
        context.fillStyle= "red";
        context.fillRect(state.square.x-tileWidth, state.square.y-tileWidth, tileWidth, tileWidth);
    }


    const move = (event) =>
    {
        if (state.square.x === state.square.towards.x && state.square.y === state.square.towards.y)
        {
            switch (event.keyCode)
            {
                case 40://up
                    if (state.square.towards.y < height-tileWidth)
                        state.square.towards.y += tileWidth;
                        state.square.accelY = tileWidth/2;
                    break;
                case 38://down
                    if (state.square.towards.y > tileWidth)
                        state.square.towards.y -= tileWidth;
                        state.square.accelY = tileWidth/2;
                    break;
                case 39://left
                    if (state.square.towards.x < width-tileWidth)
                        state.square.towards.x += tileWidth;
                        state.square.accelX = tileWidth/2;
                    break;
                case 37://right
                    if (state.square.towards.x > tileWidth)
                        state.square.towards.x -= tileWidth;
                        state.square.accelX = tileWidth/2;
                    break;
                default:
                    break;
            }
        }
    }

    const updatesquareaccel = (step=1) => 
    {
        if (state.square.x !== state.square.towards.x)
        {
            let stepX = step;
            if (Math.abs(state.square.x  - state.square.towards.x) < tileWidth/2)
            {
                state.square.accelX = 0;
            }
            if (state.square.accelX > state.square.deltaX)
            {
                state.square.deltaX += stepX;
            }
            else
            {
                state.square.deltaX -= stepX;
                if (state.square.deltaX < 0)
                    state.square.deltaX = 0;
            }

            if (state.square.x < state.square.towards.x)
            {
                if (state.square.x + state.square.deltaX < state.square.towards.x && state.square.deltaX > 0)
                {
                    state.square.x += state.square.deltaX;
                }
                else
                {
                    state.square.x = state.square.towards.x;
                }
            }
            else if (state.square.x > state.square.towards.x)
            {
                
                if (state.square.x - state.square.deltaX >= state.square.towards.x && state.square.deltaX > 0)
                {
                    state.square.x -= state.square.deltaX;
                }
                else
                {
                    state.square.x = state.square.towards.x;
                }
            }
            
            if (state.square.x === state.square.towards.x)
            {
                state.square.accelX = 0;
                state.square.deltaX = 0;
            }
        }
        if(state.square.y !== state.square.towards.y)
        {
            let stepY = step;
            if (Math.abs(state.square.y - state.square.towards.y) < tileWidth/2)
            {
                state.square.accelY = 0;
            }
            if (state.square.accelY > state.square.deltaY)
            {
                state.square.deltaY += stepY;
            }
            else
            {
                state.square.deltaY -= stepY;
                if (state.square.deltaY < 0)
                    state.square.deltaY = 0;
            }

            if (state.square.y < state.square.towards.y)
            {
                if (state.square.y + state.square.deltaY < state.square.towards.y && state.square.deltaY > 0)
                {
                    state.square.y += state.square.deltaY;
                }
                else
                {
                    state.square.y = state.square.towards.y;
                }
            }
            else if (state.square.y > state.square.towards.y)
            {
                if (state.square.y - state.square.deltaY > state.square.towards.y && state.square.deltaY > 0)
                {
                    state.square.y -= state.square.deltaY;
                }
                else
                {
                    state.square.y = state.square.towards.y;
                }
            }
            
            if (state.square.y === state.square.towards.y)
            {
                state.square.accelY = 0;
                state.square.deltaY = 0;
            }
        }
        
    }

    const update = () => 
    {
        updatesquareaccel(speedStep);
    }

    useEffect(() =>
    {
        document.addEventListener("keydown", move, true);
        const context = canvas.current.getContext("2d");
        setInterval(() => {
            update();
            draw(context);
        }, 1000/60);
    });


    return (
        <div>
            <canvas ref={canvas} width={width} height={height}/>
        </div>
    )
}

export default Game;