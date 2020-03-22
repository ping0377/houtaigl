<template>
    <div class="container">
        <h3>增加新分类</h3>
        <el-form :model='newlist'>
            <el-form-item label="产品名字">
                <el-input v-model="newlist.name"></el-input>
            </el-form-item>
            <el-form-item label="产品描述">
                <el-input v-model="newlist.remark"></el-input>
            </el-form-item>
            <el-button @click="addclass" type="danger">确定添加</el-button>
            <el-button type="primary" @click="noadd">取消</el-button>
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
                newlist: {
                    name: '',
                    remark: ''
                }
            }
        },
        methods: {
            addclass(){
                axios.post('api/main/sell/category/add',qs.stringify(this.newlist),{
                    headers: { Authorization: cookie.get("token") }
                }).then(resp=>{
                    let res=resp.data;
                    console.log(res);
                    this.$router.push('/shopclassify')
                })
            },
            noadd(){
                this.$router.push('/shopclassify')
            }
        },

    }
</script>