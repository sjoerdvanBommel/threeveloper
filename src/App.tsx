import { OrbitControls, Plane, TorusKnot, useHelper, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, Mesh, PointLight, PointLightHelper, RectAreaLight, SpotLight, SpotLightHelper } from "three";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import "./App.css";

function LightScene() {
  const matcap = useTexture('./matcaps/matcap.png');

  const torusKnotBasicRef = useRef<Mesh>();
  const torusKnotStandardRef = useRef<Mesh>();
  const torusKnotLambertRef = useRef<Mesh>();
  const torusKnotMatcapRef = useRef<Mesh>();
  
  useFrame(() => {
    [
      torusKnotBasicRef,
      torusKnotStandardRef,
      torusKnotLambertRef,
      torusKnotMatcapRef
    ].forEach((ref) => {
      ref.current?.rotateX(0.001);
      ref.current?.rotateZ(0.002);
      ref.current?.rotateY(0.003);
    })
  })
  
  const rectAreaLightRef = useRef<RectAreaLight>(null!);
  useHelper(rectAreaLightRef, RectAreaLightHelper, 'red');
  
  const { intensity, width, height, color } = useControls({ intensity: { value: 1, min: 0, max: 20 }, width: { value: 3, min: 1, max: 10 }, height: { value: 3, min: 1, max: 10 }, color: '#fff' });
  
  return (
    <>
      <rectAreaLight ref={rectAreaLightRef} args={[color, intensity, width, height]} position={[0, 5, 0]} rotation-x={-Math.PI / 2} />

      <Plane scale={10} rotation-x={-Math.PI / 2} position-y={-2} />

      <TorusKnot ref={torusKnotBasicRef} position={[-2, 0, -2]}>
        <meshBasicMaterial color={'#cc2222'} />
      </TorusKnot>
      <TorusKnot ref={torusKnotStandardRef} position={[-2, 0, 2]}>
        <meshStandardMaterial color={'#cc2222'} />
      </TorusKnot>
      <TorusKnot ref={torusKnotLambertRef} position={[2, 0, 2]}>
        <meshLambertMaterial color={'green'} />
      </TorusKnot>
      <TorusKnot ref={torusKnotMatcapRef} position={[2, 0, -2]}>
        <meshMatcapMaterial matcap={matcap} />
      </TorusKnot>
    </>
  )
}

function ThreeScene() {
  return (
    <Canvas camera={{ position: [4, 7, 0] }}>
      <OrbitControls />

      <LightScene />
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
