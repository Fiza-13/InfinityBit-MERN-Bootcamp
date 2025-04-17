import React, { useEffect } from 'react'
import { useState } from "react";
import Board from './Board';
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';

const Player_X = "X";
const Player_O = "O";

const winningcombo = [
    //Rows
     {combo:[0,1,2], strikeClass: "strike-row-1"},
     {combo:[3,4,5], strikeClass: "strike-row-2"},
     {combo:[6,7,8], strikeClass: "strike-row-3"},
    
    //Columns
    {combo:[0,3,6], strikeClass: "strike-column-1"},
    {combo:[1,4,7], strikeClass: "strike-column-2"},
    {combo:[2,5,8], strikeClass: "strike-column-3"},
    
    //Diagnols
    {combo:[0,4,8], strikeClass: "strike-diagonal-1"},
    {combo:[2,4,6], strikeClass: "strike-diagonal-2"},
];

function checkWinner(tiles, setStrikeClass, setGameState){
    for(const {combo, strikeClass} of winningcombo){
      const tileValue1 = tiles[combo[0]];
      const tileValue2 = tiles[combo[1]];
      const tileValue3 = tiles[combo[2]];

        if (
          tileValue1 !== null && 
          tileValue1 === tileValue2 &&
          tileValue1 === tileValue3
        ){
           setStrikeClass(strikeClass);
           if(tileValue1 === Player_X){
             setGameState(GameState.playerXWins)
           }
           else{
             setGameState(GameState.playerOWins)
           }
           return;
        }
    }

    const areAllTilesFilledin = tiles.every((tile)=> tile != null);
    if(areAllTilesFilledin ){
      setGameState(GameState.draw);
    }
}

function TicTacToe(){
    const [tiles, SetTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(Player_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [gameLog, setGameLog] = useState([]);


    const handleTileClick = (index) => {
      if (gameState !== GameState.inProgress) {
        return;
      }
      if (tiles[index] !== null) {
        return;
      }
      const newTiles = [...tiles];
      newTiles[index] = playerTurn;
      SetTiles(newTiles);
      setGameLog([...gameLog, `Player ${playerTurn} plays at index ${index}`]);
      if (playerTurn === Player_X) {
        setPlayerTurn(Player_O);
      } else {
        setPlayerTurn(Player_X);
      }
    };

    const handleReset = ()=>{
      setGameState(GameState.inProgress);
      SetTiles(Array(9).fill(null));
      setPlayerTurn(Player_X);
      setStrikeClass(null);
      setGameLog([]);
    };

    useEffect(()=> {
      checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles])

    return (
      <div className="game-container">
        <div className="tic-tac-toe">
          <h1>Tic Tac Toe</h1>
          <h2>Current Player: {playerTurn}</h2>
          <Board
           playerTurn={playerTurn} 
           tiles={tiles} 
           onTileClick={handleTileClick} 
           strikeClass={strikeClass} 
          />
          <GameOver gameState={gameState} />
          <Reset 
            gameState={gameState} 
            onReset={handleReset}
          />
        </div>
        <div className="game-log">
          <h2>X Vs O Log</h2>
          <ul>
            {gameLog.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default TicTacToe;
