<template>
    <div v-if="steps.length"
         class="row py-3 overflow-auto flex-grow-1 flex-shrink-1 no-gutters flex-column flex-nowrap">
        <div v-for="step in steps"
             :key="step.encoded_lat_lngs"
             class="mb-2 border rounded p-2 bg-white shadow-sm">
            <p v-html="step.instructions"/>
            <span v-if="step.distance" class="text-muted" v-html="step.distance.text"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            steps: {
                type: Array,
                default: () => []
            }
        }
    }
</script>