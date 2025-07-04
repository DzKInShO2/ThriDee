import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({url}) => {
    const modelId = url.searchParams.get("id") ?? "";

    return {
        id: modelId
    };
};
