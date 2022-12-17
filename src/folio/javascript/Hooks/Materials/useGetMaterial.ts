import { useTexture } from "@react-three/drei";
import { MeshNormalMaterial } from "three";
import { FolioMatcapMaterial } from "../../Materials/FolioMatcapMaterial";

const matcapMaterialColors = [
  "beige",
  "black",
  "blue",
  "brown",
  "emeraldGreen",
  "gold",
  "gray",
  "green",
  "metal",
  "orange",
  "purple",
  "red",
  "white",
  "yellow",
] as const;

const useTextureArgument = Object.fromEntries(
  matcapMaterialColors.map((color) => [color, `./models/matcaps/${color}.png`])
);

export function useGetMaterial() {
  const matcapTextures = useTexture(useTextureArgument);

  const getMaterial = (meshName: string) => {
    const color = getMatcapColor(meshName);
    if (color) {
      const matcap = matcapTextures[color];
      return new FolioMatcapMaterial(matcap);
    }

    return new MeshNormalMaterial();
  };

  return getMaterial;
}

function getMatcapColor(meshName: string) {
  const match = meshName.match(/^shade([a-z]+)_?[0-9]{0,3}?/i);
  return toCamelCase(match?.[1]);
}

function toCamelCase(value?: string) {
  return value
    ? `${value.substring(0, 1).toLowerCase()}${value.substring(1)}`
    : undefined;
}
