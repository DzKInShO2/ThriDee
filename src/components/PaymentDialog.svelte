<script lang="ts">
    import { goto } from "$app/navigation";
    import { currencyFormatter, db } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";
    import { addDoc, collection, doc, DocumentReference, getDoc, setDoc, Timestamp } from "firebase/firestore";
    import { fade, fly } from "svelte/transition";

    let { visible = $bindable(), values = $bindable(), transfers = $bindable() } = $props();

    function cancelOrder() {
        setDoc(doc(db, "user", $user!.uid), {
            ordered: null
        }, { merge: true });
    }

    function acceptOrder() {
        let products = Array<DocumentReference>();
        values.forEach((i) => {
            products.push(doc(db, "model", i.id));
        });

        const userRef = doc(db, "user", $user!.uid);
        addDoc(collection(db, "transaction"), {
            customer: $user!.uid,
            products: products,
            totalPrice: values.map(i => i.price).reduce((a, c) => a + c, 0),
            time: Timestamp.now(),
            type: 0
        }).then((docRef) => {
            setDoc(userRef, {
                ordered: null
            }, { merge: true }).then(() => {
                getDoc(userRef).then((docSnap) => {
                    let purchased = Array<DocumentReference>();
                    if (docSnap.data()!.purchased !== undefined && docSnap.data()!.purchased !== null) {
                        purchased = [ ...docSnap.data()!.purchased ];
                    }
                    purchased.push(...products);
                    transfers = purchased.map(i => i.id);
                    setDoc(userRef, {
                        purchased: purchased
                    }, { merge: true });
                });
            });
        });
    }
</script>

{#if visible}
    <div 
        transition:fade
        class="bg-[#ABABABAB] fixed top-0 z-60 h-screen w-screen flex items-center justify-center">
        <div 
            transition:fly={{y: 200}}
            class="bg-white h-128 w-80 md:w-128 rounded-xl shadow-xl flex flex-col justify-between overflow-clip">
            <div class="flex justify-around border-b-1 bg-gray-100 p-3">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                    onclick={() => visible = false }
                    class="transition-transform hover:scale-[1.3] hover:text-orange-400 cursor-pointer"
                >
                    <i class="fa-solid fa-xmark scale-[1.25]"></i>
                </button>
                <p class="text-center text-xl flex-1">
                    Info Transaksi
                </p>
            </div>
            <div class="p-5">
            {#each values as v}
                <div>
                    <p>{v.title}</p>
                    <p class="font-thin">{currencyFormatter.format(v.price)}</p>
                </div>
            {/each}
            </div>
            <div class="flex flex-col gap-3">
                <p class="text-lg p-3">Total:  
                    <span class="font-thin">
                        {currencyFormatter.format(values.map(i => i.price).reduce((a, c) => a + c, 0))}
                    </span>
                </p>
                <div class="flex items-center justify-around">
                    <button 
                        onclick={() => {
                            cancelOrder();
                            values = [];
                            visible = false;
                        }}
                        class="cursor-pointer
                        hover:bg-red-500
                        transition-transform
                        active:scale-[1.1]
                        border-t-3 border-red-300 p-3 bg-red-400 w-full">
                        Batalkan
                    </button>
                    <button 
                        onclick={() => {
                            acceptOrder();
                            values = [];
                            visible = false;
                        }}
                        class="cursor-pointer
                        hover:bg-green-500
                        transition-transform
                        active:scale-[1.1]
                        border-t-3 border-green-300 p-3 bg-green-400 w-full">
                        Lanjutkan
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
