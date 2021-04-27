<template>
    <div v-if="showFirstForm">
        <div class="max-w-5xl mr-auto p-4 bg-gray-100 text-center rounded mt-12" v-if="!showFormular">
            <h1 class="text-xl font-regular text-gray-800 mb-2">Create your first Milestone</h1>
            <button class="py-1 px-2 bg-green-400 hover:bg-green-500 text-white rounded text-base focus:outline-none" @click="showFormular = !showFormular">Create Milestone</button>
        </div>
    </div>
    
    <!-- Formular for adding new milestone -->
    <div class="max-w-5xl py-12" v-if="showFormular">
        <form @submit.prevent="add(this.form)" class="text-gray-700 max-w-2xl mx-auto">
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
                <button type="submit" class="py-2 px-12 bg-green-400 hover:bg-green-500 rounded text-white cursor-pointer w-full">Create Milestone</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "createMilestone",
    props: {
        ldata: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            showFormular: false,
            showFirstForm: true,
            mutableList: this.ldata,
            form: {
                title: '',
                hours: '',
                type: 'Reading'
            }
        }
    },
    methods: {
        add: function(form) {
            this.$emit('addMilestone', form)

            // set variables
            this.showFormular = false
            this.showFirstForm = false
        },
    },
    
}
</script>