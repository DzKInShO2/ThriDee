<script lang="ts">
import { goto } from "$app/navigation";
import { user } from "$lib/stores/authStore";

$: if ($user) {
    goto("/");
}

import { auth } from "$lib/firebase";
import { 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    getAdditionalUserInfo
} from "firebase/auth";

let email = "";
let password = "";
async function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
    }).catch((error) => {
    });
}

async function handleGoggleLogin() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
        const additionalUserInfo = getAdditionalUserInfo(result);
        if (additionalUserInfo.isNewUser) {
            console.log("User is new");
        } else {
            console.log("User is old");
        }
    }).catch((error) => {
    });
}
</script>

<div class="flex flex-col items-center gap-10 mt-20 lg:mt-50">
    <h1 class="text-3xl font-medium">Login</h1>
    <form on:submit|preventDefault={handleLogin} method="POST" class="flex flex-col gap-5 shadow-2xl rounded-4xl bg-[#FAFAFA] p-10 w-90 lg:w-120">
        <div class="flex flex-col gap-2">
            <label class="font-light">Email</label>
            <input bind:value={email} type="email" name="email" placeholder="Your email..." class="border-0 shadow-md rounded-lg w-70 lg:w-100" required>
        </div>
        <div class="flex flex-col gap-2">
            <label class="font-light">Password</label>
            <input bind:value={password} type="password" name="password" placeholder="Your password..." class="border-0 shadow-md rounded-lg w-70 lg:w-100" required>
        </div>
        <button class="transition-all bg-[#FFA808] p-2 rounded-xl cursor-pointer hover:shadow-lg hover:p-3 active:bg-[#F75B00] mt-5">
            Log-In
        </button>

        <p class="block m-auto">Don't have an account? <a href="/account/register" class="text-[#FFA808] hover:text-[#F75B00] cursor-pointer">register here</a>.</p>
    </form>
    <button class="cursor-pointer rounded-xl flex items-center gap-5 justify-center shadow-md h-12 w-90 lg:w-110 hover:brightness-60 active:brightness-110 bg-[#FFFFFF]" on:click={handleGoggleLogin}>
        <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo">
        Log-In With Google
    </button>
</div>
