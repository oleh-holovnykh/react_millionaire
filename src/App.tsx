import React, { useCallback, useMemo, useState } from 'react';
import 'normalize.css';
import { GameStart } from './pages/GameStart';
import { Game } from './pages/Game';
import { GameStage } from './types/GameStage';
import { GameOver } from './pages/GameOver';
import { questionsWithAnswers } from './helpers/questions-with-unswers';
import money from './api/money.json';

function App() {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.START);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const handleStart = useCallback(() => {
    setGameStage(GameStage.GAME);
    setCurrentQuestionId(1);
  }, []);

  const currentScore = useMemo(() => {
    if (currentQuestionId <= money.length) {
      return `$${money[currentQuestionId - 1].gain.toLocaleString()} earned`;
    }
    setGameStage(GameStage.GAMEOVER);

    return `$${money[money.length - 1].gain.toLocaleString()} earned`;
  }, [currentQuestionId]);

  // eslint-disable-next-line no-console
  console.log(currentQuestionId);

  return (
    <>
      {gameStage === GameStage.START && <GameStart onStart={handleStart} />}
      {gameStage === GameStage.GAME && (
        <Game
          questions={questionsWithAnswers}
          money={money}
          onStageChange={setGameStage}
          onQuestionChange={setCurrentQuestionId}
          currentQuestionId={currentQuestionId}
        />
      )}
      {gameStage === GameStage.GAMEOVER
      && <GameOver onStart={handleStart} currentScore={currentScore} />}
    </>
  );
}

export default App;
