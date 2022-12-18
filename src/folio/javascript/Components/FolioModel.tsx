import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, PlaneGeometry } from "three";
import { isFloor, useGetMaterial } from "../Hooks/Materials/useGetMaterial";

interface FolioModelProps {
  path: string;
  floorShadowPath: string;
}

export default function FolioModel({ path, floorShadowPath }: FolioModelProps) {
  const gltf = useGLTF(path);
  const floorShadowTexture = useTexture(floorShadowPath);
  const getMaterial = useGetMaterial();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      if (isFloor(child.name)) {
        child.geometry = new PlaneGeometry();
      }

      child.material = getMaterial(child.name, floorShadowTexture);
    });
  }, [getMaterial]);

  return <primitive object={gltf.scene} />;
}
