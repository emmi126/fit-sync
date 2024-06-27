import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="timer">
      <div className="time">
        {Math.floor(seconds / 60)}:{("0" + (seconds % 60)).slice(-2)}
      </div>
      <button onClick={toggle} className="btn btn__primary">
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={reset} className="btn btn__danger">
        Reset
      </button>
    </div>
  );
}

export default Timer;
