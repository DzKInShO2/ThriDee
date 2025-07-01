import { writable, type Writable } from "svelte/store";
import { auth } from "$lib/firebase";
import { onAuthStateChanged, type FirebaseUser } from "firebase/auth";

export const user: Writable<FirebaseUser> = writable(null);
export const loadingAuthState: Writable<boolean> = writable(true);

onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
        user.set(firebaseUser);
    } else {
        user.set(null);
    }

    loadingAuthState.set(false);
});

export function isLoggedIn() {
    let loggedIn: boolean = false;
    const unsubscribe = user.subscribe(currentUser => {
        loggedIn = !!currentUser;
    });
    unsubscribe();
    return loggedIn;
}
