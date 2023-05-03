/* eslint-disable indent */
import React, { memo, useMemo } from 'react';
import './Hexagon.scss';
import { HexagonStyle } from '../../types/hexagonStyle';

interface Props {
  content: string;
  hexagonStyle: HexagonStyle;
  onAnswerClick?: (selectedAnswer: string) => void;
  disablePointerEvent?: boolean;
}

export const Hexagon: React.FC<Props> = memo(({
  content,
  hexagonStyle,
  onAnswerClick,
  disablePointerEvent,
}) => {
  let containerStyles = useMemo(() => 'hexagon-container', []);
  let hexagonStyles = useMemo(() => 'hexagon', []);
  let isDisabled = useMemo(() => true, []);

  switch (hexagonStyle) {
    case HexagonStyle.DEFAULT_SCORE:
      hexagonStyles += ' hexagon-score';
      break;
    case HexagonStyle.CURRENT_SCORE:
      hexagonStyles += ' hexagon-score current-score';
      containerStyles += ' hexagon-container--current-score';
      break;
    case HexagonStyle.ACHIVED_SCORE:
      hexagonStyles += ' hexagon-score disabled-score';
      break;
    case HexagonStyle.DEFAULT_ANSWER:
      containerStyles += ' hexagon-container--answer';
      hexagonStyles += ' hexagon-answer';
      isDisabled = disablePointerEvent || false;
      break;
    case HexagonStyle.SELECTED_ANSWER:
      containerStyles
        += ' hexagon-container--answer hexagon-container--selected';
      hexagonStyles += ' hexagon-answer hexagon-answer--selected';
      break;
    case HexagonStyle.WRONG_ANSWER:
      containerStyles += ' hexagon-container--answer hexagon-container--wrong';
      hexagonStyles += ' hexagon-answer hexagon-answer--wrong';
      break;
    case HexagonStyle.CORRECT_ANSWER:
      containerStyles
        += ' hexagon-container--answer hexagon-container--correct';
      hexagonStyles += ' hexagon-answer hexagon-answer--correct';
      break;
    default:
      break;
  }

  const answer = useMemo(() => content.slice(2), [content]);

  return (
    <div className="hexagon-wrapper">
      <div
        className={containerStyles}
        style={
          isDisabled || !onAnswerClick ? { pointerEvents: 'none' } : undefined
        }
      >
        <button
          type="button"
          className={hexagonStyles}
          onClick={() => onAnswerClick?.(answer)}
          style={
            isDisabled || !onAnswerClick ? { pointerEvents: 'none' } : undefined
          }
        >
          <p className="hexagon-title">{content}</p>
        </button>
      </div>
    </div>
  );
});

Hexagon.defaultProps = {
  onAnswerClick: undefined,
  disablePointerEvent: undefined,
};
