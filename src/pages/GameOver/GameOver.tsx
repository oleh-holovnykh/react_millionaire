import React from 'react';
import thumbUp from '../../images/thumbUp.svg';
import './GameOver.scss';

interface Props {
  onStart: () => void,
  currentScore: string,
}

export const GameOver: React.FC<Props> = ({ onStart, currentScore }) => (
  <div className="container-wraper">
    <div className="container">
      <img className="image" src={thumbUp} alt="thumb up with stars" />

      <div className="title-block">
        <p className="pre-title">Total score:</p>
        <p className="title">{currentScore}</p>
        <button
          className="start-btn"
          type="button"
          onClick={onStart}
        >
          Try again
        </button>
      </div>
    </div>
  </div>
);
