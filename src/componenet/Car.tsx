import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useControls from "../hooks/useControls";
import { useWheels } from "../hooks/useWheels";

const Car = () => {
  let mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/car.glb"
  ).scene;

  const position: [x: number, y: number, z: number] = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs: [x: number, y: number, z: number] = [
    width,
    height,
    front * 2,
  ];

  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null)
  );

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      //   @ts-ignore
      wheelInfos,
      //   @ts-ignore
      wheels,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  return (
    <group
      // @ts-ignore
      ref={vehicle}
    >
      {/* <primitive object={mesh} rotation-y={Math.PI} />; */}
      <mesh
        //   @ts-ignore
        ref={chassisBody}
      >
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh>
    </group>
  );
};

export default Car;
