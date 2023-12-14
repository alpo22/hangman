import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export default function MyKeyboard({ guessedLetters, onKeyPress }) {
  const disabledKeys = {};
  guessedLetters.forEach((letter) => {
    Object.assign(disabledKeys, { [letter]: " " });
  });

  return (
    <Keyboard
      layout={{
        default: [
          "Q W E R T Y U I O P",
          " A S D F G H J K L {ent}",
          "  Z X C V B N M   ",
        ],
      }}
      display={{
        "{ent}": "return",
        ...disabledKeys,
      }}
      onChange={null}
      onKeyPress={onKeyPress}
    />
  );
}
