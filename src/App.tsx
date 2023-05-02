import React, { useCallback, useState } from 'react';
import 'normalize.css';
import { GameStart } from './pages/GameStart';
import { Game } from './pages/Game';
import { GameStage } from './types/GameStage';
import { GameOver } from './pages/GameOver';
import { questionsWithAnswers } from './helpers/questions-with-unswers';
import money from './api/money.json';

function App() {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.START);
  const handleStart = useCallback(() => {
    setGameStage(GameStage.GAME);
  }, []);

  return (
    <>
      {gameStage === GameStage.START && <GameStart onStart={handleStart} />}
      {gameStage === GameStage.GAME && (
        <Game
          questions={questionsWithAnswers}
          money={money}
          onStageChange={setGameStage}
        />
      )}
      {gameStage === GameStage.GAMEOVER && <GameOver />}
    </>
  );
}

export default App;
