<template>
<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto flex items-center justify-between flex-wrap bg-gray-800 p-4">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <span class="font-semibold text-xl tracking-tight">Immersion Hub</span>
  </div>
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-md text-gray-600 font-semibold lg:flex-grow">
      <router-link to="Home" href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 hover:bg-gray-700 hover:text-white py-1 px-4 rounded mr-4">
        Home
      </router-link>
      <router-link to="/blog" href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 hover:bg-gray-700 hover:text-white py-1 px-4 rounded mr-4">
        Blog
      </router-link>
      <router-link to="/dashboard" class="block mt-4 lg:inline-block lg:mt-0 hover:bg-gray-700 hover:text-white py-1 px-4 rounded">
        Dashboard
      </router-link>
    </div>
    <div>
      <router-link to="/login" class="inline-block text-md px-6 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 font-semibold hover:bg-white mt-4 lg:mt-0">Login</router-link>
    </div>
  </div>
</div>
</nav>

</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex'
import { onMounted } from 'vue';
export default {
    name: "Nav",
    data() {
        return {
            usermenu: false
        }
    },
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
