import React, { useCallback, useState } from 'react';
import './styles/App.css';
import 'normalize.css';
import { GameStart } from './pages/GameStart';
import { Game } from './pages/Game';
import { GameStage } from './types/gameStage';
import { GameOver } from './pages/GameOver';

function App() {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.START);
  const handleStart = useCallback(() => {
    setGameStage(GameStage.GAME);
  }, []);

  return (
    <>
      {gameStage === GameStage.START && <GameStart onStart={handleStart} />}
      {gameStage === GameStage.GAME && <Game />}
      {gameStage === GameStage.GAMEOVER && <GameOver />}
    </>
  );
}

export default App;
