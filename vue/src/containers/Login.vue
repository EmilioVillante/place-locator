<template>
    <div class="container d-flex mt-3 justify-content-center flex-column">
        <h1 class="text-center mb-1">Finder!</h1>
        <h5 class="text-center mb-5">Find a location and get directions to it.</h5>
        <div class="d-inline-flex justify-content-center">
            <button @click="$store.state.firebase.googleSignIn()">Sign In</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
    }
</script>