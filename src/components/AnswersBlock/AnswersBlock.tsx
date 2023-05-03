import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Hexagon } from '../Hexagon';
import { HexagonStyle } from '../../types/hexagonStyle';
import './AnswersBlock.scss';
import { GameStage } from '../../types/gameStage';
import { TIMEOUT_AFTER_ANSWER, TIMEOUT_AFTER_RESULT } from '../../utils/_variables';

interface Props {
  answers: string[];
  correct: string[];
  onStageChange: React.Dispatch<React.SetStateAction<GameStage>>;
  onQuestionChange: React.Dispatch<React.SetStateAction<number>>;
}

export const AnswersBlock: React.FC<Props> = ({
  answers,
  correct,
  onStageChange,
  onQuestionChange,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

  const handleAnswerClick = useCallback(
    (selectedAnswer: string) => {
      if (selectedAnswers.length < correct.length) {
        setSelectedAnswers((state) => [...state, selectedAnswer]);
      }
    },
    [selectedAnswers, correct.length],
  );

  useEffect(() => {
    if (selectedAnswers.length === correct.length) {
      setTimeout(() => {
        selectedAnswers.forEach((answer) => {
          if (correct.includes(answer)) {
            setCorrectAnswers((state) => [...state, answer]);
          } else {
            setWrongAnswers((state) => [...state, answer]);
          }
        });
        setSelectedAnswers([]);
      }, TIMEOUT_AFTER_ANSWER);
    }
  }, [correct, selectedAnswers]);

  useEffect(() => {
    if (correct.length === correctAnswers.length) {
      setTimeout(() => {
        onQuestionChange((state) => state + 1);
        setCorrectAnswers([]);
      }, TIMEOUT_AFTER_ANSWER);
    }
  }, [correct.length, correctAnswers, onQuestionChange]);

  useEffect(() => {
    if (
      correct.length === wrongAnswers.length + correctAnswers.length
      && wrongAnswers.length !== 0
    ) {
      setTimeout(() => {
        onStageChange(GameStage.GAMEOVER);
      }, TIMEOUT_AFTER_RESULT);
    }
  }, [wrongAnswers, correctAnswers, correct, onStageChange]);

  const disablePointerEvent = correct.length === selectedAnswers.length
      || correct.length === correctAnswers.length + wrongAnswers.length;

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  return (
    <div className="answers">
      {answers.map((answer, id) => {
        let hexagonStyle = HexagonStyle.DEFAULT_ANSWER;

        if (selectedAnswers.includes(answer)) {
          hexagonStyle = HexagonStyle.SELECTED_ANSWER;
        }

        if (correctAnswers.includes(answer)) {
          hexagonStyle = HexagonStyle.CORRECT_ANSWER;
        }

        if (wrongAnswers.includes(answer)) {
          hexagonStyle = HexagonStyle.WRONG_ANSWER;
        }
        const identifier = alphabet[id];
        const content = `${identifier} ${answer}`;

        return (
          <div className="answer-wrapper" key={identifier}>
            <Hexagon
              content={content}
              hexagonStyle={hexagonStyle}
              onAnswerClick={handleAnswerClick}
              disablePointerEvent={disablePointerEvent}
            />
          </div>
        );
      })}
    </div>
  );
};
