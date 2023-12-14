import React from "react";
import classNames from "classnames";
import "./FlipCard.scss";

export default function FlipCard({ isFlipped, letter }) {
  const cn = classNames("flip-card", { "flip-card--flipped": isFlipped });

  return (
    <div className={cn}>
      <div className="flip-card-inner">
        <div className="flip-card-front" />
        <div className="flip-card-back">
          <h1>{letter}</h1>
        </div>
      </div>
    </div>
  );
}
