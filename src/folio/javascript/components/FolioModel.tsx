import useFolioModel from "../hooks/useFolioModel";

interface FolioModelProps {
  path: string;
  floorShadowTexturePath: string;
}

export function FolioModel({ path, floorShadowTexturePath }: FolioModelProps) {
  const model = useFolioModel({ path, floorShadowTexturePath });

  return <primitive object={model} />;
}
