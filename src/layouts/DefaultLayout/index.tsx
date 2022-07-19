import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import * as DL from "./styles";

export function DefaultLayout() {
  return (
    <DL.Container>
      <Header />
      <Outlet />
    </DL.Container>
  );
}
