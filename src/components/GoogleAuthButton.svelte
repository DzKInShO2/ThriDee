<script lang="ts">
let { label, onclick } = $props();
</script>

<button
    class="
    transition-all
    border-1
    border-gray-400
    active:scale-[1.1]
    cursor-pointer
    rounded-xl
    flex
    items-center
    gap-5
    justify-center
    shadow-md
    h-12
    w-90
    lg:w-110
    hover:brightness-60
    active:brightness-110
    bg-gray-200"
    {onclick}>
    <img
        class="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
    />
    {label}
</button>
