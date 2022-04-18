import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";

function TweakableBox() {
  return (
    <Box>
      <meshStandardMaterial color="cyan" />
    </Box>
  );
}

function ThreeScene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls />

      <TweakableBox />
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
