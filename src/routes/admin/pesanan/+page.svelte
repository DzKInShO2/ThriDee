<script lang="ts">
	import { goto } from '$app/navigation';

	const currencyFormatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR'
	});

	// Dummy data (seharusnya diganti dengan fetch data dari server di kemudian hari)
	let order = {
		id: 1,
		assetName: 'Model Karakter 3D - Robot Samurai',
		buyer: 'Budi Santoso',
		date: '2025-07-01',
		price: 85000,
		shippingCost: 20000,
		location: 'Jl. Merdeka 123, Jakarta',
		status: 'Diproses' as 'Diproses' | 'Selesai' | 'Dibatalkan'
	};

	let statusOptions = ['Diproses', 'Selesai', 'Dibatalkan'];
	let selectedStatus = order.status;

	function updateStatus() {
		order.status = selectedStatus;
		alert('Status pesanan berhasil diperbarui!');
		goto('/admin'); // balik ke daftar pesanan
	}
</script>

<section class="max-w-3xl mx-auto p-6 flex flex-col gap-6">
    <div class="flex items-center justify-between mb-4">    
        <h2 class="text-2xl font-bold text-[#FFA808]">
            <i class="fa-solid fa-file-invoice"></i> Detail Pesanan
        </h2>
        <a href="../admin/antrian"> <i class="fa-solid fa-clock-rotate-left"></i> Antrian Pemesanan</a>
    </div>

	<div class="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
		<p><strong>Nama Aset:</strong> {order.assetName}</p>
		<p><strong>Pemesan:</strong> {order.buyer}</p>
		<p><strong>Tanggal Pemesanan:</strong> {order.date}</p>
		<p><strong>Lokasi Pengiriman:</strong> {order.location}</p>
		<p><strong>Harga Aset:</strong> {currencyFormatter.format(order.price)}</p>
		<p><strong>Ongkos Kirim:</strong> {currencyFormatter.format(order.shippingCost)}</p>
		<p><strong>Total:</strong> <span class="font-semibold">{currencyFormatter.format(order.price + order.shippingCost)}</span></p>

		<div class="flex flex-col gap-2 mt-4">
			<label for="status" class="font-medium">Ubah Status:</label>
			<select bind:value={selectedStatus} id="status" class="border rounded-lg p-2 w-30">
				{#each statusOptions as status}
					<option value={status}>{status}</option>
				{/each}
			</select>
			<button
				on:click={updateStatus}
				class="mt-2 bg-[#FFA808] text-white px-4 py-2 rounded-lg hover:bg-[#e69b06] w-fit">
				Simpan Perubahan
			</button>
		</div>
	</div>
</section>
