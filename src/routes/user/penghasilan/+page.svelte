<script lang="ts">
const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
});

interface EarningItem {
    name: string;
    price: number;
    buyer: string;
    date: string;
}

let earnings: EarningItem[] = [
    {
        name: 'Model Karakter 3D - Fantasy Elf',
        price: 75000,
        buyer: 'Budi Santoso',
        date: '2025-07-01'
    },
    {
        name: 'Model Kendaraan - Mobil Balap',
        price: 50000,
        buyer: 'Siti Aminah',
        date: '2025-07-02'
    },
    {
        name: 'Model Lingkungan - Cyber City',
        price: 90000,
        buyer: 'Andi Wijaya',
        date: '2025-07-04'
    }
];

const totalEarnings = earnings.map(e => e.price).reduce((a, b) => a + b, 0);
const totalSales = earnings.length;
</script>

<section class="h-auto p-6 flex flex-col gap-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-[#FFA808] flex items-center gap-2">
        <i class="fa-solid fa-wallet"></i> Penghasilan Anda
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white shadow-lg rounded-xl p-4">
            <p class="text-gray-600">Total Penghasilan</p>
            <h3 class="text-2xl font-bold text-green-600">{currencyFormatter.format(totalEarnings)}</h3>
        </div>
        <div class="bg-white shadow-lg rounded-xl p-4">
            <p class="text-gray-600">Total Penjualan</p>
            <h3 class="text-2xl font-bold text-blue-600">{totalSales} aset terjual</h3>
        </div>
    </div>

    <h3 class="text-xl font-semibold mt-6">Detail Penjualan</h3>

    {#if earnings.length > 0}
        <div class="flex flex-col gap-4 mt-2">
            {#each earnings as item}
                <div class="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-blue-400">
                    <div class="flex-1">
                        <h3 class="font-semibold text-lg text-gray-800">{item.name}</h3>
                        <p class="text-sm text-gray-600">
                            <span class="font-medium">Dibeli oleh:</span> {item.buyer}
                        </p>
                        <p class="text-sm text-gray-600">
                            <span class="font-medium">Tanggal:</span> {item.date}
                        </p>
                    </div>

                    <div class="flex flex-col md:items-end text-right gap-1">
                        <p class="font-bold text-gray-800">{currencyFormatter.format(item.price)}</p>
                        <span class="text-sm text-green-500">Berhasil dijual</span>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-center text-gray-500">Belum ada penjualan.</p>
    {/if}
</section>
