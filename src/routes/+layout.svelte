<script lang="ts">
import "../app.css";

import { page } from "$app/state";
import { goto } from "$app/navigation";

import "$lib/styles/theme.css";
import { auth, categories } from "$lib/firebase";
import { user } from "$lib/stores/authStore";

import { signOut } from "firebase/auth";

import { 
    ProfilePhoto,
    LoadingOverlay
} from "../components/design";

let { children } = $props();

let sidebarPosition = $state("-left-60");
function toggleSidebar() {
    if (sidebarPosition === "-left-60") {
        sidebarPosition = "-left-0";
    } else {
        sidebarPosition = "-left-60";
    }
}

let menuShown = $state(false);
let isLoggedIn = $state(false);
$effect(() => {
    isLoggedIn = $user !== null;
    menuShown = false;
});

let search = $state("");
</script>

<LoadingOverlay />

<nav
    class="flex flex-row justify-between items-center h-15 p-4 shadow-xs gap-5 sticky z-40">
    <div>
        <a href="/" aria-label="TriDee Beranda">
            <img src="/logo.png" class="w-24 h-24 hidden md:block" alt="TriDee Logo" />
        </a>
        <button
            class="transition-all block md:hidden active:text-[#FFA808]"
            onclick={() => {toggleSidebar(); menuShown = !menuShown }}>
            {#if sidebarPosition === "-left-60"}
                <i class="fa-solid fa-bars"></i>
            {:else}
                <i class="fa-solid fa-x"></i>
            {/if}
        </button>
    </div>
    <div>
        <form
            onsubmit={(e) => {
                e.preventDefault();

                const category = page.url.searchParams.get("c") ? `&c=${page.url.searchParams.get("c")}` : "";
                const price = page.url.searchParams.get("p") ? `&p=${page.url.searchParams.get("p")}` : "";
                goto(`/search?s=${search}${category}${price}`);
            }}
            action="/search"
            class="Searchbar">
            <input
                bind:value={search}
                type="text"
                name="s"
                id="searchbar"
                placeholder="Cari 3D model..."
            />
            <button
                class="
                bg-[#FFA808] 
                cursor-pointer 
                active:bg-[#F75B00] 
                w-10 
                flex flex-col 
                items-center justify-center
                active:scale-[1.1]"
                aria-label="Search">
                <i class="fa fa-search text-black"></i>
            </button>
        </form>
    </div>

    <div class="user-nav">
    {#if isLoggedIn}
        <div class="auth-links">
            <div class="flex gap-3 items-center">
                <a href="/model/new" class="btn-upload hidden lg:block">
                    <i class="fa-solid fa-upload"></i> Unggah
                </a>
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button 
                    onclick={() => menuShown = !menuShown }
                    class="hidden md:block">
                    <div class="cursor-pointer border-2 border-[#FFA808] overflow-clip w-[48px] h-[48px] rounded-full">
                        <ProfilePhoto photoUrl={$user!.photoURL} />
                    </div>
                </button>
            </div>
            {#if menuShown}
                <div class="profile-dropdown">
                    <a href="/model/new" class="mobile">
                        <i class="fa-solid fa-upload"></i> Unggah
                    </a>
                    <a href={`/user?id=${$user!.uid}`} rel="external" class="block"><i class="fa-solid fa-user"></i> Profil Saya</a>
                    <a href={`/user/own?id=${$user!.uid}`} rel="external" class="block"><i class="fa-solid fa-cube"></i> Asset Saya</a>
                    <a href={`/user/history?id=${$user!.uid}`} rel="external" class="block"><i class="fa-solid fa-clipboard"></i> Pesanan Saya</a>
                    <a href={`/user/penghasilan?id=${$user!.uid}`} rel="external" class="block"><i class="fa-solid fa-money-bill"></i> Penghasilan</a>
                    <a class="block" href="/" rel="external" onclick={() => signOut(auth)}><i class="fa-solid fa-right-from-bracket"></i> Sign Out</a>
                </div>
            {/if}
        </div>
    {:else}
        {#if menuShown}
        <div class="profile-dropdown">
            <a href="/user/login" style="display: block" class="">Login</a>
            <a href="/user/register" style="display: block" class="">Register +</a>
        </div>
        {/if}

        <div class="auth-links hidden md:block">
            <a href="/user/login" class="btn-auth">Login</a>
            <a href="/user/register" class="btn-auth">Register +</a>
        </div>
    {/if}
    </div>
</nav>

<nav style="background: var(--color-primary); padding: 1rem; color: white">
    <a href="/" style="margin-right: 1rem; color: white;">Beranda</a>
    <a href="/marketplace" style="margin-right: 1rem; color: white;">Produk</a>
    <a href="/search?s=&c=&p=" style="margin-right: 1rem; color: white;">Cari</a>
</nav>

<div class="h-full">
  {@render children()}
</div>

<!-- Footer -->
<footer class="footer hidden md:block">
    <div class="footer-divider"></div>

    <div class="footer-content">
        <div class="footer-section">
            <h5>
                <a href="/about">Tentang Kami</a>
            </h5>
            <h5>ThriDee</h5>
            <p>Temukan aset 3D berkualitas tinggi untuk proyek kreatif Anda.</p>
        </div>

        <div class="footer-section">
            <h5>Tautan</h5>
            <ul>
                <li><a href="/">Beranda</a></li>
                <li><a href="/search?s=&c=&p=">Cari</a></li>
                <li><a href="/marketplace">Produk</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h5>Kategori Populer</h5>
            <ul>
                {#each categories.slice(0, 4) as asset}
                    <li><a href="/search?s=&c={asset.id}&p=" rel="external">{asset.title}</a></li>
                {/each}
            </ul>
        </div>
    </div>
</footer>
<div class="footer-bottom">© 2025 ThriDee</div>
