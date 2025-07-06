<script lang="ts">
    import { currencyFormatter, db } from '$lib/firebase';
    import { collection, doc, DocumentReference, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';


    let { data } = $props();

    interface EarningItem {
        name: string;
        price: number;
        buyer: string;
        date: string;
    }

    let earnings = $state(Array<EarningItem>());
    let totalEarnings = $state(0);
    let totalSales = $state(0);

    if (data.user !== "") {
        getDocs(query(
            collection(db, "model"), 
            where("author", "==", doc(db, "user", data.user)))).then((qSnap) => {
                let models = Array<DocumentReference>();
                qSnap.forEach((dSnap) => {
                    models.push(dSnap.ref);
                });

                if (models.length > 0) {
                    onSnapshot(query(collection(db, "transaction"), 
                        where("products", "array-contains-any", models),
                        orderBy("time", "desc")), (qOn) => {
                            earnings = Array<EarningItem>();
                            qOn.forEach((dOn) => {
                                dOn.data().products.forEach((mRef) => {
                                    if (models.find((a) => a.id === mRef.id)) {
                                        getDoc(mRef).then((mDoc) => {
                                            getDoc(doc(db, "user", dOn.data()!.customer)).then((dOnon) => {
                                                earnings.push({
                                                    name: mDoc.data()!.name,
                                                    price: mDoc.data()!.price,
                                                    buyer: dOnon.data()!.name,
                                                    date: dOn.data()!.time.toDate().toLocaleString()
                                                });

                                                totalEarnings = earnings.map(e => e.price).reduce((a, b) => a + b, 0);
                                                totalSales = earnings.length;
                                            })
                                        });
                                    }
                                });
                            });
                        });
                }
            });
    }

    $inspect(earnings);
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
            <h3 class="text-2xl font-bold text-blue-600">{totalSales}</h3>
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
