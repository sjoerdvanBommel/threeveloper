import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, Mesh, Shape } from "three";
import "./App.css";

function getHeartShape() {
  const x = -5, y = -10;

  const heartShape = new Shape();

  heartShape.moveTo( x + 5, y + 5 );
  heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
  heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
  heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
  heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
  heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
  heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

  return heartShape;
}

function Box() {
  const boxRef = useRef<Mesh>(null!);

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={boxRef} scale={[.1, .1, .1]}>
      <shapeGeometry args={[getHeartShape()]} />
      <meshStandardMaterial color="orange" side={DoubleSide} />
    </mesh>
  );
}

function Controls() {
  const {
    camera,
    gl: { domElement }
  } = useThree();

  return <orbitControls args={[camera, domElement]} />
}

function ThreeScene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      <axesHelper args={[10]} />
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
