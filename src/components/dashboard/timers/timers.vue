<template>
            <div class="bg-white dark:bg-gray-800 rounded-md p-12 text-center relative">
                <div class="my-2 rounded-full border-4 border-green-400 h-64 w-64 mx-auto flex" style="">
                    <div class="m-auto text-center">
                        <h1 class="text-5xl text-gray-800 font-semibold m-auto">{{ listdata.time }}</h1>
                    </div>
                </div>
               <div class="my-4">
                    <h1 class="text-gray-500 dark:text-white text-3xl font-base">{{ listdata.title }}</h1>
                    <h1 class="my-1 text-gray-400 text-md dark:text-white text-xl font-regular"><i class="lni lni-timer"></i> {{ listdata.elapsedTime }}</h1>
                </div>
                <div class="my-2 flex justify-center items-center">
                        <div class="mx-2">
                            <button class="font-bold text-white bg-green-500 active:bg-green-700 p-2 w-16 h-auto rounded-full focus:outline-none transition duration-300 ease-in-out transform hover:translate-x-1 hover:scale-110" @click="startTimer(listdata)"><i class="lni lni-play"></i></button>
                        </div>
                        <div class="mx-2">
                            <button class="font-bold text-white bg-red-500 active:bg-red-700 p-2 w-16 h-auto rounded-full focus:outline-none transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-110" @click="stopTimer(listdata)"><i class="lni lni-stop"></i></button>
                        </div>
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