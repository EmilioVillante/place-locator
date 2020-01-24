<template>
    <div v-if="location" class="d-flex flex-column bg-white border-bottom p-2">
        <p><strong>{{location.name}}</strong></p>
        <p>{{location.vicinity}}</p>
    </div>
</template>

<script>
    export default {
        name: 'LocationLabel',
        props: {
            'location': {
                type: Object
            }
        }
    }
</script>