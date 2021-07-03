<template>
            <div class="h-full bg-white dark:bg-gray-800 rounded p-8">
                <div class="text-3xl">
                    <p class="text-gray-800 dark:text-white font-black">{{ this.type }}</p>
                </div>
                    <div class="mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl sm:py-4 sm:flex sm:items-center text-sm">
                            <h1 class="text-3xl">Total Time</h1>
                    </div>
            </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "dashboardTimestats",
    data() {
        return {
            timerHistory: []
        }
    },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    mounted: async function() {
        // Function here
    },
    methods: {
        // Create function to fetch timehistory for each type and sum them.
    }
}
</script>