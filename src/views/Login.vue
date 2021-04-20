<template>
    <form @submit.prevent="submit">
      <div class="my-2">
        <input v-model="data.email" class="border-2 border-purple-400 text-purple-400 placeholder-purple-400 rounded py-2 pl-2 pr-6 focus:outline-none" type="email" placeholder="E-Mail" required>
      </div>
      <div class="my-2">
        <input v-model="data.password" class="border-2 border-purple-400 text-purple-400 placeholder-purple-400 rounded py-2 pl-2 pr-6 focus:outline-none" type="password" placeholder="Password" required>
      </div>
      <div class="my-2">
        <button type="submit" class="py-2 px-12 border-purple-400 border-2 rounded bg-purple-400 text-white hover:text-purple-400 hover:bg-transparent cursor-pointer">Login</button>
      </div>
    </form>
</template>


<script lang="ts">
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router';
export default {
    name: "Login",
    setup() {
      const data = reactive({
        email: '',
        password: ''
      });

      const router = useRouter();


      const submit = async() => {
        await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify(data)
        });

        // send user to home page
        await router.push('/')
      }

      return {
        data,
        submit
      }
    }
}
</script>