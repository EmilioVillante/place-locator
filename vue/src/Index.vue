<template>
    <PageLoading v-if="loading"/>
    <Login v-else-if="!user"/>
    <Locator v-else/>
</template>

<script>
    import store from './stores/store';
    import {mapState} from 'vuex';
    import PageLoading from './components/PageLoading';
    import Login from './containers/Login';
    import Locator from './containers/Locator';

    export default {
        name: 'Index',
        store,
        computed: mapState(['user', 'loading']),
        created: function() {
            // Hook into firebase authentication change event to determine if a user exists
            this.$store.state.firebase.auth.onAuthStateChanged((user) => {
                this.$store.commit('authenticated', user);
            });
        },
        components: {PageLoading, Login, Locator}
    }
</script>

<style lang="scss">
    @import './index.scss';
</style>
