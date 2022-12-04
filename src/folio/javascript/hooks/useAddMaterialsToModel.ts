import { useMemo } from "react";
import { Group, Mesh, PlaneGeometry, Texture } from "three";
import { useGetMaterial } from "./materials/useGetMaterial";

export default function useAddMaterialsToModel(
  scene: Group,
  floorShadowTexture?: Texture
) {
  const getMaterial = useGetMaterial();

  const sceneWithMaterials = useMemo(() => {
    scene.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      const material = getMaterial(child.name, floorShadowTexture);

      // Exception: create floor manually because of missing UV
      if (child.name.startsWith("floor")) {
        const geometry = new PlaneGeometry();
        material.depthWrite = false;

        const mesh = new Mesh(geometry, material);
        mesh.scale.copy(child.scale);
        mesh.name = child.name;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();

        scene.remove(child);
        scene.add(mesh);

        return;
      }

      child.material = material;
    });

    return scene.clone();
  }, [scene, getMaterial]);

  return sceneWithMaterials;
}
