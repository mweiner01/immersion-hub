<template>
            <div class="h-full bg-white dark:bg-gray-800 rounded p-8 relative">
                <div>
                    <h1 class="text-gray-800 dark:text-white text-lg font-bold">My Timers</h1>
                </div>
                <div class="">
                    <p class="text-gray-300 dark:text-gray-200 font-semibold">{{ this.count }} Timers</p>
                </div>
                    <div class="my-1" v-for="(timer) in listdata" :key="timer._id">
                        <div class="h-auto mx-auto bg-white dark:bg-gray-800 rounded-xl sm:py-4 sm:flex sm:items-center text-sm">
                            <div class="inline-block" v-if="timer.type == 'Reading'">
                                <span class="text-4xl w-12 h-auto rounded dark:text-white text-gray-800"><i class="lni lni-book"></i></span>
                            </div>
                            <div v-if="timer.type == 'Listening'">
                                <span class="text-4xl w-12 h-auto rounded dark:text-white text-gray-800"><i class="lni lni-laptop"></i></span>
                            </div>
                            <div v-if="timer.type == 'Passive Listening'">
                                <span class="text-4xl w-12 h-auto rounded dark:text-white text-gray-800"><i class="lni lni-headphone"></i></span>
                            </div>
                            <div v-if="timer.type == 'Anki'">
                                <span class="text-4xl w-12 h-auto rounded dark:text-white text-gray-800"><i class="lni lni-graduation"></i></span>

                            </div>
                            <div class="ml-4">
                                <p class="text-gray-800 hover:text-blue-400 cursor-pointer dark:text-white font-semibold" v-bind:title="timer.title">{{ timer.title.length > 25 ? milestone.title.substring(0, 25) + '...' : timer.title }}</p>
                                <p class="text-gray-300 dark:text-gray-200 font-semibold">{{ timer.type }}</p>
                            </div>

                            <div class="pl-4 ml-auto">
                                <span class="text-base bg-gray-900 text-white py-1 px-4 rounded">00:00:00</span>
                            </div>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "dashboardTimerlist",
    data() {
        return {
        }
    },
    props: {
        listdata: {
            type: Array,
            required: true
        }
    },
    methods: {
        formatNum: function(num) {
            return num < 10 ? '0' + num : num
        },
    }
}
</script>