import { Color, ShaderMaterial, Texture } from "three";
import fragmentShader from "../../shaders/floorShadow/fragment.glsl";
import vertexShader from "../../shaders/floorShadow/vertex.glsl";

export class FloorShadowMaterial extends ShaderMaterial {
  constructor(floorShadowTexture: Texture, color: string) {
    super({
      transparent: true,
      uniforms: {
        tShadow: { value: floorShadowTexture },
        uShadowColor: { value: new Color(color) },
        uAlpha: { value: 1 },
      },
      fragmentShader,
      vertexShader,
    });
  }
}
