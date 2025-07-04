<script lang="ts">
    import { 
        LoadingOverlayLocal,
        ModelCard,  
    } from "../../components/design"

    import { db } from "$lib/firebase";
    import { collection, getDocs, limit, orderBy, query} from "firebase/firestore";

    const katagori = Array.from({ length: 6 }, (_, i) => ({
        title: `Aset Contoh ${i + 1}`,
        price: `$${(i + 1) * 5}`,
        category: ['Accessory', 'Building', 'Character', 'Environment', 'Vehicle', 'Weapon'][i%6],
        img     : ['/accessory.jpg', '/building.png', '/char.jpg', '/environment.png', '/vehicle.jpg', '/weapon.jpg'][i%6]
    }));

    async function loadNewestModels() {
        return new Promise((fulfil, _) => {
            const q = query(collection(db, "model"), orderBy("published", "desc"), limit(12));
            getDocs(q).then((qSnap) => {
                let ids = Array<String>();
                qSnap.forEach((dSnap) => {
                    ids.push(dSnap.id);
                });

                fulfil(ids);
            });
        });
    }

    async function loadCheapestModels() {
        return new Promise((fulfil, _) => {
            const q = query(collection(db, "model"), orderBy("price"), limit(12));
            getDocs(q).then((qSnap) => {
                let ids = Array<String>();
                qSnap.forEach((dSnap) => {
                    ids.push(dSnap.id);
                });

                fulfil(ids);
            });
        });
    }

    async function loadExpensiveModels() {
        return new Promise((fulfil, _) => {
            const q = query(collection(db, "model"), orderBy("price", "desc"), limit(12));
            getDocs(q).then((qSnap) => {
                let ids = Array<String>();
                qSnap.forEach((dSnap) => {
                    ids.push(dSnap.id);
                });

                fulfil(ids);
            });
        });
    }

    let newestModelsPromise = $state(loadNewestModels());
    let cheapestModelsPromise = $state(loadCheapestModels());
    let expensiveModelsPromise = $state(loadExpensiveModels());
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
  <h1>Model Berdasarkan Kategori</h1>
  <div class="grid-assets">
    {#each katagori as asset}
    <a href={`/search?c=${asset.category}`} class="card-hover market-item">
        <img src={asset.img} alt={asset.title}/>
        <div class="card-text">
            <p style="font-weight: bold; text-align: center;">{asset.category}</p>
        </div>
      </a>
    {/each}
  </div>
</section>

<section style="padding: 2rem">
  <h1>Model Terbaru <i class="fa-solid fa-fire"></i></h1>
    {#await newestModelsPromise}
        <LoadingOverlayLocal />
    {:then models}
        <div class="flex gap-5 flex-wrap">
            {#each models as model}
                <ModelCard id={model} />
            {/each}
        </div>
    {/await}
</section>

<section style="padding: 2rem">
  <h1>Model Termurah <i class="fa-solid fa-heart"></i></h1>
    {#await cheapestModelsPromise}
        <LoadingOverlayLocal />
    {:then models}
        <div class="flex gap-5 flex-wrap">
            {#each models as model}
                <ModelCard id={model} />
            {/each}
        </div>
    {/await}
</section>

<section style="padding: 2rem">
  <h1>Model Termahal <i class="fa-solid fa-money-bill-wave"></i></h1>
    {#await expensiveModelsPromise}
        <LoadingOverlayLocal />
    {:then models}
        <div class="flex gap-5 flex-wrap">
            {#each models as model}
                <ModelCard id={model} />
            {/each}
        </div>
    {/await}
</section>
