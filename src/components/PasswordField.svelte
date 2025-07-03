<script lang="ts">

let { title, value = $bindable() } = $props();

let visibility = $state(false);

function onclick() {
    visibility = !visibility;
}

</script>

<div class="flex flex-col gap-2">
    <p class="font-light">{title}</p>
    <div
        class="relative shadow-md rounded-lg w-70 lg:w-100 overflow-clip">
        <input
            bind:value={value}
            type={visibility ? "text" : "password"}
            name="new_password"
            placeholder="Your password..."
            class="
            border-none 
            outline-none 
            focus:ring-0 
            w-full"
            required/>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <i
            {onclick}
            class={`
            transition-transform
            active:scale-[1.1]
            absolute
            fa-solid
            ${ visibility ? "fa-eye-slash" : "fa-eye"}
            right-5
            top-[25%]
            cursor-pointer
            hover:text-[#FFA808]`}></i>
    </div>
</div>
