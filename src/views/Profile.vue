<template>
    <div class="" v-if="auth">
        <div v-if="userinfo">
            <h1 class="text-2xl font-light">Welcome to your Profile, <strong>{{ userinfo.name }}</strong></h1>
        </div>
    </div>
    <div class="" v-if="!auth">
        <h1 class="text-2xl font-light">I am sorry, you are not logged in.</h1>
    </div>
    <div class="pt-12 pb-4 text-gray-800 font-semibold text-2xl">
        <h1>Milestones</h1>
    </div>

    <div class="max-w-xl mx-auto" v-if="milestones">
        <div class="" v-for="(milestone, index) in milestones" :key="milestone._id">
            <div class="bg-gray-100 py-6 rounded relative my-4">
                <div class="px-6">
                    <div class="text-left">
                        <div class="text-gray-700 text-xl font-black">
                            <h1>{{ milestone.title }}</h1>
                        </div>
                        <div class="absolute top-0 right-0 p-6">
                            <button class="text-white font-semibold bg-red-400 hover:bg-red-500 rounded py-1 px-4" @click="remove(index, milestone)">Delete</button>
                        </div>
                        <div class="my-2 text-gray-400 font-semibold">
                            <p>Type: <span class="text-white bg-green-400 px-2 rounded">{{ milestone.type }}</span></p>
                            <p>Hours: <span class="text-white bg-green-400 px-2 rounded">{{ milestone.milestoneHours }}</span></p>
                            <p>Progress (h): <span class="text-white bg-green-400 px-2 rounded">100</span></p>
                            <p>Progress (%): <span class="text-white bg-green-400 px-2 rounded">{{100 / milestone.milestoneHours * 100}}%</span></p>             
                        </div>
                    </div>
                </div>
                <div class="max-w-xl absolute bottom-0 w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded-b bg-pink-200">
                        <div :style="`width:${100 / milestone.milestoneHours * 100}%`" class="focus:outline-none shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="max-w-sm mx-auto p-4 rounded" v-if="noEntries">
        <h1 class="text-xl font-regular text-gray-800 mb-2">Create your first Milestone</h1>
        <button class="py-1 px-2 bg-green-400 hover:bg-green-500 text-white rounded text-base focus:outline-none" @click="add()">Create Milestone</button>
    </div>
    <div v-if="setLoading" class="max-w-sm mx-auto justify-center">
        <div class="mx-auto loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
    name: "Profile",
    data() {
        return {
            userinfo: null,
            milestones: null,
            auth: false,
            setLoading: true,
            noEntries: false
        }
    },
    mounted: async function() {
        await this.checkUser();
        await this.fetchMilestones();
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
        // add the milestone to the database and current array
        add: async function() {
                try {
                    const response = await fetch('http://localhost:8000/api/milestones', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                    }).then(response => response.json()).then(data => this.milestones.push(data));

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
        remove: async function(id, milestone) {
            try {
                const response = await fetch('http://localhost:8000/api/milestones/delete/'+milestone._id, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                    }).then(this.milestones.splice(id, 1))
                    
                    // set noEntries to true, after you deleted one and there are no entries anymore
                    if(this.milestones.length === 0) {
                        this.noEntries = true
                    } else {
                        this.noEntries = false
                    }

            } catch(e) {
                console.log(e)
            }
        }
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