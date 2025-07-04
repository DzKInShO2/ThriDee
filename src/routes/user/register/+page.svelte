<script lang="ts">
    import { goto } from "$app/navigation";

    import { auth, db, getFirebaseAuthMessage } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";
    import { isLoading } from "$lib/stores/stateStore";

    import { doc, setDoc } from "firebase/firestore";
    import {
        GoogleAuthProvider,
        signInWithPopup,
        createUserWithEmailAndPassword,
        getAdditionalUserInfo,
        updateProfile,
    } from "firebase/auth";

    import { 
        ClickableButton,
        GoogleAuthButton,
        InputField,
        PasswordField
    } from "../../../components/design";
    import { Timestamp } from "firebase/firestore";

    $effect(() => {
        if ($user) {
            location.href=`/user?id=${$user!.uid}`;
        }
    });

    let authError = $state("");

    let username = $state("");
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

        $isLoading = true;
        createUserWithEmailAndPassword(auth, email, passwordNew)
            .then(cred => {
                updateProfile($user!, {
                    displayName: username
                });

                setDoc(doc(db, "user", cred.user.uid), {
                    name: username,
                    bio: "",
                    photoURL: "",
                    joined: Timestamp.fromDate(new Date(cred.user.metadata.creationTime!))
                }).then(() => $isLoading = false);
            })
            .catch((error) => {
                authError = getFirebaseAuthMessage(error.code);
                $isLoading = false;
            });
    }

    async function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((cred) => {
                const additionalInfo = getAdditionalUserInfo(cred)!;
                const isUserNew = additionalInfo?.isNewUser ?? (cred.user.metadata.creationTime === cred.user.metadata.lastSignInTime);
                if (isUserNew) {
                    setDoc(doc(db, "user", cred.user.uid), {
                        name: cred.user.displayName ?? "",
                        bio: "",
                        photoURL: cred.user.photoURL ?? "",
                        joined: Timestamp.fromDate(new Date(cred.user.metadata.creationTime!))
                    }).then(() => $isLoading = false);
                }
            })
            .catch((error) => {
                authError = getFirebaseAuthMessage(error.code);
                $isLoading = false;
            });
    }
</script>

<div class="
    h-screen
    flex 
    flex-col 
    items-center 
    gap-10 
    mt-10 
    lg:mt-20">
    <h1 class="text-3xl font-medium">Register</h1>
    <!-- svelte-ignore event_directive_deprecated -->
    <form
        autocomplete="off"
        on:submit|preventDefault={handleRegister}
        method="POST"
        class="
        auth-container
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
        <input type="username" class="hidden" autocomplete="username"/>
        <input type="username" class="hidden" autocomplete="username"/>
        <input type="password" class="hidden" autocomplete="current-password"/>
        <input type="password" class="hidden" autocomplete="new-password"/>

        {#if (authError != "")}
            <p class="block m-auto text-red-500">{authError}</p>
        {/if}

        <InputField title="Username" hint="Your username..." bind:value={username} />
        <InputField title="Email" bind:value={email} />
        <PasswordField title="New Password" bind:value={passwordNew} />
        <PasswordField title="Verify Password" bind:value={passwordVerify} />
        <ClickableButton label="Register" onclick={handleRegister} />

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

<style>
    .footer {
        display: none;
    }
</style>
