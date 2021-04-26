<template>
        <div class="max-w-6xl mr-auto">
            <div class="" v-for="(milestone, index) in listdata" :key="milestone._id">
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
                                <p>Progress (%): <span class="text-white bg-green-400 px-2 rounded"></span></p>             
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
</template>

<script>
export default {
    name: "Milestones",
    props: {
        listdata: {
            type: Array,
            required: true
        }
    },
    methods: {
        remove: function(index, milestone) {
            this.$emit('remove', index, milestone)
        },
    }
}
</script>