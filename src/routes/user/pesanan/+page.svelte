<script lang="ts">
    import { goto } from "$app/navigation";

    import { ActionConfirmDialog } from "../../../components/design";

    import { currencyFormatter, db } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";
    import { isLoading } from "$lib/stores/stateStore";
    import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    let { data } = $props();

    let completeParent: HTMLDivElement;
    let staticMapUrl = $state<String>("https://maps.googleapis.com/maps/api/staticmap?center=Z%C3%BCrich&zoom=12&size=720x720&key=AIzaSyAjMZkTgSVoO2n1wGnizqnb0kZ4Xpt3q0Q&libraries=places");
    let locationName = $state("");

    let estimatedTime = "3-5 hari kerja";
    let shippingCost = 20000;

    let isOrdered = $state(false);
    function googleMap(lat, lng) {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=720x720&markers=color:red%7C${lat},${lng}&key=AIzaSyAjMZkTgSVoO2n1wGnizqnb0kZ4Xpt3q0Q`;
    }

    onMount(() => {
        if (data.model === null && !$user) {
            goto("/");
        }

        //@ts-ignore
        const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();
        //@ts-ignore
        placeAutocomplete.id = 'place-autocomplete-input';
        placeAutocomplete.className = "border-gray-300 ring-0 shadow-xl rounded-xl";
        placeAutocomplete.addEventListener('gmp-select', async ({ placePrediction }) => {
            const place = placePrediction.toPlace();
            await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });
            const userLocation = place.toJSON();
            staticMapUrl = googleMap(userLocation.location.lat, userLocation.location.lng);
            locationName = userLocation.formattedAddress;
        });
        completeParent.appendChild(placeAutocomplete);
    });

    let error = $state("");
    let confirmVisible = $state(false);
    let nextLocation = $state("/user/history");

    const printPrice = 2000;
    async function sendOrder() {
        $isLoading = true;
        addDoc(collection(db, "transaction"), {
            customer: $user!.uid,
            products: [
                doc(db, "model", data.model.id)
            ], 
            time: Timestamp.now(),
            totalPrice: printPrice + (data.model!.price * 0.1) + shippingCost,
            type: 1,
            location: locationName,
            status: 0
        }).then(() => {
            isOrdered = true;
            confirmVisible = false;
            $isLoading = false;
        })
    }

    $effect(() => {
        if (!$user) {
            nextLocation = `/user/history?id=${$user!.uid}`;
        }
    })
</script>

<ActionConfirmDialog 
    bind:visibility={confirmVisible} 
    label="Apakah anda yakin?" 
    text="Apakah anda ingin memesan cetakan model"
    onaccept={sendOrder}
/>

<section class="min-h-screen flex flex-col gap-5 p-6">
    <div class="bg-white rounded-xl shadow-2xl p-6 flex flex-col gap-5 w-full max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-[#FFA808] flex items-center gap-2">
            <i class="fa-solid fa-print"></i> Cetak Fisik Aset 3D
            </h2>
            <a href={nextLocation}> <i class="fa-solid fa-clock-rotate-left"></i> Riwayat Pemesanan</a>
        </div>

        <div class="flex flex-col gap-3">
            <p class="text-lg font-semibold text-gray-700">Daftar Pesanan:</p>
            <ul class="list-disc list-inside pl-2 text-gray-800">
                <li>{data.model!.title} — {currencyFormatter.format(printPrice + (data.model!.price * 0.1))}</li>
            </ul>
        </div>

        <div class="flex flex-col gap-2 text-gray-700">
            <p><strong>Estimasi Waktu Pengiriman:</strong> {estimatedTime}</p>
            <p><strong>Ongkos Kirim:</strong> {currencyFormatter.format(shippingCost)}</p>
            <p>
                <strong>Total Harga:</strong>
                {currencyFormatter.format(printPrice + (data.model!.price * 0.1) + shippingCost)}
            </p>
            <p>
                <strong>Lokasi Pengiriman:</strong>
                {locationName}
            </p>
        </div>

        <div bind:this={completeParent}>
        </div>

        {#key staticMapUrl}
            {#if staticMapUrl}
                <div class="w-full h-100 rounded-xl justify-items-center overflow-clip">
                    <img class="object-contain" src={staticMapUrl} alt="Static Map" />
                </div>
            {/if}
        {/key}

        {#if error !== ""}
            <p transition:slide class="text-center text-red-500">{error}</p>
        {/if}

        {#if !isOrdered}
            <button 
                onclick={() => {
                    if (locationName === "") {
                        error = "Mohon isi semua field sebelum lanjut.";
                        return;
                    }
                    confirmVisible = true;
                }}
                class="cursor-pointer bg-blue-100 text-blue-700 font-semibold rounded-xl p-4 text-center mt-4">
                <i class="fa-solid fa-receipt"></i> Pesan
            </button>
        {:else}
            <div class="bg-green-100 text-green-700 font-semibold rounded-xl p-4 text-center mt-4">
                <i class="fa-solid fa-circle-check"></i> Pesanan Anda sedang diproses
            </div>
        {/if}
    </div>
</section>
