import { useGLTF } from "@react-three/drei";
import useAddMaterialsToModel from "./useAddMaterialsToModel";

interface UseShadowlessFolioModelProps {
  path: string;
}

export default function useShadowlessFolioModel({
  path,
}: UseShadowlessFolioModelProps) {
  const gltf = useGLTF(path, "/draco/");
  const folioModel = useAddMaterialsToModel(gltf.scene);

  return folioModel;
}
