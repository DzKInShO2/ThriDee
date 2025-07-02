<script lang="ts">
  let user = {
    username: "Rakasya Yoga",
    created_at: "2024-01-15",
    profile_image: "/asset.jpg",
    bio: "Mahasiswa Informatika dan kreator 3D enthusiast."
  };

  let isOwnProfile = true;
  const dummyAssets = Array.from({ length: 8 }, (_, i) => ({
    title: `Aset Contoh ${i + 1}`,
    price: `$${(i + 1) * 5}`,
    category: ['Character', 'Vehicle', 'Environment', 'Weapon', 'Building', 'Accessory'][i % 6],
    img: '/banner1.png'
  }));
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
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem">
    {#each dummyAssets as asset}
      <div style="border: 1px solid var(--color-border); padding: 1rem; border-radius: 8px;">
        <img src={asset.img} alt={asset.title} style="width: 100%; height: auto" />
        <h3>{asset.title}</h3>
        <p>Kategori: {asset.category}</p>
        <p>Harga: {asset.price}</p>
      </div>
    {/each}
    </div>
</section>
