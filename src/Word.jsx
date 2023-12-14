import React from "react";
import FlipCard from "./FlipCard";
import "./Word.scss";

function Word({ guessedLetters, solution }) {
  return (
    <div className="word">
      {solution.split("").map((letter) => {
        if (letter === " ") {
          return <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;
        }

        if (guessedLetters.includes(letter)) {
          return <FlipCard key={letter} isFlipped letter={letter} />;
        }

        return <FlipCard key={letter} />;
      })}
    </div>
  );
}

export default Word;
