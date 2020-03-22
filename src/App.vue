<template>
  <div id="app">
    <!-- 头部 -->
    <el-row :span=24>

      <div class="header">
        <div class="pull-left">
          <img src="./images/logo.png" alt="">
        </div>
        <div class="pull-right">
          <div class="user">
            <span class="el-icon-user-solid" style="color:#ccc">欢迎您,{{user}}</span>
            <span class="el-icon-time" style="color:#ccc">
              系统时间：
              <span style="color:#ccc">{{year}}/{{month}}/{{day}} {{time}}{{hour}}:{{minutes}}:{{secondes}}</span>
            </span>
          </div>
        </div>
      </div>
    </el-row>
    <!--侧边 导航栏 -->
    <el-row class="tac">
      <el-col :span="4">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#056DA2" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/user" style="color:#ccc">用户管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="" style="color:#ccc">
                  <a href="" style="color:#ccc" @click="loginagain">重新登录</a>
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="">
                  <a href="" style="color:#ccc" @click="out">退出系统</a>
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#056DA2" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>采购管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/gongying" style="color:#ccc">供应商管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="newcaigou" style="color:#ccc">新添采购单</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="caigouend" style="color:#ccc">采购单了结</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link to="findcaigou" style="color:#ccc">采购单查询</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#056DA2" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>仓储管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/shopin" style="color:#ccc">入库登记</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/shopout" style="color:#ccc">出库登记</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/shopremain" style="color:#ccc">库存盘点</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link to="/findshop" style="color:#ccc">库存查询</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#056DA2" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>财务收支</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/moneyin" style="color:#ccc">收款登记</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/moneyout" style="color:#ccc">付款登记</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/moneyfind" style="color:#ccc">收支查询</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#056DA2" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>销售管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/shopclassify" style="color:#ccc">产品分类管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/product" style="color:#ccc">产品管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/client" style="color:#ccc">客户管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link to="/newselllist" style="color:#ccc">新添销售单</router-link>
              </el-menu-item>
              <el-menu-item index="1-5">
                <router-link to="/sellend" style="color:#ccc">销售单了结</router-link>
              </el-menu-item>
              <el-menu-item index="1-6">
                <router-link to="/sellfind" style="color:#ccc">销售单查询</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#056DA2" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>业务报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/monthbuy" style="color:#ccc">月度采购报表</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/monthmoney" style="color:#ccc">月度收支登记表</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/monthin" style="color:#ccc">月度入库报表</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link to="/monthout" style="color:#ccc">月度出库报表</router-link>
              </el-menu-item>
              <el-menu-item index="1-5">
                <router-link to="/monthshopremain" style="color:#ccc">产品库存报表</router-link>
              </el-menu-item>
              <el-menu-item index="1-6">
                <router-link to="/monthsell" style="color:#ccc">月度销售报表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#056DA2" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>网上销售</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/clientreg" style="color:#ccc">客户注册</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/shopshow" style="color:#ccc">商品展示</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/internetbuy" style="color:#ccc">网上下单</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

      </el-col>
      <el-col :span="20">
        <router-view />
      </el-col>


    </el-row>
  </div>
</template>

<script>
  import cookie from 'js-cookie'
  import axios from "axios"
  export default {
    name: 'App',
    data() {
      return {
        year: '',
        month: '',
        day: '',
        hour: '',
        minutes: '',
        secondes: '',
        time: '',
        user: ""
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      out() {
        // axios.get('api/sys/logout').then(resp => {
        //   let res = resp.data;
        //   console.log(resp)
        //   cookie.remove('username');
        //   cookie.remove('token')
        // })
        // this.$router.push('/')
        this.$confirm('将退出重新登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('api/sys/logout').then(resp => {
            let res = resp.data;
            console.log(resp)
            cookie.remove('username');
            cookie.remove('token')
          })
          this.$router.push('/')
        });
      },
      loginagain() {
        // axios.get('api/sys/logout').then(resp => {
        //   let res = resp.data;
        //   cookie.remove('username');
        //   cookie.remove('token')
        // })
        // this.$router.push('/')
        this.$confirm('将退出重新登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('api/sys/logout').then(resp => {
          let res = resp.data;
          cookie.remove('username');
          cookie.remove('token')
        })
        this.$router.push('/')
        });
      }
    },
    beforeCreate() {
      setInterval(() => {
        let now = new Date();
        this.year = now.getFullYear();
        this.month = now.getMonth() + 1;
        this.day = now.getDay() + 1;
        this.hour = now.getHours();
        this.minutes = now.getMinutes();
        this.secondes = now.getSeconds();
        if (this.hour > 12) { this.time = "下午" } else if (this.hour < 10) {
          this.hour = `0${this.hour}`
        } else { this.time = "上午" }
        if (this.minutes < 10) {
          this.minutes = `0${this.minutes}`
        }
        if (this.secondes < 10) { this.secondes = `0${this.secondes}` }
      }, 1000
      )
    },
    mounted() {
      let username = cookie.get('username');
      this.user = username
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .el-submenu__title {
    margin-right: 40px;
  }

  /* .el-col {
    height: 543px;
    border-right: #056DA2 1px solid;
    padding: -10px;
    margin: 0px;
  } */

  .header {
    background-color: #056DA2;
    width: 100%;
    height: 95px;
  }

  .pull-left {
    margin-left: 2px;
    margin-top: 5px;
    background-image: url(./images/topleft.jpg);
    width: 289px;
    height: 88px;
  }

  .pull-right {
    background-image: url(./images/topright.jpg)no-repeat right;
    width: 400px;
    height: 88px;
  }

  .user {
    width: 90%;
    height: 30px;
    border-radius: 30px;
    margin-top: 46px;
    background-image: url(./images/ub1.png);
    line-height: 30px;
  }
</style>