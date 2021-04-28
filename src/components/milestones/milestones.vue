<template>
            <div class="max-w-6xl mr-auto">
                <div class="" v-for="(milestone, index) in listdata" :key="milestone._id">
                    <div class="bg-gray-100 py-6 border-gray-800 relative my-4">
                        <div class="px-6">
                            <div class="text-left">
                                <div class="text-gray-700 ">
                                    <h1 class="text-3xl font-black">{{ milestone.title }}</h1>
                                    <div class="flex inline-block">
                                        <h1 class="font-light text-lg mr-4"><i class="fas fa-book-open mr-2"></i> {{ milestone.type }}</h1>
                                        <h1 class="font-light text-lg mx-4"><i class="fas fa-hourglass-start mr-2"></i> {{ milestone.milestoneHours }} hours</h1>
                                    </div>
                                </div>
                                <div class="absolute top-0 right-0 p-6">
                                    <button class="focus:outline-none text-gray-800 font-semibold bg-transparent border-2 border-gray-800 hover:bg-gray-800 hover:text-white py-1 px-8 mr-2">Edit</button>
                                    <button class="focus:outline-none text-gray-800 font-semibold bg-transparent border-2 border-gray-800 hover:bg-gray-800 hover:text-white py-1 px-8 mr-2" @click="remove(index, milestone)">Delete</button>
                                </div>
                                <div class="my-6 text-gray-800 font-semibold">
                                    <p>Progress (h): <span class="text-white bg-gray-400 px-8">0</span></p>
                                    <p>Progress (%): <span class="text-white bg-gray-400 px-8">{{ 50 / milestone.milestoneHours * 100 }}%</span></p>             
                                </div>
                            </div>
                        </div>
                        <div class="max-w-6xl absolute bottom-0 w-full">
                            <div class="overflow-hidden h-2 text-xs flex bg-gray-200">
                                <div :style="`width:${50 / milestone.milestoneHours * 100}%`" class="focus:outline-none shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "Milestones",
    props: {
        listdata: {
            type: Array,
            required: true
        }
    },
    methods: {
        remove: function(index, milestone) {
            this.$emit('removeMilestone', index, milestone)
        },
    }
}
</script>