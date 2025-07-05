<script lang="ts">
const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
});

interface OrderHistory {
    name: string;
    status: 'Diproses' | 'Selesai' | 'Dibatalkan';
    price: number;
    orderDate: string;
    estimate: string;
}

let historyOrders: OrderHistory[] = [
    {
        name: 'Model Karakter 3D - Fantasy Elf',
        status: 'Selesai',
        price: 75000,
        orderDate: '2025-07-01',
        estimate: '3 hari'
    },
    {
        name: 'Model Kendaraan - Mobil Balap',
        status: 'Diproses',
        price: 50000,
        orderDate: '2025-07-03',
        estimate: '4-5 hari'
    },
    {
        name: 'Model Bangunan - Rumah Jepang',
        status: 'Dibatalkan',
        price: 65000,
        orderDate: '2025-06-29',
        estimate: '-'
    }
];
</script>

<section class="h-auto p-6 flex flex-col gap-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-[#FFA808] flex items-center gap-2">
        <i class="fa-solid fa-clock-rotate-left"></i> Riwayat Pemesanan
    </h2>

    {#if historyOrders.length > 0}
        <div class="flex flex-col gap-4">
            {#each historyOrders as order}
                <a href="../user/pesanan" class="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4
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
                </a>
            {/each}
        </div>
    {:else}
        <p class="text-center text-gray-500">Belum ada riwayat pemesanan.</p>
    {/if}
</section>
