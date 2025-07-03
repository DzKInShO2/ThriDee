import type { QuerySnapshot, DocumentSnapshot } from "firebase/firestore/lite";

import { collection, getDocs } from "firebase/firestore";

import type { PageServerLoad } from "./$types";
import { db, storage } from "$lib/firebase";

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get("s") ?? "";

    const querySnapshots: QuerySnapshot = await getDocs(collection(db, "model"));

    let data: Array<String> = Array<String>()
    querySnapshots.forEach(async (doc: DocumentSnapshot) => {
        if (doc.data()!.title.toLowerCase().includes(search.toLowerCase())) {
            data.push(doc.id);
        }
    });

    return {
        ids: data
    };
};
