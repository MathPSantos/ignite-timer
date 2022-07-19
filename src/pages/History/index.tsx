import * as H from "./styles";

export function History() {
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
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item}>
                <td>Tarefa 01</td>
                <td>20 minutos</td>
                <td>Há cerca de 2 meses</td>
                <td>
                  <H.Status statusColor="green">Concluído</H.Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </H.List>
    </H.Container>
  );
}
