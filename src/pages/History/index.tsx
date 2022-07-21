import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { useCyclesContext } from "../../contexts/cycles-context";
import * as H from "./styles";

export function History() {
  const { cycles } = useCyclesContext();

  return (
    <H.Container>
      <h1>Meu histórico</h1>

      <H.List>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle?.finishedDate && (
                    <H.Status statusColor="green">Concluído</H.Status>
                  )}

                  {cycle?.interruptedDate && (
                    <H.Status statusColor="red">Interrompido</H.Status>
                  )}

                  {!cycle?.finishedDate && !cycle?.interruptedDate && (
                    <H.Status statusColor="yellow">Em andamento</H.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </H.List>
    </H.Container>
  );
}
