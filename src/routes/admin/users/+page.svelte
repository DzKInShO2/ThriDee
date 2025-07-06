<script lang="ts">
	import { goto } from '$app/navigation';
    import { db } from "$lib/firebase";
  	import { user } from '$lib/stores/authStore';
    import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";

    let users: Array<any> = [];

    async function loadNewestModels() {
        const userSnap = await getDocs(query(collection(db, "user"), orderBy("joined", "desc"), limit(15)));

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
</script>

<section class="p-6 max-w-6xl mx-auto">
	<h2 class="text-3xl font-bold text-[#FFA808] mb-8 text-center">Manajemen Pengguna</h2>

	<div class="overflow-x-auto bg-white rounded-xl shadow-md p-10">
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
