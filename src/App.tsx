import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import "./App.css";

function Box() {
  const boxRef = useRef<Mesh>(null!);

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function ThreeScene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <Box />
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
