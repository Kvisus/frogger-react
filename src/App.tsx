import Cell from "./components/Cell";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";

const SIZE = 7;
const MIDDLEOFGRID = Math.floor(SIZE / 2);
const STARTFROGPOSITION = {
  x: MIDDLEOFGRID,
  y: SIZE - 1,
};
const STARTOBSTACLEPOSITION = [
  {
    x: MIDDLEOFGRID,
    y: MIDDLEOFGRID,
  },
  {
    x: MIDDLEOFGRID + 1,
    y: MIDDLEOFGRID + 1,
  },
  {
    x: MIDDLEOFGRID - 3,
    y: MIDDLEOFGRID,
  },
  {
    x: MIDDLEOFGRID - 3,
    y: MIDDLEOFGRID + 1,
  },
  {
    x: MIDDLEOFGRID,
    y: MIDDLEOFGRID - 2,
  },
];

const App = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  // console.log(wrapRef.current);
  const Finish = {
    x: MIDDLEOFGRID,
    y: 0,
  };
  const [frogPosition, setFrogPosition] = useState(STARTFROGPOSITION);
  const [obstacles, setObstacles] = useState(STARTOBSTACLEPOSITION);
  useEffect(() => {
    //check win condition
    const interval = setInterval(() => {
      win();
      loose();
    }, 100);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const moveObstacles = () => {
      const newObstacles = obstacles.map((obstacle) => {
        // top row, move right
        if (obstacle.y === MIDDLEOFGRID) {
          return {
            ...obstacle,
            x: obstacle.x === SIZE - 1 ? 0 : obstacle.x + 1,
          };
        }
        // bot row, move left
        return {
          ...obstacle,
          x: obstacle.x === 0 ? SIZE - 1 : obstacle.x - 1,
        };
      });
      setObstacles(newObstacles);
    };
    const inverval = setInterval(() => {
      moveObstacles();
    }, 1000);
    return () => clearInterval(inverval);
  }, [obstacles, MIDDLEOFGRID]);

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.focus();
    }
  }, []);
  const matrix = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => null)
  ); // Create an SIZExSIZE matrix of null elements

  const win = () => {
    if (frogPosition.x === Finish.x && frogPosition.y === Finish.y) {
      alert("YOU WIN");
      resetGame();
    }
  };
  const loose = () => {
    if (
      obstacles.some(
        (obstacle) =>
          obstacle.x === frogPosition.x && obstacle.y === frogPosition.y
      )
    ) {
      alert("YOU LOOSE");
      resetGame();
    }
  };

  const resetGame = () => {
    setFrogPosition(STARTFROGPOSITION);
    setObstacles(STARTOBSTACLEPOSITION);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowUp":
        // console.log("up");
        moveFrog("up");
        break;
      case "ArrowDown":
        moveFrog("down");
        break;
      case "ArrowLeft":
        moveFrog("left");
        break;
      case "ArrowRight":
        moveFrog("right");
        break;
    }
  };

  const moveFrog = (direction: string) => {
    const newFrogPosition = { ...frogPosition };
    switch (direction) {
      case "up":
        if (newFrogPosition.y > 0) {
          newFrogPosition.y--;
        }
        break;
      case "down":
        if (newFrogPosition.y < SIZE - 1) {
          newFrogPosition.y++;
        }
        break;
      case "left":
        if (newFrogPosition.x > 0) {
          newFrogPosition.x--;
        }
        break;
      case "right":
        if (newFrogPosition.x < SIZE - 1) {
          newFrogPosition.x++;
        }
        break;
      default:
        break;
    }
    setFrogPosition(newFrogPosition);
  };

  return (
    <div className="wrap" tabIndex={0} onKeyDown={handleKeyPress} ref={wrapRef}>
      <button tabIndex={1} onClick={resetGame}>
        Reset
      </button>
      <div className="grid">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((_, cellIndex) => (
              <Cell
                ind={rowIndex * SIZE + cellIndex}
                key={rowIndex * SIZE + cellIndex}
                isFrog={
                  frogPosition.x === rowIndex && frogPosition.y === cellIndex
                }
                isObstacle={obstacles.some(
                  (obstacle) =>
                    obstacle.x === rowIndex && obstacle.y === cellIndex
                )}
                isFinish={Finish.x === rowIndex && Finish.y === cellIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
