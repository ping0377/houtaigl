<template>
  <div class="container">
    <h3>用户信息修改</h3>
    <el-form :model="changeuser" status-icon ref="form" label-width="80px">
      <el-form-item label="用户账号">
        <el-input placeholder="请输入用户名" v-model="changeuser.account" readonly></el-input>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input placeholder="请输入用户姓名" v-model="changeuser.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="密码" v-model="changeuser.passWord" type="password"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="changeuser.createDate" readonly></el-input>
      </el-form-item>
      <el-form-item label="锁定状态">
        <template>
          <el-radio-group v-model="changeuser.status">
            <el-radio :label="0">不锁定</el-radio>
            <el-radio :label="1">锁定</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="权限" prop="model">
          
        <el-checkbox-group v-model="changeuser.modelcodes">
          <el-checkbox :label="1">采购管理</el-checkbox>
          <el-checkbox :label="2">销售管理</el-checkbox>
          <el-checkbox :label="3">系统管理</el-checkbox>
          <el-checkbox :label="4">财务管理</el-checkbox>
          <el-checkbox :label="5">仓库管理</el-checkbox>
          <el-checkbox :label="6">业务报表</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changemsg">确认修改</el-button>
        <el-button type="danger" @click="nochange">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import brother from "./brother";
import axios from "axios";
import cookie from "js-cookie";
const qs = require("querystring");
export default {
  data() {
    return {
      changeuser: {
        account: "",
        name: "",
        passWord: "",
        createDate: "",
        status: "",
        modelcodes:[]
      },
      rules: {
        model: [{ type: "array", message: "格式不正确" }],
        account: [
          {
            type: "string",
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.changeuser.account = this.$route.query.account;
    this.changeuser.createDate = this.$route.query.createDate;
    this.changeuser.status = this.$route.query.status;
    this.changeuser.name = this.$route.query.name;
    this.changeuser.passWord = this.$route.query.passWord;
    this.changeuser.modelcodes = this.$route.query.models.map(item=>{
        return item.modelCode
    })
  },
  methods: {
    changemsg() {
      axios
        .post("api/main/system/user/update", qs.stringify(this.changeuser), {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          this.$message(res.message);
          if (res.code == 2) {
            this.$message(res.message);
            this.$router.push("/user");
          }
        });
    },
    nochange() {
      this.$router.push("/user");
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 25px;
  width: 600px;
  height: 500px;
}
</style>