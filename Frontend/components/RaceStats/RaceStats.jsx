import { useContext, useEffect, useState } from "react";
import { saveUserData } from "../../utils";
import { AuthContext } from "../../context/AuthContext";
export const RaceStats = ({ input, paragraph, time, raceFinisihed, setReplay }) => {
  const [speed, setSpeed] = useState(0);
  const { token, csrfToken, userId } = useContext(AuthContext);

  const getValidInput = (input) => {
    let counter = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === paragraph[i]) counter++;
      else break;
    }
    return input.slice(0, counter);
  };
  const handleSpeedMeasuring = useEffect(() => {
    if (raceFinisihed) {
      const wordsTyped = getValidInput(input);
      const correctlyTyped = wordsTyped.length / 5;
      const timeTakenInMinutes = time / 60;
      const wordsPerMinute = Math.round(correctlyTyped / timeTakenInMinutes);
      setSpeed((prev) => wordsPerMinute);
    }
    if (raceFinisihed && speed) {
      saveUserData(speed, userId, token, csrfToken);
    }
  }, [raceFinisihed, speed]);
  return (
    <div
      className={
        "lock-screen transition-all duration-300 fixed w-full flex flex-col items-center justify-center left-0 top-[5rem]   h-full bg-skin-opaque " +
        (raceFinisihed ? "bg-opacity-40 z-[40]" : "bg-opacity-0 z-[-10]")
      }
    >
      <div
        className={
          "stats-container  rounded-sm text-skin-base transition-all shadow-md shadow-skin-base bg-skin-overlayBG  duration-300 fixed  flex flex-col items-center justify-between p-2 w-[20rem]  h-[20rem] " +
          (raceFinisihed ? "top-[13rem]" : "top-[-25rem]")
        }
      >
        <p className=" text-xl  w-full text-center">
          Statistics
        </p>
        <table className="w-[90%] mx-auto ml-[3rem] h-[8rem]">
          <thead>
            <tr>
              <th className="w-[10rem]"></th>
              <th className="w-[10rem]"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Speed</td>
              <td>{speed} WPM</td>
            </tr>
            <tr>
              <td>Accuracy</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>hehe</td>
            </tr>
          </tbody>
        </table>
        <button onClick={()=>{setReplay(prev=>!prev)}} className="text-skin-base shadow-md shadow-skin-base bg-skin-overlayBG  ui-button">Replay</button>
      </div>
    </div>
  );
};
