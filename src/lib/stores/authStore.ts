import { writable, type Writable } from "svelte/store";

import { auth } from "$lib/firebase";

import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";

export const user: Writable<FirebaseUser|null> = writable<FirebaseUser|null>(null);

onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
        user.set(firebaseUser);
    } else {
        user.set(null);
    }
});
