import { useControls } from "leva";
import { Color, ShaderMaterial, Texture } from "three";

import fragmentShader from "../../../shaders/floorShadow/fragment.glsl";
import vertexShader from "../../../shaders/floorShadow/vertex.glsl";

export function useGetFolioFloorShadowMaterial() {
  const { color } = useControls("Shadows", { color: "#d04500" });

  const getFolioFloorShadowMaterial = (floorShadowTexture: Texture) =>
    new ShaderMaterial({
      transparent: true,
      uniforms: {
        tShadow: { value: floorShadowTexture },
        uShadowColor: { value: new Color(color) },
        uAlpha: { value: 1 },
      },
      fragmentShader,
      vertexShader,
    });

  return getFolioFloorShadowMaterial;
}
