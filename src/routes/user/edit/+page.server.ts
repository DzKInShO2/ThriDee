import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = ({url}) => {
    return {
        user: url.searchParams.get("id")
    };
};
