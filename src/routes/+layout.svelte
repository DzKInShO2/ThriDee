<script lang="ts">
	import '../app.css';

    import { auth } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";
    import { signOut } from "firebase/auth";
	
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

    let search = "";
    function searchAssets() 
    {
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
        <form on:submit|preventDefault={searchAssets} class="flex flex-row justify-between shadow-sm rounded-xl overflow-clip w-80 md:w-160">
            <input type="text" name="s" id="searchbar" placeholder="Search your 3D assets..." class="border-0 w-120 md:w-160 flex-9">
            <button class="bg-[#FFA808] cursor-pointer  active:bg-[#F75B00] w-10 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 mr-1.5">
                    <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                </svg>
            </button>
        </form>
    </div>
    <div>
        {#if $user}
            {@render logoutButton("hidden lg:block")}
        {:else}
            {@render loginButton("hidden lg:block")}
        {/if}
    </div>
</nav>

<div class="transition-all ease-in-out duration-500 fixed bg-white border-r-2 border-[#F7F7F7] shadow-2xl h-screen w-60 {sidebarPosition} p-4 z-40">
    <div class="flex flex-col justify-between items-center gap-3">
        {#if $user}
            <h1>{$user.displayName}</h1>
            {@render logoutButton("")}
        {:else}
            {@render loginButton("")}
        {/if}
    </div>
</div>

<div class="z-10">
{@render children()}
</div>

