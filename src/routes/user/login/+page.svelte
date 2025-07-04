<script lang="ts">
    import { goto } from "$app/navigation";

    import { user } from "$lib/stores/authStore";
    import { isLoading } from "$lib/stores/stateStore";
    import { auth, db, getFirebaseAuthMessage } from "$lib/firebase";

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
        getAdditionalUserInfo,
    } from "firebase/auth";
    import { doc, setDoc, Timestamp } from "firebase/firestore";

    $effect(() => {
        if ($user) {
            location.href=`/user?id=${$user!.uid}`;
        }
    });

    let authError = $state("")
    let email = $state("");
    let password = $state("");
    async function handleLogin() {
        $isLoading = true;
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                $isLoading = false;
            })
            .catch((error) => {
                authError = getFirebaseAuthMessage(error.code);
                $isLoading = false;
            });
    }

    async function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();

        $isLoading = true;
        signInWithPopup(auth, provider)
            .then((cred) => {
                const additionalInfo = getAdditionalUserInfo(cred);
                const isUserNew = additionalInfo?.isNewUser ?? (cred.user.metadata.creationTime === cred.user.metadata.lastSignInTime);
                if (isUserNew) {
                    setDoc(doc(db, "user", cred.user.uid), {
                        name: cred.user.displayName ?? "",
                        bio: "",
                        photoURL: cred.user.photoURL ?? "",
                        joined: Timestamp.fromDate(new Date(cred.user.metadata.creationTime!))
                    });
                }
                $isLoading = false;
            })
            .catch((error) => {
                authError = getFirebaseAuthMessage(error.code);
                $isLoading = false;
            });
    }
</script>

<div
    class="
    h-screen
    flex
    flex-col
    items-center
    gap-10
    mt-20
    lg:mt-20">
    <h1 class="text-3xl font-medium">Login</h1>
    <!-- svelte-ignore event_directive_deprecated -->
    <form
        on:submit|preventDefault={handleLogin}
        method="POST"
        class="auth-container flex flex-col gap-5">

        {#if (authError != "")}
            <p class="block m-auto text-red-500">{authError}</p>
        {/if}

        <InputField title="Email" bind:value={email} />
        <PasswordField title="Password" bind:value={password} />
        <ClickableButton label="Log-In" onclick={handleLogin} />

        <p class="block m-auto">
            Don't have an account? <a
                href="/user/register"
                class="text-[#FFA808] hover:text-[#F75B00] cursor-pointer"
                >register here</a>.
        </p>
    </form>

    <GoogleAuthButton label="Log-In with Google" onclick={handleGoogleLogin} />
</div>
