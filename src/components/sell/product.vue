<template>
    <div>
        <h3>产品管理</h3>
        <el-button type="primary" @click="isshow=true">产品增加</el-button>
        <el-dialog title="增加产品" :visible.sync="isshow">
            <el-form :model="form">
                <el-form-item label="产品编号" :label-width="formLabelWidth">
                    <el-input v-model="form.productCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品分类" :label-width="formLabelWidth">
                    <el-input v-model="form.categoryId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="销售价" :label-width="formLabelWidth">
                    <el-input v-model="form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量单位" :label-width="formLabelWidth">
                    <el-input v-model="form.unitName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="添加日期" :label-width="formLabelWidth">
                    <el-input v-model="form.createDate" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isshow = false">取 消</el-button>
                <el-button type="primary" @click="addpro">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="productlist" style="width: 100%" border>
            <!-- <el-table-column type="index" width="50" label="编号">
            </el-table-column> -->
            <el-table-column prop="productCode" width="130" label="产品编号">
            </el-table-column>
            <el-table-column prop="name" label="产品名称" width="140">
            </el-table-column>
            <el-table-column prop="unitName" label="数量单位" width="100">
            </el-table-column>
            <el-table-column prop="categoryName" label="分类名称" width="80">
            </el-table-column>
            <el-table-column prop="createDate" label="添加日期" width="160">
            </el-table-column>
            <el-table-column prop="price" label="销售价" width="80">
            </el-table-column>
            <el-table-column prop="remark" label="产品描述" width="170">
            </el-table-column>
            <el-table-column label="操作" width="260">
                <template slot-scope="scope" width="120">
                    <el-button type="danger" @click="delepro(scope.row)">删除</el-button>
                    <el-button type="primary" @click="changepro(scope.row)">修改</el-button>
                    <el-dialog title="修改产品信息" :visible.sync="dialogFormVisible" v-show="false">
                        <el-form :model="form">
                            <el-form-item label="产品编号" :label-width="formLabelWidth">
                                <el-input v-model="form.productCode" autocomplete="off" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="产品名称" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="产品分类" :label-width="formLabelWidth">
                                <el-input v-model="form.categoryId" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="销售价" :label-width="formLabelWidth">
                                <el-input v-model="form.price" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数量单位" :label-width="formLabelWidth">
                                <el-input v-model="form.unitName" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="添加日期" :label-width="formLabelWidth">
                                <el-input v-model="form.createDate" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="描述" :label-width="formLabelWidth">
                                <el-input v-model="form.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="ischange">确 定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[5, 10, 15, 20]" @current-change="handleCurrentChange"
                @size-change="handleSizeChange" :page-size="10" layout="sizes, prev, pager, next,jumper"
                :total="totalpage">
            </el-pagination>
        </div>
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
                totalpage: 1,
                dialogTableVisible: false,
                dialogFormVisible: false,
                isshow: false,
                form: {
                    productCode: '',
                    name: '',
                    unitName: '',
                    categoryId: '',
                    price: '0',
                    createDate: '',
                    remark: ""
                },
                formLabelWidth: "120px"
            }
        },
        methods: {
            addp() {
                this.dialogFormVisible = true;
            },
            handleSizeChange(val) {

            },
            changepro(row) {
                console.log(row)
                this.form = row;
                this.dialogFormVisible = true
            },
            ischange() {
                axios.post('api/main/sell/product/update', qs.stringify(this.form), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    if (res.code == 2) {
                        alert('修改成功')
                        this.dialogFormVisible = false
                    }
                })
            },
            delepro(row) {//删除产品
                this.$confirm('将永久删除该收据,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get('api/main/sell/product/delete?productCode=' + row.productCode, {
                        headers: { Authorization: cookie.get("token") }
                    }).then(resp => {
                        let res = resp.data;
                        // console.log(res)
                        if (res.code == 2) {
                            this.$message(`删除成功`)
                            this.productlist = res.data
                        } else { this.$message(`不能删除`) }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            addpro() {
                axios.post('api/main/sell/product/add', qs.stringify(this.form), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    if (res.code == 2) {
                        alert('添加成功')
                        this.isshow = false
                    }
                })
            },
            handleCurrentChange(val) {
                axios.get('/api/main/sell/product/show?page=' + val, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.totalpage = resp.data.total;
                    this.productlist = res.list;
                })
            }
        },
        mounted() {
            axios.get('/api/main/sell/product/show', {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                this.productlist = res.list;
                this.totalpage = resp.data.total;
            })
            let now = new Date();

            let year = now.getFullYear();

            let month = now.getMonth() + 1;
            let date = now.getDate();
            let hour = now.getHours();
            let minutes = now.getMinutes();
            let secondes = now.getSeconds();
            if (secondes < 10) {
                secondes = `0${secondes}`
            }
            if (month < 10) {
                month = `0${month}`
            }
            if (date < 10) {
                date = `0${date}`
            }
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            if (hour < 10) {
                hour = `0${hour}`
            }
            let time = year + `-` + month + `-` + date + ' ' + hour + `:` +
                minutes + `:` + secondes;
            this.form.createDate = time.toString();
        },
    }
</script>
<style scoped>
    .container {
        margin-top: 25px;
        width: 1130px;
        height: 500px;
    }

    .el-table__body-wrapper {
        width: 103%;
    }

    .block {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>