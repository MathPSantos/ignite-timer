import { useEffect, useState } from "react";
import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";

import * as H from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser de no mínimo 60 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finshedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  useEffect(
    function handleActiveCycleInterval() {
      let interval: number;

      if (activeCycle) {
        interval = setInterval(() => {
          const secondsDifference = differenceInSeconds(
            new Date(),
            activeCycle.startDate
          );

          if (secondsDifference >= totalSeconds) {
            setCycles((state) =>
              state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                  return { ...cycle, finshedDate: new Date() };
                }

                return cycle;
              })
            );

            setAmountSecondsPassed(totalSeconds);
            clearInterval(interval);
          } else {
            setAmountSecondsPassed(secondsDifference);
          }
        }, 1000);
      }

      return () => {
        clearInterval(interval);
      };
    },
    [activeCycle, activeCycleId, totalSeconds]
  );

  function handleCreateNewCicle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleInterrupCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }

        return cycle;
      })
    );

    setActiveCycleId(null);
  }

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

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <H.Container>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <H.Form>
          <label htmlFor="task">Vou trabalhar em</label>
          <H.TaskInput
            id="task"
            list="task-configuration"
            placeholder="Dê um nome para o seu projeto"
            disabled={activeCycle !== null}
            {...register("task")}
          />

          <datalist id="task-configuration">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <H.MinuteAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={activeCycle !== null}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </H.Form>

        <H.Countdown>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <H.Separator>:</H.Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </H.Countdown>

        {!activeCycle ? (
          <H.StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </H.StartCountdownButton>
        ) : (
          <H.StopCountdownButton onClick={handleInterrupCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </H.StopCountdownButton>
        )}
      </form>
    </H.Container>
  );
}
