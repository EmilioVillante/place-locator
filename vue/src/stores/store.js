import Vuex from 'vuex';
import Vue from 'vue';
import Firebase from '../integrations/firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        firebase: new Firebase(),
        loading: true,
        user: undefined,
    },
    mutations: {
        authenticated (state, user) {
            state.loading = false;
            state.user = user;
        }
    }
});

export default store;
