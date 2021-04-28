<template>
            <div class="max-w-6xl mr-auto">
                <h1>Test</h1>
            </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "Milestones",
    props: {
        listdata: {
            type: Array,
            required: true
        }
    },
    methods: {
        startTimer: function(index, timer) {
            this.$emit('startTimer', index, timer)
        },
    }
}
</script>