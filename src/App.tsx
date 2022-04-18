import {
  Icosahedron,
  OrbitControls,
  Plane,
  Sphere,
  useGLTF,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  DoubleSide,
  LinearEncoding,
  PointLight,
  PointLightHelper,
  SpotLightHelper,
  Vector2,
  Vector3,
} from "three";
import "./App.css";

function RockSphere() {
  const groundProps = useTexture({
    map: "/textures/aerial_rocks_02_diff_4k.jpg",
    aoMap: "/textures/aerial_rocks_02_arm_4k.jpg",
    roughnessMap: "/textures/aerial_rocks_02_arm_4k.jpg",
    metalnessMap: "/textures/aerial_rocks_02_arm_4k.jpg",
    displacementMap: "/textures/aerial_rocks_02_disp_4k.jpg",
    alphaMap: "/textures/alpha.png",
    normalMap: "/textures/aerial_rocks_02_nor_gl_4k.jpg",
  });

  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(-5, 10, 0);
  });

  return (
    <>
      <Plane args={[10, 10, 128, 128]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          side={DoubleSide}
          transparent
          {...groundProps}
          normalMap-encoding={LinearEncoding}
        />
      </Plane>
      <Plane
        args={[10, 10, 128, 128]}
        position={[10, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          side={DoubleSide}
          transparent
          {...groundProps}
          normalMap-encoding={LinearEncoding}
        />
      </Plane>
      <Plane
        args={[10, 10, 128, 128]}
        position={[10, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          wireframe
          {...groundProps}
          color={"white"}
          map={null}
        />
      </Plane>
    </>
  );
}

function ThreeContent() {
  const lightRef = useRef<PointLight>(null!);
  useHelper(lightRef, PointLightHelper, 1, "red");

  return (
    <>
      <ambientLight />
      <pointLight
        ref={lightRef}
        position={[5, 5, 0]}
        intensity={2}
        color={"white"}
      />
      <OrbitControls />

      <RockSphere />
    </>
  );
}

function ThreeScene() {
  return (
    <Canvas>
      <ThreeContent />
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
