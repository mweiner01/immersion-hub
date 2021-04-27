<template>
  <div class="absolute shadow z-50 top-0 left-0 bg-white h-full w-64" style="min-height: 890px;">
    <div class="pl-4 bg-white py-5 flex">
      <h1 class="uppercase text-gray-800 text-left text-xl leading-none">Dashboard</h1>
      <p class="ml-2 bg-purple-500 px-2 rounded-md text-white uppercase font-semibold">Beta</p>
    </div>
    <div class="text-white px-2">
      <div class="mb-3 text-green-700 font-bold uppercase text-sm pt-4 pl-2 flex">
        <h1>General</h1>
      </div>
      <div class="text-sm font-semibold text-black bg-green-200 bg-opacity-50 hover:text-green-800 rounded pl-2 pr-12 py-2 mb-2">
        <a href="/dashboard/users/<%= mysqlUser.username %>/manage/profile" class="px-2">Settings</a>
      </div>
    </div>
    <div class="text-white px-2">
      <div class="mb-3 text-green-700 font-bold uppercase text-sm pt-4 pl-2 flex">
        <h1>Insights</h1>
      </div>
      <div class="text-sm font-semibold text-black hover:bg-green-200 hover:bg-opacity-50 hover:text-green-800 rounded pl-2 pr-12 py-2 mb-2">
        <router-link to="/profile" class="px-2">Profile</router-link>
      </div>
      <div class="text-sm font-semibold text-black hover:bg-green-200 hover:bg-opacity-50 hover:text-green-800 rounded pl-2 pr-12 py-2 mb-2">
        <router-link to="/dashboard/timers" class="px-2">Timers</router-link>
      </div>
      <div class="text-sm font-semibold text-black hover:bg-green-200 hover:bg-opacity-50 hover:text-green-800 rounded pl-2 pr-12 py-2 mb-2">
        <router-link to="/dashboard/milestones" class="px-2">Milestones</router-link>
      </div>
    </div>
    <div class="text-white">
      <div class="my-3 text-md font-semibold tracking-tight pl-16 py-1 pt-12">
        <a href="/logout" class="bg-red-400 py-1 px-4 hover:bg-red-500 rounded">Ausloggen</a>
      </div>
    </div>
  </div>
    <div class="pl-64 absolute top-0 left-0 w-full z-0" style="min-width: 1610px">
      <div class="w-full bg-white shadow flex">
        <div class="ml-auto flex flex-wrap inline-block pr-32 mt-2">
          <div class="pl-4 pb-1">
            <img src="https://minotar.net/helm/makkuinJapan/100" class="h-10 w-10 rounded-full shadow-xl" alt="">
          </div>
          <div class="ml-2 text-sm mt-2 leading-none">
            <h1 class="text-gray-600 font-semibold"></h1>
            <h1 class="text-gray-500">Max</h1>
          </div>
        </div>
      </div>
    </div>
  <div class="pl-64 pt-16 w-full h-screen" style="min-width: 1610px;">
    <div class="pt-4 max-w-5xl mx-auto">
        <div class="pl-2 text-left">
          <h1 class="text-gray-800 text-4xl font-extrabold">Milestones</h1>
        </div>
          <div class="pt-4 flex border-b text-gray-600 font-semibold">
            <div class="mr-4 px-2 py-4 border-b-2 text-green-600 border-green-600">
              <a href="">All</a>
            </div>
            <div class="mx-4 px-2 py-4 border-b-2 border-transparent hover:text-green-600 hover:border-green-600">
              <a href="">Reading</a>
            </div>
            <div class="mx-4 px-2 py-4 border-b-2 border-transparent hover:text-green-600 hover:border-green-600">
              <a href="">Listening</a>
            </div>
            <div class="mx-4 px-2 py-4 border-b-2 border-transparent hover:text-green-600 hover:border-green-600">
              <a href="">Passive Listening</a>
            </div>
          </div>
            <div>
                <div v-if="milestones">
                    <div v-if="milestones.length > 0">
                        <milestones :listdata="milestones" @removeMilestone="remove"></milestones>
                    </div>
                </div>
            </div>

            <div v-if="setLoading" class="max-w-5xl pt-6 mr-auto">
                <div class="loader ease-linear rounded-full mx-auto border-2 border-t-2 border-gray-200 h-12 w-12"></div>
            </div>

            <createMilestone :ldta="milestones" @addMilestone="addMilestone"></createmilestone>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import milestones from '@/components/milestones.vue';
import createMilestone from '@/components/createmilestone'
import Nav from '@/components/Nav.vue';

export default {
    name: "Profile",
    data() {
        return {
            userinfo: null,
            milestones: null,
            auth: false,
            setLoading: true,
            noEntries: false,
            dataReady: false
        }
    },
    mounted: async function() {
        await this.checkUser();
        await this.fetchMilestones();
        this.dataReady = true;
    },
    methods: {
        // Check user
        checkUser: async function() {
                const store = useStore();
                const router = useRouter();

                if(computed(() => store.state.authenticated)) {
                    this.auth = computed(() => store.state.authenticated);
                } else {
                    await router.push('/')
                }
                

                try {
                    const response = await fetch('http://localhost:8000/api/user', {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                    }).then(response => response.json()).then(data => this.userinfo = data);
                } catch(e) {
                    await store.dispatch(('setAuth'), false)
                }
        },
        // Fetch all milestones
        fetchMilestones: async function() {
            try {
                await fetch('http://localhost:8000/api/milestones/'+this.userinfo.name, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                }).then(response => response.json()).then(data => this.milestones = data);
                // set loading false (no spinner anymore)
                this.setLoading = false

                 // if there are no entries set noEntries to true
                if(this.milestones.length === 0) {
                    this.noEntries = true
                } else {
                    this.noEntries = false
                }

            } catch(e) {
                console.log(e)
            }
        },
        // Remove the milestone from database and also from the current array
        remove: async function(index, milestone) {
            try {
                await fetch('http://localhost:8000/api/milestones/delete/'+milestone._id, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                    }).then(this.milestones.splice(index, 1))
                    
                    // set noEntries to true, after you deleted one and there are no entries anymore
                    if(this.milestones.length === 0) {
                        this.noEntries = true
                    } else {
                        this.noEntries = false
                    }

            } catch(e) {
                console.log(e)
            }
        },
        addMilestone: async function(form) {
                try {
                    await fetch('http://localhost:8000/api/milestones', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(form)
                    }).then(response => response.json()).then(data => this.milestones.push(data));
                } catch(e) {
                    console.log(e)
                }
        },
    },
    components: {
        milestones,
        createMilestone,
    }
}
</script>
<style>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>