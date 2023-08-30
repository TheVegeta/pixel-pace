import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearSRGBColorSpace, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Track = () => {
  const result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/track.glb"
  );

  const colorMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/track.png"
  );

  useEffect(() => {
    if (colorMap) {
      colorMap.anisotropy = 16;
      colorMap.colorSpace = LinearSRGBColorSpace;
    }
  }, [colorMap]);

  // @ts-ignore
  let geometry = result.scene.children[0].geometry;

  return (
    <mesh>
      <primitive object={geometry} attach={"geometry"} />
      <meshBasicMaterial toneMapped={false} map={colorMap} />
    </mesh>
  );
};

export default Track;
