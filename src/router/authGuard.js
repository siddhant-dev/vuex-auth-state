import store from "../store";

export default (to, from , next) => {
    if(!store.getters.isAuthenticated){
        next({
            path: "/login", 
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        next();
    }
}
