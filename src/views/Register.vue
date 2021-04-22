<template>
    <form @submit.prevent="submit" class="text-gray-700 max-w-xs mx-auto">
      <div class="my-4">
        <h1 class="text-green-500 font-light">Create your <strong>free</strong> account now!</h1>
      </div>
      <div class="my-2">
        <input v-model="data.name" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none" type="text" placeholder="Name" required>
      </div>
      <div class="my-2">
        <input v-model="data.email" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none" type="email" placeholder="Email" required>
      </div>
      <div class="my-2">
        <input v-model="data.password" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none" type="password" placeholder="Password" required>
      </div>
      <div class="my-2">
        <button type="submit" class="py-2 px-12 bg-green-400 hover:bg-green-500 rounded text-white cursor-pointer w-full">Create account</button>
      </div>
      <div class="my-2">
        <small class="text-green-500">Already have an account? <a href="/login" class="text-green-400 hover:underline">Login here</a></small>
      </div>
    </form>
</template>

<script lang="ts">
import {reactive} from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: "Register",
    setup() {
      const data = reactive({
        name: '',
        email: '',
        password: ''
      });

      const router = useRouter()

      const submit = async() => {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if(!response.ok) {
          alert("The Username or Email is not available")
        } else {
          await router.push('/login')
        }
      }


      return {
        data,
        submit
      }
    }
}
</script>