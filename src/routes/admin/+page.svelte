<script lang="ts">
    import { 
        ActionConfirmDialog,
        ProfilePhoto 
    } from '../../components/design';
	import { goto } from '$app/navigation';
    import { currencyFormatter, db, status } from "$lib/firebase";
    import { collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
    import { onMount } from 'svelte';
    import { isLoading } from '$lib/stores/stateStore';

    let users: Array<any> = $state(Array<any>());
    let printOrders = $state(Array<any>());
    let totalUsers = $state(0);
    let totalOrders = $state(0);
    let processingOrders = $state(0);
    let totalSoldAssets = $state(0);
    onMount(() => {
        onSnapshot(query(collection(db, "user"), limit(5)), (qSnap) => {
            users = Array<any>();
            qSnap.forEach((dSnap) => {
                getDocs(query(collection(db, "model"), where("author", "==", dSnap.ref))).then((mSnap) => {
                    getDocs(query(collection(db, "transaction"), where("customer", "==", dSnap.id), where("type", "==", 1))).then((tSnap) => {
                        users.push({
                            id: dSnap.id,
                            name: dSnap.data()!.name === "" ? "Tanpa Nama" : dSnap.data()!.name,
                            phone: dSnap.data()!.phone !== undefined ? dSnap.data()!.phone : "Tidak Ada",
                            photo: dSnap.data()!.photoURL,
                            joined: dSnap.data()!.joined.toDate().toLocaleString(),
                            totalPurchase: dSnap.data()!.purchased !== undefined ? dSnap.data()!.purchased.length : 0,
                            totalPrint: tSnap.size,
                            totalUploaded: mSnap.size
                        });
                    });
                });
            });
        });

        onSnapshot(collection(db, "user"), (qSnap) => {
            totalUsers = qSnap.size;
        });

        onSnapshot(query(collection(db, "transaction"), where("type", "==", 1), limit(5), orderBy("time", "desc")), (onSnap) => {
            printOrders = Array<any>();
            onSnap.forEach((dSnap) => {
                getDoc(dSnap.data()!.products[0]).then((pSnap) => {
                    getDoc(doc(db, "user", dSnap.data()!.customer)).then((uSnap) => {
                        printOrders.push({
                            id: dSnap!.id,
                            assetName: pSnap.data()!.title,
                            buyer: uSnap.data()!.user,
                            date: dSnap.data()!.time.toDate().toLocaleString(),
                            price: dSnap.data()!.totalPrice - 20000,
                            shippingCost: 20000,
                            location: dSnap.data()!.location,
                            status: status[dSnap.data()!.status]
                        });
                    });
                });
            });
        });

        onSnapshot(collection(db, "transaction"), (qSnap) => {
            totalOrders = qSnap.size;
        });

        onSnapshot(query(collection(db, "transaction"), where("status", "==", 0)), (qSnap) => {
            processingOrders = qSnap.size;
        });

        onSnapshot(query(collection(db, "transaction"), where("status", "==", 2)), (qSnap) => {
            totalSoldAssets = qSnap.size;
        });
    });

    function viewUserDetail(userId: string) {
        goto(`../user?id=${userId}`);
    }

    let confirmVisible = $state(false);
    let userToDelete = $state("");
    function deleteUser() {
        if (userToDelete !== "") {
            $isLoading = true;
            getDocs(query(collection(db, "transaction"), where("consumer", "==", userToDelete))).then((qSnap) => {
                qSnap.forEach((dSnap) => {
                    deleteDoc(dSnap.ref);
                })

                getDocs(query(collection(db, "model"), where("author", "==", doc(db, "user", userToDelete)))).then((qqSnap) => {
                    qqSnap.forEach((ddSnap) => {
                        deleteDoc(ddSnap.ref);
                    });

                    deleteDoc(doc(db, "user", userToDelete)).then(() => {
                        $isLoading = false;
                        confirmVisible = false;
                    });
                })
            })
        }
    }

    function goToOrderDetail(id: String) {
        goto(`/admin/pesanan?id=${id}`);
    }
</script>

<ActionConfirmDialog bind:visibility={confirmVisible} label="Hapus Pengguna" text="Apakah anda ingin menghapus pengguna?" onaccept={deleteUser()} />

<section class="p-6 max-w-7xl mx-auto flex flex-col gap-8">
    <h1 class="text-3xl font-bold text-[#FFA808]">Dashboard Admin</h1>

    <!-- Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div class="bg-white p-4 rounded-xl shadow text-center">
            <p class="text-sm text-gray-500">Total Penghasilan</p>
            <h2 class="text-2xl text-green-600 font-bold">{currencyFormatter.format(printOrders.map(p => p.price + p.shippingCost).reduce((a, b) => a + b, 0))}</h2>
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
            {#each printOrders as order}
                
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div onclick={() => goToOrderDetail(order.id)}
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
        <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead class="bg-[#FFA808] text-white">
                    <tr>
                        <th class="p-4">Detail</th>
                        <th class="p-4">Nama</th>
                        <th class="p-4 text-center">Phone</th>
                        <th class="p-4 text-center">Bergabung</th>
                        <th class="p-4 text-center">Total Pembelian</th>
                        <th class="p-4 text-center">Pesanan Cetak</th>
                        <th class="p-4 text-center">Asset Diupload</th>
                        <th class="p-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {#key users}
                    {#each users as user}
                        <tr class="border-b hover:bg-gray-50 items-center">
                            <td class="p-4">
                                <button onclick={() => viewUserDetail(user.id)} 
                                    class="text-sm text-blue-600 hover:underline ">
                                    <i class="fas fa-info-circle"></i>
                                    Detail
                                </button>
                            </td>
                            <td class="p-4 font-medium flex items-center gap-3">
                                <div class="w-[46px] h-[46px] rounded-full overflow-clip">
                                    <ProfilePhoto photoUrl={user.photo} />
                                </div>
                                {user.name}
                            </td>
                            <td class="p-4 text-center">{user.phone}</td>
                            <td class="p-4 text-center">{user.joined}</td>
                            <td class="p-4 text-center">{user.totalPurchase}</td>
                            <td class="p-4 text-center">{user.totalPrint}</td>
                            <td class="p-4 text-center">{user.totalUploaded}</td>
                            <td class="p-4 flex gap-3 justify-center">
                                <button onclick={() => { 
                                        userToDelete = user.id;
                                        confirmVisible = true;
                                    }}
                                    class="text-sm text-red-600 hover:underline">
                                    <i class="fas fa-trash"></i>
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    {/each}
                {/key}
                </tbody>
            </table>
        </div>
    </div>
</section>
