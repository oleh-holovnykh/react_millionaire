/* eslint-disable no-console */
import React from 'react';
import { Money } from '../../types/Money';
import { HexagonStyle } from '../../types/HexagonStyle';
import './ScoreBlock.scss';
import { ScoreHexagon } from '../ScoreHexagon';

interface Props {
  scores: Money[];
  currentId: number;
}

export const ScoreBlock: React.FC<Props> = ({ scores, currentId }) => (
  <>
    {scores.map((score, id) => {
      const scoreTitle = `$ ${score.gain.toLocaleString()}`;
      let scoreType = (id + 1) === currentId
        ? HexagonStyle.CURRENT_SCORE
        : HexagonStyle.SCORE;

      console.log(currentId);

      if (id + 1 < currentId) {
        scoreType = HexagonStyle.ACHIVED_SCORE;
      }
      return (
        <div className="score-wrapper" key={score.stepId}>
          <ScoreHexagon content={scoreTitle} hexagonStyle={scoreType} />
        </div>
      );
    }).reverse()}
  </>
);