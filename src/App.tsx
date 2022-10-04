import {
  Box,
  CubeCamera,
  Environment,
  OrbitControls,
  Sphere,
  useEnvironment,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { ReactNode, useRef } from "react";
import { Group } from "three";
import "./App.css";

function Rotator({ children }: { children: ReactNode }) {
  const groupRef = useRef<Group>(null!);

  useFrame(() => {
    groupRef.current.children.forEach((child) => {
      if (child.isObject3D) {
        child.rotateX(0.02);
        child.rotateY(0.02);
      }
    });
  });

  return <group ref={groupRef}>{children}</group>;
}

function ReflectiveSphere() {
  const tweakableProperties = useControls({
    roughness: { value: 0.1, min: 0, max: 1 },
    metalness: { value: 1, min: 0, max: 1 },
  });

  return (
    <Sphere args={[1, 256, 256]}>
      <meshStandardMaterial {...tweakableProperties} />
    </Sphere>
  );
}

function ThreeScene() {
  const envMap = useEnvironment({ path: "/modern buildings" });

  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls />

      <Environment map={envMap} background />

      <CubeCamera frames={Infinity}>
        {/* @ts-ignore */}
        {(texture) => (
          <>
            <Environment map={texture} />
            <ReflectiveSphere />
          </>
        )}
      </CubeCamera>

      <Rotator>
        <Box position={[0, 0, 5]}>
          <meshStandardMaterial color="red" />
        </Box>

        <Box position={[-1, 3, 2]}>
          <meshStandardMaterial color="purple" />
        </Box>
      </Rotator>
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
