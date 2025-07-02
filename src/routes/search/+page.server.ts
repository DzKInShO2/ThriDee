import type { QuerySnapshot, DocumentSnapshot } from "firebase/firestore/lite";

import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

import type { PageServerLoad } from "./$types";
import { db, storage } from "$lib/firebase";

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get("s") ?? "";

    const querySnapshots: QuerySnapshot = await getDocs(collection(db, "model"));

    let data: Array<any> = Array<any>()
    querySnapshots.forEach(async (doc: DocumentSnapshot) => {
        if (doc.data().title.includes(search)) {
            data.push({ id: doc.id, ...doc.data()});
        }
    });

    for (let i = 0; i < data.length; ++i) {
        const currencyFormatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });

        data[i].price = currencyFormatter.format(data[i].price);
        data[i] = { ...data[i], preview: await getDownloadURL(ref(storage, `model/preview/${data[i].id}.png`))};
    }

    return {
        models: data
    };
};
