<template>
    <div class="" v-if="dataReady">
        <Nav></Nav>
        <div class="max-w-6xl mx-auto items-center justify-between px-6 lg:px-16">
            <div class="" v-if="auth">
                <div v-if="userinfo" class="pt-12 text-left">
                    <h1 class="text-5xl font-semibold text-gray-700">Good Afternoon, <strong class="font-black">{{ userinfo.name }}</strong></h1>
                </div>
            </div>

            <div class="" v-if="!auth">
                <h1 class="text-2xl font-light">I am sorry, you are not logged in.</h1>
            </div>

            <div class="pt-12 pb-4 text-gray-800 font-semibold text-2xl text-left">
                <h1>Milestones</h1>
            </div>
            
            <div v-if="milestones.length > 0">
                <div v-if="milestones">
                    <milestones :listdata="milestones" @removeMilestone="remove"></milestones>
                </div>
            </div>

            <div v-if="setLoading" class="max-w-sm mr-auto">
                <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
            </div>

            <div v-if="noEntries">
                <createMilestone :ldta="milestones" @addMilestone="addMilestone"></createmilestone>
            </div>

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
        Nav
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