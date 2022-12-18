import { useTexture } from "@react-three/drei";
import { folder, useControls } from "leva";
import { MeshBasicMaterial, MeshNormalMaterial, Texture } from "three";
import { LEVA_FOLDERS } from "../../constants";
import { FloorShadowMaterial } from "../../Materials/FloorShadowMaterial";
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

const basicMaterialColors = {
  red: 0xff0000,
  white: 0xffffff,
  yellow: 0xffe889,
};

type BasicMaterialColor = keyof typeof basicMaterialColors;

const useTextureArgument = Object.fromEntries(
  matcapMaterialColors.map((color) => [color, `./models/matcaps/${color}.png`])
);

const defaultShadowColor = "#d04500";

export function useGetMaterial() {
  const matcapTextures = useTexture(useTextureArgument);

  const { floorShadowColor, floorShadowAlpha, ...matcapUniforms } = useControls(
    LEVA_FOLDERS.materials.label,
    {
      [LEVA_FOLDERS.floor.label]: folder(
        {
          floorShadowColor: {
            value: defaultShadowColor,
            label: "Shadow color",
          },
          floorShadowAlpha: {
            value: 0,
            label: "Shadow alpha",
            min: 0,
            max: 1,
          },
        },
        { collapsed: true, color: LEVA_FOLDERS.floor.color }
      ),
      revealProgress: { value: 0, min: 0, max: 1, label: "Reveal progress" },
      [LEVA_FOLDERS.indirectLights.label]: folder(
        {
          indirectDistanceAmplitude: {
            value: 1.75,
            label: "Distance amplitude",
          },
          indirectDistanceStrength: { value: 0.5, label: "Distance strength" },
          indirectDistancePower: { value: 2.0, label: "Distance power" },
          indirectAngleStrength: { value: 1.5, label: "Angle strength" },
          indirectAngleOffset: { value: 0.6, label: "Angle offset" },
          indirectAnglePower: { value: 1.0, label: "Angle power" },
          indirectColor: { value: defaultShadowColor, label: "Color" },
        },
        { collapsed: true, color: LEVA_FOLDERS.indirectLights.color }
      ),
    },
    { collapsed: true, color: LEVA_FOLDERS.materials.color }
  );

  const getMaterial = (meshName: string, floorShadowTexture: Texture) => {
    const color = getMatcapColor(meshName);
    if (color) {
      const matcap = matcapTextures[color];
      return new FolioMatcapMaterial(matcap, matcapUniforms);
    }

    if (isFloor(meshName)) {
      return new FloorShadowMaterial(
        floorShadowTexture,
        floorShadowColor,
        floorShadowAlpha
      );
    }

    const pureColor = getBasicColor(meshName);
    if (pureColor) {
      return new MeshBasicMaterial({ color: basicMaterialColors[pureColor] });
    }

    return new MeshNormalMaterial();
  };

  return getMaterial;
}

export function isFloor(meshName: string) {
  const match = meshName.match(/^floor_?[0-9]{0,3}?/i);
  return !!match;
}

function getMatcapColor(meshName: string) {
  const match = meshName.match(/^shade([a-z]+)_?[0-9]{0,3}?/i);
  return toCamelCase(match?.[1]);
}

function getBasicColor(meshName: string): BasicMaterialColor | undefined {
  const match = meshName.match(/^pure([a-z]+)_?[0-9]{0,3}?/i);
  return toCamelCase(match?.[1]) as BasicMaterialColor;
}

function toCamelCase(value?: string) {
  return value
    ? `${value.substring(0, 1).toLowerCase()}${value.substring(1)}`
    : undefined;
}
