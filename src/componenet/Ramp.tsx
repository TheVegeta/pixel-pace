import { useTrimesh } from "@react-three/cannon";
import { FC, useRef } from "react";

const Ramp: FC<{ rampResult: any }> = ({ rampResult: result }) => {
  //   @ts-ignore
  const geometry = result.scene.children[0].geometry;

  const vertices = geometry.attributes.position.array;
  const indices = geometry.index.array;

  useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
    }),
    useRef(null)
  );

  return null;
};

export default Ramp;
