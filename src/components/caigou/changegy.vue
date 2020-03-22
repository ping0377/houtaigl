<template>
    <div class="container">
        <h3>供应商信息修改</h3>
        <el-form :model="changegy" status-icon ref="form" label-width="80px">
            <el-form-item label="用户账号">
                <el-input placeholder="请输入用户名" v-model="changegy.venderCode" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户姓名">
                <el-input placeholder="请输入用户姓名" v-model="changegy.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input placeholder="密码" v-model="changegy.passWord" type="password"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input placeholder="联系人" v-model="changegy.contactor"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input placeholder="地址" v-model="changegy.address"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码">
                <el-input placeholder="邮编" v-model="changegy.postCode"></el-input>
            </el-form-item>
            <el-form-item label="添加日期">
                <el-input v-model="changegy.createDate" readonly></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input placeholder="电话" v-model="changegy.tel"></el-input>
            </el-form-item>
            <el-form-item label="传真">
                <el-input placeholder="传真" v-model="changegy.fax"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changemsg">确认修改</el-button>
                <el-button type="danger">取消</el-button>
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
                changegy: {
                    venderCode: '',
                    name: '',
                    passWord: '',
                    createDate: '',
                    address:'',
                    contactor:'',
                    fax:'',
                    postCode:'',
                    tel:''
                },
                rules: {
                    model: [
                        { type: 'array', message: '格式不正确' }
                    ],
                    account: [
                        { type: 'string', required: true, message: '请输入用户名', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            this.changegy.venderCode = this.$route.query.venderCode;
            this.changegy.createDate = this.$route.query.createDate;
            this.changegy=this.$route.query
        },
        methods: {
            changemsg() {
                axios.post('api/main/purchase/vender/update', qs.stringify(this.changegy),
                    { headers: { Authorization: cookie.get("token") } }
                ).then(resp => {
                    let res = resp.data;
                    this.$message(res.message)
                    if (res.code == 2) {
                        this.$router.push('/gongying')
                    }
                })
            },
            nochange() {
                this.$router.push('/gongying')
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