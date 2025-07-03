<script>
  const dummyAssets = Array.from({ length: 12 }, (_, i) => ({
    title: `Aset Contoh ${i + 1}`,
    price: `$${(i + 1) * 5}`,
    category: ['Character', 'Vehicle', 'Environment', 'Weapon', 'Building', 'Accessory'][i % 6],
    img: ['/char.jpg', '/vehicle.jpg', '/environment.png', '/weapon.jpg', '/building.png', '/accessory.jpg'][i % 6]
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
  <div class="grid-assets">
    {#each dummyAssets.slice(0, 6) as asset}
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

<section style="padding: 2rem">
  <h1>On sale 3D assets</h1>
    <div class="grid-assets">
    {#each dummyAssets as asset}
    <div class="card-hover">
        <img src={asset.img} alt={asset.title} class="w-full h-auto rounded-md block m-auto" />
        <div class="card-text">
            <h3>{asset.title}</h3>
            <p>Kategori: {asset.category}</p>
            <p>Harga: {asset.price}</p>
        </div>
    </div>
    {/each}
  </div>
</section>

<section style="padding: 2rem">
  <h1>Best 3D assets</h1>
    <div class="grid-assets">
    {#each dummyAssets as asset}
    <div class="card-hover">
        <img src={asset.img} alt={asset.title} class="w-full h-auto rounded-md block m-auto" />
        <div class="card-text">
            <h3>{asset.title}</h3>
            <p>Kategori: {asset.category}</p>
            <p>Harga: {asset.price}</p>
        </div>
    </div>
    {/each}
  </div>
</section>

<section style="padding: 2rem">
  <h1>New release discounts</h1>
    <div class="grid-assets">
    {#each dummyAssets as asset}
    <div class="card-hover">
        <img src={asset.img} alt={asset.title} class="w-full h-auto rounded-md block m-auto" />
        <div class="card-text">
            <h3>{asset.title}</h3>
            <p>Kategori: {asset.category}</p>
            <p>Harga: {asset.price}</p>
        </div>
    </div>
    {/each}
  </div>
</section>