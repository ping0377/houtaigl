<template>
    <div class="container">
        <el-form :model="user" :rules="rules" status-icon ref="form" label-width="80px">
            <el-form-item label="用户名" prop="account">
                <el-input placeholder="请输入用户名" v-model="user.account"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="name">
                <el-input placeholder="请输入用户姓名" v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input placeholder="密码" v-model="user.passWord" type="password"></el-input>
            </el-form-item>
            <el-form-item label="添加日期">
                <el-input readonly v-model="user.createDate"></el-input>
            </el-form-item>
            <el-form-item label="锁定状态" prop="status">
                <template>
                    <el-radio-group v-model="user.status">
                        <el-radio :label="0"></el-radio>
                        <el-radio :label="1"></el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>
            <el-form-item label="权限" prop="model">
                <el-checkbox-group v-model="user.modelcodes">
                    <el-checkbox label="1">采购管理</el-checkbox>
                    <el-checkbox label="2">销售管理</el-checkbox>
                    <el-checkbox label="3">系统管理</el-checkbox>
                    <el-checkbox label="4">财务管理</el-checkbox>
                    <el-checkbox label="5">仓库管理</el-checkbox>
                    <el-checkbox label="6">业务报表</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认保存</el-button>
                <el-button type="danger" @click="noadd">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from "axios"
    import cookie from 'js-cookie'
    const qs = require('querystring')
    export default {
        data() {
            return {
                user: {
                    account: '',
                    name: '',
                    passWord: '',
                    createDate: '',
                    status: '0',
                    modelcodes: []
                },
                year: '',
                month: '',
                date: '',
                hour: '',
                minutes: '',
                secondes: '',
                rules: {
                    account: [
                        { type: 'string', required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名' },
                    ],
                    passWord: [
                        { type: 'string', required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    status: [
                        // { type: 'string', message: '请输入正确格式' }
                    ],
                    model: [
                        { type: 'array', message: '格式不正确' }
                    ]
                }
            }
        },
        mounted() {
            this.user.status=0;
            let now = new Date();
          
            this.year = now.getFullYear();

            this.month = now.getMonth() + 1;
            this.date = now.getDay() + 1;
            this.hour = now.getHours();
            this.minutes = now.getMinutes();
            this.secondes = now.getSeconds();
            if (this.secondes < 10) {
                this.secondes = `0${this.secondes}`
            }
            if (this.month < 10) {
                this.month = `0${this.month}`
            }
            if (this.date < 10) {
                this.date = `0${this.date}`
            }
            if (this.minutes < 10) {
                this.minutes = `0${this.minutes}`
            }
            let time = this.year + `-` + this.month + `-` + this.date + ' ' + this.hour + `:` +
                this.minutes + `:` + this.secondes;
            this.user.createDate = time.toString();
        },
        methods: {
            noadd(){
                this.$router.push('/user')
            },
            onSubmit() {
                this.$refs['form'].validate(valid => {
                    // valid: true-数据合法，false - 数据不合法
                    console.log("表单验证的结果：", valid)
                    if (valid) {
                        alert('数据合法，可以提交')
                    } else {
                        alert('请确保数据合法后再提交')
                    }
                })
                console.log(this.user)
                axios.post('/api/main/system/user/add', qs.stringify(this.user),
                    { headers: { Authorization: cookie.get("token") } }
                ).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.$message(res.message)
                    if(res.code==2){
                        this.$message(res.message)
                        this.$router.push('/user')
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .container {
        margin-top: 25px;
        width: 600px;
        height: 500px;
    }
</style>