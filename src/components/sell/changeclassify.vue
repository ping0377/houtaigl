<template>
    <div class="container">
        <h3>修改产品种类信息</h3>
        <el-form :model='newlist'>
            <el-form-item label="产品名字">
                <el-input v-model="newlist.name"></el-input>
            </el-form-item>
            <el-form-item label="分类序列号">
                <el-input v-model="newlist.categoryId" readonly></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="newlist.remark" ></el-input>
            </el-form-item>
            <el-button @click="changaclass" type="danger">确定更改</el-button>
            <el-button type="primary" @click="nochange">取消</el-button>
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
                    categoryId: '',
                    remark:''
                }
            }
        },
        methods: {
            changaclass() {
                axios.post('api/main/sell/category/update', qs.stringify({
                    categoryId: this.newlist.categoryId,
                    name: this.newlist.name,
                    remark:this.newlist.remark
                }), { headers: { Authorization: cookie.get("token") } }
                ).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    if (res.code == 2) {
                        this.$router.push('/shopclassify')
                    }
                })
            },
            nochange() {
                this.$router.push('/shopclassify')
            }
        },
        mounted() {
            this.newlist = this.$route.query;
        },
    }
</script>