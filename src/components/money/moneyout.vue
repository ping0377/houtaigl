<template>
    <div>
        <h1>付款登记</h1>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="货到付款" name="1"></el-tab-pane>
            <el-tab-pane label="款到发货" name="2"></el-tab-pane>
            <el-tab-pane label="预付款到发货" name="3"></el-tab-pane>
        </el-tabs>
        <el-table :data="moneylist" style="width: 100%" @expand-change="open">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="采购单编号">
                             <el-table :data="mxform">
                                <el-table-column label="采购单编号" prop="poId"></el-table-column>
                                <el-table-column label="产品编号" prop="productName"></el-table-column>
                                <el-table-column label="数量单位" prop="unitName"></el-table-column>
                                <el-table-column label="产品数量" prop="num"></el-table-column>
                                <el-table-column label="采购单价" prop="unitPrice"></el-table-column>
                                <el-table-column label="明细总价" prop="itemPrice"></el-table-column>
                            </el-table>
                        </el-form-item>
                        
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="采购单编号" prop="poId"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="供应商名称" prop="venderName"></el-table-column>
            <el-table-column label="创建用户" prop="account"></el-table-column>
            <el-table-column label="附加费用" prop="tipFee"></el-table-column>
            <el-table-column label="产品总价" prop="productTotal"></el-table-column>
            <el-table-column label="采购单总价" prop="poTotal"></el-table-column>
            <el-table-column label="付款方式" prop="payType">
                <template slot-scope="scope">
                    <span v-show="scope.row.payType==1">货到付款</span>
                    <span v-show="scope.row.payType==2">款到发货</span>
                    <span v-show="scope.row.payType==3">预付款发货</span>
                </template>
            </el-table-column>
            <el-table-column label="最低预付款" prop="prePayFee"></el-table-column>
            <el-table-column label="处理状态" prop="status">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==1">新增</span>
                    <span v-show="scope.row.status==2">已收货</span>
                    <span v-show="scope.row.status==3">已付款</span>
                    <span v-show="scope.row.status==4">以了结</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="outmoney(scope.row)">付款</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from "axios"
    import cookie from 'js-cookie'
    const qs = require('querystring')
    export default {
        data() {
            return {
                activeName: '1',
                page: 1,
                moneylist: [],
                mxform:[]
            }
        },
        methods: {
            open(row){
                // console.log(row)
                this.mxform.length=0
                axios.get('api/main/purchase/pomain/queryItem?poId=' + row.poId, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.mxform = res
                })
            },
            outmoney(row) { //付款操作
                console.log(row)
                if(confirm('是否确定付款')){

                    axios.post('api/main/finance/pay', qs.stringify({
                        poId: row.poId,
                        type: 1
                    }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                        let res = resp.data;
                        console.log(res)
                        if (res.code == 2) {
                            axios.post('api/main/purchase/pomain/show', qs.stringify({
                                type: 4, payType: this.activeName
                            }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                                let res = resp.data;
                                // console.log(res);
                                this.$message('付款成功')
                                this.moneylist = res.list;
                            })
                        }
                    })
                }

            },
            handleClick(tab, event) {//tab  标签点击付款方式
                // console.log(tab)
                axios.post('api/main/purchase/pomain/show', qs.stringify({
                    type: 4, payType: tab.paneName, page: this.page
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.moneylist = res.list;
                })
            }
        },
        mounted() {
            axios.post('api/main/purchase/pomain/show', qs.stringify({
                type: 4, payType: this.activeName
            }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                let res = resp.data;
                // console.log(res);
                this.moneylist = res.list;
            })
        },
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>