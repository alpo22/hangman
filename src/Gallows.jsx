import React from "react";
import "./Gallows.scss";

function Gallows({ strikes }) {
  const cn = `gallows gallows--${strikes}`;
  return <div className={cn} />;
}

export default Gallows;
