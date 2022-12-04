import { MeshNormalMaterial, Texture } from "three";
import {
  BasicMaterialColor,
  FolioBasicMaterials,
  useFolioBasicMaterials,
} from "./useFolioBasicMaterials";
import {
  FolioMatcapMaterials,
  MatcapMaterialColor,
  useFolioMatcapMaterials,
} from "./useFolioMatcapMaterials";
import { useGetFolioFloorShadowMaterial } from "./useGetFolioFloorShadowMaterial";

export interface FolioMaterials {
  matcaps: FolioMatcapMaterials;
  basics: FolioBasicMaterials;
}

export function useGetMaterial() {
  const folioMatcapMaterials = useFolioMatcapMaterials();
  const folioBasicMaterials = useFolioBasicMaterials();
  const getFolioFloorShadowMaterial = useGetFolioFloorShadowMaterial();
  console.log("rerendered");

  function getMaterial(meshName: string, floorShadowTexture?: Texture) {
    const matcapColor = getMatcapColor(meshName);
    if (matcapColor) {
      return folioMatcapMaterials[matcapColor];
    }

    const pureColor = getBasicColor(meshName);
    if (pureColor) {
      return folioBasicMaterials[pureColor];
    }

    if (isFloor(meshName) && floorShadowTexture) {
      return getFolioFloorShadowMaterial(floorShadowTexture);
    }

    return new MeshNormalMaterial();
  }

  return getMaterial;
}

function getMatcapColor(meshName: string): MatcapMaterialColor | undefined {
  const match = meshName.match(/^shade([a-z]+)_?[0-9]{0,3}?/i);
  return toCamelCase(match?.[1]) as MatcapMaterialColor;
}

function getBasicColor(meshName: string): BasicMaterialColor | undefined {
  const match = meshName.match(/^pure([a-z]+)_?[0-9]{0,3}?/i);
  return toCamelCase(match?.[1]) as BasicMaterialColor;
}

function isFloor(meshName: string) {
  const match = meshName.match(/^floor_?[0-9]{0,3}?/i);
  return !!match;
}

function toCamelCase(value?: string) {
  return value
    ? `${value.substring(0, 1).toLowerCase()}${value.substring(1)}`
    : undefined;
}
