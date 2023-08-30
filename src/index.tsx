import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <App />
      </Physics>
    </Canvas>

    <div className="controls">
      <p>press w a s d to move</p>
      <p>press k to swap camera</p>
      <p>press r to reset</p>
      <p>press arrows for flips</p>
    </div>
  </>
);
