<script lang="ts">
    import { goto } from "$app/navigation";

    import { currencyFormatter } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";
    import { onMount } from "svelte";

    let { data } = $props();

    let inputElement: HTMLInputElement;
    let staticMapURL = $state("");
    let autocomplete: google.maps.places.Autocomplete | null = null;

    let userLocation = "Jl. Merdeka No. 123, Jakarta";
    let estimatedTime = "3-5 hari kerja";
    let shippingCost = 20000;
    let items = [
        { name: "Model Karakter A", price: 75000 },
        { name: "Model Kendaraan B", price: 50000 }
    ];

    let nextLocation = $state("/");
    onMount(async () => {
        if (data.model === null && !$user) {
            goto("/");
        }

        const { Loader } = await import('@googlemaps/js-api-loader');

        const loader = new Loader({
            apiKey: 'AIzaSyAjMZkTgSVoO2n1wGnizqnb0kZ4Xpt3q0Q',
            libraries: ['places'],
        });

        const google = await loader.load();

        const waitForInput = () =>
            new Promise<void>((resolve) => {
            const check = () => {
                if (inputElement) resolve();
                else requestAnimationFrame(check);
            };
            check();
        });

        await waitForInput();

        if (inputElement) {
            autocomplete = new google.maps.places.Autocomplete(inputELement);
        }
    });

    $effect(() => {
        nextLocation = `/user/history?id=${$user!.uid!}`;
    });
</script>

<section class="h-screen flex flex-col gap-5 p-6">
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
                <li>{data.model!.title} — {currencyFormatter.format(data.model!.price)}</li>
            </ul>
        </div>

        <div class="flex flex-col gap-2 text-gray-700">
            <p><strong>Estimasi Waktu Pengiriman:</strong> {estimatedTime}</p>
            <p><strong>Ongkos Kirim:</strong> {currencyFormatter.format(shippingCost)}</p>
            <p>
                <strong>Total Harga:</strong>
                {currencyFormatter.format(data.model!.price)}
            </p>
            <p>
                <strong>Lokasi Pengiriman:</strong>
            </p>
            <input bind:this={inputElement} />
        </div>

        <button 
            class="cursor-pointer bg-blue-100 text-blue-700 font-semibold rounded-xl p-4 text-center mt-4">
            <i class="fa-solid fa-receipt"></i> Pesan
        </button>

        <!-- <div class="bg-green-100 text-green-700 font-semibold rounded-xl p-4 text-center mt-4"> -->
        <!--     <i class="fa-solid fa-circle-check"></i> Pesanan Anda sedang diproses -->
        <!-- </div> -->
    </div>
</section>
