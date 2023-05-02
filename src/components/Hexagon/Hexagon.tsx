import React from 'react';
import cn from 'classnames';
import './Hexagon.scss';
import { HexagonStyle } from '../../types/HexagonStyle';

interface Props {
  content: string;
  hexagonStyle: HexagonStyle;
  onAnswerClick: (selectedAnswer: string) => void;
}

export const Hexagon: React.FC<Props> = ({ content, hexagonStyle, onAnswerClick = () => {} }) => {
  const isScore = (hexagonStyle === HexagonStyle.SCORE)
  || (hexagonStyle === HexagonStyle.CURRENT_SCORE);
  const isCurrentScore = hexagonStyle === HexagonStyle.CURRENT_SCORE;
  const isSelected = hexagonStyle === HexagonStyle.SELECTED_ANSWER;
  const isWrong = hexagonStyle === HexagonStyle.WRONG_ANSWER;
  const isCorrect = hexagonStyle === HexagonStyle.CORRECT_ANSWER;
  const isDisabled = isSelected || isWrong || isCorrect;

  const answer = content.slice(2);

  return (
    <div
      className="hexagon-wrapper"
    >
      <div
        className={cn('hexagon-container hexagon-container--answer', {
          'hexagon-container--selected': isSelected,
          'hexagon-container--wrong': isWrong,
          'hexagon-container--correct': isCorrect,
        })}
        style={isDisabled ? { pointerEvents: 'none' } : undefined}
      >
        <button
          type="button"
          className={cn('hexagon hexagon-answer', {
            'hexagon-score': isScore,
            'hexagon-score--current': isCurrentScore,
            'hexagon-answer--selected': isSelected,
            'hexagon-answer--wrong': isWrong,
            'hexagon-answer--correct': isCorrect,
          })}
          onClick={() => onAnswerClick(answer)}
          style={isDisabled ? { pointerEvents: 'none' } : undefined}
        >
          <p className="hexagon-title">{content}</p>
        </button>
      </div>
    </div>
  );
};
