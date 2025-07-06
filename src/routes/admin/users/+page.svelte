<script lang="ts">
    import { 
        ActionConfirmDialog,
        ProfilePhoto
    } from "../../../components/design";
    import { db } from "$lib/firebase";
    import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
    import { onMount } from 'svelte';
    import { isLoading } from "$lib/stores/stateStore";

    interface User {
        id: String,
        name: String,
        phone: String,
        photo: String,
        joined: String,
        totalPurchase: number,
        totalPrint: number,
        totalUploaded: number
    }

    let confirmVisible = $state(false);
    let users: Array<User> = $state(Array<User>());
    onMount(() => {
        onSnapshot(collection(db, "user"), (qSnap) => {
            users = Array<User>();
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
    });

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
</script>

<ActionConfirmDialog bind:visibility={confirmVisible} label="Hapus Pengguna" text="Apakah anda ingin menghapus pengguna?" onaccept={deleteUser()} />

<section class="p-6 max-w-6xl mx-auto">
	<h2 class="text-3xl font-bold text-[#FFA808] mb-8 text-center">Manajemen Pengguna</h2>

	<div class="overflow-x-auto bg-white rounded-xl shadow-md p-10">
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
</section>
