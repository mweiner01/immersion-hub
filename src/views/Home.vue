<template>
    <div class="" v-if="auth">
        <h1 class="text-2xl font-light">Welcome to the home page, {{ name }}</h1>
    </div>
    <div class="" v-if="!auth">
        <h1 class="text-2xl font-light">I am sorry, you are not logged in.</h1>
    </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: "Home",
    setup() {
        const store = useStore();
        const auth = computed(() => store.state.authenticated);
        const name = ref();

        onMounted(async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                method: "GET",
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
                });

                const content = await response.json();

                // check if the user is loggedin (Maybe make this a function because we use it alot)
                if(response.status == 200) {
                    name.value = content.name
                    await store.dispatch(('setAuth'), true)
                }
            } catch(e) {
                await store.dispatch(('setAuth'), false)
            }
        })

        return {
            name,
            auth
        }
    }
}
</script>