<script lang="ts">
    import { goto } from "$app/navigation";

    import { auth, db, getFirebaseAuthMessage } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";

    import { doc, setDoc } from "firebase/firestore";
    import {
        GoogleAuthProvider,
        signInWithPopup,
        createUserWithEmailAndPassword,
    } from "firebase/auth";

    import { 
        GoogleAuthButton,
        InputField,
        PasswordField
    } from "../../../components/design";

    $effect(() => {
        if ($user) {
            goto("/user");
        }
    });

    let authError = $state("")

    let email = $state("");
    let passwordNew = $state("");
    let passwordVerify = $state("");
    async function handleRegister() {
        if (passwordNew != passwordVerify) {
            authError = "Passwords must match!";
            return
        }

        if (passwordNew.length < 8) {
            authError = "Password must at least be 8 characters long.";
            return
        }

        createUserWithEmailAndPassword(auth, email, passwordNew)
            .then(cred => {
                setDoc(doc(db, "user", cred.user.uid), {
                    bio: "",
                });
            })
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

<div class="
    flex 
    flex-col 
    items-center 
    gap-10 
    mt-20 
    lg:mt-50 
    h-screen">
    <h1 class="text-3xl font-medium">Register</h1>
    <form
        autocomplete="off"
        on:submit|preventDefault={handleRegister}
        method="POST"
        class="
        flex 
        flex-col 
        gap-5 
        shadow-2xl 
        rounded-4xl 
        bg-[#FAFAFA] 
        p-10 
        w-90 
        lg:w-120">

        <input type="email" class="hidden" autocomplete="email"/>
        <input type="password" class="hidden" autocomplete="current-password"/>
        <input type="password" class="hidden" autocomplete="new-password"/>

        {#if (authError != "")}
            <p class="block m-auto text-red-500">{authError}</p>
        {/if}

        <InputField title="Email" bind:value={email} />
        <PasswordField title="New Password" bind:value={passwordNew} />
        <PasswordField title="Verify Password" bind:value={passwordVerify} />

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
            Register
        </button>

        <p class="
            block 
            m-auto">
            Aleady have an account? <a
                href="/user/login"
                class="
                text-[#FFA808] 
                hover:text-[#F75B00] 
                cursor-pointer">
                login here</a>.
        </p>
    </form>

    <GoogleAuthButton label="Register with Google" onclick={handleGoogleLogin} />
</div>
