<script lang="ts">
    import { goto } from "$app/navigation";

    import { user } from "$lib/stores/authStore";
    import { auth, getFirebaseAuthMessage } from "$lib/firebase";

    import { 
        ClickableButton,
        GoogleAuthButton, 
        InputField, 
        PasswordField 
    } from "../../../components/design";

    import {
        signInWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
    } from "firebase/auth";

    $effect(() => {
        if ($user) {
            goto("/user");
        }
    });

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
    <!-- svelte-ignore event_directive_deprecated -->
    <form
        on:submit|preventDefault={handleLogin}
        method="POST"
        class="flex flex-col gap-5 shadow-2xl rounded-4xl bg-[#FAFAFA] p-10 w-90 lg:w-120">

        {#if (authError != "")}
            <p class="block m-auto text-red-500">{authError}</p>
        {/if}

        <InputField title="Email" bind:value={email} />
        <PasswordField title="Password" bind:value={password} />
        <ClickableButton label="Log-In" />

        <p class="block m-auto">
            Don't have an account? <a
                href="/user/register"
                class="text-[#FFA808] hover:text-[#F75B00] cursor-pointer"
                >register here</a>.
        </p>
    </form>

    <GoogleAuthButton label="Log-In with Google" onclick={handleGoogleLogin} />
</div>
