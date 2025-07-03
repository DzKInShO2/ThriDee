<script lang="ts">

import { onMount } from 'svelte';

import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders";

let { model = $bindable(), external = $bindable() } = $props();

let canvas: HTMLCanvasElement;
onMount(() => {
    let engine = new BABYLON.Engine(canvas, true);
    let camera: BABYLON.ArcRotateCamera|null = null;
    function createScene() : BABYLON.Scene {
        let scene = new BABYLON.Scene(engine);

        canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        canvas.addEventListener('mouseup', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        window.addEventListener("resize", () => {
            engine.resize();
        });

        camera = new BABYLON.ArcRotateCamera(
            'camera1',
            Math.PI / 2,
            Math.PI / 2,
            4,
            new BABYLON.Vector3(0, 0, 0),
            scene
        )

        camera.setPosition(new BABYLON.Vector3(10, 10, 10))
        camera.attachControl(canvas, true)
        camera.lowerRadiusLimit = 1
        camera.upperRadiusLimit = 50
        camera.wheelDeltaPercentage = 0.01

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        if (model) {
            BABYLON.AppendSceneAsync(model.binary, scene, {
                pluginExtension: `.${model.type}`
            });
        }

        return scene
    }

    let scene = $state(createScene());
    engine.runRenderLoop(() => scene.render());

    external = {
        engine: engine,
        camera: camera,
        scene: scene
    };

    $effect(() => {
        if (model) {
            let scene = createScene();
            engine.runRenderLoop(() => scene.render());

            external = {
                engine: engine,
                camera: camera,
                scene: scene
            };
        }
    });
})

</script>

<canvas
    bind:this={canvas}
    class="
    rounded-md
    w-full
    h-full
    ">
</canvas>
