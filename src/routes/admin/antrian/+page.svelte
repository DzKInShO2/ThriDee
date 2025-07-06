<script lang="ts">
    import { goto } from '$app/navigation';
    import { currencyFormatter, db, status } from "$lib/firebase";
    import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
    import { onMount } from 'svelte';

    interface PrintOrder {
        id: String;
        assetName: string;
        buyer: string;
        date: string;
        price: number;
        shippingCost: number;
        location: string;
        status: 'Diproses' | 'Selesai' | 'Dibatalkan';
    }

    let printOrders: PrintOrder[] = $state(Array<PrintOrder>());
    onMount(() => {
        onSnapshot(query(collection(db, "transaction"), where("type", "==", 1), orderBy("time", "desc")), (onSnap) => {
            printOrders = Array<PrintOrder>();
            onSnap.forEach((dSnap) => {
                getDoc(dSnap.data()!.products[0]).then((pSnap) => {
                    getDoc(doc(db, "user", dSnap.data()!.customer)).then((uSnap) => {
                        printOrders.push({
                            id: dSnap!.id,
                            assetName: pSnap.data()!.title,
                            buyer: uSnap.data()!.user,
                            date: dSnap.data()!.time.toDate().toLocaleString(),
                            price: dSnap.data()!.totalPrice - 20000,
                            shippingCost: 20000,
                            location: dSnap.data()!.location,
                            status: status[dSnap.data()!.status]
                        });
                    });
                });
            });
        });
    });
</script>

<section class="h-auto p-6 flex flex-col gap-6 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold text-[#FFA808] flex items-center gap-2">
        <i class="fa-solid fa-box"></i> Daftar Pesanan Cetak (Admin)
    </h2>

    {#key printOrders}
        {#if printOrders.length > 0}
            <div class="flex flex-col gap-4">
                {#each printOrders as order}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        onclick={() => goto(`/admin/pesanan?id=${order.id}`)}
                        class="cursor-pointer bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4
                            {order.status === 'Selesai' ? 'border-green-500' : ''}
                            {order.status === 'Diproses' ? 'border-yellow-400' : ''}
                            {order.status === 'Dibatalkan' ? 'border-red-500' : ''} hover:bg-gray-50 transition-colors duration-200">
                        <div class="flex-1">
                            <h3 class="font-semibold text-lg text-gray-800">{order.assetName}</h3>
                            <p class="text-sm text-gray-600">
                                <span class="font-medium">Pemesan:</span> {order.buyer}
                            </p>
                            <p class="text-sm text-gray-600">
                                <span class="font-medium">Tanggal:</span> {order.date}
                            </p>
                            <p class="text-sm text-gray-600">
                                <span class="font-medium">Lokasi:</span> {order.location}
                            </p>
                        </div>
                        <div class="flex flex-col md:items-end text-right gap-1">
                            <p class="font-bold text-gray-800">{currencyFormatter.format(order.price + order.shippingCost)}</p>
                            <span class={
                                order.status === 'Selesai' ? 'text-green-600 font-medium' :
                                order.status === 'Diproses' ? 'text-yellow-500 font-medium' :
                                'text-red-500 font-medium'
                            }>
                                {order.status}
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-center text-gray-500">Belum ada pesanan cetak.</p>
        {/if}
    {/key}
</section>
