<template>
            <div class="max-w-sm h-full bg-white dark:bg-gray-800 rounded p-8">
                <div>
                    <h1 class="text-gray-800 dark:text-white text-lg font-bold">My Time</h1>
                </div>
                <div class="">
                    <p class="text-gray-300 dark:text-gray-200 font-semibold">{{ this.count }} Active Listening</p>
                </div>
                    <div class="max-w-sm h-auto mx-auto bg-white dark:bg-gray-800 rounded-xl sm:py-4 sm:flex sm:items-center text-sm">
                            <h1>1000 hours</h1>
                    </div>
            </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "dashboardStreak",
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
        }
    }
}
</script>