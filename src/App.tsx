import { OrbitControls, Plane, useHelper, useTexture } from "@react-three/drei";
import {
  Canvas,
  MeshStandardMaterialProps,
  useThree,
} from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  DoubleSide,
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
    aoMap: "/textures/aerial_rocks_02_arm_4k_ao_edited.jpg",
    roughnessMap: "/textures/aerial_rocks_02_arm_4k_roughness_edited.jpg",
    metalnessMap: "/textures/aerial_rocks_02_arm_4k_metalness_edited.jpg",
    displacementMap: "/textures/aerial_rocks_02_disp_4k_edited.jpg",
    alphaMap: "/textures/alpha.png",
    normalMap: "/textures/aerial_rocks_02_nor_gl_4k_edited.jpg",
  });

  const { displacementScale, aoMapIntensity, normalScale } = useControls({
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
    normalScale: [1, 1],
  });

  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 10, 5);
  }, [camera]);

  const planeProps: {
    args: [
      width: number,
      height: number,
      widthSegments: number,
      heightSegments: number
    ];
    rotation: [x: number, y: number, z: number];
  } = {
    args: [10, 10, 128, 128],
    rotation: [-Math.PI / 2, 0, 0],
  };

  const materialProps: MeshStandardMaterialProps = {
    ...terrainTextures,
    side: DoubleSide,
    transparent: true,
    displacementScale,
    aoMapIntensity,
    normalScale: new Vector2(normalScale[0], normalScale[1]),
  };

  const mesh = useRef<Mesh>(null!);
  useEffect(() => {
    mesh.current.geometry.setAttribute(
      "uv2",
      new BufferAttribute(mesh.current.geometry.attributes.uv.array, 2)
    );
  });

  return (
    <>
      <Plane {...planeProps} ref={mesh}>
        <meshStandardMaterial {...materialProps} />
      </Plane>
      <Plane {...planeProps} position={[10, 0, 0]}>
        <meshStandardMaterial {...materialProps} />
      </Plane>
      <Plane {...planeProps} position={[10, 0.1, 0]}>
        <meshStandardMaterial
          {...materialProps}
          wireframe
          color={"white"}
          map={null}
          normalMap-encoding={LinearEncoding}
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
        intensity={4}
        color={"white"}
      />
      <OrbitControls />

      <Terrain />
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
