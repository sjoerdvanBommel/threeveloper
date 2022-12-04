import { Color, ShaderMaterial, Texture, UniformsLib } from "three";
import fragmentShader from "../../shaders/matcap/fragment.glsl";
import vertexShader from "../../shaders/matcap/vertex.glsl";
import { DEFAULT_SHADOW_COLOR } from "../constants";

export class FolioMatcapMaterial extends ShaderMaterial {
  constructor(matcap: Texture) {
    super({
      extensions: {
        derivatives: false,
        fragDepth: false,
        drawBuffers: false,
        shaderTextureLOD: false,
      },
      uniforms: {
        ...UniformsLib.common,
        ...UniformsLib.bumpmap,
        ...UniformsLib.normalmap,
        ...UniformsLib.displacementmap,
        ...UniformsLib.fog,
        matcap: { value: matcap },
        uRevealProgress: { value: 0 },
        uIndirectDistanceAmplitude: { value: 1.75 },
        uIndirectDistanceStrength: { value: 0.5 },
        uIndirectDistancePower: { value: 2.0 },
        uIndirectAngleStrength: { value: 1.5 },
        uIndirectAngleOffset: { value: 0.6 },
        uIndirectAnglePower: { value: 1.0 },
        uIndirectColor: { value: new Color(DEFAULT_SHADOW_COLOR) },
      },
      defines: {
        MATCAP: "",
      },
      lights: false,
      fragmentShader,
      vertexShader,
    });
  }

  set uRevealProgress(progress: number) {
    this.uniforms.uRevealProgress.value = progress;
  }
}
