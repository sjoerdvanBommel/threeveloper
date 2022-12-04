import { useTexture } from "@react-three/drei";
import { MeshMatcapMaterial, Texture } from "three";
import { convertObject } from "../../Utils/convertObject";

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

const useTextureParam = Object.fromEntries(
  matcapMaterialColors.map((color) => [color, `textures/matcaps/${color}.png`])
);

export type MatcapMaterialColor = typeof matcapMaterialColors[number];

type MatcapTextures = {
  [key in MatcapMaterialColor]: Texture;
};

export type FolioMatcapMaterials = {
  [key in MatcapMaterialColor]: MeshMatcapMaterial;
};

export function useFolioMatcapMaterials(): FolioMatcapMaterials {
  const matcapTextures = useTexture(useTextureParam) as MatcapTextures;

  return convertObject(
    matcapTextures,
    (texture) => new MeshMatcapMaterial({ matcap: texture })
  );
}
