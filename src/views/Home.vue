<template>
    <div class="home">
        <img src="../assets/logo.png" alt="vue-logo">
        <div v-if="isLoggedIn">
            <p>{{isLoggedIn}}</p>
            
            <button v-if="isLoggedIn" @click.prevent="signOut()">Sign Out</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    computed: {
        isLoggedIn() {
            return this.$store.getters.getUser;
        }
    },
    watch: {
        isLoggedIn(value) {
            if(!value) {
                this.$router.push("/login");
            }
        }
    },
    methods: {
        signOut() {
            this.$store.dispatch('signOut');
        }
    }
}
</script>
