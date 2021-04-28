<template>
            <div class="max-w-sm bg-white dark:bg-gray-800 rounded p-8">
                <div>
                    <h1 class="text-gray-800 dark:text-white text-lg font-bold">My Milestones</h1>
                </div>
                <div class="">
                    <p class="text-gray-300 dark:text-gray-200 font-semibold">{{ this.count }} Milestones</p>
                </div>
                    <div class="my-1" v-for="(milestone) in listdata" :key="milestone._id">
                        <div class="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl sm:py-4 sm:flex sm:items-center text-sm">
                            <div class="inline-block" v-if="milestone.type == 'Reading'">
                                <span class="text-4xl w-12 h-auto rounded dark:text-white text-gray-800"><i class="lni lni-book"></i></span>
                            </div>
                            <div v-if="milestone.type == 'Listening'">
                                <span class="text-4xl w-12 h-auto rounded dark:text-white text-gray-800"><i class="lni lni-laptop"></i></span>
                            </div>
                            <div v-if="milestone.type == 'Passive Listening'">
                                <span class="text-4xl w-12 h-auto rounded dark:text-white text-gray-800"><i class="lni lni-headphone"></i></span>
                            </div>
                            <div class="ml-4">
                                <p class="text-gray-800 dark:text-white font-semibold" v-bind:title="milestone.title">{{ milestone.title.length > 25 ? milestone.title.substring(0, 25) + '...' : milestone.title }}</p>
                                <p class="text-gray-300 dark:text-gray-200 font-semibold">{{ milestone.type }}, {{ milestone.milestoneHours }}h</p>
                            </div>

                            <div class="ml-auto">
                                <button class="ml-auto text-gray-400 font-semibold py-1 px-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 focus:outline-none">Details</button>
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
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
        }
    }
}
</script>