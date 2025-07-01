<script>
  const dummyAssets = Array.from({ length: 8 }, (_, i) => ({
    title: `Aset Contoh ${i + 1}`,
    price: `$${(i + 1) * 5}`,
    category: ['Character', 'Vehicle', 'Environment', 'Weapon', 'Building', 'Accessory'][i % 6],
    img: '/banner1.png'
  }));
</script>

<section style="padding: 2rem">
  <h1>Hasil pencarian kamu</h1>
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

<section style="padding: 2rem">
  <h1>Asset terkait</h1>
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