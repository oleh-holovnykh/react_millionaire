import React, {
  memo,
  useCallback, useEffect, useMemo, useState,
} from 'react';
import './Game.scss';
import { Question } from '../../types/question';
import { Money } from '../../types/money';
import { AnswersBlock } from '../../components/AnswersBlock';
import { ScoreBlock } from '../../components/ScoreBlock';
import { GameStage } from '../../types/gameStage';
import { BurgerMenu } from '../../types/burgerMenu';
import burger_icon from '../../images/burger.svg';
import cross_icon from '../../images/cross.svg';

interface Props {
  questions: Question[];
  money: Money[];
  onStageChange: React.Dispatch<React.SetStateAction<GameStage>>;
  onQuestionChange: React.Dispatch<React.SetStateAction<number>>;
  currentQuestionId: number;
}

export const Game: React.FC<Props> = memo(({
  questions,
  money,
  onStageChange,
  onQuestionChange,
  currentQuestionId,
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [burgerStatus, setBurgerStatus] = useState<BurgerMenu>(
    BurgerMenu.OPEN_SCORE,
  );
  const breakpoint = 1198;
  const currentQuestion = questions.find((question) => question.id === currentQuestionId)
    || questions[questions.length - 1];
  const { answers, correct: correctAnswer } = currentQuestion!;
  const displayQuestion = burgerStatus === BurgerMenu.OPEN_SCORE;
  const displayScore = burgerStatus === BurgerMenu.CLOSE_SCORE;

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
          <div className="result-container" id="result-container">
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
          <div className="result-container" id="result-container">
            <ScoreBlock scores={money} currentId={currentQuestionId} />
          </div>

          <button
            type="button"
            className="burger-btn"
            onClick={handleBurgerClick}
          >
            <img src={cross_icon} alt="button to open question" />
          </button>
        </>
      )}
    </div>
  );
});
