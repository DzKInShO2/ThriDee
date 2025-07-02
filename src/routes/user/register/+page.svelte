<script lang="ts">
    import { goto } from "$app/navigation";

    import { auth, db, getFirebaseAuthMessage } from "$lib/firebase";
    import { user } from "$lib/stores/authStore";

    import {
        GoogleAuthProvider,
        signInWithPopup,
        getAdditionalUserInfo,
        createUserWithEmailAndPassword,
    } from "firebase/auth";
    import { doc, setDoc } from "firebase/firestore";

    user.subscribe((value) => {
        if (value) {
            goto("/user");
        }
    });

    let passwordNewVisible = $state(false)
    let passwordVerifyVisible = $state(false)

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

        <div class="flex flex-col gap-2">
            <p class="font-light">Email</p>
            <input
                autocomplete="off"
                bind:value={email}
                type="email"
                name="email"
                placeholder="Your email..."
                class="
                shadow-md 
                rounded-lg 
                border-none 
                outline-none 
                focus:ring-0 
                w-70 
                lg:w-100"
                required/>
        </div>
        <div class="flex flex-col gap-2">
            <p class="font-light">New Password</p>
            <div
                class="relative shadow-md rounded-lg w-70 lg:w-100 overflow-clip">
                <input
                    autocomplete="off"
                    bind:value={passwordNew}
                    type={passwordNewVisible ? "text" : "password"}
                    name="new_password"
                    placeholder="Your password..."
                    class="
                    border-none 
                    outline-none 
                    focus:ring-0 
                    w-full"
                    required/>
                <i 
                    on:click={() => {passwordNewVisible = !passwordNewVisible}}
                    class={`
                    transition-transform
                    active:scale-[1.1]
                    absolute
                    fa-solid
                    ${ passwordNewVisible ? "fa-eye-slash" : "fa-eye"}
                    right-5
                    top-[25%]
                    cursor-pointer
                    hover:text-[#FFA808]`}></i>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <p class="font-light">Verify Password</p>
            <div
                class="relative shadow-md rounded-lg w-70 lg:w-100 overflow-clip">
                <input
                    autocomplete="off"
                    bind:value={passwordVerify}
                    type={passwordVerifyVisible ? "text" : "password"}
                    name="new_password"
                    placeholder="Your password..."
                    class="
                    border-none 
                    outline-none 
                    focus:ring-0 
                    w-full"
                    required/>
                <i 
                    on:click={() => {passwordVerifyVisible = !passwordVerifyVisible}}
                    class={`
                    transition-transform
                    active:scale-[1.1]
                    absolute
                    fa-solid
                    ${ passwordVerifyVisible ? "fa-eye-slash" : "fa-eye"}
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
    <button
        on:click={handleGoogleLogin}
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
        bg-[#FFFFFF]">
        <img
            class="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="Google"/>
        Register With Google
    </button>
</div>
