import type { QuerySnapshot, DocumentSnapshot } from "firebase/firestore/lite";

import { collection, getDocs, query, where } from "firebase/firestore";

import type { PageServerLoad } from "./$types";
import { db } from "$lib/firebase";

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get("s") ?? "";
    const category = url.searchParams.get("c") ?? "";
    const price = url.searchParams.get("p") ?? "";

    let querySnapshots: QuerySnapshot;
    let queries = Array<any>();

    if (category !== "") {
        queries.push(where("category", "==", category));
    }

    if (price !== "") {
        const params = price.split(";");
        let q = null;

        switch (params[0]) {
            case "l":
                if (params.length > 1 && Number(params[1]) !== Number.NaN) {
                    queries.push(where("price", "<", Number(params[1])));
                } break;
            case "g":
                if (params.length > 1 && Number(params[1]) !== Number.NaN) {
                    queries.push(where("price", ">", Number(params[1])));
                } break;
            case "r":
                if (params.length > 2 
                    && Number(params[1]) !== Number.NaN 
                    && Number(params[2]) !== Number.NaN) {
                    queries.push(where("price", ">=", Number(params[1])));
                    queries.push(where("price", "<=", Number(params[2])));
                } break;
            default:
            case "f":
                queries.push(where("price", "==", 0));
                break;
        }
    }

    if (queries.length === 0) {
        querySnapshots = await getDocs(collection(db, "model"));
    } else {
        querySnapshots = await getDocs(query(collection(db, "model"), ...queries));
    }

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
