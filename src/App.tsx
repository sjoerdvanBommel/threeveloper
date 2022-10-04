import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";

function ThreeScene() {
  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <div className="App h-screen">
      <Canvas>
        <ThreeScene />
      </Canvas>
    </div>
  );
}

export default App;
