import { Color, ShaderMaterial, Texture } from "three";

import shaderFragment from "../../shaders/floorShadow/fragment.glsl";
import shaderVertex from "../../shaders/floorShadow/vertex.glsl";

export class FloorShadowMaterial extends ShaderMaterial {
  constructor(floorShadowTexture: Texture, color: string, alpha: number) {
    const uniforms = {
      tShadow: { value: floorShadowTexture },
      uShadowColor: { value: new Color(color).convertLinearToSRGB() },
      uAlpha: { value: alpha },
    };

    super({
      wireframe: false,
      transparent: true,
      uniforms,
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment,
    });
  }
}
