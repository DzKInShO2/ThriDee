<script lang="ts">
    import { slide } from "svelte/transition";

    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    import {
        categories,
        currencyFormatter,
        currencyReverter,
    } from "$lib/firebase";

    import { ModelCard } from "../../components/design";

    const { data } = $props();

    const categoriesFilter = [
        {
            title: "Semua",
            id: "",
        },
        ...categories,
    ];

    const prices = ["Semua", "Gratis", "Lebih Besar", "Lebih Kecil", "Jarak"];

    const priceMap = {
        "": 0,
        f: 1,
        g: 2,
        l: 3,
        r: 4,
    };

    let search = page.url.searchParams.get("s") ?? "";
    let category = $state(categoriesFilter.find(a => a.id === (page.url.searchParams.get("c") ?? "")));

    let priceURL = page.url.searchParams.get("p") ?? "";

    let price = $state(prices[priceMap[priceURL]]);

    const priceRanges = priceURL.split(";");
    let priceFirst = $state(Number(priceRanges[1] ?? 0));
    let priceSecond = $state(Number(priceRanges[2] ?? 0));

    let priceFirstDisplay = $state(currencyFormatter.format(priceFirst));
    let priceSecondDisplay = $state(currencyFormatter.format(priceSecond));

    $effect(() => {
        if (priceFirstDisplay) {
            priceFirst = currencyReverter(priceFirstDisplay);
            priceFirstDisplay = currencyFormatter.format(priceFirst);
        }

        if (priceSecondDisplay) {
            priceSecond = currencyReverter(priceSecondDisplay);
            priceSecondDisplay = currencyFormatter.format(priceSecond);
        }
    });

    function priceChange() {
        const s = `/search?s=${page.url.searchParams.get("s") ?? ""}`;
        const c = page.url.searchParams.get("c")
            ? `&c=${page.url.searchParams.get("c")}`
            : "";

        const p = price
            .replace(prices[0], "")
            .replace(prices[1], "f")
            .replace(prices[2], "g")
            .replace(prices[3], "l")
            .replace(prices[4], "r");

        if (p === "l" || p === "g") {
            priceSecond = -1;
        } else if (p === "r") {
            if (priceSecond < priceFirst) {
                priceSecond = priceFirst;
                priceSecondDisplay = currencyFormatter.format(priceSecond);
            }
        } else {
            priceFirst = -1;
            priceSecond = -1;
        }

        const l = priceFirst > -1 ? `;${priceFirst}` : "";
        const u = priceSecond > -1 ? `;${priceSecond}` : "";
        goto(`${s}${c}&p=${p}${l}${u}`);
    }
</script>

<section class="p-5 flex flex-col gap-10 min-h-screen">
    <div
        class="
        flex
        flex-col
        md:flex-row
        justify-start
        gap-5
        rounded-xl
        shadow-xl
        border
        border-gray-300
        p-3
        bg-gray-100
        "
    >
        <div class="flex gap-3 items-center justify-start">
            <p>Kategori</p>
            <select
                bind:value={category}
                onchange={() => {
                    const s = `/search?s=${page.url.searchParams.get("s") ?? ""}`;
                    const c = category.id;
                    const p = page.url.searchParams.get("p")
                        ? `&p=${page.url.searchParams.get("p")}`
                        : "";
                    goto(`${s}&c=${c}${p}`);
                }}
                class="border
                border-gray-100
                rounded-xl
                ring-0
                font-light text-sm"
            >
                {#each categoriesFilter as c}
                    <option value={c}>
                        {c.title}
                    </option>
                {/each}
            </select>
        </div>
        <div class="flex gap-2 flex-col md:flex-row">
            <div class="flex gap-2 items-center">
                <p>Harga</p>
                <select
                    bind:value={price}
                    onchange={priceChange}
                    class="border
                    border-gray-100
                    rounded-xl
                    ring-0
                    font-light text-sm"
                >
                    {#each prices as p}
                        <option value={p}>
                            {p}
                        </option>
                    {/each}
                </select>
            </div>
            {#if price !== prices[0] && price !== prices[1]}
                <input
                    transition:slide
                    onchange={priceChange}
                    class="w-full rounded-md text-sm ring-0 border-gray-100 font-light"
                    min="0"
                    bind:value={priceFirstDisplay}
                />
            {/if}
            {#if price === prices[4]}
                <input
                    transition:slide
                    onchange={priceChange}
                    class="w-full rounded-md text-sm ring-0 border-gray-100 font-light"
                    min="0"
                    bind:value={priceSecondDisplay}
                />
            {/if}
        </div>
    </div>

    {#if search.length > 0}
        <p class="text-2xl p-2">
            Ditemukan {data.ids.length} model terkait kata kunci "<span
                class="font-light">{search}</span
            >"
        </p>
    {/if}

    {#if data.ids.length > 0}
        <div class="grid gap-x-8 gap-y-8 mr-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 2xl:-mr-5 justify-items-center">
            {#key data.ids}
            {#each data.ids as id}
            <ModelCard {id} />
            {/each}
            {/key}
        </div>
    {:else}
        <div class="flex flex-col items-center w-full">
            <img class="rounded-full" alt="Adit" src="/nomodel.webp" />
            <h1>
                Oops! Model yang anda cari tidak ditemukan! Mungkin sudah
                ditelan Adit!
            </h1>
        </div>
    {/if}
</section>
