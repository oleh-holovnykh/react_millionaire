import React, { memo, useMemo } from 'react';
import { Hexagon } from '../Hexagon';
import { HexagonStyle } from '../../types/HexagonStyle';
import './AnswersBlock.scss';

interface Props {
  answers: string[];
  disablePointerEvent: boolean;
  selectedAnswers:string[];
  correctAnswers: string[];
  wrongAnswers: string[];
  onAnswerClick: (selectedAnswer: string) => void;
}

export const AnswersBlock: React.FC<Props> = memo(({
  answers,
  disablePointerEvent,
  selectedAnswers,
  correctAnswers,
  wrongAnswers,
  onAnswerClick,
}) => {
  const alphabet = useMemo(() => 'abcdefghijklmnopqrstuvwxyz', []);

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
              onAnswerClick={onAnswerClick}
              disablePointerEvent={disablePointerEvent}
            />
          </div>
        );
      })}
    </div>
  );
});
