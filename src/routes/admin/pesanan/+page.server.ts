import type { PageServerLoad } from "./$types";

import { db } from "$lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface PrintOrder {
    id: String;
    assetName: string;
    buyer: string;
    date: string;
    price: number;
    shippingCost: number;
    location: string;
    status: 'Diproses' | 'Selesai' | 'Dibatalkan';
}

export const load: PageServerLoad = async ({url}) => {
    const id = url.searchParams.get("id") ?? "";

    let printOrder: PrintOrder|null = null;

    if (id !== "") {
        const dSnap = await getDoc(doc(db, "transaction", id));
        const pSnap = await getDoc(dSnap.data()!.products[0]);
        const uSnap = await getDoc(doc(db, "user", dSnap.data()!.customer));

        printOrder = {
            id: dSnap!.id,
            assetName: pSnap.data()!.title,
            buyer: uSnap.data()!.user,
            date: dSnap.data()!.time.toDate().toLocaleString(),
            price: dSnap.data()!.totalPrice - 20000,
            shippingCost: 20000,
            location: dSnap.data()!.location,
            status: dSnap.data()!.status
        };
    }

    return {
        printOrder: printOrder
    };
}
