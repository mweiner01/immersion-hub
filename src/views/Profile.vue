<template>
    <div class="" v-if="auth">
        <div v-if="userinfo" class="pt-12 text-left">
            <h1 class="text-5xl font-semibold text-gray-700">Good Afternoon, <strong class="font-black">{{ userinfo.name }}</strong></h1>
        </div>
    </div>
    <div class="" v-if="!auth">
        <h1 class="text-2xl font-light">I am sorry, you are not logged in.</h1>
    </div>
    <div class="pt-12 pb-4 text-gray-800 font-semibold text-2xl text-left" v-if="!noEntries">
        <h1>Milestones</h1>
    </div>

    <div class="max-w-6xl mr-auto" v-if="milestones">
        <div class="" v-for="(milestone, index) in milestones" :key="milestone._id">
            <div class="bg-gray-100 py-6 rounded relative my-4">
                <div class="px-6">
                    <div class="text-left">
                        <div class="text-gray-700 text-2xl font-black">
                            <h1>{{ milestone.title }}</h1>
                        </div>
                        <div class="absolute top-0 right-0 p-6">
                            <button class="focus:outline-none text-white font-semibold bg-yellow-400 hover:bg-yellow-500 rounded py-1 px-4 mr-2">Edit</button>
                            <button class="focus:outline-none text-white font-semibold bg-red-400 hover:bg-red-500 rounded py-1 px-4" @click="remove(index, milestone)">Delete</button>
                        </div>
                        <div class="my-2 text-gray-400 font-semibold">
                            <p>Type: <span class="text-white bg-green-400 px-2 rounded">{{ milestone.type }}</span></p>
                            <p>Hours: <span class="text-white bg-green-400 px-2 rounded">{{ milestone.milestoneHours }}</span></p>
                            <p>Progress (h): <span class="text-white bg-green-400 px-2 rounded">0</span></p>
                            <p>Progress (%): <span class="text-white bg-green-400 px-2 rounded">{{ calculatePercantage(milestone.milestoneHours) }}%</span></p>             
                        </div>
                    </div>
                </div>
                <div class="max-w-6xl absolute bottom-0 w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded-b bg-pink-200">
                        <div :style="`width:${0 / milestone.milestoneHours * 100}%`" class="focus:outline-none shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!showFormular">
        <div class="max-w-5xl mr-auto p-4 bg-gray-100 text-center rounded mt-12" v-if="noEntries">
            <h1 class="text-xl font-regular text-gray-800 mb-2">Create your first Milestone</h1>
            <button class="py-1 px-2 bg-green-400 hover:bg-green-500 text-white rounded text-base focus:outline-none" @click="showFormular = !showFormular">Create Milestone</button>
        </div>
    </div>
    <div class="py-12" v-if="showFormular">
        <form @submit.prevent="add()" class="text-gray-700 max-w-xs mx-auto">
            <div class="my-4">
                <h1 class="text-green-500 text-xl font-semibold text-center font-light">Create Milestone</h1>
            </div>
            <div class="my-2">
                <input v-model="form.title" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none" type="text" placeholder="Title" required>
            </div>
            <div class="my-2">
                <input v-model="form.type" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none" type="text" placeholder="Type" required>
            </div>
            <div class="my-2">
                <input v-model="form.hours" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none" type="text" placeholder="Hours" required>
            </div>
            <div class="my-2">
                <button type="submit" class="py-2 px-12 bg-green-400 hover:bg-green-500 rounded text-white cursor-pointer w-full">Create Milestone</button>
            </div>
        </form>
    </div>
    <div v-if="setLoading" class="max-w-sm mr-auto">
        <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
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
            noEntries: false,
            showFormular: false,
            form: {
                title: '',
                type: '',
                hours: 0
            }
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
                    credentials: 'include',
                    body: JSON.stringify(this.form)
                    }).then(response => response.json()).then(data => this.milestones.push(data));

                    if(this.showFormular) {
                        this.showFormular = false
                    } else {
                        this.showFormular = true
                    }

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
        },
        // Calculate percantage progress and cut to only 2 decimal after comma
        calculatePercantage: function(hours) {
            var percentage = 0 / hours * 100;
            return percentage.toFixed(2)
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