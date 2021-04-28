<template>
    <div v-if="dataReady">
        <Nav></Nav>
        <div class="bg-gray-200">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-gray-800">
                <div class="text-center py-32">
                    <div class="">
                        <h1 class="text-7xl font-black">Welcome to Immersion Hub</h1>
                    </div>
                    <div class="my-1">
                        <p class="text-3xl font-light">This web application will help you keep track of your language learning</p>
                    </div>
                    <div class="mt-16">
                        <router-link to="/register" class="bg-gray-700 hover:bg-gray-800 w-1/2 text-white rounded text-xl py-4 px-24 focus:outline-none">Create your free account</router-link>
                    </div>
                </div>
            </div>
        </div>
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
            auth: false,
            dataReady: false
        }
    },
    mounted: async function() {
        await this.checkUser();
        this.dataReady = true
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