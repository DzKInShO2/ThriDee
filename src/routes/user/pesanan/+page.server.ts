import { doc, getDoc } from "firebase/firestore";
import type { PageServerLoad } from "../$types";
import { db } from "$lib/firebase";

export const load: PageServerLoad = async ({url}) => {
    const id = url.searchParams.get("id") ?? "";

    let model: any = null;
    if (id !== "") {
        const docSnap = await getDoc(doc(db, "model", id));
        model = {
            id: id,
            ...docSnap.data(),
            author: null,
            published: null
        };
    }

    return {
        model: model
    };
};
