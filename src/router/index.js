import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PYO from '../views/PYO'
import SearchPubMed from "../views/SearchPubMed";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
      path: '/search',
      name: 'Search',
      component: SearchPubMed
    },
    {
      path: '/parse',
      name: 'PYO',
      component: PYO
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
