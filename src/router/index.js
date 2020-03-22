import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import user from '../components/system/user'
import login from '../components/login'
import caigouend from '../components/caigou/caigouend'
import findcaigou from '../components/caigou/findcaigou'
import gongying from '../components/caigou/gongying'
import newcaigou from '../components/caigou/newcaigou'
import shopin from '../components/warehouse/shopin'
import shopout from '../components/warehouse/shopout'
import shopremain from '../components/warehouse/shopremain'
import findshop from '../components/warehouse/findshop'
import moneyfind from '../components/money/moneyfind'
import moneyin from '../components/money/moneyin'
import moneyout from '../components/money/moneyout'
import client from '../components/sell/client'
import newselllist from '../components/sell/newselllist'
import product from '../components/sell/product'
import sellend from '../components/sell/sellend'
import sellfind from '../components/sell/sellfind'
import shopclassify from '../components/sell/shopclassify'
import monthbuy from '../components/forms/monthbuy'
import monthin from '../components/forms/monthin'
import monthmoney from '../components/forms/monthmoney'
import monthout from '../components/forms/monthout'
import monthsell from '../components/forms/monthsell'
import monthshopremain from '../components/forms/monthshopremain'
import clientreg from '../components/internetsell/clientreg'
import internetbuy from '../components/internetsell/internetbuy'
import shopshow from '../components/internetsell/shopshow'
import adduser from '../components/system/adduser'
import addgy from '../components/caigou/addgy'
import changeuser from '../components/system/changeuser'
import changegy from '../components/caigou/changegy'
import addcaigou from '../components/caigou/addcaigou'
import choicegy from '../components/caigou/choicegy'
import addclassify from '../components/sell/addclassify'
import changeclassify from '../components/sell/changeclassify'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/changeclassify',
      name:'changeclassify',
      component:changeclassify
    },
    {
      path:'/addclassify',
      name:'addclassify',
      component:addclassify
    },
    {
      path:'/choicegy',
      name:'choicegy',
      component:choicegy
    },
    {
      path:'/addcaigou',
      name:'addcaigou',
      component:addcaigou
    },
    {
      path:'/changegy',
      name:'changegy',
      component:changegy
    },
    {
      path:'/changeuser',
      name:'changeuser',
      component:changeuser
    },
    {
      path:'/adduser',
      name:'adduser',
      component:adduser
    },
    {
      path: '/',
      name: "login",
      component: login
    },
    {
      path:'/addgy',
      name:'addgy',
      component:addgy
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/caigouend',
      name: 'caigouend',
      component: caigouend
    },
    {
      path: '/findcaigou',
      name: 'findcaigou',
      component: findcaigou
    },
    {
      path: '/gongying',
      name: 'gongying',
      component: gongying
    },
    {
      path: '/newcaigou',
      name: 'newcaigou',
      component: newcaigou
    },
    {
      path: "/findshop",
      name: 'findshop',
      component: findshop
    },
    {
      path: "/shopin",
      name: 'shopin',
      component: shopin
    },
    {
      path:"/shopout",
      name:'shopout',
      component:shopout
    },
    {
      path:"/shopremain",
      name:'shopremain',
      component:shopremain
    },
    {
      path:"/moneyfind",
      name:'moneyfind',
      component:moneyfind
    },
    {
      path:"/moneyin",
      name:'moneyin',
      component:moneyin
    },
    {
      path:"/moneyout",
      name:'moneyout',
      component:moneyout
    },
    {
      path:"/client",
      name:'client',
      component:client
    },
    {
      path:"/newselllist",
      name:'newselllist',
      component:newselllist
    },
    {
      path:"/product",
      name:'product',
      component:product
    },
    {
      path:"/sellend",
      name:'sellend',
      component:sellend
    },
    {
      path:"/sellfind",
      name:'sellfind',
      component:sellfind
    },
    {
      path:"/shopclassify",
      name:'shopclassify',
      component:shopclassify
    },
    {
      path:"/monthbuy",
      name:'monthbuy',
      component:monthbuy
    },
    {
      path:"/monthin",
      name:'monthin',
      component:monthin
    },
    {
      path:"/monthmoney",
      name:'monthmoney',
      component:monthmoney
    },
    {
      path:"/monthout",
      name:'monthout',
      component:monthout
    },
    {
      path:"/monthsell",
      name:'monthsell',
      component:monthsell
    },
    {
      path:"/monthshopremain",
      name:'monthshopremain',
      component:monthshopremain
    },
    {
      path:'/clientreg',
      name:'clientreg',
      component:clientreg
    },
    {
      path:'/internetbuy',
      name:'internetbuy',
      component:internetbuy
    },
    {
      path:'/shopshow',
      name:'shopshow',
      component:shopshow
    }
  ]
})
