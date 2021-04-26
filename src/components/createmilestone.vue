<template>
    <div>
        <div class="max-w-5xl mr-auto p-4 bg-gray-100 text-center rounded mt-12" v-if="showFormular">
            <h1 class="text-xl font-regular text-gray-800 mb-2">Create your first Milestone</h1>
            <button class="py-1 px-2 bg-green-400 hover:bg-green-500 text-white rounded text-base focus:outline-none">Create Milestone</button>
        </div>
    </div>
    
    <!-- Formular for adding new milestone -->
    <div class="max-w-5xl py-12" v-if="showFormular">
        <form @submit.prevent="addMilestone()" class="text-gray-700 max-w-2xl mx-auto">
            <div class="my-4">
                <h1 class="text-green-500 text-xl font-semibold text-center font-light">Create Milestone</h1>
            </div>
            <div class="my-2">
                <input v-model="form.title" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none" type="text" placeholder="Title" required>
            </div>
            <div class="my-2">
                <input v-model="form.hours" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none" type="text" placeholder="Hours" required>
            </div>
            <select v-model="form.type" class="bg-gray-200 py-2 pl-2 pr-6 w-full rounded border-2 border-transparent placeholder-gray-700 focus:border-green-400 focus:outline-none">
                <option class="py-1">Reading</option>
                <option class="py-1">Listening</option>
                <option class="py-1">Passive Listening</option>
            </select>
            <div class="my-2">
                <button type="submit" class="py-2 px-12 bg-green-400 hover:bg-green-500 rounded text-white cursor-pointer w-full" @click="add()">Create Milestone</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "createMilestone",
    props: {
        ldata: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showFormular: false,
            mutableList: this.ldata,
            form: {
                title: '',
                hours: '',
                type: 'Reading'
            }
        }
    },
    methods: {
        addMilestone: async function() {
                try {
                    await fetch('http://localhost:8000/api/milestones', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(this.form)
                    }).then(response => response.json()).then(data => this.mutableList.push(data));

                    if(this.showFormular) {
                        this.showFormular = false
                    } else {
                        this.showFormular = true
                    }
                } catch(e) {
                    console.log(e)
                }
        },
    }
}
</script>