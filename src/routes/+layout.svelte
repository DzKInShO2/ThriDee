<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<nav class="flex flex-row justify-between items-center h-15 p-4 shadow-xs gap-5">
    <div>
        <a href="/">
            <img src="/logo.png" class="w-24 h-24 hidden lg:block">
        </a>
        <h1 class="block lg:hidden">Side</h1>
    </div>
    <div>
        <form class="flex flex-row justify-between shadow-sm rounded-xl overflow-clip w-120 md:w-160">
            <input type="text" name="s" id="searchbar" placeholder="Search your 3D assets..." class="border-0 w-120 md:w-160">
            <button class="bg-[#FFA808] cursor-pointer  active:bg-[#F75B00] w-10 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 mr-1.5">
                    <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                </svg>
            </button>
        </form>
    </div>
    <div>
        <a href="/login"><button class="transition-all cursor-pointer bg-[#FFA808] p-2 rounded-xl hidden hover:shadow-lg hover:p-3 active:bg-[#F75B00] lg:block">
            Log-In
        </button></a>
    </div>
</nav>

{@render children()}

