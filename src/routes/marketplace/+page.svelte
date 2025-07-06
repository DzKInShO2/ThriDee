<script lang="ts">
    import { 
        LoadingOverlayLocal,
        ModelCard,  
    } from "../../components/design"

    import { categories, db } from "$lib/firebase";
    import { collection, getDocs, limit, orderBy, query} from "firebase/firestore";

    async function loadNewestModels() {
        return new Promise((fulfil, _) => {
            const q = query(collection(db, "model"), orderBy("published", "desc"), limit(15));
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
            const q = query(collection(db, "model"), orderBy("price"), limit(15));
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
            const q = query(collection(db, "model"), orderBy("price", "desc"), limit(15));
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
    {#each categories as asset}
    <a href={`/search?c=${asset.id}`} class="card-hover market-item">
        <img src={asset.img} alt={asset.title}/>
        <div class="card-text">
            <p style="font-weight: bold; text-align: center;">{asset.title}</p>
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
        <div class="grid gap-x-8 gap-y-8 mr-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
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
        <div class="grid gap-x-8 gap-y-8 mr-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
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
        <div class="grid gap-x-8 gap-y-8 mr-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
            {#each models as model}
                <ModelCard id={model} />
            {/each}
        </div>
    {/await}
</section>
