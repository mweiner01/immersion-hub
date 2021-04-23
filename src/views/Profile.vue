<template>
    <div class="" v-if="auth">
        <div v-if="userinfo">
            <h1 class="text-2xl font-light">Welcome to your Profile, <strong>{{ userinfo.name }}</strong></h1>
        </div>
    </div>
    <div class="" v-if="!auth">
        <h1 class="text-2xl font-light">I am sorry, you are not logged in.</h1>
    </div>
    <div class="pt-12 pb-4">
        <h1>These are your milestones right now</h1>
    </div>

    <div class="max-w-sm mx-auto" v-if="milestones">
        <div class="" v-for="ml in milestones" :key="ml._id">
            <milestone :milestone="ml"></milestone>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Milestone from '@/components/milestone.vue';
import { useRouter } from 'vue-router';

export default {
    name: "Profile",
    data() {
        return {
            userinfo: null,
            milestones: null,
            auth: false
        }
    },
    mounted: async function() {
        await this.checkUser();
        await this.fetchMilestones();
    },
    methods: {
        checkUser: async function() {
                const store = useStore();
                const router = useRouter();
                this.auth = computed(() => store.state.authenticated);
                
                // send user to login if not logged in
                if(!computed(() => store.state.authenticated) === true) {
                    await router.push("/")
                }

                try {
                    const response = await fetch('http://localhost:8000/api/user', {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                    }).then(response => response.json()).then(data => this.userinfo = data);
                    

                    // check if the user is loggedin (Maybe make this a function because we use it alot)
                    if(response.status === 200) {
                        await store.dispatch(('setAuth'), true)
                    }
                } catch(e) {
                    await store.dispatch(('setAuth'), false)
                }
        },
        fetchMilestones: async function() {
            try {
                await fetch('http://localhost:8000/api/milestones/'+this.userinfo.name, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                }).then(response => response.json()).then(data => this.milestones = data);
            } catch(e) {
                console.log(e)
            }
        }
    },
    components: {
        Milestone
    }
}
</script>
