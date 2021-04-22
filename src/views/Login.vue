<template>
    <form @submit.prevent="submit" class="text-gray-700 max-w-xs mx-auto">
      <div class="my-4">
        <h1 class="text-gray-800 text- font-light">Log into your Account!</h1>
      </div>
      <div class="my-2">
        <input v-model="data.email" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-300 focus:outline-none" type="email" placeholder="Email" required>
      </div>
      <div class="my-2">
        <input v-model="data.password" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-300 focus:outline-none" type="password" placeholder="Password" required>
      </div>
      <div class="my-2">
        <button type="submit" class="py-2 px-12 bg-green-300 hover:bg-green-400 rounded text-white cursor-pointer w-full">Login</button>
      </div>
      <div class="my-2">
        <small class="text-green-400 hover:underline cursor-pointer"><a href="/">Forgot your Password?</a></small>
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
       const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify(data)
        });

        if(!response.ok) {
          await alert("The Email or password is wrong!")
        } else {
          await router.push('/')
        }
      }

      return {
        data,
        submit
      }
    }
}
</script>