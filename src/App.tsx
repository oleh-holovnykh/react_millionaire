import React, { useCallback, useMemo, useState } from 'react';
import 'normalize.css';
import { GameStart } from './pages/GameStart';
import { Game } from './pages/Game';
import { GameStage } from './types/gameStage';
import { GameOver } from './pages/GameOver';
import questions from './api/questions.json';
import money from './api/money.json';

export const App: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.START);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const handleStart = useCallback(() => {
    setGameStage(GameStage.GAME);
    setCurrentQuestionId(1);
  }, []);

  const currentScore = useMemo(() => {
    if (currentQuestionId > 1 && currentQuestionId <= money.length) {
      return `$${money[currentQuestionId - 2].gain.toLocaleString()} earned`;
    }

    if (currentQuestionId === money.length + 1) {
      setGameStage(GameStage.GAMEOVER);
    }

    return currentQuestionId === 1
      ? '$0 earned'
      : `$${money[money.length - 1].gain.toLocaleString()} earned`;
  }, [currentQuestionId]);

  return (
    <>
      {gameStage === GameStage.START && <GameStart onStart={handleStart} />}
      {gameStage === GameStage.GAME && (
        <Game
          questions={questions}
          money={money}
          onStageChange={setGameStage}
          onQuestionChange={setCurrentQuestionId}
          currentQuestionId={currentQuestionId}
        />
      )}
      {gameStage === GameStage.GAMEOVER && (
        <GameOver
          onStart={handleStart}
          currentScore={currentScore}
        />
      )}
    </>
  );
};
