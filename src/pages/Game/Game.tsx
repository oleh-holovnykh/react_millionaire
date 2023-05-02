/* eslint-disable no-console */
import React from 'react';
import './Game.scss';
import { Question } from '../../types/QuestionWithUnswer';
import { Money } from '../../types/Money';
import { AnswersBlock } from '../../components/AnswersBlock';
import { ScoreBlock } from '../../components/ScoreBlock';
import { GameStage } from '../../types/GameStage';

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
  const currentQuestion = questions.find(
    (question) => question.id === currentQuestionId,
  );
  const { answers, correct: correctAnswer } = currentQuestion!;

  return (
    <div className="game-container">
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
    </div>
  );
};
