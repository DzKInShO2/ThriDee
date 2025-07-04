<script lang="ts">
    import { goto } from "$app/navigation";
    import { db, storage } from "$lib/firebase.js";
    import { doc, getDoc, setDoc } from "firebase/firestore";

    import { user } from "$lib/stores/authStore";
    import { isLoading } from "$lib/stores/stateStore";

    import { 
        ActionChangeDialog,
        BioChangeDialog,
        ClickableFileDialog,
        InfoChangeDialog,
        PasswordChangeDialog,
        ProfilePhoto
    } from "../../../components/design";
    import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

    let { data } = $props();

    if (!data.user) {
        goto("/");
    }

    $effect(() => {
        if (!$user || ($user && $user!.uid !== data.user)) {
            goto("/");
        }
    });

    let profileValue = $state<File>();
    let profileVisibility = $state(false);

    let nameVisibility = $state(false);
    let nameValue = $state("");

    let bioVisibility = $state(false);
    let bioValue = $state("");

    let emailVisibility = $state(false);
    let emailValue = $state("");

    let phoneVisibility = $state(false);
    let phoneValue = $state("");

    let passwordVisibility = $state(false);

    let userData = $state<any>();
    getDoc(doc(db, "user", data.user!)).then((snap) => {
        userData = {
            id: snap.id,
            ...snap.data(),
        };
    });

    async function profileFileFilter() {
        if (profileValue === undefined) return;

        profileVisibility = true;
    }

    async function changeProfile() {
        if (profileValue === undefined) return;
        
        $isLoading = true;

        const ext = profileValue.name.split(".").pop();
        uploadBytes(ref(storage, `/user/profile/${$user!.uid}.${ext}`), profileValue!).then((result) => {
            getDownloadURL(result.ref).then((url) => {
                setDoc(doc(db, "user", $user!.uid), {
                    photoURL: url
                }, {merge: true}).then(() => {
                    userData.photoURL = profileValue;
                    profileVisibility = false;

                    updateProfile($user!, {
                        photoURL: url
                    });
                    $isLoading = false;
                    location.href = `/user/edit?id=${$user!.uid}`;
                });
            });
        });
    }

    async function changeName() {
        $isLoading = true;

        updateProfile($user!, {
            displayName: nameValue
        });

        setDoc(doc(db, "user", $user!.uid), {
            name: nameValue
        }, {merge: true}).then(() => {
            userData.name = nameValue;
            nameVisibility = false;
            $isLoading = false;
        });
    }

    async function changeBio() {
        $isLoading = true;
        setDoc(doc(db, "user", $user!.uid), {
            bio: bioValue
        }, {merge: true}).then(() => {
            userData.bio = bioValue;
            bioVisibility = false;
            $isLoading = false;
        });
    }

    async function changeEmail() {
        $isLoading = true;
        updateEmail($user!, emailValue).then(() => {
            emailVisibility = false;
            $isLoading = false;
        });
    }

    async function changePhone() {
        $isLoading = true;
        setDoc(doc(db, "user", $user!.uid), {
            phone: userData.phone
        }, {merge: true}).then(() => {
            userData.phone = phoneValue;
            phoneVisibility = false;
            $isLoading = false;
        });
    }

    async function changePassword(password: String) {
        $isLoading = true;
        updatePassword($user!, password.toString()).then(() => {
            $isLoading = false;
        });
    }
</script>

<ActionChangeDialog label="Ganti gambar profil" text="Apakah anda yakin ingin mengganti gambar profil?" bind:visibility={profileVisibility} onaccept={changeProfile} />

<InfoChangeDialog label="Ganti Nama" hint="Your name..." bind:visibility={nameVisibility} bind:value={nameValue} onaccept={changeName} />

<BioChangeDialog label="Ganti Bio" hint="Your bio..." bind:visibility={bioVisibility} bind:value={bioValue} onaccept={changeBio} />

<InfoChangeDialog label="Ganti Email" hint="Your email..." bind:visibility={emailVisibility} bind:value={emailValue} onaccept={changeEmail} />

<InfoChangeDialog label="Ganti Telepon" hint="Your phone number..." bind:visibility={phoneVisibility} bind:value={phoneValue} onaccept={changePhone} />

<PasswordChangeDialog label="Ganti Password" hint="Your new password..." bind:visibility={passwordVisibility}  onaccept={changePassword} />

<div class="flex flex-col gap-5 items-center p-10 w-180 md:w-250 m-auto h-screen">
    <p class="text-4xl mt-10 mb-32">Edit Profil</p>
    {#if userData}
        <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
            <p class="p-3 text-xl font-medium">Info Dasar</p>
            <ClickableFileDialog bind:file={profileValue} extensions="image/*" onchange={profileFileFilter}
                classNames="group flex items-center justify-between p-5 hover:bg-gray-200 cursor-pointer">
                <p class="text-md font-normal">Gambar profil</p>
                <div>
                    <div class="flex gap-5 items-center">
                        <div class="w-[64px] h-[64px] rounded-full overflow-clip">
                            <ProfilePhoto photoUrl={userData.photoURL} />
                        </div>
                        <div class="hidden group-hover:block">
                            <i class="fa-solid fa-pen"></i>
                        </div>
                    </div>
                </div>
            </ClickableFileDialog>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                onclick={() => { 
                    nameValue = userData.name;
                    nameVisibility = true ;
                }}
                class="group flex items-center justify-between p-5 hover:bg-gray-200 border-t-1 border-gray-200 cursor-pointer">
                <p class="text-md font-normal">Nama</p>
                <div class="flex gap-5">
                    <p class="font-thin">{userData.name}</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                onclick={() => { 
                    bioValue = userData.bio;
                    bioVisibility = true ;
                }}
                class="group flex items-center justify-between p-5 hover:bg-gray-200 border-t-1 border-gray-200 cursor-pointer">
                <p class="text-md font-normal">Bio</p>
                <div class="flex gap-5">
                    <p class="font-thin">{userData.bio}</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
            <p class="p-3 text-xl font-medium">Info Kontak</p>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                onclick={() => { 
                    emailValue = $user!.email!;
                    emailVisibility = true ;
                }}
                class="group flex items-center justify-between p-5 hover:bg-gray-200 cursor-pointer">
                <p class="text-md font-normal">Email</p>
                <div class="flex gap-5">
                    <p class="font-thin">{$user!.email}</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                onclick={() => { 
                    phoneValue = userData.phone;
                    phoneVisibility = true;
                }}
                class="group flex items-center justify-between p-5 hover:bg-gray-200 border-t-1 border-gray-200 cursor-pointer">
                <p class="text-md font-normal">Telepon</p>
                <div class="flex gap-5">
                    <p class="font-thin">{userData.phone}</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
            <p class="p-3 text-xl font-medium">Sandi</p>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                onclick={() => { 
                    passwordVisibility = true;
                }}
                class="group flex items-center justify-between p-5 hover:bg-gray-200 cursor-pointer">
                <p class="text-md font-normal">Kata Sandi</p>
                <div class="flex gap-5">
                    <p class="font-thin">...............</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
