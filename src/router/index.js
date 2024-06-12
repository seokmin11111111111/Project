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
import SignIn from '@/views/SignIn.vue';
import Register from '@/views/Register.vue';
import NaverLogin from '@/views/NaverLogin'
import KakaoLogin from '@/views/KakaoLogin'
import MonthlyView from '@/views/MonthlyView.vue';
import StartView from '../views/StartView.vue';
import MonthlyDetail from '@/views/MonthlyDetail.vue';
import RegistrationSuccess from '../views/RegistrationSuccess.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';



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
    component: SignIn,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
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
    path: '/form/:id?',
    name: 'ReceiptForm',
    component: ReceiptForm,
    props: true
  },
  
  {
    path: '/monthly',
    name: 'MonthlyView',
    component: MonthlyView
  },
  {
    path: '/',
    name: 'start',
    component: StartView
  },
  {
    path: '/month/:month',
    name: 'MonthlyDetail',
    component: MonthlyDetail,
    props: true
  },
  {
    path: '/register/success',
    name: 'register-success',
    component: RegistrationSuccess,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
  },
 
  {
    path: '/home',
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