import React, { memo, useMemo } from 'react';
import './Game.scss';
import { Question } from '../../types/QuestionWithUnswer';
import { Money } from '../../types/Money';
import { AnswersBlock } from '../../components/AnswersBlock';
import { ScoreBlock } from '../../components/ScoreBlock';
import { BurgerMenu } from '../../types/BurgerMenu';
import burger_icon from '../../images/burger.svg';
import cross_icon from '../../images/cross.svg';

interface Props {
  width: number;
  answers: string[] | null;
  breakPoint: number;
  burgerStatus: BurgerMenu;
  onBurgerClick:() => void;
  currentQuestion: Question;
  disablePointerEvent: boolean;
  money: Money[];
  currentQuestionId: number;
  selectedAnswers: string[];
  correctAnswers: string[];
  wrongAnswers: string[];
  handleAnswerClick: (selectedAnswer: string) => void;
}

export const Game: React.FC<Props> = memo(({
  width,
  answers,
  breakPoint,
  burgerStatus,
  onBurgerClick,
  currentQuestion,
  disablePointerEvent,
  money,
  currentQuestionId,
  selectedAnswers,
  correctAnswers,
  wrongAnswers,
  handleAnswerClick,
}) => {
  const displayQuestion = useMemo(() => burgerStatus === BurgerMenu.OPEN_SCORE, [burgerStatus]);
  const displayScore = useMemo(() => burgerStatus === BurgerMenu.CLOSE_SCORE, [burgerStatus]);

  return (
    <div className="game-container">
      {width > breakPoint && (
        <>
          <div className="question-container">
            <p className="question">{currentQuestion?.content}</p>
            <AnswersBlock
              answers={answers!}
              disablePointerEvent={disablePointerEvent}
              selectedAnswers={selectedAnswers}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
              onAnswerClick={handleAnswerClick}
            />
          </div>
          <div className="result-container">
            <ScoreBlock scores={money} currentId={currentQuestionId} />
          </div>
        </>
      )}
      {width < breakPoint && displayQuestion && (
        <>
          <div className="question-container">
            <div className="question-wrapper">
              <p className="question">{currentQuestion?.content}</p>
            </div>
            <AnswersBlock
              answers={answers!}
              disablePointerEvent={disablePointerEvent}
              selectedAnswers={selectedAnswers}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
              onAnswerClick={handleAnswerClick}
            />
          </div>

          <button
            type="button"
            className="burger-btn"
            onClick={onBurgerClick}
          >
            <img src={burger_icon} alt="button to open score" />
          </button>
        </>
      )}
      {width <= breakPoint && displayScore && (
        <>
          <div className="result-container">
            <ScoreBlock scores={money} currentId={currentQuestionId} />
          </div>

          <button
            type="button"
            className="burger-btn"
            onClick={onBurgerClick}
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
});
