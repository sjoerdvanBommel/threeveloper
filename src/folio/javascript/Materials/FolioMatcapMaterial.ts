import * as THREE from "three";
import { Color, ShaderMaterial, Texture } from "three";

import shaderFragment from "../../shaders/matcap/fragment.glsl";
import shaderVertex from "../../shaders/matcap/vertex.glsl";

interface FolioMatcapMaterialUniforms {
  revealProgress: number;
  indirectDistanceAmplitude: number;
  indirectDistanceStrength: number;
  indirectDistancePower: number;
  indirectAngleStrength: number;
  indirectAngleOffset: number;
  indirectAnglePower: number;
  indirectColor: string;
}

export class FolioMatcapMaterial extends ShaderMaterial {
  constructor(
    matcap: Texture,
    {
      revealProgress,
      indirectDistanceAmplitude,
      indirectDistanceStrength,
      indirectDistancePower,
      indirectAngleStrength,
      indirectAngleOffset,
      indirectAnglePower,
      indirectColor,
    }: FolioMatcapMaterialUniforms
  ) {
    const uniforms = {
      ...THREE.UniformsLib.common,
      ...THREE.UniformsLib.bumpmap,
      ...THREE.UniformsLib.normalmap,
      ...THREE.UniformsLib.displacementmap,
      ...THREE.UniformsLib.fog,
      matcap: { value: matcap },
      uRevealProgress: { value: revealProgress },
      uIndirectDistanceAmplitude: { value: indirectDistanceAmplitude },
      uIndirectDistanceStrength: { value: indirectDistanceStrength },
      uIndirectDistancePower: { value: indirectDistancePower },
      uIndirectAngleStrength: { value: indirectAngleStrength },
      uIndirectAngleOffset: { value: indirectAngleOffset },
      uIndirectAnglePower: { value: indirectAnglePower },
      uIndirectColor: { value: new Color(indirectColor).convertLinearToSRGB() },
    };

    super({
      uniforms,
      lights: false,
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment,
    });
  }
}
