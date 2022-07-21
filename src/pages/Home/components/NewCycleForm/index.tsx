import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { useCyclesContext } from "../../../../contexts/cycles-context";

import * as NCF from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useCyclesContext();
  const { register } = useFormContext();

  return (
    <NCF.Container>
      <label htmlFor="task">Vou trabalhar em</label>
      <NCF.TaskInput
        id="task"
        list="task-configuration"
        placeholder="Dê um nome para o seu projeto"
        disabled={activeCycle !== undefined}
        {...register("task")}
      />

      <datalist id="task-configuration">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <NCF.MinuteAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={activeCycle !== undefined}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </NCF.Container>
  );
}
