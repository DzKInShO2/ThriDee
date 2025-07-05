<script lang="ts">
	import { goto } from '$app/navigation';

	interface User {
		id: number;
		name: string;
		email: string;
		joinedAt: string;
		totalPurchase: number;
		totalPrintOrders: number;
	}

	let users: User[] = [
		{ id: 1, name: 'Budi Santoso', email: 'budi@mail.com', joinedAt: '2024-12-01', totalPurchase: 5, totalPrintOrders: 3 },
		{ id: 2, name: 'Siti Aminah', email: 'siti@mail.com', joinedAt: '2025-01-10', totalPurchase: 3, totalPrintOrders: 2 },
		{ id: 3, name: 'Andi Wijaya', email: 'andi@mail.com', joinedAt: '2025-02-05', totalPurchase: 6, totalPrintOrders: 4 },
		{ id: 4, name: 'Rina Maharani', email: 'rina@mail.com', joinedAt: '2025-02-20', totalPurchase: 2, totalPrintOrders: 1 },
		{ id: 5, name: 'Dedi Supriyadi', email: 'dedi@mail.com', joinedAt: '2025-03-11', totalPurchase: 4, totalPrintOrders: 3 },
		{ id: 6, name: 'Putri Ramadhani', email: 'putri@mail.com', joinedAt: '2025-03-25', totalPurchase: 1, totalPrintOrders: 1 },
		{ id: 7, name: 'Yoga Pratama', email: 'yoga@mail.com', joinedAt: '2025-04-08', totalPurchase: 7, totalPrintOrders: 5 },
		{ id: 8, name: 'Lia Apriani', email: 'lia@mail.com', joinedAt: '2025-04-30', totalPurchase: 2, totalPrintOrders: 1 },
		{ id: 9, name: 'Riko Saputra', email: 'riko@mail.com', joinedAt: '2025-05-15', totalPurchase: 3, totalPrintOrders: 2 },
		{ id: 10, name: 'Maya Lestari', email: 'maya@mail.com', joinedAt: '2025-06-01', totalPurchase: 5, totalPrintOrders: 4 }
	];

	function viewUserDetail(id: number) {
		goto(`../user?id=${id}`);
	}
</script>

<section class="p-6 max-w-6xl mx-auto">
	<h2 class="text-3xl font-bold text-[#FFA808] mb-6">Manajemen Pengguna</h2>

	<div class="overflow-x-auto bg-white rounded-xl shadow-md">
		<table class="min-w-full text-sm text-left text-gray-700">
			<thead class="bg-[#FFA808] text-white">
				<tr>
					<th class="p-4">Nama</th>
					<th class="p-4">Email</th>
					<th class="p-4">Bergabung</th>
					<th class="p-4">Total Pembelian</th>
					<th class="p-4">Pesanan Cetak</th>
					<th class="p-4">Aksi</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user}
					<tr class="border-b hover:bg-gray-50">
						<td class="p-4 font-medium">{user.name}</td>
						<td class="p-4">{user.email}</td>
						<td class="p-4">{user.joinedAt}</td>
						<td class="p-4">{user.totalPurchase}</td>
						<td class="p-4">{user.totalPrintOrders}</td>
						<td class="p-4">
							<button on:click={() => viewUserDetail(user.id)} class="text-sm text-blue-600 hover:underline">Lihat Detail</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
