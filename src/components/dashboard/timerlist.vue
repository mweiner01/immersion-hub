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
                            <div class="ml-4">
                                <p class="text-gray-800 hover:text-blue-400 cursor-pointer dark:text-white font-semibold" v-bind:title="timer.title">{{ timer.title.length > 25 ? milestone.title.substring(0, 25) + '...' : timer.title }}</p>
                                <p class="text-gray-300 dark:text-gray-200 font-semibold">{{ timer.type }}</p>
                            </div>

                            <div class="pl-4 ml-auto">
                                <span class="text-base bg-gray-900 text-white py-1 px-4 rounded">00:00:00</span>
                            </div>
                    </div>
                </div>
                <div class="absolute bottom-0 py-8">
                    <h1 class="text-blue-400 bg-transparent hover:bg-gray-200 py-1 px-4 rounded hover:text-gray-800 cursor-pointer">View more</h1>
                </div>
            </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "dashboardTimerlist",
    data() {
        return {
            count: 6
        }
    },
    props: {
        listdata: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.setDarkMode()
    },
    methods: {
        setDarkMode: function() {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.documentElement.classList.add('dark')
        } else {
        document.documentElement.classList.remove('dark')
        }

        // Whenever the user explicitly chooses light mode
        localStorage.theme = 'light'

        // Whenever the user explicitly chooses dark mode
        localStorage.theme = 'dark'

        // Whenever the user explicitly chooses to respect the OS preference
        localStorage.removeItem('theme')
        },
        formatNum: function(num) {
            return num < 10 ? '0' + num : num
        }
    }
}
</script>