import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Mesh } from "three";
import { useGetMaterial } from "./materials/useGetMaterial";

interface UseShadowlessFolioModelProps {
  path: string;
}

export default function useShadowlessFolioModel({
  path,
}: UseShadowlessFolioModelProps) {
  const gltf = useGLTF(path, "/draco/");
  const getMaterial = useGetMaterial();

  const scene = useMemo(() => {
    gltf.scene.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      const material = getMaterial(child.name);

      // Exception: create floor manually because of missing UV
      // TODO: support floor (shadows)
      if (child.name.startsWith("floor")) {
        // const geometry = new PlaneGeometry();
        // material.depthWrite = false;

        // // TODO: check how this can be improved without creating new mesh
        // const mesh = new Mesh(geometry, material);
        // mesh.scale.copy(child.scale);
        // mesh.name = child.name;
        // mesh.matrixAutoUpdate = false;
        // mesh.updateMatrix();

        gltf.scene.remove(child);
        // gltf.scene.add(mesh);

        return;
      }

      child.material = material;
    });

    return gltf.scene.clone();
  }, [gltf]);

  return scene;
}
