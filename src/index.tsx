import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Game from "./Game";
import Loading from "./componenet/Loading";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Suspense fallback={<Loading />}>
    <Game />
  </Suspense>
);
