Hi, 
I have learning Web development since 2016 and Infosys Learning Platform Lex has been a huge part of my learning process along with YouTube tutorials, web forums and MDN and trust me the web keeps on evolving all the time and in these last 4 years or so there has been so many new frameworks and we have also seen so many drastic changes in the process how we develop web apps. 

Through this article I hope to improve your knowledge on the current hot JS framework [Vue](https://vuejs.org). 
In this article we are going to cover 2 core Vue features [Vuex](https://vuex.vuejs.org/) and [Vue Router] (https://router.vuejs.org/). I am assuming that you already have basic knowledge of Vue if not then please visit the [Vue Js Lex Course] (https://lex.infosysapps.com/en/app/toc/lex_29842462217694155000/overview) and start learning its quite easy to learn compared to other frameworks. In this example we will also be using [Firebase Auth] (https://firebase.google.com/docs/auth/where-to-start?authuser=0). If you wish to use your Auth System, then please feel free to do so.

### Why we need State Management?

State Management helps you manage data efficiently. Let's understand with example. You have card which list the details of course that your app offers and since you are the admin you have access to edit the details as well as view button to view full details. For now, we have not implemented state management: 
So, the initial cards details are fetched from the API on page load after that you click on view button to see the entire details, for this also we get our details from an API. You will be able to see all this API requests in Network Tab of Chrome/Edge Dev tools.

 ![Dev tools] (https://developers.google.com/web/tools/chrome-devtools/network/imgs/network.png)

Now if you hit back button, you will see that initial card details which was already fetched during first app load is again being fetched. Thus, leading to slight wait time for end user and multiple API calls which is not ideal when you have a huge library of date being fetched from back end. For smaller applications you may not see an enormous impact on your app but as your app grows this same data might be shared across various components and loading the same data repeatedly with same API being repeated is not ideal and may lead to bad User Experience. 

This is where state management comes into picture. 

### What is State Management? 

State Management offers a centralized store of data pool for all your components in an app, with certain rules that ensure that state of any data is updated in predictable fashion. 
State Management is cycle where every action leads to updating of data in store which in turn triggers/updates the View and through the button/input actions on the view the actions are triggered again. 

![Cycle](https://redux.js.org/assets/images/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png)

In simple terms there are 3 properties of state management: 

* Data Store or State. 
* Actions
* Views

### What is Vuex? 

[Vuex](https://vuex.vuejs.org/) is State Management and Pattern Library created by beautiful minds at [Vue](https://vuejs.org/v2/guide/team.html). 
It can be used outside of vuejs apps as well but is mostly used in Vue apps. It's quite like Redux but easy to learn and understand, and it acts as centralized stores for all your components. I'll not be going into deep dive of Vuex core components, but you can always find it in [Vuex docs] (https://vuex.vuejs.org/guide/state.html#single-state-tree)

The core concept of Vuex are: 

* State: This is single object that contains all your app level states and acts a *sole source of truth*. You can split your states in different modules as well to better manage the data. 

* Getters: As the name suggest this is used to get the state in any component of your app. It simply provides you the state you need. You need define different getters for each state you need. 

* Actions: This leads to updating the state of your state/object. Whenever you need to modify the state in store you need call an action specific to that data. 

* Mutations: This is where you update the data once your action was called successfully. To mutate any state, you need call *commit* function inside action and once the state is mutated successfully it will be reflected across all components. 

* Module: Modules help you to simply the Store state. If a single module is implemented, then all the states of our app will inside *one single big object* which might be difficult to manage. Thus, dividing your states in different modules helps you better manage all states. 

----

### Create a Vue App

Install Vue
``` 
npm install -g @vue/cli
```
To create a Vue App: 

```
vue create <project-name> 
```

When asked for Preset select manual preset and select Vuex and router using spacebar and hit enter. 

For Vue version select 2.x and router history will be Yes and then for lint select the first option. 
More details you visit [Vue Cli](https://cli.vuejs.org/)

### Create Firebase Project

To create a firebase project, you need to head to [Firebase Console] (https://console.firebase.google.com/). Login with google account. 

Steps to setup Project:

* Click on Add Project. 
* Give A Name for your project click on continue you can disable analytics for now and hit create project (*It will take some time*).  
* One dashboard in the left top corner you'll find Project Overview and beside that a ⚙ icon click on that and select Project Settings. 
* Under the General tab scroll down to Your app section select the </> web project. Give a nickname for your app and continue. 
* Once the app is created head over to Firebase SDK Snippet and select the Config Radio button. 
* Copy the contents we will need it later.
* Now on the left navigation click on Authentication and the click on Get Started. 
* You'll list of Sign In providers head over to Google Sign In and enable it. 

And we are done you successfully have setup firebase project. 
If you encounter any difficulty, then check out the [Firebase Docs](https://firebase.google.com/docs/web/setup?authuser=0). 

## Let's Start Codding

Now open the Vue app in VSCode or any editor of your choice. 
In src folder create a new Folder named as firebase. 
Inside that folder create config.js file and paste the config that we copied from Firebase console

```js
export default {
    firebaseConfig : {
        apiKey: <Your-Key>,
        authDomain: "cloudfirestorelearning.firebaseapp.com",
        databaseURL: "https://cloudfirestorelearning.firebaseio.com",
        projectId: "cloudfirestorelearning",
        storageBucket: "cloudfirestorelearning.appspot.com",
        messagingSenderId: "681859861309",
        appId: "1:681859861309: web:1726f8a46bf9b5b48a9354"
    }
}

```

Next up we need to install Firebase as an dependency in our project using the following command. 

`npm i firebase --save`

Once installed create firebaseInit.js inside the firebase folder and write the following code: 

```js
import firebase from 'firebase'; 
import env from './config'

firebase.initializeApp(env.firebaseConfig);

export default firebase.
```

Now head over to main.js file your directory and add the following code : 

```js
import "./firebaseInit/firebase"
```
Thus far we have successfully installed and configured Firebase for our app. 

## Create the State Management Library

Inside the src folder you'll see a store folder inside that you find index.js file. 
In the same folder create another file as authStore.js
Now this store file will have 4 properties: 
* State
* Mutations
* Actions
* Getters

so, our initial code will look something like this: 

```js
export default {
    state: {},
    mutations: {},
    actions: {},
    getters: {}
};
```
Now the State will contain all the data that you need. So, for case of authentication, we need just two objects 

1. user: This will hold the user data such as name, email, photoURL, etc. 
2. isAuth: This is boolean value and will be used to check if user is logged in or not. 

Mutations will define the functions which updates our state values, you define how you want to update your state. In our case we will have two mutation functions 

1. setUser(). 
2. setAuth(). 

Actions are triggers that will lead to mutation of our states. For authentication we will be defining two functions. 

1. googleSignIn(). 
2. signOut(). 

Getters will help us get the current state throughout the app in any component we need. We will be creating two getters as well 

1. getUser()
2. isAuthenticated()

So going back to state we will be defining our states : 

```js
state: {
        user: null,
        isAuth: false
    },
```
As you can we have defined initial values for our states. 

Mutation's property will have two functions as we will be updating two states separately. Each function will have two arguments one is the state object itself and other will the payload which contains the value that has to updated in states.

```js
setUser(state, payload) {
    state.user = payload;
},
authenticated(state, payload) {
    state.isAuth = payload;
}
```
Actions define the triggers that lead to mutation of our states so in we will create two functions as follows : 

```js
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
```

Action handlers receive a context object which exposes the same set of methods on the store instance. We often use ES2015 argument destructing to make things more simple as we need to call `commit` multiple times. Commit lets us trigger mutations and update our states. 

Now coming to `firebase.auth()` this is method provided by firebase for login. In this case we are using `signInwithPopup(new firebase.auth.GoogleAuthProvider())` this method opens a popup and the arguments is our sign in provider Google as we have enabled that while setting up firebase project. There are lot more options for sign in which you can find in [Firebase Docs](https://firebase.google.com/docs/web/setup?authuser=0). 
This SignOut method is quite simple and `currentUser` returns Boolean value so if logged in then true else false. 

As you can see it's a promise, so we are ES2015 async & wait for response. You can put this in try catch block for error handling as well. Once we get response, we are calling the commit method to trigger mutation and updating our states. 

Getters are defined to get the current state throughout our app, and we have defined two getters for our two states 

```js
getUser(state){
    console.log(state.user);
    return state.user;
},
isAuthenticated(state) {
    return state.isAuth;
}
```
Now to call actions in any component of our app we need to use dispatch method offered by store in the component. We will be seeing that later. 

Thus, we have created a separate module for our AuthStates and code will look something like this. 

```js
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
```


But still our authStore is not registered. To do that we will open the index.js inside store folder and update it as below: 

```js
import Vue from "vue";
import Vuex from "vuex";
import authStore from "./authStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authStore
  }});
```
And thats it we have successfully created an authStore for login. 

### Dispatching actions from Login Component. 

Firstly, we need to create a Login.vue file inside our components folder. 
It's typical vue component file with just template and script. I'm have not defined any styles for this but feel free to add in your project as needed. 

```html
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
```

In the `methods` property of our component we are dispatching Actions. 
Vue provides a straightforward way to dispatch methods all we need is to call `$store.dispatch(<action-name>)`  and vola are action is fired. 

In the computed property we are calling getters to get the value of our state isAuthenticated. This is help us identify if users is loggedIn or not. Coupled with the watch property, we are checking that as soon as we get isAuthenticated value as true we need to route our user to Home page. 

### SignOut Action from Home

We will be using Home.vue fie which was created with our app at the beginning. 
Coming to script of our Home component we have similar setup to that of Login component.
As usual methods property dispatches the signOut action, computed: property get the loggedIn user details and in watch we are checking isLoggedIn value and soon as its value changes to null we are redirecting our user to login page. 

```html
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
```

### Routing 

Routing is pretty simple for now we have three components and we have defined routes for all three components. 

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../components/Login.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, 
  {
    
    path: "/login",
    name: "Login",
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

And thus, you have successfully implemented the Vuex logic for your app. At this point everything should work as intended but there is no security. Any user without any authentication will be able to view all of components that we have defined in our routes script. There are not guards to protect unwanted page views and most of the modern-day apps need some form guards to protect views that they want only authenticated users to see. Thus we will be building our own guards. 

### Guards 

We will again be harnessing the power of our authStore to create guards. 
We don't let logged in users to visit login page and we don't unauthenticated users to visit our Home and About component, so lets get started . 

In Vue we need to call the `router.beforeEach()` method. 
Every guards gets three arguments: 

* `to: Route`  : the target Route Object being navigated to.
* `from: Route`: the current route being navigated away from.
* `next`       : Function: this function must be called to resolve the hook. The action depends on the arguments provided to next:

    * `next()`: move on to the next hook in the pipeline.
    * `next('/') or next({ path: '/' })`: redirect to a different location.

We need to make sure that next function is called at least once in our guards. We will be creating guards in separate files.  


First create a file named authGuard.js inside the router folder and the code for it will be: 

```js
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
```

We are importing the store module here and using the `getters.isAuthenticated` to check if user is logged in or not. If the users is not logged In then redirect user to login route and if the user is logged in then continue with the next pipeline route. 

Similarly, we will be creating appGuard.js to make sure logged in user can't access the Login component. 

```js
import store from "../store";

export default (to, from , next) => {
    if(store.getters.getUser){
        next({
            path: "/", 
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        next();
    }
}
```
Now we need to include this in our router script. We just need to add the few line of code and our final index.js file for router will look like this: 

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../components/Login.vue"
import Auth from "./authGuard"
import AppG from "./appGuard"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: Auth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: Auth
  }, 
  {
    
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: AppG
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

And that it we have implemented Route guards and Store as well. 
I hope you enjoyed this article, please do let me know in the comments section your thoughts on this. 

You can find the entire repo in Github
{% github siddhant-dev/vuex-auth-state %}

Happy Codding 👓
