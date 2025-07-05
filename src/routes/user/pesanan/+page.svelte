<script lang="ts">
// Tidak ada interaksi backend
// Kamu bisa ganti data statis ini dengan data binding di masa depan
let userLocation = "Jl. Merdeka No. 123, Jakarta";
let estimatedTime = "3-5 hari kerja";
let shippingCost = 20000;
let items = [
    { name: "Model Karakter A", price: 75000 },
    { name: "Model Kendaraan B", price: 50000 }
];

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
});
</script>

<section class="h-screen flex flex-col gap-5 p-6">
    <div class="bg-white rounded-xl shadow-2xl p-6 flex flex-col gap-5 w-full max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-[#FFA808] flex items-center gap-2">
            <i class="fa-solid fa-print"></i> Cetak Fisik Aset 3D
            </h2>
            <a href="../user/history"> <i class="fa-solid fa-clock-rotate-left"></i> Riwayat Pemesanan</a>
        </div>

        <div class="flex flex-col gap-3">
            <p class="text-lg font-semibold text-gray-700">Daftar Pesanan:</p>
            <ul class="list-disc list-inside pl-2 text-gray-800">
                {#each items as item}
                    <li>{item.name} — {currencyFormatter.format(item.price)}</li>
                {/each}
            </ul>
        </div>

        <div class="flex flex-col gap-2 text-gray-700">
            <p><strong>Estimasi Waktu Pengiriman:</strong> {estimatedTime}</p>
            <p><strong>Ongkos Kirim:</strong> {currencyFormatter.format(shippingCost)}</p>
            <p>
                <strong>Total Harga:</strong>
                {currencyFormatter.format(items.map(i => i.price).reduce((a, b) => a + b, 0) + shippingCost)}
            </p>
            <p><strong>Lokasi Pengiriman:</strong> {userLocation}</p>
        </div>

        <div class="bg-green-100 text-green-700 font-semibold rounded-xl p-4 text-center mt-4">
            <i class="fa-solid fa-circle-check"></i> Pesanan Anda sedang diproses
        </div>
    </div>
</section>
