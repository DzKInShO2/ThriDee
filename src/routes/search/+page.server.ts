import type { QuerySnapshot, DocumentSnapshot } from "firebase/firestore/lite";

import { collection, getDocs, query, where } from "firebase/firestore";

import type { PageServerLoad } from "./$types";
import { db } from "$lib/firebase";

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get("s") ?? "";
    const category = url.searchParams.get("c") ?? "";

    let querySnapshots: QuerySnapshot;
    if (category.length > 0) {
        querySnapshots = await getDocs(query(collection(db, "model"), where("category", "==", category)));
    } else {
        querySnapshots = await getDocs(collection(db, "model"));
    }

    let data: Array<String> = Array<String>()
    querySnapshots.forEach(async (doc: DocumentSnapshot) => {
        if (doc.data()!.title.toLowerCase().includes(search.toLowerCase())) {
            data.push(doc.id);
        }
    });

    return {
        ids: data,
        search: search,
        category: category
    };
};
