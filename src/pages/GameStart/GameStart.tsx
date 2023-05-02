import React from 'react';
import thumbUp from '../../images/thumbUp.svg';
import './GameStart.scss';

interface Props {
  onStart: () => void;
}

export const GameStart: React.FC<Props> = ({ onStart }) => (
  <div className="container-wraper diagonal-split-background">
    <div className="container">
      <img className="image" src={thumbUp} alt="thumb up with stars" />

      <div className="title-block">
        <p className="title">Who wants to be a millionaire?</p>
        <button
          className="start-btn"
          type="button"
          onClick={onStart}
        >
          Start
        </button>
      </div>
    </div>
  </div>
);
