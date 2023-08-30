import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import App from "./App";
import "./assets/style.css";

const Game = () => {
  return (
    <>
      <Canvas>
        <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
          <App />
        </Physics>
      </Canvas>

      <div className="controls" style={{ opacity: 0.5 }}>
        <p>press w a s d to move</p>
        <p>press k to swap camera</p>
        <p>press r to reset</p>
        <p>press arrows for flips</p>
      </div>
    </>
  );
};

export default Game;
