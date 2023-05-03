import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'normalize.css';
import { GameStart } from './pages/GameStart';
import { Game } from './pages/Game';
import { GameStage } from './types/GameStage';
import { GameOver } from './pages/GameOver';
import { questionsWithAnswers } from './helpers/questions-with-unswers';
import money from './api/money.json';
import { BurgerMenu } from './types/BurgerMenu';

export const App:React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.START);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [burgerStatus, setBurgerStatus] = useState<BurgerMenu>(BurgerMenu.OPEN_SCORE);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  const breakpoint = useMemo(() => 1198, []);
  const currentQuestion = questionsWithAnswers.find(
    (question) => question.id === currentQuestionId,
  ) || questionsWithAnswers[questionsWithAnswers.length - 1];
  const { answers, correct } = currentQuestion!;

  const handleAnswerClick = useCallback((selectedAnswer: string) => {
    if (selectedAnswers.length < correct!.length) {
      setSelectedAnswers((state) => [...state, selectedAnswer]);
    }
  }, [selectedAnswers.length, correct]);

  useEffect(() => {
    if (selectedAnswers.length === correct!.length) {
      setTimeout(() => {
        selectedAnswers.forEach((answer) => {
          if (correct!.includes(answer)) {
            setCorrectAnswers((state) => [...state, answer]);
          } else {
            setWrongAnswers((state) => [...state, answer]);
          }
        });
        setSelectedAnswers([]);
      }, 2000);
    }
  }, [correct, selectedAnswers]);

  useEffect(() => {
    if (correct!.length === correctAnswers.length) {
      setTimeout(() => {
        setCurrentQuestionId((state) => state + 1);
        setCorrectAnswers([]);
      }, 2000);
    }
  }, [correct, correctAnswers]);

  useEffect(() => {
    if (
      correct!.length === wrongAnswers.length + correctAnswers.length
      && wrongAnswers.length !== 0
    ) {
      setTimeout(() => {
        setGameStage(GameStage.GAMEOVER);
      }, 2500);
    }
  }, [wrongAnswers, correctAnswers, correct]);

  const disablePointerEvent = useMemo(() => (
    correct!.length === selectedAnswers.length
    || correct!.length === correctAnswers.length + wrongAnswers.length
  ), [selectedAnswers, correctAnswers, wrongAnswers, correct]);

  const handleStart = useCallback(() => {
    setGameStage(GameStage.GAME);
    setCurrentQuestionId(1);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setSelectedAnswers([]);
  }, []);

  const currentScore = useMemo(() => {
    if (currentQuestionId > 1 && currentQuestionId <= money.length) {
      return `$${money[currentQuestionId - 2].gain.toLocaleString()} earned`;
    }
    if (currentQuestionId === money.length + 1) {
      setGameStage(GameStage.GAMEOVER);
    }

    return (currentQuestionId === 1)
      ? '$0 earned'
      : `$${money[money.length - 1].gain.toLocaleString()} earned`;
  }, [currentQuestionId]);

  const handleBurgerClick = useCallback(() => {
    if (burgerStatus === BurgerMenu.OPEN_SCORE) {
      setBurgerStatus(BurgerMenu.CLOSE_SCORE);
    } else {
      setBurgerStatus(BurgerMenu.OPEN_SCORE);
    }
  }, [burgerStatus, setBurgerStatus]);

  return (
    <>
      {gameStage === GameStage.START && <GameStart onStart={handleStart} />}
      {gameStage === GameStage.GAME && (
        <Game
          width={width}
          answers={answers}
          breakPoint={breakpoint}
          burgerStatus={burgerStatus}
          onBurgerClick={handleBurgerClick}
          currentQuestion={currentQuestion}
          disablePointerEvent={disablePointerEvent}
          money={money}
          currentQuestionId={currentQuestionId}
          selectedAnswers={selectedAnswers}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          handleAnswerClick={handleAnswerClick}
        />
      )}
      {gameStage === GameStage.GAMEOVER
      && <GameOver onStart={handleStart} currentScore={currentScore} />}
    </>
  );
};
