import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { TextureLoader } from "three";
import { GLTFLoader } from "three-stdlib";
import Car from "./componenet/Car";
import Ground from "./componenet/Ground";
import Track from "./componenet/Track";

const App = () => {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  let mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/car.glb"
  ).scene;

  const gridMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/grid.png"
  );

  const aoMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/ground-ao.png"
  );

  const alphaMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/alpha-map.png"
  );

  const result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/track.glb"
  );

  const colorMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/track.png"
  );

  const rampResult = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/ramp.glb"
  );

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

      <Ground gridMap={gridMap} aoMap={aoMap} alphaMap={alphaMap} />
      <Track rampResult={rampResult} result={result} colorMap={colorMap} />
      <Car thirdPerson={thirdPerson} mesh={mesh} />
    </Suspense>
  );
};

export default App;
