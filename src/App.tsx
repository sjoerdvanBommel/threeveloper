import { ContactShadows, Float } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import "./App.css";
import Apple from "./Apple";
import Avocado from "./Avocado";
import Kiwi from "./Kiwi";
import Lime from "./Lime";
import Lychee from "./Lychee";
import Pomegranate from "./Pomegranate";

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <orbitControls args={[camera, domElement]} />;
}

function ThreeScene() {
  return (
    <Canvas camera={{ position: [-3, 8, -6.5] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />
      <Float
        speed={1}
        rotationIntensity={1.3}
        position={[0, 0.1, 0]}
        floatIntensity={2}
      >
        <Lychee position={[-4, 0.3, -4]} />
      </Float>
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.5}>
        <Apple position={[0, 0.5, -1]} />
      </Float>
      <Float speed={1.4} rotationIntensity={1.5} floatIntensity={2.3}>
        <Kiwi position={[-6, 0.3, 1]} />
      </Float>
      <Float speed={0.7} rotationIntensity={1.1} floatIntensity={2.1}>
        <Lime position={[-2, 0.3, 4]} />
      </Float>
      <Float speed={1} rotationIntensity={1.35} floatIntensity={0.1}>
        <Pomegranate position={[5, 0.8, 4]} />
      </Float>
      <Float speed={1.2} rotationIntensity={1.25} floatIntensity={2}>
        <Avocado position={[4, 0.3, -4]} />
      </Float>
      <ContactShadows position={[0, -0.3, 0]} blur={2.5} scale={20} far={20} />
      <Controls />
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
