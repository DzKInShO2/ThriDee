<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<nav class="flex item-align-center outline bg-black text-white gap-x-2 justify-center items-center font-bold h-12">
    <a class="bg-[#ffff00] text-[#ff0000] p-[10px] rounded-full active:text-black hover:bg-[#ff00ff]" href="/">Home</a>
    <a class="bg-[#ffff00] text-[#ff0000] p-[10px] rounded-full active:text-black hover:bg-[#ff00ff]" href="/about">About</a>
</nav>

{@render children()}
