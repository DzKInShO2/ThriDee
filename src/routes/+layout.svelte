<script lang="ts">
  import "../app.css";

  import { auth } from "$lib/firebase";
  import { user } from "$lib/stores/authStore";
  import { signOut } from "firebase/auth";

  import "$lib/styles/theme.css";
  import { goto } from "$app/navigation";

  let { children } = $props();

  let sidebarPosition = $state("-left-60");
  function toggleSidebar() {
    if (sidebarPosition === "-left-60") {
      sidebarPosition = "-left-0";
    } else {
      sidebarPosition = "-left-60";
    }
  }
</script>

<nav
    class="flex flex-row justify-between items-center h-15 p-4 shadow-xs gap-5 sticky z-40">
    <div>
        <a href="/">
            <img src="/logo.png" class="w-24 h-24 hidden md:block" />
        </a>
        <h1
            class="transition-all block md:hidden active:text-[#FFA808]"
            onclick={() => toggleSidebar()}>
            {#if sidebarPosition === "-left-60"}
                <i class="fa-solid fa-bars"></i>
            {:else}
                <i class="fa-solid fa-x"></i>
            {/if}
        </h1>
    </div>
    <div>
        <form
            action="/search"
            class="flex flex-row justify-between shadow-sm rounded-xl overflow-clip w-full md:w-160 border-1 border-[#FFA808]">
            <input
                type="text"
                name="s"
                id="searchbar"
                placeholder="Search your 3D assets..."
                class="border-0 w-120 md:w-160 flex-9"/>
            <button
                class="bg-[#FFA808] cursor-pointer active:bg-[#F75B00] w-10 flex flex-col items-center justify-center"
                aria-label="Search">
                <i class="fa fa-search text-black"></i>
            </button>
        </form>
    </div>
    <div></div>
</nav>

<nav style="background: var(--color-primary); padding: 1rem; color: white">
    <a href="/" style="margin-right: 1rem; color: white;">Home</a>
    <a href="/marketplace" style="margin-right: 1rem; color: white;">Marketplace</a>
    <a href="/upload" style="margin-right: 1rem; color: white;">Upload</a>
    <a href="/search" style="margin-right: 1rem; color: white;">Search</a>
    <a href="/model" style="margin-right: 1rem; color: white;">View Model</a>
    <a href="/about" style="margin-right: 1rem; color: white;">About Us</a>
    <a href="/user" style="margin-right: 1rem; color: white;">Profile</a>
    <a href="/user/login" style="margin-right: 1rem; color: white;">Login</a>
    <a href="/user/register" style="margin-left: auto; color: white;">Register</a>
    <a style="margin-left: auto; color: white;" class="cursor-pointer" onclick={() => { signOut(auth).then(() => goto("/")) }}>Log Out</a>
</nav>

<div class="h-full">
  {@render children()}
</div>

<!-- Footer -->
<footer class="footer">
    <div class="footer-divider"></div>

    <div class="footer-content">
        <div class="footer-section">
            <h5>TriDee</h5>
            <p>Temukan aset 3D berkualitas tinggi untuk proyek kreatif Anda.</p>
        </div>

        <div class="footer-section">
            <h5>Links</h5>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/marketplace">Marketplace</a></li>
                <li><a href="/user">Profile</a></li>
                <li><a href="/user/login">Login</a></li>
                <li><a href="/user/register">Register</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h5>Kategori Populer</h5>
            <ul>
                <li><a href="/search?s=character">Character</a></li>
                <li><a href="/search?s=vehicle">Vehicle</a></li>
                <li><a href="/search?s=environment">Environment</a></li>
                <li><a href="/search?s=tools">Tools</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">© 2025 TriDee</div>
</footer>
