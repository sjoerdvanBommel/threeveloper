import * as dat from "dat.gui";
import * as THREE from "three";

import Camera from "./Camera.js";
import Resources from "./Resources.js";
import ThreejsJourney from "./ThreejsJourney.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import World from "./World/index.js";

import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import BlurPass from "./Passes/Blur.js";
import GlowsPass from "./Passes/Glows.js";
import {
  CameraType,
  Config,
  Passes,
  SizesType,
  Title,
  WorldType,
} from "./types.js";
import WorldComponent from "./World/WorldComponent.js";

const Folio = () => {
  useEffect(() => {
    // Set up
    time.current = new Time();
    sizes.current = new Sizes() as SizesType;
    resources.current = new Resources();
    setConfig();
    setDebug();
    setCamera();
    setPasses();
    setWorld();
    setTitle();
    setThreejsJourney();

    return () => {
      time.current.off("tick");
      sizes.current.off("resize");
      camera.current.orbitControls.dispose();
      renderer.dispose();
      debug.current?.destroy();
      scene.remove(world.current.container);
    };
  }, []);
  const time = useRef<Time>(null!);
  const sizes = useRef<SizesType>(null!);
  const resources = useRef<Resources>(null!);
  const config = useRef<Config>(null!);
  const debug = useRef<dat.GUI>(null!);
  const camera = useRef<CameraType>(null!);
  const world = useRef<WorldType>(null!);
  const passes = useRef<Passes>(null!);
  const title = useRef<Title>(null!);
  const threejsJourney = useRef<ThreejsJourney>(null!);

  const { gl: renderer, scene } = useThree();

  const setConfig = useCallback(() => {
    config.current = {
      debug: window.location.hash === "#debug",
      cyberTruck: window.location.hash === "#cybertruck",
      touch: false,
    };
    window.addEventListener(
      "touchstart",
      () => {
        config.current.touch = true;
        world.current.controls.setTouch();
        passes.current.horizontalBlurPass.strength = 1;
        passes.current.horizontalBlurPass.material.uniforms.uStrength.value =
          new THREE.Vector2(passes.current.horizontalBlurPass.strength, 0);
        passes.current.verticalBlurPass.strength = 1;
        passes.current.verticalBlurPass.material.uniforms.uStrength.value =
          new THREE.Vector2(0, passes.current.verticalBlurPass.strength);
      },
      {
        once: true,
      }
    );
  }, []);
  const setDebug = useCallback(() => {
    if (config.current.debug) {
      debug.current = new dat.GUI({
        width: 420,
      });
    }
  }, []);
  const setCamera = useCallback(() => {
    camera.current = new Camera({
      time: time.current,
      sizes: sizes.current,
      renderer: renderer,
      debug: debug.current,
      config: config.current,
    }) as CameraType;
    scene.add(camera.current.container);
    time.current.on("tick", () => {
      if (world.current && world.current.car) {
        camera.current.target.x = world.current.car.chassis.object.position.x;
        camera.current.target.y = world.current.car.chassis.object.position.y;
      }
    });
  }, []);
  const setPasses = useCallback(() => {
    passes.current = {} as Passes; // Debug

    if (debug.current) {
      passes.current.debugFolder = debug.current.addFolder("postprocess"); // passes.current.debugFolder.open()
    }

    passes.current.composer = new EffectComposer(renderer); // Create passes

    passes.current.renderPass = new RenderPass(scene, camera.current.instance);
    passes.current.horizontalBlurPass = new ShaderPass(BlurPass);
    passes.current.horizontalBlurPass.strength = config.current.touch ? 0 : 1;
    passes.current.horizontalBlurPass.material.uniforms.uResolution.value =
      new THREE.Vector2(
        sizes.current.viewport.width,
        sizes.current.viewport.height
      );
    passes.current.horizontalBlurPass.material.uniforms.uStrength.value =
      new THREE.Vector2(passes.current.horizontalBlurPass.strength, 0);
    passes.current.verticalBlurPass = new ShaderPass(BlurPass);
    passes.current.verticalBlurPass.strength = config.current.touch ? 0 : 1;
    passes.current.verticalBlurPass.material.uniforms.uResolution.value =
      new THREE.Vector2(
        sizes.current.viewport.width,
        sizes.current.viewport.height
      );
    passes.current.verticalBlurPass.material.uniforms.uStrength.value =
      new THREE.Vector2(0, passes.current.verticalBlurPass.strength); // Debug

    if (debug.current) {
      const folder = passes.current.debugFolder.addFolder("blur");
      folder.open();
      folder
        .add(
          passes.current.horizontalBlurPass.material.uniforms.uStrength.value,
          "x"
        )
        .step(0.001)
        .min(0)
        .max(10);
      folder
        .add(
          passes.current.verticalBlurPass.material.uniforms.uStrength.value,
          "y"
        )
        .step(0.001)
        .min(0)
        .max(10);
    }

    passes.current.glowsPass = new ShaderPass(GlowsPass);
    passes.current.glowsPass.color = "#ffcfe0";
    passes.current.glowsPass.material.uniforms.uPosition.value =
      new THREE.Vector2(0, 0.25);
    passes.current.glowsPass.material.uniforms.uRadius.value = 0.7;
    passes.current.glowsPass.material.uniforms.uColor.value = new THREE.Color(
      passes.current.glowsPass.color
    ).convertLinearToSRGB();
    passes.current.glowsPass.material.uniforms.uAlpha.value = 0.55; // Debug

    if (debug.current) {
      const folder = passes.current.debugFolder.addFolder("glows");
      folder.open();
      folder
        .add(passes.current.glowsPass.material.uniforms.uPosition.value, "x")
        .step(0.001)
        .min(-1)
        .max(2)
        .name("positionX");
      folder
        .add(passes.current.glowsPass.material.uniforms.uPosition.value, "y")
        .step(0.001)
        .min(-1)
        .max(2)
        .name("positionY");
      folder
        .add(passes.current.glowsPass.material.uniforms.uRadius, "value")
        .step(0.001)
        .min(0)
        .max(2)
        .name("radius");
      folder
        .addColor(passes.current.glowsPass, "color")
        .name("color")
        .onChange(() => {
          passes.current.glowsPass.material.uniforms.uColor.value =
            new THREE.Color(
              passes.current.glowsPass.color
            ).convertLinearToSRGB();
        });
      folder
        .add(passes.current.glowsPass.material.uniforms.uAlpha, "value")
        .step(0.001)
        .min(0)
        .max(1)
        .name("alpha");
    } // Add passes

    passes.current.composer.addPass(passes.current.renderPass);
    passes.current.composer.addPass(passes.current.horizontalBlurPass);
    passes.current.composer.addPass(passes.current.verticalBlurPass);
    passes.current.composer.addPass(passes.current.glowsPass); // Time tick

    time.current.on("tick", () => {
      passes.current.horizontalBlurPass.enabled =
        passes.current.horizontalBlurPass.material.uniforms.uStrength.value.x >
        0;
      passes.current.verticalBlurPass.enabled =
        passes.current.verticalBlurPass.material.uniforms.uStrength.value.y > 0; // Renderer

      passes.current.composer.render(); // renderer.current.domElement.style.background = 'black'
      // renderer.current.render(scene, this.current.camera.instance)
    }); // Resize event

    sizes.current.on("resize", () => {
      renderer.setSize(
        sizes.current.viewport.width,
        sizes.current.viewport.height
      );
      passes.current.composer.setSize(
        sizes.current.viewport.width,
        sizes.current.viewport.height
      );
      passes.current.horizontalBlurPass.material.uniforms.uResolution.value.x =
        sizes.current.viewport.width;
      passes.current.horizontalBlurPass.material.uniforms.uResolution.value.y =
        sizes.current.viewport.height;
      passes.current.verticalBlurPass.material.uniforms.uResolution.value.x =
        sizes.current.viewport.width;
      passes.current.verticalBlurPass.material.uniforms.uResolution.value.y =
        sizes.current.viewport.height;
    });
  }, []);
  const setWorld = useCallback(() => {
    world.current = new World({
      config: config.current,
      debug: debug.current,
      resources: resources.current,
      time: time.current,
      sizes: sizes.current,
      camera: camera.current,
      renderer: renderer,
      passes: passes.current,
    }) as WorldType;
    scene.add(world.current.container);
  }, []);
  const setTitle = useCallback(() => {
    title.current = {} as Title;
    title.current.frequency = 300;
    title.current.width = 20;
    title.current.position = 0;
    title.current.$element = document.querySelector("title");
    title.current.absolutePosition = Math.round(title.current.width * 0.25);
    time.current.on("tick", () => {
      if (world.current.physics) {
        title.current.absolutePosition +=
          world.current.physics.car.forwardSpeed;

        if (title.current.absolutePosition < 0) {
          title.current.absolutePosition = 0;
        }
      }
    });
    window.setInterval(() => {
      title.current.position = Math.round(
        title.current.absolutePosition % title.current.width
      );
      document.title = `${"_".repeat(
        title.current.width - title.current.position
      )}🚗${"_".repeat(title.current.position)}`;
    }, title.current.frequency);
  }, []);
  const setThreejsJourney = useCallback(() => {
    threejsJourney.current = new ThreejsJourney({
      config: config.current,
      time: time.current,
      world: world.current,
    });
  }, []);
  return <WorldComponent />;
};

export default Folio;
