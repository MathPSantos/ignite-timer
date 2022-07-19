import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import * as H from "./styles";

const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no máximo 60 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleCreateNewCicle(data: NewCicleFormData) {
    reset();
  }

  return (
    <H.Container>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <H.Form>
          <label htmlFor="task">Vou trabalhar em</label>
          <H.TaskInput
            id="task"
            list="task-configuration"
            placeholder="Dê um nome para o seu projeto"
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
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </H.Form>

        <H.Countdown>
          <span>0</span>
          <span>0</span>
          <H.Separator>:</H.Separator>
          <span>0</span>
          <span>0</span>
        </H.Countdown>

        <H.StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play />
          Começar
        </H.StartCountdownButton>
      </form>
    </H.Container>
  );
}
