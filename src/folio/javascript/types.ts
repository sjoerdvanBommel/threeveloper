import { Object3D, PerspectiveCamera, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import Camera from "./Camera";
import Sizes from "./Utils/Sizes";
import World from "./World";
import Car from "./World/Car";
import Controls from "./World/Controls";
import Physics from "./World/Physics";

export interface Config {
  debug: boolean;
  cyberTruck: boolean;
  touch: boolean;
}

export interface Passes {
  debugFolder: dat.GUI;
  composer: EffectComposer;
  renderPass: RenderPass;
  horizontalBlurPass: ShaderPass & {
    strength?: number;
  };
  verticalBlurPass: ShaderPass & {
    strength?: number;
  };
  glowsPass: ShaderPass & {
    color?: string;
  };
}

export interface Title {
  frequency: number;
  width: number;
  position: number;
  $element: HTMLElement | null;
  absolutePosition: number;
}

export interface SizesType extends Sizes {
  viewport: {
    width: number;
    height: number;
  };
}

export interface CameraType extends Camera {
  orbitControls: OrbitControls;
  instance: PerspectiveCamera;
}

export interface WorldType extends World {
  controls: Controls;
  car: Car & {
    chassis: {
      offset: Vector3;
      object: Object3D;
      oldPosition: Vector3;
    };
  };
  physics: Physics & {
    car: {
      forwardSpeed: number;
    };
  };
}
