<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';

import * as BABYLON from '@babylonjs/core';
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";

const { data } = $props();

let canvas: HTMLCanvasElement;
onMount(() => {
    registerBuiltInLoaders();

    if (data.modelData === null) {
        goto("/")
    }

    let engine = new BABYLON.Engine(canvas, true);

    function createScene() : BABYLON.Scene {
        let scene = new BABYLON.Scene(engine);

        let camera = new BABYLON.ArcRotateCamera(
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

        BABYLON.LoadAssetContainerAsync(data.modelData.binary, scene)

        return scene
    }

    const scene = createScene();

    engine.runRenderLoop(() => scene.render());
})

</script>

<canvas
    bind:this={canvas}
    class="
    w-[512px]
    h-[512px]
    ">
</canvas>
