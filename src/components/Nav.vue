<template>
<div class="shadow-xl py-4">
<nav class="flex flex-wrap max-w-6xl mx-auto items-center justify-between px-6 lg:px-16">
    <div class="flex flex-shrink-0 text-white">
        <a class="#" href="/">
                <img src="images/logo.png" alt="" class="w-auto h-12" />
        </a>
    </div>
    <!-- Menu Button (Mobile) -->
    <div class="block lg:hidden">
        <button class="flex items-center px-4 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <p>Menu</p>
        </button>
    </div>
    <div class="inline-block lg:block hidden ml-auto mr-6">
        <ul class="flex flex-row float-right">
            <router-link to="/" class="py-2 px-4 mx-2 border-2 border-transparent text-gray-800 hover:text-yellow-500 cursor-pointer font-semibold">Home</router-link>
        </ul>
        </div>
            <div class="flex flex-shrink-0 text-white" v-if="!auth">
                <router-link to="/login" class="font-semibold text-yellow-500 border-2 border-yellow-500 rounded-md py-2 px-4 hover:bg-yellow-500 hover:text-white mx-2">Login</router-link>
                <router-link to="register" class="font-semibold text-yellow-500 border-2 border-yellow-500 rounded-md py-2 px-4 hover:bg-yellow-500 hover:text-white mx-2">Register</router-link>
            </div>
            <div class="flex flex-shrink-0 text-white" v-if="auth">
                <router-link to="/login" class="font-semibold text-yellow-500 border-2 border-yellow-500 rounded-md py-2 px-4 hover:bg-yellow-500 hover:text-white mx-2" @click="logout">Logout</router-link>
            </div>
    </nav>
</div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex'
import {onMounted, ref} from 'vue';
export default {
    name: "Nav", 
    setup() {
        const store = useStore();
        const auth = computed(() => store.state.authenticated);

        // check if the user is loggedin
        onMounted(async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                method: "GET",
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
                });

                const content = await response.json();
                
                // If the response is ok we set authentication to true
                if(response.ok) {
                    await store.dispatch(('setAuth'), true)
                }
            } catch(e) {
                await store.dispatch(('setAuth'), false)
            }
        })
        

        // function to logout the user
        const logout = async() => {
            await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            });
            await store.dispatch(('setAuth'), false)
        }

        return {
            auth,
            logout
        }

    }
}
</script>
