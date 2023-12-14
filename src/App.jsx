import { useEffect, useState } from "react";
import { Fireworks } from "@fireworks-js/react";
import Keyboard from "./Keyboard";
import Gallows from "./Gallows";
import Word from "./Word";
import StartingModal from "./StartingModal";
import LostModal from "./LostModal";
import "./App.scss";

// if there is a space in the solution, it doesnt detect that you won
// free words API: https://random-word-api.herokuapp.com/home
// TODO: share result
// TODO: back-end
// TODO: different hangman routes
//       - gets different words from back-end
//       - shows different theme

const STATE_NONE = "none, just got here";
const STATE_PLAYING = "playing";
const STATE_WON = "won";
const STATE_LOST = "lost";

function App() {
  const [strikes, setStrikes] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [status, setStatus] = useState(STATE_NONE);

  const solution = "NERDS";

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  useEffect(() => {
    let numStrikes = 0;
    guessedLetters.forEach((letter) => {
      if (solution.indexOf(letter) === -1) {
        numStrikes++;
      }
    });
    setStrikes(numStrikes);

    // this could be .reduce i think
    let missedOne = false;
    solution.split("").forEach((letter) => {
      if (guessedLetters.indexOf(letter) === -1) {
        missedOne = true;
      }
    });

    if (!missedOne) {
      setStatus(STATE_WON);
      return;
    }
  }, [guessedLetters]);

  useEffect(() => {
    if (strikes >= 5) {
      setStatus(STATE_LOST);
    }
  }, [strikes]);

  // useEffect(() => {
  //   if (status === STATE_LOST) {
  //     alert("You lost!");
  //   }

  //   if (status === STATE_WON) {
  //     alert("You won!");
  //   }
  // }, [status]);

  function handleKeyPress(e) {
    onKeyPress(e.key.toUpperCase());
  }

  function onKeyPress(key) {
    if (status === STATE_PLAYING && guessedLetters.indexOf(key) === -1) {
      const newGuessedLetters = [...guessedLetters];
      newGuessedLetters.push(key);
      setGuessedLetters(newGuessedLetters);
    }
  }

  return (
    <>
      <div className="top">
        <Gallows strikes={strikes} />
        <Word solution={solution} guessedLetters={guessedLetters} />
        {status === STATE_WON && (
          <Fireworks
            options={{ opacity: 0.2 }}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              position: "fixed",
            }}
          />
        )}
        {status === STATE_NONE && (
          <StartingModal
            onClose={() => {
              setStatus(STATE_PLAYING);
            }}
          />
        )}
        {status === STATE_LOST && (
          <LostModal
            onClose={() => {
              setStatus(STATE_PLAYING);
            }}
          />
        )}
      </div>
      <div>
        <Keyboard guessedLetters={guessedLetters} onKeyPress={onKeyPress} />
      </div>
    </>
  );
}

export default App;
