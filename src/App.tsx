import { Box, OrbitControls, Torus, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import "./App.css";

function ExampleTorus() {
  const matcap = useTexture('./matcaps/matcap.png');

  return (
    <Torus args={[2, 0.5, 32, 128]}>
      <meshMatcapMaterial matcap={matcap} />
    </Torus>
  );
}

function ThreeScene() {
  const { color } = useControls("Fog", { color: "#000" });

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls />

      <fog attach="fog" args={[color, 2, 10]} />
      <ExampleTorus />
      <Box position={[0, 0, -1]} />
    </Canvas>
  );
}

function App() {
  return (
    <div className="App h-screen">
      <ThreeScene />
    </div>
  );
}

export default App;
