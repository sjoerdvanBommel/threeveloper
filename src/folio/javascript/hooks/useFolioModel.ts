import { useGLTF, useTexture } from "@react-three/drei";
import useAddMaterialsToModel from "./useAddMaterialsToModel";

interface useFolioGLTFProps {
  path: string;
  floorShadowTexturePath: string;
}

export default function useFolioModel({
  path,
  floorShadowTexturePath,
}: useFolioGLTFProps) {
  const gltf = useGLTF(path, "/draco/");
  const floorShadowTexture = useTexture(floorShadowTexturePath);
  const folioModel = useAddMaterialsToModel(gltf.scene, floorShadowTexture);

  return folioModel;
}
