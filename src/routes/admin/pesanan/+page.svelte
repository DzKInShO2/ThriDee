<script lang="ts">
    import { currencyFormatter, db, status } from '$lib/firebase';
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { doc, setDoc } from 'firebase/firestore';

    let { data } = $props();

	let order: any = $state(null);
    onMount(() => {
        if (data.printOrder === null) {
            goto("/admin/antrian");
        } else {
            order = data.printOrder
        }
    });

	let selectedStatus = $state(0);
    $effect(() => {
        if (order) {
            selectedStatus = data.printOrder!.status;
        }
    })

	function updateStatus() {
        setDoc(doc(db, "transaction", order!.id), {
            status: selectedStatus
        }, { merge: true }).then(() => {
            goto('/admin/antrian');
        });
	}
</script>

<section class="max-w-3xl mx-auto p-6 flex flex-col gap-6 h-screen">
    <div class="flex items-center justify-between mb-4">    
        <h2 class="text-2xl font-bold text-[#FFA808]">
            <i class="fa-solid fa-file-invoice"></i> Detail Pesanan
        </h2>
        <a href="../admin/antrian"> <i class="fa-solid fa-clock-rotate-left"></i> Antrian Pemesanan</a>
    </div>

    {#if order}
        <div class="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
            <p><strong>Nama Aset:</strong> {order!.assetName}</p>
            <p><strong>Pemesan:</strong> {order!.buyer}</p>
            <p><strong>Tanggal Pemesanan:</strong> {order!.date}</p>
            <p><strong>Lokasi Pengiriman:</strong> {order!.location}</p>
            <p><strong>Harga Aset:</strong> {currencyFormatter.format(order!.price)}</p>
            <p><strong>Ongkos Kirim:</strong> {currencyFormatter.format(order!.shippingCost)}</p>
            <p><strong>Total:</strong> <span class="font-semibold">{currencyFormatter.format(order!.price + order!.shippingCost)}</span></p>

            <div class="flex flex-col gap-2 mt-4">
                <label for="status" class="font-medium">Ubah Status:</label>
                <select bind:value={selectedStatus} id="status" class="border rounded-lg p-2 w-30">
                    {#each [ 0, 1, 2 ] as s}
                        <option value={s}>{status[s]}</option>
                    {/each}
                </select>
                <button
                    on:click={updateStatus}
                    class="mt-2 bg-[#FFA808] text-white px-4 py-2 rounded-lg hover:bg-[#e69b06] w-fit">
                    Simpan Perubahan
                </button>
            </div>
        </div>
    {/if}
</section>
