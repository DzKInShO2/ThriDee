<script lang="ts">
    import { goto } from "$app/navigation";
    import { currencyFormatter, db, status } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";
    import { collection, getDocs, query, where } from "firebase/firestore";
    import { onMount } from "svelte";

    interface OrderHistory {
        name: string;
        status: 'Diproses' | 'Selesai' | 'Dibatalkan';
        price: number;
        orderDate: string;
        estimate: string;
    }

    let { data } = $props();
    let historyOrders = $state(Array<OrderHistory>());

    $effect(() => {
        if ($user) {
            goto("/");
        }
    })

    onMount(() => {
        getDocs(query(collection(db, "transaction"), 
            where("customer", "==", data.user),
            where("type", "==", 1)
        )).then((qSnap) => {
            qSnap.forEach((dSnap) => {
                console.log("Hello", qSnap.size);
                historyOrders.push({
                    name: dSnap.data()!.title,
                    status: status[dSnap.data()!.status],
                    price: dSnap.data()!.totalPrice,
                    orderDate: dSnap.data()!.time.toDate().toLocaleString(),
                    estimate: "3 ~ 5 Hari"
                });
            });
        })
    });
</script>

<section class="h-auto p-6 flex flex-col gap-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-[#FFA808] flex items-center gap-2">
        <i class="fa-solid fa-clock-rotate-left"></i> Riwayat Pemesanan
    </h2>

    {#if historyOrders.length > 0}
        <div class="flex flex-col gap-4">
            {#each historyOrders as order}
                <div class="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4
                    {order.status === 'Selesai' ? 'border-green-500' : ''}
                    {order.status === 'Diproses' ? 'border-yellow-400' : ''}
                    {order.status === 'Dibatalkan' ? 'border-red-500' : ''}">
                    
                    <div class="flex-1">
                        <h3 class="font-semibold text-lg text-gray-800">{order.name}</h3>
                        <p class="text-sm text-gray-600">
                            <span class="font-medium">Tanggal:</span> {order.orderDate}
                        </p>
                        <p class="text-sm text-gray-600">
                            <span class="font-medium">Estimasi:</span> {order.estimate}
                        </p>
                    </div>
                    
                    <div class="flex flex-col md:items-end text-right gap-1">
                        <p class="font-bold text-gray-800">{currencyFormatter.format(order.price)}</p>
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
        <p class="text-center text-gray-500">Belum ada riwayat pemesanan.</p>
    {/if}
</section>
