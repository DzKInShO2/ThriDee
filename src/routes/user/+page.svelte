<script lang="ts">
import { goto } from "$app/navigation";
import { user } from "$lib/stores/authStore"
import { onMount } from "svelte";

let { data } = $props();

onMount(() => {
    if (!data.user) {
        goto("/");
    }
})

</script>

<div class="profile-full">
	<img src={user.profile_image} class="profile-avatar" alt="Avatar">
	
	<div class="profile-info">
		<h2>{user.username}</h2>
		<p>Member since {new Date(user.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
		<p>{user.bio || 'Tiada bio tersedia.'}</p>
		{#if isOwnProfile}
			<button class="btn-outline-primary" on:click={() => alert('Modal edit belum dilaksanakan')}>Edit Profil</button>
		{/if}
	</div>
</div>

<section style="padding: 2rem">
	<h1 style="margin-bottom: 1rem">Aset oleh {user.username}</h1>
    <div class="grid-assets">
    {#each dummyAssets as asset}
    <div class="card-hover market-item">
        <img src={asset.img} alt={asset.title}/>
        <div class="card-text">
            <h3>{asset.title}</h3>
            <p>Kategori: {asset.category}</p>
            <p>Harga: {asset.price}</p>
        </div>
    </div>
    {/each}
  </div>
</section>
