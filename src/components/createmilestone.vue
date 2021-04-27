<template>
    <div>
        <div class="max-w-5xl bg-gray-100 mr-auto p-4 text-center mt-12" v-if="!showFormular">
            <h1 class="text-2xl font-regular text-gray-800">Create a Milestone</h1>
            <button class="focus:outline-none text-gray-800 font-semibold bg-transparent border-2 border-gray-800 hover:bg-gray-800 hover:text-white py-2 px-8 mt-4" @click="showFormular = !showFormular">Create your Milestone</button>
        </div>
    </div>
    
    <!-- Formular for adding new milestone -->
    <div class="max-w-5xl py-12" v-if="showFormular">
        <form @submit.prevent="add(this.form)" class="text-gray-700 max-w-2xl mx-auto">
            <div class="my-12">
                <h1 class="text-gray-800 text-3xl font-semibold text-center font-light">Create your Milestone</h1>
            </div>
            <div class="my-4">
                <p class="my-2 text-gray-800 font-bold text-xl">Select a good title</p>
                <input v-model="form.title" class="bg-white py-2 pl-2 pr-6 w-full border-2 border-transparent placeholder-gray-700 border-gray-800 focus:outline-none" type="text" placeholder="Title" required>
            </div>
            <div class="my-4">
                <p class="my-2 text-gray-800 font-bold text-xl">Select how many hours your goal should be</p>
                <input v-model="form.hours" class="bg-white py-2 pl-2 pr-6 w-full border-2 border-transparent placeholder-gray-700 border-gray-800 focus:outline-none" type="text" placeholder="Hours" required>
            </div>
            <div class="my-4">
                <p class="my-2 text-gray-800 font-bold text-xl">Select the type of your milestone</p>
                <select v-model="form.type" class="bg-white py-2 pl-2 pr-6 w-full border-2 border-transparent placeholder-gray-700 border-gray-800 focus:outline-none">
                    <option class="py-1">Reading</option>
                    <option class="py-1">Listening</option>
                    <option class="py-1">Passive Listening</option>
                </select>
            </div>
            <div class="my-6">
                <button type="submit" class="focus:outline-none w-full text-gray-800 font-semibold bg-transparent border-2 border-gray-800 hover:bg-gray-800 hover:text-white py-1 px-8">Create Milestone</button>
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