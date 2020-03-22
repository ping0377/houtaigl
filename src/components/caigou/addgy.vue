<template>
  <div class="container">
    <el-form :model="user" :rules="rules" status-icon ref="form" label-width="100px">
      <el-form-item label="供应商编号" prop="venderCode">
        <el-input placeholder="供应商编号" v-model="user.venderCode"></el-input>
      </el-form-item>
      <el-form-item label="供应商名称" prop="name">
        <el-input placeholder="请输入用户姓名" v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="供应商密码" prop="passWord">
        <el-input placeholder="密码" v-model="user.passWord" type="password"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactor">
        <el-input v-model="user.contactor"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="user.address"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="model">
        <el-input v-model="user.postCode"></el-input>
      </el-form-item>
      <el-form-item label="注册日期" prop="model">
        <el-input v-model="user.createDate" readonly></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="model">
        <el-input v-model="user.tel"></el-input>
      </el-form-item>
      <el-form-item label="传真" prop="model">
        <el-input v-model="user.fax"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认增加</el-button>
        <el-button type="danger" @click="noaddgy">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import cookie from "js-cookie";
const qs = require("querystring");
export default {
  data() {
    return {
      user: {
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "", //联系人
        address: "",
        postCode: "",
        createDate: "",
        tel: "",
        fax: ""
      },
      year: "",
      month: "",
      date: "",
      hour: "",
      minutes: "",
      secondes: "",
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        venderCode: [{ required: true,message:'4~20数字字母',trigger: 'blur'  }],
        passWord: [
          {
            type: "string",
            required: true,
            message: "4~20位",
            trigger: "blur"
          }
        ],
        contactor: [{ required: true, message: "请输入联系人" }],
        address: [{ required: true, message: "请输入地址" }]
      }
    };
  },
  mounted() {
    let now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.date = now.getDate();
    this.hour = now.getHours();
    this.minutes = now.getMinutes();
    this.secondes = now.getSeconds();
    if (this.secondes < 10) {
      this.secondes = `0${this.secondes}`;
    }
    if (this.month < 10) {
      this.month = `0${this.month}`;
    }
    if (this.date < 10) {
      this.date = `0${this.date}`;
    }
    if (this.minutes < 10) {
      this.minutes = `0${this.minutes}`;
    }
    let time = this.year + `-` + this.month + `-` + this.date;
    this.user.createDate = time.toString();
  },
  methods: {
    noaddgy() {
      this.$router.push("/gongying");
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        // valid: true-数据合法，false - 数据不合法
        // console.log("表单验证的结果：", valid)
        if (valid) {
          // alert('数据合法，可以提交')
          axios
            .post("/api/main/purchase/vender/add", qs.stringify(this.user), {
              headers: { Authorization: cookie.get("token") }
            })
            .then(resp => {
              let res = resp.data;
              if (res.code == 2) {
                this.$message("添加成功");
                this.$router.push("/gongying");
              } else {
                this.$message(res.message);
              }
            });
        } else {
          alert("请确保数据合法后再提交");
        }
      });
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