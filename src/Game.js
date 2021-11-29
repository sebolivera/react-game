import React, {useEffect, useRef} from 'react';

function Game(props)
{
    const width = 1800;
    const height = 650;
    const canvas = useRef();
    const tilewidth = 50;
    const stepspeed = 5;
    const state = {
        gravity: 0.8,
        ball: {
            x : 500,
            y: 300,
            velocityX : 0,
            velocityY : 0,
            deltaX : 0,
            deltaY : 0,
            radius:20,
            towards : {
                x : 500,
                y : 300,
            }
        }
    }

    const draw = (context) => {
        context.fillStyle= "white";
        context.fillRect(0, 0, width, height);
        context.lineWidth = 2;

        for (let i = 0; i<=height; i+=tilewidth)
        {
            context.moveTo(0, i);
            context.lineTo(width, i)
        }
        context.stroke();

        for (let i = 0; i<=width; i+=tilewidth)
        {
            context.moveTo(i, 0);
            context.lineTo(i, height)
        }
        context.stroke();
        
        context.fillStyle= "red";
        context.fillRect(state.ball.x-tilewidth, state.ball.y-tilewidth, tilewidth, tilewidth);
    }


    const move = (event) =>
    {
        if (state.ball.x === state.ball.towards.x && state.ball.y === state.ball.towards.y)
        {
            switch (event.keyCode)
            {
                case 40://up
                    if (state.ball.towards.y < height-tilewidth)
                        state.ball.towards.y += tilewidth;
                        state.ball.velocityY = tilewidth/2;
                    break;
                case 38://down
                    if (state.ball.towards.y > tilewidth)
                        state.ball.towards.y -= tilewidth;
                        state.ball.velocityY = tilewidth/2;
                    break;
                case 39://left
                    if (state.ball.towards.x < width-tilewidth)
                        state.ball.towards.x += tilewidth;
                        state.ball.velocityX = tilewidth/2;
                    break;
                case 37://right
                    if (state.ball.towards.x > tilewidth)
                        state.ball.towards.x -= tilewidth;
                        state.ball.velocityX = tilewidth/2;
                    break;
                default:
                    break;
            }
        }
    }

    const updateBallVelocity = (step=1) => 
    {
        if (Math.abs(state.ball.x  - state.ball.towards.x) < tilewidth/2)
        {
            state.ball.velocityX = 0;
        }
        if (state.ball.velocityX > state.ball.deltaX++)
        {
            state.ball.deltaX += step;
        }
        else
        {
            state.ball.deltaX -= step;
            if (state.ball.deltaX < 0)
                state.ball.deltaX = 0;
        }

        if (state.ball.x < state.ball.towards.x)
        {
            if (state.ball.x + state.ball.deltaX < state.ball.towards.x && state.ball.deltaX > 0)
            {
                state.ball.x += state.ball.deltaX;
            }
            else
            {
                state.ball.x = state.ball.towards.x;
            }
        }
        else if (state.ball.x > state.ball.towards.x)
        {
            
            if (state.ball.x - state.ball.deltaX >= state.ball.towards.x && state.ball.deltaX > 0)
            {
                state.ball.x -= state.ball.deltaX;
            }
            else
            {
                state.ball.x = state.ball.towards.x;
            }
        }
        
        if (state.ball.x === state.ball.towards.x)
        {
            state.ball.velocityX = 0;
            state.ball.deltaX = 0;
        }

        
        if (Math.abs(state.ball.y  - state.ball.towards.y) < tilewidth/2)
        {
            state.ball.velocityY = 0;
        }
        if (state.ball.velocityY > state.ball.deltaY++)
        {
            state.ball.deltaY += step;
        }
        else
        {
            state.ball.deltaY -= step;
            if (state.ball.deltaY < 0)
                state.ball.deltaY = 0;
        }

        if (state.ball.y < state.ball.towards.y)
        {
            if (state.ball.y + state.ball.deltaY < state.ball.towards.y && state.ball.deltaY > 0)
            {
                state.ball.y += state.ball.deltaY;
            }
            else
            {
                state.ball.y = state.ball.towards.y;
            }
        }
        else if (state.ball.y > state.ball.towards.y)
        {
            if (state.ball.y - state.ball.deltaY > state.ball.towards.y && state.ball.deltaY > 0)
            {
                state.ball.y -= state.ball.deltaY;
            }
            else
            {
                state.ball.y = state.ball.towards.y;
            }
        }
        
        if (state.ball.y === state.ball.towards.y)
        {
            state.ball.velocityY = 0;
            state.ball.deltaY = 0;
        }
        
    }

    const update = () => 
    {
        updateBallVelocity(stepspeed);
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