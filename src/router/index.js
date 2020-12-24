import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@store/index.js'

const routes = [
  {path: '/', redirect: '/container'},
  { path: '/login', name: 'login', component: () => import('@com/system/Login.vue')},
  { path: '/container', name: 'container', component: () => import('@com/common/Container.vue'), 
    children: [
      { path: '', name: 'messager', component: () => import('@com/system/Messager.vue')},
      { path: 'menu', name: 'menu', component: () => import('@com/system/MenuInfo.vue')},
    ]
  },
  { path: '/base/product', name: 'base_product', component: () => import('@com/base/product/Index.vue')},
  { path: '/base/productPersist', name: 'base_product_persist', component: () => import('@com/base/product/ProdPersist.vue')},
  { path: '/base/productDetail', name: 'base_product_detail', component: () => import('@com/base/product/ProdDetail.vue')},
  { path: '/base/productEditor', name: 'base_product_editor', component: () => import('@com/base/product/ProdEditor.vue')},
  
  { path: '/base/customer', name: 'base_customer', component: () => import('@com/base/customer/Index.vue')},
  { path: '/base/customerDetail', name: 'base_customer_detail', component: () => import('@com/base/customer/Detail.vue')},
  { path: '/base/customerEditor', name: 'base_customer_editor', component: () => import('@com/base/customer/Editor.vue')},
  { path: '/base/customerPersist', name: 'base_customer_persist', component: () => import('@com/base/customer/Persist.vue')},
]

const route = createRouter({
  history: new createWebHashHistory(),
  routes
})

route.beforeEach((to, from, next) => {
  if(to.name === 'login') {
    store.commit('account/loginInfo',{})
    return next()
  } else if(to.matched.length < 1) {
    return next('/container')
  } else {
    next()
  }
})

// route.isReady().then(succ => console.log(succ)).catch(err => console.log(err))

export default route