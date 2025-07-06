<script lang="ts">
    import { goto } from '$app/navigation';
    import { user } from '$lib/stores/authStore.js';
    import { onMount } from 'svelte';
    import { ModelCard, PaymentDialog } from '../../../components/design';
    import { doc, getDoc } from 'firebase/firestore';
    import { currencyFormatter, db } from '$lib/firebase';
    import type { DocumentReference } from 'firebase-admin/firestore';
    import { fade } from 'svelte/transition';


    let { data } = $props();
    onMount(() => {
        if (data.user === "") {
            goto("/");
        }
    });

    $effect(() => {
        if ($user && $user!.uid !== data.user) {
            goto("/");
        }
    });

    let orderList = $state(Array<{
        title: String,
        price: number
    }>());

    let modelsPurchased = $state(Array<String>());
    getDoc(doc(db, "user", data.user)).then((docSnap) => {
        const ordered = docSnap.data()!.ordered as Array<DocumentReference>;
        const purchased = docSnap.data()!.purchased as Array<DocumentReference>;

        if (ordered !== undefined && ordered !== null) {
            ordered.forEach((oRef) => {
                getDoc(oRef).then((oSnap) => {
                    orderList.push({
                        id: oSnap.id,
                        title: oSnap.data().title,
                        price: oSnap.data().price
                    });
                });
            });
        }

        if (purchased !== undefined && purchased !== null) {
            purchased.forEach((pRef) => {
                modelsPurchased.push(pRef.id);
            });
        }
    });

    let paymentVisible = $state(false);
</script>

<PaymentDialog bind:visible={paymentVisible} bind:values={orderList} bind:transfers={modelsPurchased} />

<section class="min-h-screen flex flex-col gap-5">
    <div class="flex flex-col md:flex-row p-5 gap-5">
        <div class="flex flex-col gap-5 w-full overflow-clip rounded-xl shadow-2xl h-128">
            <p class="font-semibold text-xl shadow-md
                text-center bg-[#FFA808] p-3
                text-white"><i class="fa-solid fa-shopping-cart"></i> Dalam Keranjang</p>
            {#if (orderList.length > 0)}
                <div class="flex flex-wrap overflow-y-scroll gap-5 p-5 justify-center" transition:fade>
                    {#each orderList as model}
                        <ModelCard id={model.id} />
                    {/each}
                </div>
                <div class="p-5 flex flex-col gap-3">
                    <p class="text-lg">
                        Total Biaya: <span class="font-semibold">
                            {currencyFormatter.format(orderList.map(i => i.price).reduce((a, c) => a + c, 0))}
                        </span>
                    </p>
                    <button 
                        onclick={() => paymentVisible = true }
                        class="cursor-pointer border rounded-xl p-2 hover:bg-gray-200 active:bg-gray-400">
                        <i class="fa-solid fa-cash-register"></i>
                        Bayar
                    </button>
                </div>
            {:else}
                <p class="text-center p-5">Pengguna belum pernah memesan model</p>
            {/if}
        </div>

        <div class="flex flex-col gap-5 w-full overflow-clip rounded-xl shadow-2xl max-h-200">
            <p class="font-semibold text-xl shadow-md
                text-center bg-[#FFA808] p-3
                text-white"><i class="fa-solid fa-cube"></i> Model</p>
            {#if (modelsPurchased.length > 0)}
                <div class="flex flex-wrap overflow-y-scroll gap-5 p-5 justify-center">
                    {#each modelsPurchased as model}
                        <ModelCard id={model} />
                    {/each}
                </div>
            {:else}
                <p class="text-center p-5">Pengguna belum pernah membeli model</p>
            {/if}
        </div>
    </div>
</section>
