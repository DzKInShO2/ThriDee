<script lang="ts">
import { goto } from '$app/navigation';

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
});

interface PrintOrder {
    id: number;
    assetName: string;
    buyer: string;
    date: string;
    price: number;
    shippingCost: number;
    status: 'Diproses' | 'Selesai' | 'Dibatalkan';
}

interface UserSummary {
    name: string;
    email: string;
    totalPurchase: number;
}

let printOrders: PrintOrder[] = [
    { id: 1, assetName: 'Robot Samurai', buyer: 'Budi', date: '2025-07-01', price: 85000, shippingCost: 20000, status: 'Diproses' },
    { id: 2, assetName: 'Rumah Jepang', buyer: 'Siti', date: '2025-07-03', price: 70000, shippingCost: 20000, status: 'Selesai' },
    { id: 3, assetName: 'Mobil Offroad', buyer: 'Andi', date: '2025-07-05', price: 90000, shippingCost: 25000, status: 'Diproses' }
];

let users: UserSummary[] = [
    { name: 'Budi', email: 'budi@mail.com', totalPurchase: 5 },
    { name: 'Siti', email: 'siti@mail.com', totalPurchase: 3 },
    { name: 'Andi', email: 'andi@mail.com', totalPurchase: 4 }
];

// Statistik
const totalIncome = printOrders.map(p => p.price).reduce((a, b) => a + b, 0);
const totalOrders = printOrders.length;
const processingOrders = printOrders.filter(p => p.status === 'Diproses').length;
const totalUsers = users.length;
const totalSoldAssets = printOrders.length; // bisa beda jika multiple quantity

function goToOrderDetail(id: number) {
    goto(`/admin/order/${id}`);
}
</script>

<section class="p-6 max-w-7xl mx-auto flex flex-col gap-8">
    <h1 class="text-3xl font-bold text-[#FFA808]">Dashboard Admin</h1>

    <!-- Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div class="bg-white p-4 rounded-xl shadow text-center">
            <p class="text-sm text-gray-500">Total Penghasilan</p>
            <h2 class="text-2xl text-green-600 font-bold">{currencyFormatter.format(totalIncome)}</h2>
        </div>
        <div class="bg-white p-4 rounded-xl shadow text-center">
            <p class="text-sm text-gray-500">Total Pesanan</p>
            <h2 class="text-2xl text-blue-600 font-bold">{totalOrders}</h2>
        </div>
        <div class="bg-white p-4 rounded-xl shadow text-center">
            <p class="text-sm text-gray-500">Pesanan Diproses</p>
            <h2 class="text-2xl text-yellow-500 font-bold">{processingOrders}</h2>
        </div>
        <div class="bg-white p-4 rounded-xl shadow text-center">
            <p class="text-sm text-gray-500">Total Pengguna</p>
            <h2 class="text-2xl text-indigo-600 font-bold">{totalUsers}</h2>
        </div>
        <div class="bg-white p-4 rounded-xl shadow text-center">
            <p class="text-sm text-gray-500">Aset Terjual</p>
            <h2 class="text-2xl text-red-500 font-bold">{totalSoldAssets}</h2>
        </div>
    </div>

    <!-- Antrian Pesanan -->
    <div>
        <h2 class="text-xl font-semibold mb-4">Antrian Pesanan</h2>
        <div class="flex flex-col gap-4">
            {#each printOrders.slice(0, 3) as order}
                <div on:click={() => goToOrderDetail(order.id)}
                    class="cursor-pointer bg-white rounded-xl p-4 shadow-md flex justify-between items-center hover:bg-gray-50 border-l-4
                        {order.status === 'Diproses' ? 'border-yellow-400' : ''}
                        {order.status === 'Selesai' ? 'border-green-500' : ''}
                        {order.status === 'Dibatalkan' ? 'border-red-500' : ''}">
                    <div>
                        <h3 class="font-semibold text-lg">{order.assetName}</h3>
                        <p class="text-sm text-gray-600">Pemesan: {order.buyer} • {order.date}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-gray-700">{currencyFormatter.format(order.price + order.shippingCost)}</p>
                        <p class="text-sm font-medium
                            {order.status === 'Diproses' ? 'text-yellow-500' :
                              order.status === 'Selesai' ? 'text-green-600' : 'text-red-500'}">
                            {order.status}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Pengguna Aktif -->
    <div>
        <h2 class="text-xl font-semibold mb-4 mt-8">Pengguna Aktif</h2>
        <table class="w-full bg-white rounded-xl overflow-hidden shadow text-left text-sm">
            <thead class="bg-[#FFA808] text-white">
                <tr>
                    <th class="p-4">Nama</th>
                    <th class="p-4">Email</th>
                    <th class="p-4">Total Pembelian</th>
                </tr>
            </thead>
            <tbody>
                {#each users.slice(0, 3) as user}
                    <tr class="border-t hover:bg-gray-50">
                        <td class="p-4">{user.name}</td>
                        <td class="p-4">{user.email}</td>
                        <td class="p-4">{user.totalPurchase}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>
