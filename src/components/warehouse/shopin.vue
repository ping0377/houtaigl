<template>
    <div>
        <h1>入库登记</h1>
        <el-form :model="form">
            <el-form-item>
                <el-select v-model="form.payType" placeholder="付款方式" @change="once">
                    <el-option label="货到付款" value="1"></el-option>
                    <el-option label="款到发货" value="2"></el-option>
                    <el-option label="预付款到发货" value="3"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table :data="inlist">
            <el-table-column label="销售单编号" prop="poId"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="客户名称" prop="venderName"></el-table-column>
            <el-table-column label="创建用户" prop="account"></el-table-column>
            <el-table-column label="附加费用" prop="tipFee"></el-table-column>
            <el-table-column label="产品总价" prop="poTotal"></el-table-column>
            <el-table-column label="销售单总价" prop="poTotal"></el-table-column>
            <el-table-column label="付款方式" prop="payType">
                <template slot-scope="scope">
                    <span v-show="scope.row.payType==1">货到付款</span>
                    <span v-show="scope.row.payType==2">款到发货</span>
                    <span v-show="scope.row.payType==3">预付款</span>
                </template>
            </el-table-column>
            <el-table-column label="最低预付款" prop="prePayFee"></el-table-column>
            <el-table-column label="处理状态" prop="status">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==1">新增</span>
                    <span v-show="scope.row.status==2">已发货</span>
                    <span v-show="scope.row.status==3">已付款</span>
                    <span v-show="scope.row.status==4">了结</span>
                    <span v-show="scope.row.status==5">已预付</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="comein(scope.row)" type="primary">入库</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="totalpage">
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
                form: {
                    payType: '1'
                },
                inlist: [],
                totalpage: 0
            }
        },
        methods: {
            comein(row) {//入库操作
                // console.log(row)
                if (confirm('是否继续')) {
                    axios.post('api/main/stock/instock', qs.stringify({
                        poId: row.poId,
                        type: 3,
                        payType: row.payType,
                        page: 1
                    }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                        let res = resp.data;
                        // console.log(res);
                        if(res.code==2){
                            this.$message('入库成功')
                            this.inlist = res.data.list;
                        }else{
                            this.$message('入库失败')
                        }
                    })
                }
            },
            handleCurrentChange(val) {
                // console.log(val)
                axios.post('api/main/purchase/pomain/show', qs.stringify({
                    type: 3, payType: this.form.payType, page: val
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    // console.log(res);
                    this.inlist = res.list
                    this.totalpage = res.total
                })
            },
            once() {
                axios.post('api/main/purchase/pomain/show', qs.stringify({
                    type: 3, payType: this.form.payType
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    // console.log(res);
                    this.inlist = res.list
                    this.totalpage = res.total
                })
            }
        },
        mounted() {
            axios.post('api/main/purchase/pomain/show', qs.stringify({
                type: 3, payType: this.form.payType
            }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                let res = resp.data;
                // console.log(res);
                this.inlist = res.list
                this.totalpage = res.total
            })
        }
    }
</script>