<template>
        <div class="md:flex flex-col md:flex-row md:min-h-screen w-full">
            <div @click="open = false" class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
                <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
                <router-link to="/" href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Immersion Hub</router-link>
                <button class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="open = !open">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                    <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
                </div>
                <nav :class="{'block': open, 'hidden': !open}" class="flex-grow md:block px-8 pt-4 md:pb-0 md:overflow-y-auto">
                    <div class="my-2">
                        <div class="mt-4 px-2 my-2">
                            <h3 class="font-light text-xl">Settings</h3>
                        </div>
                        <div>
                            <a class="block px-4 py-2 mt-2 text-md font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><i class="lni lni-user"></i> Profile</a>
                            <a class="block px-4 py-2 mt-2 text-md font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><i class="lni lni-pallet"></i> General</a>
                        </div>
                    </div>
                    <div class="my-2">
                        <div class="mt-4 px-2 my-2">
                            <h3 class="font-light text-xl">Views</h3>
                        </div>
                        <div>
                            <a class="block px-4 py-2 mt-2 text-md font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><i class="lni lni-archive"></i> Overview</a>
                            <a class="block px-4 py-2 mt-2 text-md font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><i class="lni lni-direction"></i> Milestones</a>
                            <router-link to="/dashboard/timers" class="block px-4 py-2 mt-2 text-md font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><i class="lni lni-timer"></i> Timers</router-link>
                            <a class="block px-4 py-2 mt-2 text-md font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><i class="lni lni-emoji-friendly"></i> Friends</a>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="w-full bg-gray-200">
                <nav class="bg-white">
                    <div class="mx-auto flex items-center justify-between flex-wrap bg-white px-4">
                        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div class="ml-4">
                                <form action="">
                                    <input type="text" class="py-2 focus:outline-none" placeholder="Search for anything...">
                                </form>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-xl sm:py-4 sm:flex sm:items-center text-sm ml-auto mr-4">
                                <img src="https://avatarfiles.alphacoders.com/114/114019.jpg" class="rounded-md w-10 h-auto cursor-pointer" alt="">
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="px-8 pt-4">
                    <h1 class="font-bold text-gray-800 text-2xl">Dashboard</h1>
                    <p class="mt-1 text-sm font-semibold text-gray-500">Views / <span class="text-gray-800">Overview</span></p>
                </div>
                <div class="mt-12 max-w-7xl mx-auto grid grid-cols-3 gap-4">
                    <div class="">
                        <timestats type="Active Listening"></timestats>
                    </div>
                    <div class="">
                        <timestats type="Reading"></timestats>
                    </div>
                    <div class="">
                        <timestats type="Passive Listening"></timestats>
                    </div>
                    <div class="col-span-2 row-span-1">
                        <milestonesList :listdata="milestones"></milestonesList>
                    </div>
                    <div class="col-span-1">
                        <dashboardTimerlist :listdata="timers"></dashboardTimerlist>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import milestonesList from '@/components/dashboard/milestoneslist'
import dashboardTimerlist from '@/components/dashboard/timerlist'
import timestats from '@/components/dashboard/timestats'

export default {
    name: "Profile",
    data() {
        return {
            userinfo: null,
            milestones: null,
            timers: null,
            auth: false,
            setLoading: true,
            noEntries: false,
            dataReady: false
        }
    },
    mounted: async function() {
        await this.checkUser();
        await this.fetchMilestones();
        await this.fetchTimers();
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
        fetchTimers: async function() {
            try {
                await fetch('http://localhost:8000/api/timers/'+this.userinfo.name, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                }).then(response => response.json()).then(data => this.timers = data);
                // set loading false (no spinner anymore)
                this.setLoading = false

                 // if there are no entries set noEntries to true

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
        milestonesList,
        dashboardTimerlist,
        timestats
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