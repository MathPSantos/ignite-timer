import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useCyclesContext } from "../../../../contexts/cycles-context";

import * as C from "./styles";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useCyclesContext();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const curretSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(curretSeconds / 60);
  const secondsAmount = curretSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);

  useEffect(
    function handleActiveCycleInterval() {
      let interval: number;

      if (activeCycle) {
        interval = setInterval(() => {
          const secondsDifference = differenceInSeconds(
            new Date(),
            new Date(activeCycle.startDate)
          );

          if (secondsDifference >= totalSeconds) {
            markCurrentCycleAsFinished();

            setSecondsPassed(totalSeconds);
            clearInterval(interval);
          } else {
            setSecondsPassed(secondsDifference);
          }
        }, 1000);
      }

      return () => {
        clearInterval(interval);
      };
    },
    [activeCycle, activeCycleId, totalSeconds, markCurrentCycleAsFinished]
  );

  return (
    <C.Countdown>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <C.Separator>:</C.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </C.Countdown>
  );
}
