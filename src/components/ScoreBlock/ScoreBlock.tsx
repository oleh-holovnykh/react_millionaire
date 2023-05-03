import React, { memo } from 'react';
import cn from 'classnames';
import { Money } from '../../types/money';
import { HexagonStyle } from '../../types/hexagonStyle';
import './ScoreBlock.scss';
import { Hexagon } from '../Hexagon';

interface Props {
  scores: Money[];
  currentId: number;

}

export const ScoreBlock: React.FC<Props> = memo(({ scores, currentId }) => (
  <>
    {scores
      .map((score, id) => {
        const scoreTitle = `$ ${score.gain.toLocaleString()}`;
        let scoreType = id + 1 === currentId
          ? HexagonStyle.CURRENT_SCORE
          : HexagonStyle.DEFAULT_SCORE;

        if (id + 1 < currentId) {
          scoreType = HexagonStyle.ACHIVED_SCORE;
        }

        const isScrollFocus = (currentId === 1 && id === 0) || (currentId === id + 2);

        return (
          <div className={cn('score-wrapper', { scrollFocus: isScrollFocus })} key={score.stepId}>
            <Hexagon content={scoreTitle} hexagonStyle={scoreType} />
          </div>
        );
      })
      .reverse()}
  </>
));
