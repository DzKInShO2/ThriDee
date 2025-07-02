<script lang="ts">
    import { goto } from "$app/navigation";

    import { user } from "$lib/stores/authStore";
    import { auth, getFirebaseAuthMessage } from "$lib/firebase";

    import {
        signInWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
    } from "firebase/auth";

    user.subscribe((value) => {
        if (value) {
            goto("/user");
        }
    });

    let passwordVisible = $state(false)
    let authError = $state("")

    let email = $state("");
    let password = $state("");
    async function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                authError = getFirebaseAuthMessage(error.code);
            });
    }

    async function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .catch((error) => {
                authError = getFirebaseAuthMessage(error.code);
            });
    }
</script>

<div
    class="
    flex
    flex-col
    items-center
    gap-10
    mt-20
    lg:mt-50
    h-screen">
    <h1 class="text-3xl font-medium">Login</h1>
    <form
        on:submit|preventDefault={handleLogin}
        method="POST"
        class="flex flex-col gap-5 shadow-2xl rounded-4xl bg-[#FAFAFA] p-10 w-90 lg:w-120">
        <div class="flex flex-col gap-2">
            <p class="font-light">Email</p>
            <input
                bind:value={email}
                type="email"
                name="email"
                placeholder="Your email..."
                class="
                border-none 
                outline-none 
                focus:ring-0 
                shadow-md 
                rounded-lg 
                w-70 
                lg:w-100"
                required/>
        </div>
        <div class="flex flex-col gap-2">
            <p class="font-light">Password</p>
            <div
                class="relative shadow-md rounded-lg w-70 lg:w-100 overflow-clip">
                <input
                    bind:value={password}
                    type={passwordVisible ? "text" : "password"}
                    name="new_password"
                    placeholder="Your password..."
                    class="
                    border-none 
                    outline-none 
                    focus:ring-0 
                    w-full"
                    required/>
                <i 
                    on:click={() => {passwordVisible = !passwordVisible}}
                    class={`
                    transition-transform
                    active:scale-[1.1]
                    absolute
                    fa-solid
                    ${ passwordVisible ? "fa-eye-slash" : "fa-eye"}
                    right-5
                    top-[25%]
                    cursor-pointer
                    hover:text-[#FFA808]`}></i>
            </div>
        </div>

        {#if (authError != "")}
            <p class="block m-auto text-red-500">{authError}</p>
        {/if}

        <button
            class="
            transition-all
            bg-[#FFA808]
            p-2
            rounded-xl
            cursor-pointer
            hover:shadow-lg
            hover:p-3
            active:bg-[#F75B00]
            active:scale-[1.1]
            mt-5">
            Log-In
        </button>

        <p class="block m-auto">
            Don't have an account? <a
                href="/user/register"
                class="text-[#FFA808] hover:text-[#F75B00] cursor-pointer"
                >register here</a>.
        </p>
    </form>
    <button
        class="
        transition-transform
        active:scale-[1.1]
        cursor-pointer
        rounded-xl
        flex
        items-center
        gap-5
        justify-center
        shadow-md
        h-12
        w-90
        lg:w-110
        hover:brightness-60
        active:brightness-110
        bg-[#FFFFFF]"
        on:click={handleGoogleLogin}>
        <img
            class="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
        />
        Log-In With Google
    </button>
</div>
