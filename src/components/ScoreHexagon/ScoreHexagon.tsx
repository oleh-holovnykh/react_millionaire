import React from 'react';
import cn from 'classnames';
import './ScoreHexagon.scss';
import { HexagonStyle } from '../../types/HexagonStyle';

interface Props {
  content: string;
  hexagonStyle: HexagonStyle;
}

export const ScoreHexagon: React.FC<Props> = ({ content, hexagonStyle }) => {
  const isScore = (hexagonStyle === HexagonStyle.SCORE)
  || (hexagonStyle === HexagonStyle.CURRENT_SCORE);
  const isCurrentScore = hexagonStyle === HexagonStyle.CURRENT_SCORE;
  const isDisabled = hexagonStyle === HexagonStyle.ACHIVED_SCORE;

  return (
    <div
      className="hexagon-wrapper-score"
    >
      <div
        className={cn('hexagon-container-score', {
          'hexagon-container--current-score': isCurrentScore,
        })}
      >
        <div
          className={cn('hexagon-score', {
            'current-score': isCurrentScore,
            'hexagon-score': isScore,
            'disabled-score': isDisabled,
          })}
        >
          <p className="hexagon-title-score">{content}</p>
        </div>
      </div>
    </div>
  );
};
