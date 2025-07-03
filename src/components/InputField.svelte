<script lang="ts">
let {title, value = $bindable(), hint="Your email..." } = $props();
</script>

<div class="flex flex-col gap-2">
    <p class="font-light">{title}</p>
    <input
        bind:value={value}
        type="email"
        name="email"
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
</div>
