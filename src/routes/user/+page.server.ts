import type { PageServerLoad } from "./$types";
import { user } from "$lib/stores/authStore";

export const load: PageServerLoad = async ({url}) => {
    if (!user) {
        return {
            user: null
        };
    }
};
