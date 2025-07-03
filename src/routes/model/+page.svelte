<script lang="ts">

import {
    ModelViewport 
}from "../../components/design"

import { onMount } from 'svelte';
import { goto } from '$app/navigation';

const { data } = $props();

onMount(() => {
    if (data.modelData === null) {
        goto("/")
    }
})

</script>

<section class="h-screen">
    <ModelViewport model={data.modelData} />
</section>
