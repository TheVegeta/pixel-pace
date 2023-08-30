import { useBox } from "@react-three/cannon";

const debug = false;

const ColliderBox = ({ position, scale }: { position: any; scale: any }) => {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return debug ? (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshBasicMaterial transparent={true} opacity={0.25} />
    </mesh>
  ) : null;
};

export default ColliderBox;
