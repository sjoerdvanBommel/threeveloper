import * as THREE from "three";
import { Color, ShaderMaterial, Texture } from "three";

import shaderFragment from "../../shaders/matcap/fragment.glsl";
import shaderVertex from "../../shaders/matcap/vertex.glsl";

export class FolioMatcapMaterial extends ShaderMaterial {
  constructor(matcap: Texture) {
    const uniforms = {
      ...THREE.UniformsLib.common,
      ...THREE.UniformsLib.bumpmap,
      ...THREE.UniformsLib.normalmap,
      ...THREE.UniformsLib.displacementmap,
      ...THREE.UniformsLib.fog,
      matcap: { value: matcap },
      uRevealProgress: { value: 1 },
      uIndirectDistanceAmplitude: { value: 1.75 },
      uIndirectDistanceStrength: { value: 0.5 },
      uIndirectDistancePower: { value: 2.0 },
      uIndirectAngleStrength: { value: 1.5 },
      uIndirectAngleOffset: { value: 0.6 },
      uIndirectAnglePower: { value: 1.0 },
      uIndirectColor: { value: new Color("#d04500").convertLinearToSRGB() },
    };

    super({
      uniforms,
      lights: false,
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment,
    });
  }
}
