import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const qs = require('querystring')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 登录的用户名
        // account: localStorage.getItem('account'),
        username: Cookie.get('username'),
        // 登录的状态
        // token: localStorage.getItem('token')
        token: Cookie.get('token')
    },

    mutations: {
        SET_ACCOUNT(state, payload){
            state.username = payload.username
            // localStorage.setItem('account', payload.account)
            Cookie.set('username', payload.username)
        },

        SET_TOKEN(state, payload){
            state.token = payload.token
            // localStorage.setItem('token', payload.token)
            Cookie.set('token', payload.token)
        }
    },

    actions: {
        // 后端登录接口：http://192.168.0.127:8888/sys/login
        // 请求参数：account - 登录的账号, password - 登录的密码
        // 响应的结果：登录成功，返回 'success'; 否则返回 '账号或密码错误'
        checkLogin({commit}, payload){
            return new Promise((resolve, reject) => {
                // account=admin&password=123
                axios.post('/api/sys/login', qs.stringify(payload)).then(resp => {
                    let result = resp.data
                    if(result.code==2){
                        // 变更状态
                        commit({type:'SET_ACCOUNT', username: payload.username})
                        commit({type:'SET_TOKEN', token: result.data});
                        console.log(result.data)
                        // 向axios添加全局的请求头信息
                        axios.defaults.headers.common['Authorization'] = result.data
                        resolve(result.message)
                    }else{ // 登录失败
                        reject(result.message);
                    }
                })
            })
        }
    }
}) 

export default store