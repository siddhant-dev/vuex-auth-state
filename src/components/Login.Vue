<template>
    <div class="container">
        <button v-if="!isLoggedIn" @click.prevent="login()">Google Sign In</button>
    </div>
</template>
<style scoped>
</style>
<script>
export default {
    name: "Login",
    data() {
        return {};
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        }
    },
    watch: {
        isLoggedIn(value){
            if(value !== null && value!== undefined){
                this.$router.push("/");
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch("googleSignIn");
        }
    }
}
</script>
