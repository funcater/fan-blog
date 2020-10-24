import { createRouter, createWebHashHistory } from 'vue-router'
import { mapState, mapMutations } from 'vuex'
import index from '../views/tourist/index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: './home',
    component: index,
    children: [
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      { path: '/home', name: 'home', component: () => import(/* webpackChunkName: "about" */ '../views/tourist/home.vue') },
      { path: '/message', name: 'message', component: () => import('../views/tourist/message.vue') },
      { path: '/article/:id', name: 'article', component: () => import('../views/tourist/article.vue') }
    ]
  }
  // {
  //   path: '/',
  //   name: '',
  //   redirect: '',
  //   component: () => import('../views/admin/*****.vue'),
  //   meta: { requireAuth: true }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (mapState.token) {
      next()
    } else {
      mapMutations.toggleLoginBlock()
    }
  } else {
    next()
  }
})

export default router
