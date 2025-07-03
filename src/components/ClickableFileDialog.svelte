<script lang="ts">
let { children, classNames, extensions="", onchange, file = $bindable() } = $props();

let fileDialog: HTMLInputElement;
let files = $state<any>();

$effect(() => {
    if (files) {
        file = files[0];
    }
});
</script>

<input 
    {onchange}
    type="file" 
    class="hidden" 
    bind:files 
    bind:this={fileDialog} 
    accept={extensions}/>
<button 
    onclick={() => fileDialog.click()}
    class={classNames}>
    {@render children()}
</button>
