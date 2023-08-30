import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import Car from "./componenet/Car";
import Ground from "./componenet/Ground";
import Track from "./componenet/Track";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        // @ts-ignore
        background={"both"}
      />
      {/* @ts-ignore */}
      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      <OrbitControls target={[-2.64, -0.71, 0.03]} />

      <Ground />
      <Track />
      <Car />
    </Suspense>
  );
};

export default App;
