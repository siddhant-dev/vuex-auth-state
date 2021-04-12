import firebase from "firebase/app";
import "firebase/auth";

export default {
    state: {
        user: null,
        isAuth: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        authenticated(state, payload) {
            state.isAuth = payload;
        }
    },
    actions: {
        async googleSignIn({ commit }) {
            const response = await firebase.auth().
            signInWithPopup(new firebase.auth.GoogleAuthProvider());
            console.log(response);
            const newUser = {
                uid: response.user.uid,
                displayName: response.user.displayName,
                email: response.user.email,
                photoURL: response.user.photoURL
            };
            commit("setUser", newUser);
            commit("authenticated", firebase.auth().currentUser);
        },
        async signOut({ commit }) {
            await firebase.auth().signOut();
            commit("setUser", null);
            commit("authenticated", false);
        }
    },
    getters:{
        getUser(state){
            console.log(state.user);
            return state.user;
        },
        isAuthenticated(state) {
            return state.isAuth;
        }
    }
};
