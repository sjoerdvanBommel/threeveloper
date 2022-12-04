import { MeshBasicMaterial } from "three";
import { convertObject } from "../../Utils/convertObject";

const basicMaterialColors = {
  red: 0xff0000,
  white: 0xffffff,
  yellow: 0xffe889,
};

export type BasicMaterialColor = keyof typeof basicMaterialColors;

export type FolioBasicMaterials = {
  [key in BasicMaterialColor]: MeshBasicMaterial;
};

export function useFolioBasicMaterials(): FolioBasicMaterials {
  return convertObject(
    basicMaterialColors,
    (color) => new MeshBasicMaterial({ color })
  );
}
