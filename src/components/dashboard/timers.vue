<template>
            <div class="bg-white dark:bg-gray-800 rounded px-8 py-4 text-center relative">
                <div>
                    <h1 class="text-gray-800 text-xl dark:text-white text-lg font-bold">{{ listdata.title }}</h1>
                </div>
                <div class="my-2">
                    <p class="text-gray-800 font-light text-5xl dark:text-gray-200 font-semibold">{{ listdata.time }}</p>
                </div>
                <div class="mt-8 mb-4 flex w-full">
                    <div class="w-1/2 mr-2">
                        <button class="font-bold text-white bg-green-400 hover:bg-green-500 py-1 w-full rounded focus:outline-none" @click="startTimer(listdata)">Start</button>
                    </div>
                    <div class="w-1/2 ml-2">
                        <button class="font-bold text-white bg-red-400 hover:bg-red-500 py-1 w-full rounded focus:outline-none" @click="stopTimer(listdata)">Stop</button>
                    </div>
                </div>
                <div class="my-2 bg-gray-100 text-gray-800 p-2">
                    <h3 class="text-xl font-bold">Total Time Today</h3>
                    <h1 class="text-lg font-semibold">{{ listdata.elapsedTime }}</h1>
                </div>
            </div>
</template>

<script>


export default {
    inheritAttrs: false,
    name: "dashboardTimers",
    data() {
        return {
            todaysTime: 0
        }
    },
    props: {
        listdata: {
            type: Array,
            required: true
        },
        totaltime: {
            type: String,
            required: true
        }
    },
    methods: {
        formatNum: function(num) {
            return num < 10 ? '0' + num : num
        },
        
        startTimer: function(timer) {
            this.$emit('startTimer', timer)
        },
        stopTimer: function(timer) {
            this.$emit('stopTimer', timer)
        },
    }
}
</script>