import { Canvas } from "@react-three/fiber";
import { LinearEncoding, NoToneMapping } from "three";
import Folio from "./Folio";

export default function FolioCanvas() {
  return (
    <Canvas
      gl={{
        pixelRatio: 2,
        physicallyCorrectLights: true,
        autoClear: false,
        outputEncoding: LinearEncoding,
        toneMapping: NoToneMapping,
      }}
    >
      <color attach="background" args={[0x000000]} />
      <Folio />
    </Canvas>
  );
}
