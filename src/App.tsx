import { OrbitControls, Plane, useHelper, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  LinearEncoding,
  Mesh,
  PointLight,
  PointLightHelper,
  Vector2,
} from "three";
import "./App.css";

function Terrain() {
  const terrainTextures = useTexture({
    map: "/textures/aerial_rocks_02_diff_4k.jpg",
    displacementMap: "/textures/aerial_rocks_02_disp_4k_edited.jpg",
    aoMap: "/textures/aerial_rocks_02_arm_4k_ao_edited.jpg",
    roughnessMap: "/textures/aerial_rocks_02_arm_4k_roughness_edited.jpg",
    metalnessMap: "/textures/aerial_rocks_02_arm_4k_metalness_edited.jpg",
    normalMap: "/textures/aerial_rocks_02_nor_gl_4k_edited.jpg",
    alphaMap: "/textures/alpha.png",
  });

  const {
    displacementScale,
    aoMapIntensity,
    roughness,
    metalness,
    normalScale,
  } = useControls({
    displacementScale: {
      value: 1,
      min: -2,
      max: 2,
    },
    aoMapIntensity: {
      value: 1,
      min: 0,
      max: 10,
    },
    roughness: {
      value: 1,
      min: 0,
      max: 1,
    },
    metalness: {
      value: 0,
      min: 0,
      max: 1,
    },
    normalScale: [1, 1],
  });

  const mesh = useRef<Mesh>(null!);
  useEffect(() => {
    mesh.current.geometry.setAttribute(
      "uv2",
      new BufferAttribute(mesh.current.geometry.attributes.uv.array, 2)
    );
  });

  return (
    <Plane args={[10, 10, 128, 128]} rotation-x={-Math.PI / 2} ref={mesh}>
      <meshStandardMaterial
        {...terrainTextures}
        normalMap-encoding={LinearEncoding}
        transparent
        displacementScale={displacementScale}
        aoMapIntensity={aoMapIntensity}
        roughness={roughness}
        metalness={metalness}
        metalnessMap={null}
        normalScale={new Vector2(normalScale[0], normalScale[1])}
      />
    </Plane>
  );
}

function ThreeContent() {
  const lightRef = useRef<PointLight>(null!);
  useHelper(lightRef, PointLightHelper, 1, "red");

  return (
    <>
      <ambientLight />
      <pointLight ref={lightRef} position={[5, 5, 0]} intensity={4} />
      <OrbitControls />

      <Terrain />
    </>
  );
}

function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 10, 5] }}>
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
