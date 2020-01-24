<template>
    <header class="row d-flex justify-content-between no-gutters my-3">
        <div class="d-flex align-items-center">
            <h1>{{title}}</h1>
            <div v-if="loading" class="spinner-border ml-3 spinner-border-sm text-secondary">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <button @click="signOut" class="btn btn-light btn-sm">Sign Out</button>
    </header>
</template>

<script>
    export default {
        name: 'Nav',
        data: function() {
            return {
                title: process.env.VUE_APP_TITLE
            }
        },
        props: {
            loading: Boolean
        },
        methods: {
            signOut() {
                this.$store.state.firebase.signOut();
            }
        }
    }
</script>