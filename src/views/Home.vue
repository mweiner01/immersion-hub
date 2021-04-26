<template>
    <Nav></Nav>
    <div class="" v-if="auth">
        <div v-if="userinfo">
            <h1 class="text-2xl font-light">Welcome to the home page, <strong>{{ userinfo.name }}</strong> and your coins are: <strong>{{ userinfo.coins }}</strong></h1>
        </div>
    </div>
    <div class="" v-if="!auth">
        <h1 class="text-2xl font-light">I am sorry, you are not logged in.</h1>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Nav from '@/components/Nav'

export default {
    name: "Home",
    data() {
        return {
            userinfo: null,
            auth: false
        }
    },
    mounted: function() {
        this.checkUser();
    },
    methods: {
        checkUser: async function() {
                const store = useStore();
                this.auth = computed(() => store.state.authenticated);
                try {
                    const response = await fetch('http://localhost:8000/api/user', {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                    }).then(response => response.json()).then(data => this.userinfo = data);
                    

                    // check if the user is loggedin (Maybe make this a function because we use it alot)
                    if(response.status === 200) {
                        await store.dispatch(('setAuth'), true)
                    }
                } catch(e) {
                    await store.dispatch(('setAuth'), false)
                }
        }
    },
    components: {
        Nav
    }
}
</script>