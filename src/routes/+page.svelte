<script lang="ts">
  const dummyAssets = Array.from({ length: 12 }, (_, i) => ({
    category: ['Character', 'Vehicle', 'Environment', 'Weapon', 'Building', 'Accessory'][i % 6],
    img: ['/char.jpg', '/vehicle.jpg', '/environment.png', '/weapon.jpg', '/building.png', '/accessory.jpg'][i % 6]
  }));
</script>


<section class="Home">
    <div class="Home-overlay">
          <div class="Home-content">
              <!-- <h1 class="display-4 fw-bold">ThriDee</h1> -->
              <img src="/logo.png" alt="ThriDee" />
              <p class="lead mb-4">"Jelajahi koleksi aset 3D berkualitas tinggi yang dirancang untuk memperkaya proyek kreatif Anda dan membawa ide-ide Anda menjadi nyata."</p>
              <a href="/marketplace" class="btn">JELAJAHI SEKARANG</a>
          </div>
    </div>
</section>

<div class="flex flex-col items-center justify-between py-8">
    <div class="w-full md:w-4/5 px-4">
        <h1 class="text-3xl font-bold mb-4">ABOUT US</h1>
        <h2 class="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur in dui id maximus. Pellentesque vitae consequat orci. Nulla hendrerit aliquam diam ac pellentesque. Ut erat odio, tempor nec tortor scelerisque, laoreet dapibus nulla. Phasellus fermentum, est in tempus porta, arcu magna facilisis sem, sit amet tempus eros lorem ut augue. Quisque tempus facilisis malesuada. Nam porttitor justo non eros pretium tincidunt.
        </h2>

        <div class="about-section mt-8">
            <div class="image-section">
                <img src="/char.jpg" alt="awalan" />
            </div>
            <div class="text-section">
                <div class="content">
                <h1>Temukan Desain 3D Anda</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur in dui id maximus. Pellentesque vitae consequat orci. Nulla hendrerit aliquam diam ac pellentesque. Ut erat odio, tempor nec tortor scelerisque, laoreet dapibus nulla. Phasellus fermentum, est in tempus porta, arcu magna facilisis sem, sit amet tempus eros lorem ut augue. Quisque tempus facilisis malesuada. Nam porttitor justo non eros pretium tincidunt.
                </p>
                </div>
            </div>
        </div>

        <div class="about-section reverse">
            <div class="text-section">
                <div class="content">
                <h1>Eksplorasi Aset 3D</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur in dui id maximus. Pellentesque vitae consequat orci. Nulla hendrerit aliquam diam ac pellentesque. Ut erat odio, tempor nec tortor scelerisque, laoreet dapibus nulla. Phasellus fermentum, est in tempus porta, arcu magna facilisis sem, sit amet tempus eros lorem ut augue. Quisque tempus facilisis malesuada. Nam porttitor justo non eros pretium tincidunt.
                </p>
                </div>
            </div>
            <div class="image-section">
                <img src="/environment.png" alt="awalan" />
            </div>
        </div>
    </div>
</div>  

<section style="padding: 2rem">
<h1>Start Exploring NOW</h1>
<div class="grid-assets">
    {#each dummyAssets.slice(0, 6) as asset}
        <a href="/search?s={asset.category}" class="card-hover">
            <img src={asset.img} alt={asset.category} class="object-cover w-full h-full" />
            <div class="absolute bg-[#FFFFFF10] text-white w-full bottom-0 p-2">
                <p style="font-weight: bold; text-align: center;">{asset.category}</p>
            </div>
        </a>
    {/each}
</div>
</section>