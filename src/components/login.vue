<template>
    <div>
        <div class="loginbody">
            <span class="systemlogo"></span>
            <div class="loginbox">
                <ul>
                    <li>
                        <input name="username" type="text" class="loginuser" v-model="user.username" value="admin"
                            onclick="JavaScript:this.value=''" />
                    </li>
                    <li>
                        <input name="password" v-model="user.password" type="password" class="loginpwd" value="密码"
                            onclick="JavaScript:this.value='';this.type='password'" />
                    </li>
                    <li>
                        <input name="" type="submit" @click="login" class="loginbtn" value="登录" />
                        <label><input name="" type="checkbox" value="" />记住密码</label>
                        <label>
                            <a href="#">忘记密码？</a>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    const qs = require('querystring')
    import cookie from 'js-cookie'
    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    role: 'member'
                }
            }
        },
        methods: {
            login() {
                if (!this.user.username || !this.user.password) {
                    this.error = '账号或密码不能为空'
                    return;
                } else {
                    axios.post('/api/sys/login',qs.stringify(this.user)).then(resp=>{
                        let res=resp.data;
                        cookie.set('token',res.data.token);
                        cookie.set('username',this.user.username)
                        this.$router.push('/user')
                    })
                }
            }
        },
    }
</script>

<style scoped>
    .logintop {
        height: 47px;
        position: absolute;
        top: 0;
        background: url(../images/loginbg1.png) repeat-x;
        z-index: 100;
        width: 83%;
    }

    .logintop span {
        color: #fff;
        line-height: 47px;
        background: url(../images/loginsj.png) no-repeat 21px 18px;
        text-indent: 44px;
        color: #afc5d2;
        float: left;
    }

    .logintop ul {
        float: right;
        padding-right: 30px;
    }

    .logintop ul li {
        float: left;
        margin-left: 20px;
        line-height: 47px;
        list-style-type: none;
    }

    .logintop ul li a {
        color: #afc5d2;
    }

    .logintop ul li a:hover {
        color: #fff;
    }

    .loginbody {
        background: url(../images/loginbg3.png) no-repeat center center;
        width: 83%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 47px;
    }

    .systemlogo {
        background: url(../images/loginlogo.png) no-repeat center;
        width: 100%;
        height: 71px;
        margin-top: 75px;
    }

    .loginbox {
        margin-left: 210px;
        width: 692px;
        height: 336px;
        background: url(../images/logininfo.png) no-repeat;
        margin-top: -30px;
    }

    .loginbox ul {
        margin-top: 88px;
        margin-left: 140px;
    }

    .loginbox ul li {
        margin-bottom: 25px;
    }

    .loginbox ul li label {
        color: #687f92;
        padding-left: 25px;
    }

    .loginbox ul li label a {
        color: #687f92;
    }

    .loginbox ul li label a:hover {
        color: #3d96c9;
    }

    .loginbox ul li label input {
        margin-right: 5px;
    }

    .loginuser {
        margin-top: 90px;
        width: 299px;
        height: 48px;
        background: url(../images/loginuser.png) no-repeat;
        border: none;
        line-height: 48px;
        padding-left: 44px;
        font-size: 14px;
        font-weight: bold;
    }

    .loginpwd {
        width: 299px;
        height: 48px;
        background: url(../images/loginpassword.png) no-repeat;
        border: none;
        line-height: 48px;
        padding-left: 44px;
        font-size: 14px;
        color: #90a2bc;
    }

    .loginbtn {
        width: 111px;
        height: 35px;
        background: url(../images/buttonbg.png) repeat-x;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        line-height: 35px;
    }

    .loginbm {
        margin-right: 100px;
        height: 50px;
        line-height: 50px;
        background: url(../images/loginbg2.png);
        position: absolute;
        bottom: 0;
        width: 84%;
        color: #0b3a58;
    }

    .loginbm a {
        font-weight: bold;
        color: #0b3a58;
        margin: auto;
    }

    .loginbm a:hover {
        color: #fff;
    }
</style>