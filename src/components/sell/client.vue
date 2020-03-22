<template>
    <div>
        <h3>客户管理</h3>
        <el-button type="primary" @click="addclient_btn">添加客户</el-button>
        <el-dialog title="增加客户" :visible.sync="isshow">
            <el-form :model="form">
                <el-form-item label="客户编号" :label-width="formLabelWidth">
                    <el-input v-model="form.customerCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户密码" :label-width="formLabelWidth">
                    <el-input v-model="form.passWord" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="form.contactor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮编" :label-width="formLabelWidth">
                    <el-input v-model="form.postCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注册日期" :label-width="formLabelWidth">
                    <el-input v-model="form.createDate" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="传真" :label-width="formLabelWidth">
                    <el-input v-model="form.fax" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isshow = false">取 消</el-button>
                <el-button type="primary" @click="addclient">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="clientlist" style="width: 100%" border>
            <el-table-column prop="customerCode" width="80" label="客户编号">
            </el-table-column>
            <el-table-column prop="name" label="客户名称" width="120">
            </el-table-column>
            <el-table-column prop="passWord" label="密码" width="100">
            </el-table-column>
            <el-table-column prop="contactor" label="联系人" width="80">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="100">
            </el-table-column>
            <el-table-column prop="postCode" label="邮编" width="100">
            </el-table-column>
            <el-table-column prop="createDate" label="添加日期" width="120">
            </el-table-column>
            <el-table-column prop="tel" label="电话" width="120">
            </el-table-column>
            <el-table-column prop="fax" label="传真" width="120">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="danger" @click="deleclient(scope.row)">删除</el-button>
                    <el-button type="primary" @click="changepro(scope.row)">修改</el-button>
                    <el-dialog title="客户信息修改" :visible.sync="showclient">
                        <el-form :model="form">
                            <el-form-item label="客户编号" :label-width="formLabelWidth">
                                <el-input v-model="form.customerCode" autocomplete="off" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="客户姓名" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth">
                                <el-input v-model="form.passWord" autocomplete="off" type="passWord"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人" :label-width="formLabelWidth">
                                <el-input v-model="form.contactor" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" :label-width="formLabelWidth">
                                <el-input v-model="form.address" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮编" :label-width="formLabelWidth">
                                <el-input v-model="form.postCode" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="添加日期" :label-width="formLabelWidth">
                                <el-input v-model="form.createDate" autocomplete="off" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="电话" :label-width="formLabelWidth">
                                <el-input v-model="form.tel" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="传真" :label-width="formLabelWidth">
                                <el-input v-model="form.fax" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="showclient = false">取 消</el-button>
                            <el-button type="primary" @click="changeclient">确 定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[5, 10, 15, 20]" @current-change="handleCurrentChange"
                @size-change="handleSizeChange" :page-size="10" layout="total,sizes, prev, pager, next,jumper"
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
                clientlist: [],
                formLabelWidth: '120px',
                totalpage: 0,
                showclient: false,
                form: {
                    customerCode: '',
                    name: '',
                    passWord: '',
                    contactor: '',
                    address: '',
                    postCode: '',
                    createDate: '',
                    tel: '',
                    fax: ''
                },
                isshow: false
            }
        },
        mounted() {
            axios.get('api/main/sell/customer/show', {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                console.log(res)
                this.clientlist = res.list;
                this.totalpage = res.total
            })
        },
        methods: {
            addclient_btn() {
                this.isshow = true;
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
                let time = year + `-` + month + `-` + date 
                this.form.createDate = time.toString();
            },
            changeclient() {
                axios.post('api/main/sell/customer/update', qs.stringify(this.form), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    if (res.code == 2) {
                        this.$message(`修改成功`)
                        // this.clientlist=res
                    }
                    this.showclient = false;
                })
            },
            changepro(row) {
                console.log(row)
                this.form = row
                this.showclient = true;
                this.form.createDate = row.createDate
            },
            handleSizeChange(val) {

            },
            deleclient(row) {//删除客户
                // console.log(row.customerCode)
                if(confirm('是否确认删除')){
                    axios.get('api/main/sell/customer/delete?customerCode=' + row.customerCode, {
                        headers: { Authorization: cookie.get("token") }
                    }).then(resp => {
                        let res = resp.data;
                        // console.log(res)
                        if (res.code == 2) {
                            this.$message(`删除成功`)
                            this.clientlist = res.data;
                        }else{
                            this.$message('删除失败')
                        }
                    })
                }
            },
            handleCurrentChange(val) {
                axios.get('api/main/sell/customer/show?page=' + val, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.clientlist = res.list;

                })
            },
            addclient() {
                axios.post('/api/main/sell/customer/add', qs.stringify(this.form), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    if (res.code == 2) {
                        alert(res.message);
                        axios.get('api/main/sell/customer/show', {
                            headers: { Authorization: cookie.get("token") }
                        }).then(resp => {
                            let res = resp.data;
                            console.log(res.list)
                            this.clientlist = res.list;
                        })
                        this.isshow = false;
                    }else{this.$message(res.message)}
                })
            }
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
        width: 113%;
    }

    .block {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>