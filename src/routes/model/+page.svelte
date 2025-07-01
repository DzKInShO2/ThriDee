<script>
  let user = {
    username: "Rakasya Yoga",
    created_at: "2024-01-15",
    image: "/asset.jpg",
    title: "3D istri saya.",
    category: "Character",
    price: "$10",
  };

  let isOwnProfile = true;
  const dummyAssets = Array.from({ length: 4 }, (_, i) => ({
    title: `Aset Contoh ${i + 1}`,
    price: `$${(i + 1) * 5}`,
    category: ['Character', 'Vehicle', 'Environment', 'Weapon', 'Building', 'Accessory'][i % 6],
    img: '/banner1.png'
  }));
</script>


<div class="flex flex-row items-start gap-8 p-4 justify-start">
    <section style="flex: 2; padding: 2rem; max-width: 1200px; max-height: 1200px">
        <h1 style="margin-bottom: 1rem">Aset Oleh {user.username}</h1>
        <div style="display: flex; flex-direction: column; gap: 1rem">
            <div style="border: 1px solid black; padding: 1rem; border-radius: 8px;">
                <img src={user.image} alt={user.title} style="width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 8px; display: block;" />
                <h3>{user.title}</h3>
                <p>Kategori: {user.category}</p>
                <p>Harga: {user.price}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur in dui id maximus. Pellentesque vitae consequat orci. Nulla hendrerit aliquam diam ac pellentesque. Ut erat odio, tempor nec tortor scelerisque, laoreet dapibus nulla. Phasellus fermentum, est in tempus porta, arcu magna facilisis sem, sit amet tempus eros lorem ut augue. Quisque tempus facilisis malesuada. Nam porttitor justo non eros pretium tincidunt.
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur in dui id maximus. Pellentesque vitae consequat orci. Nulla hendrerit aliquam diam ac pellentesque. Ut erat odio, tempor nec tortor scelerisque, laoreet dapibus nulla. Phasellus fermentum, est in tempus porta, arcu magna facilisis sem, sit amet tempus eros lorem ut augue. Quisque tempus facilisis malesuada. Nam porttitor justo non eros pretium tincidunt.
                </p>
            </div>
        </div>
    </section>

    <section style="flex: 1; padding: 2rem; max-width: 300px">
        <h1 style="margin-bottom: 1rem">Aset terkait</h1>
        <div style="display: flex; flex-direction: column; gap: 1rem">
            {#each dummyAssets as asset}
                <div style="border: 1px solid black; padding: 1rem; border-radius: 8px;">
                    <img src={asset.img} alt={asset.title} style="width: 100%; height: auto" />
                    <h3>{asset.title}</h3>
                    <p>Kategori: {asset.category}</p>
                    <p>Harga: {asset.price}</p>
                </div>
            {/each}
        </div>
    </section>
</div>
