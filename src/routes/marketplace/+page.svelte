<script>
  const dummyAssets = Array.from({ length: 12 }, (_, i) => ({
    title: `Aset Contoh ${i + 1}`,
    price: `$${(i + 1) * 5}`,
    category: ['Character', 'Vehicle', 'Environment', 'Weapon', 'Building', 'Accessory'][i % 6],
    img: '/banner1.png'
  }));
</script>

<section class="marketplace">
    <div class="Home-overlay">
      <div class="Home-content">
        <h1 class="display-4 fw-bold">ThriDee</h1>
        <p class="lead mb-4">"Jelajahi koleksi aset 3D berkualitas tinggi yang dirancang untuk memperkaya proyek kreatif Anda dan membawa ide-ide Anda menjadi nyata."</p>
      </div>
    </div>
</section>

<section style="padding: 2rem">
  <h1>Shop by category</h1>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem">
    {#each dummyAssets.slice(0, 6) as asset}
      <div style="border: 1px solid var(--color-border); padding: 1rem; border-radius: 8px;">
      <img src={asset.img} alt={asset.title} style="width: 100%; height: auto" />
      <h3 class="text-center">{asset.category}</h3>
      </div>
    {/each}
    </div>
</section>

<section style="padding: 2rem">
  <h1>On sale 3D assets</h1>
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
  <h1>Best 3D assets</h1>
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
  <h1>New release discounts</h1>
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