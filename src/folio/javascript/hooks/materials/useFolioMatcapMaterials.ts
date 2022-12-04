import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useMemo } from "react";
import { Texture } from "three";
import { LEVA_FOLDERS } from "../../constants";
import { FolioMatcapMaterial } from "../../Materials/FolioMatcapMaterial";
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
  [key in MatcapMaterialColor]: FolioMatcapMaterial;
};

export function useFolioMatcapMaterials(): FolioMatcapMaterials {
  const matcapTextures = useTexture(useTextureParam) as MatcapTextures;
  const folioMatcapMaterials = useMemo(
    () =>
      convertObject(
        matcapTextures,
        (texture) => new FolioMatcapMaterial(texture)
      ),
    [matcapTextures]
  );

  const { revealProgress } = useControls(
    LEVA_FOLDERS.materials,
    {
      revealProgress: {
        value: 0,
        min: 0,
        max: 1,
        label: "Reveal progress",
      },
    },
    { collapsed: true, color: "#d11f00" }
  );

  useEffect(() => {
    Object.values(folioMatcapMaterials).forEach((material) => {
      material.uRevealProgress = revealProgress;
    });
  }, [revealProgress]);

  return folioMatcapMaterials;
}
