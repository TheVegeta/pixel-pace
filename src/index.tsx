import pMinDelay from "p-min-delay";
import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import Loading from "./componenet/Loading";

const Game = lazy(() => pMinDelay(import("./Game"), 700));
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Suspense fallback={<Loading />}>
    <Game />
  </Suspense>
);
