import { db, storage } from "$lib/firebase";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const modelId = url.searchParams.get("id") ?? "";

    let data: any = null;

    if (modelId !== "") {
        const docSnap: DocumentSnapshot = await getDoc(doc(db, "model", modelId));
        if (docSnap.exists()) {
            data = {
                ...docSnap.data(),
                binary: await getDownloadURL(ref(storage, `model/binary/${docSnap.id}.${docSnap.data().type}`))
            };
        }
    }

    return {
        modelId: modelId,
        modelData: data
    }
};
