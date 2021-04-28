<template>
            <div class="max-w-sm bg-white rounded p-8">
                <div>
                    <h1 class="text-gray-800 text-lg font-bold">My Milestones</h1>
                </div>
                <div class="">
                    <p class="text-gray-300 font-bold">{{ this.count }} Milestones</p>
                </div>
                    <div class="my-1" v-for="(milestone) in listdata" :key="milestone._id">
                        <div class="max-w-sm mx-auto bg-white rounded-xl sm:py-4 sm:flex sm:items-center text-sm">
                            <div class="inline-block" v-if="milestone.type == 'Reading'">
                                <img src="https://img.icons8.com/nolan/64/book-reading.png" class="w-12 h-auto rounded"/>
                            </div>
                            <div v-if="milestone.type == 'Listening'">
                                <img src="@/public/img/active.png" class="w-12 h-auto rounded"/>
                            </div>
                            <div v-if="milestone.type == 'Passive Listening'">
                                <img src="@/public/img/passive.png" class="w-12 h-auto rounded"/>
                            </div>
                            <div class="ml-4">
                                <p class="text-gray-800 font-semibold" v-bind:title="milestone.title">{{ milestone.title.length > 25 ? milestone.title.substring(0, 25) + '...' : milestone.title }}</p>
                                <p class="text-gray-300 font-semibold">{{ milestone.type }}, {{ milestone.milestoneHours }}h</p>
                            </div>

                            <div class="ml-auto">
                                <button class="ml-auto text-gray-400 font-semibold py-1 px-2 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none">Details</button>
                            </div>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "dashboardMilestones",
    data() {
        return {
            count: 4
        }
    },
    props: {
        listdata: {
            type: Array,
            required: true
        }
    },
    methods: {
    }
}
</script>