import { writable } from "svelte/store";

export const isLoading = writable<Boolean>(false);
