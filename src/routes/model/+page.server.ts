import { db, storage } from "$lib/firebase";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {
    const modelId = url.searchParams.get("id") ?? "";

    let data: any = null;

    if (modelId !== "") {
        const docSnap: DocumentSnapshot = await getDoc(doc(db, "model", modelId));
        const url = await getDownloadURL(ref(storage, `model/binary/${docSnap.id}.${docSnap.data()!.type}`));

        if (docSnap.exists()) {
            const author = await getDoc(docSnap.data()!.author)

            const authorData = {
                id: author.id,
                ...author.data()!,
                photoURL: await getDownloadURL(ref(storage, `user/profile/${author.id}.${author.data()!.photoURL!}`))
            }

            const currencyFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            });

            data = {
                ...docSnap.data(),
                author: authorData,
                binary: url,
                published: docSnap.data()!.published.toDate().toLocaleString(),
                price: currencyFormatter.format(docSnap.data()!.price!)
            };
        }
    }

    return {
        modelId: modelId,
        modelData: data
    }
};
