import { Play } from "phosphor-react";

import * as H from "./styles";

export function Home() {
  return (
    <H.Container>
      <form action="">
        <H.Form>
          <label htmlFor="task">Vou trabalhar em</label>
          <H.TaskInput
            id="task"
            list="task-configuration"
            placeholder="Dê um nome para o seu projeto"
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

        <H.StartCountdownButton disabled type="submit">
          <Play />
          Começar
        </H.StartCountdownButton>
      </form>
    </H.Container>
  );
}
