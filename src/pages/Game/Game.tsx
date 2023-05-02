/* eslint-disable no-console */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import './Game.scss';
import { Question } from '../../types/QuestionWithUnswer';
import { Money } from '../../types/Money';
import { AnswersBlock } from '../../components/AnswersBlock';
import { ScoreBlock } from '../../components/ScoreBlock';
import { GameStage } from '../../types/GameStage';
import { BurgerMenu } from '../../types/BurgerMenu';
import burger_icon from '../../images/burger.svg';
import cross_icon from '../../images/cross.svg';

interface Props {
  questions: Question[];
  money: Money[];
  onStageChange: React.Dispatch<React.SetStateAction<GameStage>>;
  onQuestionChange: React.Dispatch<React.SetStateAction<number>>;
  currentQuestionId: number;
}

export const Game: React.FC<Props> = ({
  questions,
  money,
  onStageChange,
  onQuestionChange,
  currentQuestionId,
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [burgerStatus, setBurgerStatus] = useState<BurgerMenu>(BurgerMenu.OPEN_SCORE);
  const breakpoint = useMemo(() => 1198, []);
  const currentQuestion = questions.find(
    (question) => question.id === currentQuestionId,
  ) || questions[questions.length - 1];
  const { answers, correct: correctAnswer } = currentQuestion!;
  const displayQuestion = useMemo(() => burgerStatus === BurgerMenu.OPEN_SCORE, [burgerStatus]);
  const displayScore = useMemo(() => burgerStatus === BurgerMenu.CLOSE_SCORE, [burgerStatus]);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  const handleBurgerClick = useCallback(() => {
    if (burgerStatus === BurgerMenu.OPEN_SCORE) {
      setBurgerStatus(BurgerMenu.CLOSE_SCORE);
    } else {
      setBurgerStatus(BurgerMenu.OPEN_SCORE);
    }
  }, [burgerStatus, setBurgerStatus]);

  return (
    <div className="game-container">
      {width > breakpoint && (
        <>
          <div className="question-container">
            <p className="question">{currentQuestion?.content}</p>
            <AnswersBlock
              answers={answers!}
              correct={correctAnswer!}
              onStageChange={onStageChange}
              onQuestionChange={onQuestionChange}
            />
          </div>
          <div className="result-container">
            <ScoreBlock scores={money} currentId={currentQuestionId} />
          </div>
        </>
      )}
      {width < breakpoint && displayQuestion && (
        <>
          <div className="question-container">
            <div className="question-wrapper">
              <p className="question">{currentQuestion?.content}</p>
            </div>
            <AnswersBlock
              answers={answers!}
              correct={correctAnswer!}
              onStageChange={onStageChange}
              onQuestionChange={onQuestionChange}
            />
          </div>

          <button
            type="button"
            className="burger-btn"
            onClick={handleBurgerClick}
          >
            <img src={burger_icon} alt="button to open score" />
          </button>
        </>
      )}
      {width <= breakpoint && displayScore && (
        <>
          <div className="result-container">
            <ScoreBlock scores={money} currentId={currentQuestionId} />
          </div>

          <button
            type="button"
            className="burger-btn"
            onClick={handleBurgerClick}
          >
            <img
              src={cross_icon}
              alt="button to open question"
            />
          </button>
        </>
      )}
    </div>
  );
};
