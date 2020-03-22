<template>
    <div class="use container">
        <el-button type="primary" @click="add_user">添加用户</el-button>
        <el-table :data="userlist" style="width: 100%">
            <el-table-column type="selection" width="100">
            </el-table-column>
            <el-table-column type="index" width="80" label="用户编号">
            </el-table-column>
            <el-table-column prop="account" label="用户账号" width="120">
            </el-table-column>
            <el-table-column prop="name" label="用户姓名" width="120">
            </el-table-column>
            <el-table-column prop="createDate" label="添加时间" width="190">
            </el-table-column>
            <el-table-column prop="status" label="锁定状态" width="80">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==0">不锁定</span>
                    <span v-show="scope.row.status==1">锁定</span>
                </template>
            </el-table-column>
            <el-table-column label="用户权限列表" prop="modellist" width="190" :formatter="getmodel">
            </el-table-column>
            <el-table-column label="操作" width="190">
                <template slot-scope="scope">
                    <el-button type="danger" @click="deleuser(scope.row)">删除</el-button>
                    <el-button type="primary" @click="changeuser(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template>
            <div class="block">
                <el-pagination :current-page="1" :page-sizes="[5, 10, 15, 20]" :page-size="10" background
                    layout=" sizes, prev, pager, next, jumper" :total="totalpage" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </template>

    </div>
</template>

<script>
    import changeuser from './changeuser'
    import axios from "axios"
    const qs = require('querystring')
    import Vuex from 'vuex'
    import Vue from 'vue'
    import cookie from 'js-cookie'
    import brother from './brother'
    export default {
        data() {
            return {
                userlist: [],
                totalpage: 1,
                pagesize: '',//每页显示的数量
            }
        },
        mounted() {
            axios.get('/api/main/system/user/show?page=1', {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data.list;
                this.userlist = res;
                this.totalpage = resp.data.total;
            })
        },
        methods: {
            handleSizeChange(val) {
                // console.log(`每页显示${val}条`)
            },
            handleCurrentChange(val) {
                console.log(val)
                axios.get('/api/main/system/user/show?page=' + val, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data.list;
                    this.userlist = res;
                    this.totalpage = resp.data.total;
                })
            },
            getmodel(row, column) {
                let modelname = []
                for (let i = 0; i < row.models.length; i++) {
                    modelname.push(row.models[i].modelName)
                }
                return modelname.join();
            },
            add_user() {
                this.$router.push('/adduser')
            },
            deleuser(row) {
                if (confirm('确定删除')) {
                    console.log(row.account);
                    let name = row.account;
                    axios.get('api/main/system/user/delete?account=' + name, {
                        headers: { Authorization: cookie.get("token") }
                    }).then(resp => {
                        let res = resp.data;
                        console.log(res)
                        if (res.code == 2) {
                            this.$message(res.message)
                            this.userlist = res.data.list;
                        }else{this.$message(`删除失败`)}
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            changeuser(row) {
                this.$router.push({ path: '/changeuser', query: row })
            }
        },
    }
</script>

<style scoped>
    .add_user {
        margin-top: 2px;
        margin-left: 0;
    }

    .use {
        margin-top: 10px;
        width: 1120px;
    }

    .block {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>