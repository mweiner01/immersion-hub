<template>
            <div class="h-full bg-white dark:bg-gray-800 rounded p-8">
                <div class="text-3xl">
                    <p class="text-gray-800 dark:text-white font-black">{{ this.type }}</p>
                </div>
                    <div class="mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl sm:py-4 sm:flex sm:items-center text-sm">
                            <h1 class="text-3xl">00h 00m</h1>
                    </div>
            </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "dashboardTimestats",
    data() {
        return {
        }
    },
    props: {
        type: {
            type: String,
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