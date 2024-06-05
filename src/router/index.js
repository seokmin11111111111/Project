import Vue from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReceiptForm from '../views/ReceiptForm.vue';
import StatsView from '../views/StatsView.vue';
import SettingsView from '../views/SettingsView.vue';
import CategoryListView from '../views/CategoryListView.vue';
import AddCategoryView from '../views/AddCategoryView.vue';
import AccountListView from '../views/AccountListView.vue';
import AddAccountView from '../views/AddAccountView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import NaverLogin from '@/views/NaverLogin'
import KakaoLogin from '@/views/KakaoLogin'



const routes = [
  
  {
    path: '/form',
    name: 'form',
    component: ReceiptForm
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryListView
  },
  {
    path: '/categories/add',
    name: 'add-category',
    component: AddCategoryView
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: AccountListView
  },
  {
    path: '/accounts/add',
    name: 'add-account',
    component: AddAccountView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/naver-login',
    name: 'NaverLogin',
    component: NaverLogin
  },
  {
    path: '/kakao-login',
    name: 'KakaoLogin',
    component: KakaoLogin
  },
 
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
