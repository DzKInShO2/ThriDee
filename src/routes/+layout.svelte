<script lang="ts">
	import '../app.css';

    import { auth } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";
    import { signOut } from "firebase/auth";
	
	import '$lib/styles/theme.css';

	let { children } = $props();

    let sidebarPosition = $state("-left-60");
    function toggleSidebar()
    {
        if (sidebarPosition === "-left-60") {
            sidebarPosition = "-left-0";
        } else {
            sidebarPosition = "-left-60";
        }
    }
</script>

{#snippet loginButton(visibility)}
    <a href="/account/login"><button class="transition-all cursor-pointer bg-[#ffa808] p-2 rounded-xl hover:shadow-lg hover:p-3 active:bg-[#f75b00] {visibility}">
        Log-In
    </button></a>
{/snippet}

{#snippet logoutButton(visibility)}
    <button class="transition-all cursor-pointer bg-[#ffa808] p-2 rounded-xl hover:shadow-lg hover:p-3 active:bg-[#f75b00] {visibility}" on:click={() => signOut(auth)}>
        Log-Out
    </button>
{/snippet}

<nav class="flex flex-row justify-between items-center h-15 p-4 shadow-xs gap-5 sticky z-40">
    <div>
        <a href="/">
            <img src="/logo.png" class="w-24 h-24 hidden lg:block">
        </a>
        <h1 class="transition-all block lg:hidden active:text-[#FFA808]" on:click={toggleSidebar}>
            {#if sidebarPosition === "-left-60"}
                <i class="fa-solid fa-bars"></i>
            {:else}
                <i class="fa-solid fa-x"></i>
            {/if}
        </h1>
    </div>
    <div>
        <form action="/search" class="flex flex-row justify-between shadow-sm rounded-xl overflow-clip w-80 md:w-160 border-1 border-[#FFA808]">
            <input type="text" name="s" id="searchbar" placeholder="Search your 3D assets..." class="border-0 w-120 md:w-160 flex-9">
            <button class="bg-[#FFA808] cursor-pointer  active:bg-[#F75B00] w-10 flex flex-col items-center justify-center" aria-label="Search">
                <i class="fa fa-search text-black"></i>
            </button>
        </form>
    </div>
    <div class="flex flex-row items-center gap-2">
        <a href="/login" class="bg-[#FFA808] active:bg-[#F75B00] p-2 rounded-xl hidden lg:block text-black text-center">
            Log-In
        </a>
        <a href="/register" class="bg-[#FFA808] active:bg-[#F75B00] p-2 rounded-xl hidden lg:block text-black text-center">
            Register
        </a>
    <div>
        {#if $user}
            {@render logoutButton("hidden lg:block")}
        {:else}
            {@render loginButton("hidden lg:block")}
        {/if}
    </div>
</nav>

<nav style="background: var(--color-primary); padding: 1rem; color: white">
  <a href="/" style="margin-right: 1rem; color: white;">Home</a>
  <a href="/marketplace" style="margin-right: 1rem; color: white;">Marketplace</a>
  <a href="/upload" style="margin-right: 1rem; color: white;">Upload</a>
  <a href="/search" style="margin-right: 1rem; color: white;">Search</a>
  <a href="/model" style="margin-right: 1rem; color: white;">View Model</a>
  <a href="/about" style="margin-right: 1rem; color: white;">About Us</a>
  <a href="/profile" style="margin-right: 1rem; color: white;">Profile</a>
  <a href="/login" style="margin-right: 1rem; color: white;">Login</a>
  <a href="/register" style="margin-left: auto; color: white;">Register</a>
</nav>


{@render children()}


<!-- Footer -->
<footer class="footer bg-[#22223b] text-black mt-16">
    <div class="border-t border-[#FFA808]">
    </div>

    <div class="footer-content max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 md:gap-16">
        <div class="footer-section flex-1">
            <h5 class="text-xl font-bold mb-2 text-[#FFA808]">TriDee</h5>
            <p class="text-sm">Temukan aset 3D berkualitas tinggi untuk proyek kreatif Anda.</p>
        </div>
        
        <div class="footer-section flex-1">
            <h5 class="text-lg font-semibold mb-2 text-[#FFA808]">Links</h5>
            <ul class="space-y-1">
                <li><a href="/" class="hover:text-[#FFA808] transition">Home</a></li>
                <li><a href="/marketplace" class="hover:text-[#FFA808] transition">Marketplace</a></li>
                <li><a href="/profile" class="hover:text-[#FFA808] transition">Profile</a></li>
                <li><a href="/login" class="hover:text-[#FFA808] transition">Login</a></li>
                <li><a href="/register" class="hover:text-[#FFA808] transition">Register</a></li>
            </ul>
        </div>
        
        <div class="footer-section flex-1">
            <h5 class="text-lg font-semibold mb-2 text-[#FFA808]">Kategori Populer</h5>
            <ul class="space-y-1">
                <!-- ubah nanti -->
                <li><a href="/search?s=character" class="hover:text-[#FFA808] transition">Character</a></li>
                <li><a href="/search?s=vehicle" class="hover:text-[#FFA808] transition">Vehicle</a></li>
                <li><a href="/search?s=environment" class="hover:text-[#FFA808] transition">Environment</a></li>
                <li><a href="/search?s=tools" class="hover:text-[#FFA808] transition">Tools</a></li>
            </ul>
        </div>
    </div>

    <div class="footer-bottom text-center py-4 border-t border-[#FFA808] text-gray-400 text-sm">
        © 2025 ThriDee
    </div>
</footer>
