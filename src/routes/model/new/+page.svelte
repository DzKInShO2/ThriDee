<script lang="ts">

import { goto } from "$app/navigation";
import { user } from "$lib/stores/authStore"

$effect(() => {
    if (!$user) {
        goto("/");
    }
});
</script>
