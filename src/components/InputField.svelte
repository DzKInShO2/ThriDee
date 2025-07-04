<script lang="ts">
let {title, value = $bindable(), hint="Your email...", isEmail = true } = $props();
</script>

<div class="flex flex-col gap-2">
    <p class="font-light">{title}</p>
{#if isEmail}
    <input
        name="email"
        type="email"
        bind:value={value}
        placeholder={hint}
        class="
        border-none 
        outline-none 
        focus:ring-0 
        shadow-md 
        rounded-lg 
        w-70 
        lg:w-100"
        required/>
{:else}
    <input
        bind:value={value}
        placeholder={hint}
        class="
        border-none 
        outline-none 
        focus:ring-0 
        shadow-md 
        rounded-lg 
        w-70 
        lg:w-100"
        required/>
{/if}
</div>
