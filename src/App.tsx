import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Car from "./componenet/Car";
import Ground from "./componenet/Ground";
import Track from "./componenet/Track";

const App = () => {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keydownHandler(e: { key: string }) {
      if (e.key == "k") {
        // random is necessary to trigger a state change
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        // @ts-ignore
        background={"both"}
      />
      {/* @ts-ignore */}
      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Ground />
      <Track />
      <Car thirdPerson={thirdPerson} />
    </Suspense>
  );
};

export default App;
