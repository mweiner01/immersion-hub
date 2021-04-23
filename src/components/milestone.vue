<template>
        <div class="p-4 bg-gray-100 rounded my-2">
            <div class="flex flex-wrap justify-between">
                <h1 class="text-gray-800 text-xl font-light">{{ milestone.title }}</h1> 
                <h1 class="bg-green-400 font-semibold text-white text-sm py-1 px-4 rounded">{{ milestone.type }}</h1> 
            </div>
            <div class="py-2">
                <div class="relative pt-1">
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                    <div :style="`width:${100 / milestone.milestoneHours * 100}%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                </div>
                </div>
                <h1 class="text-center text-gray-800 font-semibold">100 / {{ milestone.milestoneHours }} Hours ({{100 / milestone.milestoneHours * 100}}%)</h1>
            </div>
        </div>
</template>

<script lang="ts">
export default {
    name: "Nav", 
    props: ["milestone"]
}
</script>
