import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Vector3 } from 'three';
import "./App.css";

function randomVec3() {
  return new Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5));
}

function Balls({ amount }: { amount: number }) {
  const range = 60;
  const result = [];
  for (let i = 0; i < amount; i++) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    result.push(
      <mesh position={randomVec3().multiplyScalar(range)} scale={Math.random()} rotation={[randomVec3().x, randomVec3().y, randomVec3().z]}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color={`#${randomColor}`} />
      </mesh>
    );
  }
  return <>{result}</>;
}

function Sun() {
  return (
    <mesh rotation={[1.7, 3., 5]} scale={3}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

let zoomingIn = false;

function AnimatedFov() {
  const { camera: cam  } = useThree();
  const camera = cam as PerspectiveCamera;

  useFrame(() => {
    camera.fov += .15 * (zoomingIn ? -1 : 1);
    camera.updateProjectionMatrix();
    if (camera.fov > 160) {
      zoomingIn = true;
    }
    if (camera.fov < 30) {
      zoomingIn = false;
    }
  })

  return null;
}

let goingForward = false;

function AnimatePos() {
  const { camera: cam  } = useThree();
  const camera = cam as PerspectiveCamera;

  useFrame(() => {
    if (camera.position.x > 50) {
      goingForward = true;
    }
    if (camera.position.x < 3) {
      goingForward = false;
    }
    
    camera.position.x += .05 * (goingForward ? -1 : 1);
    camera.position.y += .05 * (goingForward ? -1 : 1);
    camera.updateProjectionMatrix();
  })

  return null;
}

function ThreeScene() {
  return (
    <Canvas camera={{ position: [5, 5, 0], fov: 30}}>
      <ambientLight intensity={1} />
      <pointLight position={[0,0,0]} intensity={3} />
      <pointLight position={[8, 8,0]} intensity={3} />
      <OrbitControls />
      <Sun />
      <AnimatedFov />
      {/* <AnimatePos /> */}
      <Balls amount={500} />
    </Canvas>
  );
}

function App() {
  return (
    <div className="App h-screen" style={{ backgroundColor: '#1e1e1e'}}>
      <ThreeScene />
    </div>
  );
}

export default App;
