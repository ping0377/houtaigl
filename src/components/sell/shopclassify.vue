<template>
    <div>
        <h3>产品分类管理</h3>
        <el-button type="primary">
            <router-link to="/addclassify">增加新的分类</router-link>
        </el-button>
        <el-table :data="productlist" style="width: 100%">
            <el-table-column type="index" width="120" label="编号">
            </el-table-column>
            <el-table-column prop="categoryId" width="130" label="分类序列号">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="200">
            </el-table-column>
            <el-table-column prop="remark" label="描述" width="200">
            </el-table-column>
            <el-table-column label="操作" width="260">
                <template slot-scope="scope" width="120">
                    <el-button type="danger" @click="deleclass(scope.row)">删除</el-button>
                    <el-button type="primary" @click="changeclass(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="totalpage">
        </el-pagination>
    </div>
</template>
<script>
    import axios from "axios"
    import cookie from 'js-cookie'
    const qs = require('querystring')
    export default {
        data() {
            return {
                productlist: [],
                newlist: {
                    name: '',
                    remark: ''
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                totalpage: 0
            }
        },
        mounted() {
            axios.get('/api/main/sell/category/show', {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                // console.log(res)
                this.productlist = res.list
                this.totalpage = res.total
            })
        },
        methods: {
            handleCurrentChange(val) {
                axios.get('/api/main/sell/category/show?page=' + val, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.productlist = res.list
                    this.totalpage = res.total
                })
            },
            deleclass(row) {   //  删除分类
                this.$confirm('将永久删除该收据,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get('api/main/sell/category/delete?categoryId=' + row.categoryId, {
                        headers: { Authorization: cookie.get("token") }
                    }).then(resp => {
                        let res = resp.data;
                        console.log(res);
                        if (res.code == 2) {
                            this.$message(res.message)
                            this.productlist = res.data;
                        } else { this.$message('删除失败') }
                    })
                }).catch(() => {
                    this.$message(`取消删除`)
                })
            },
            changeclass(row) {
                console.log(row)
                this.$router.push({ path: '/changeclassify', query: row })
                // axios.post('api/main/sell/category/update', qs.stringify({
                //     categoryId: row.categoryId,
                //     name: row.name
                // }), {
                //         headers: { Authorization: cookie.get("token") }
                //     }).then(resp => {
                //         let res = resp.data;
                //         console.log(res)
                //     })
            }
        },
    }
</script>