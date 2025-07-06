<script lang="ts">
	import { goto } from '$app/navigation';
    import { db } from "$lib/firebase";
  	import { user } from '$lib/stores/authStore';
    import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";

    let users: Array<any> = [];

    async function loadNewestModels() {
        // Mengambil user dengan urutan total pembelian terbanyak
        const userSnap = await getDocs(
            query(
            collection(db, "user"),
            orderBy("purchased", "desc"),
            limit(5)
            )
        );

        users = await Promise.all(userSnap.docs.map(async (doc) => {
            const data = doc.data();

            // Ambil jumlah aset yang diupload oleh user
            const modelSnap = await getDocs(query(collection(db, "model"), where("author", "==", doc.id)));
            const totalAssets = modelSnap.size;

            return {
                id: doc.id,
                name: data.name || '-',
                photoURL: data.photoURL || '',
                phone: data.phone || '-',
                joinedAt: new Date(data.joined?.seconds * 1000).toLocaleDateString(),
                totalPurchase: Array.isArray(data.purchased) ? data.purchased.length : 0,
                totalPrintOrders: data.ordered || 0,
                totalAssetsUploaded: totalAssets
            };
        }));
    }

    loadNewestModels();

    function viewUserDetail(userId: string) {
        goto(`../user?id=${userId}`);
    }

    function deleteUser(userId: string) {
        // implementasi penghapusan di sini
        alert(`Hapus user dengan ID: ${userId}`);
    }

// DUMMY DATA
// Untuk menggantikan data dari database
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

// Statistik
const totalIncome = printOrders.map(p => p.price).reduce((a, b) => a + b, 0);
const totalOrders = printOrders.length;
const processingOrders = printOrders.filter(p => p.status === 'Diproses').length;
const totalUsers = users.length;
const totalSoldAssets = printOrders.length; // bisa beda jika multiple quantity

function goToOrderDetail(id: number) {
    goto(`/admin/pesanan`);
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
                
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
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
        <h2 class="text-xl font-semibold mb-4 mt-8">
            <a href="../admin/users">Pengguna Aktif</a>
        </h2>
		<table class="min-w-full text-sm text-left text-gray-700">
			<thead class="bg-[#FFA808] text-white">
				<tr>
					<th class="p-4">Detail</th>
					<th class="p-4">Nama</th>
					<th class="p-4 text-center">Email</th>
					<th class="p-4 text-center">Phone</th>
					<th class="p-4 text-center">Bergabung</th>
					<th class="p-4 text-center">Total Pembelian</th>
					<th class="p-4 text-center">Pesanan Cetak</th>
					<th class="p-4 text-center">Asset Diupload</th>
					<th class="p-4 text-center">Aksi</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user}
                    <tr class="border-b hover:bg-gray-50 items-center">
                        <td class="p-4">
                            <button on:click={() => viewUserDetail(user.id)} 
                                class="text-sm text-blue-600 hover:underline ">
                                <i class="fas fa-info-circle"></i>
                                Detail
                            </button>
                        </td>
                        <td class="p-4 font-medium flex items-center gap-3">
                            {#if user.photoURL}
                                <img src={user.photoURL} alt={user.name} class="w-8 h-8 rounded-full" />
                            {/if}
                            {user.name}
                        </td>
                        <td class="p-4 text-center">-</td>
                        <td class="p-4 text-center">{user.phone}</td>
                        <td class="p-4 text-center">{user.joinedAt}</td>
                        <td class="p-4 text-center">{user.totalPurchase}</td>
                        <td class="p-4 text-center">{user.totalPrintOrders}</td>
                        <td class="p-4 text-center">{user.totalAssetsUploaded}</td>
                        <td class="p-4 flex gap-3 justify-center">
                            <button on:click={() => deleteUser(user.id)} 
                                class="text-sm text-red-600 hover:underline">
                                <i class="fas fa-trash"></i>
                                Hapus
                            </button>
                        </td>
                    </tr>
				{/each}
			</tbody>
		</table>
    </div>
</section>