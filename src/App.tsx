import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, Mesh } from "three";
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
      <meshStandardMaterial color="orange" side={DoubleSide} />
    </mesh>
  );
}

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <orbitControls args={[camera, domElement]} />;
}

function ThreeScene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      <Controls />
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
