import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useControls from "../hooks/useControls";
import { useWheels } from "../hooks/useWheels";

const Car: FC<{ thirdPerson: boolean }> = ({ thirdPerson }) => {
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

  useFrame((state) => {
    if (!thirdPerson || !chassisBody.current) return;

    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0, 0, 1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));

    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  return (
    <group
      // @ts-ignore
      ref={vehicle}
      name="vehicle"
    >
      <group
        // @ts-ignore
        ref={chassisBody}
        name="chassisBody"
      >
        <primitive
          // @ts-ignore
          object={mesh}
          rotation-y={Math.PI}
          position={[0, -0.09, 0]}
        />
      </group>
    </group>
  );
};

export default Car;
