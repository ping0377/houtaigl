<template>
    <div>
        <h1>收款登记</h1>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="货到付款" name="1"></el-tab-pane>
            <el-tab-pane label="款到发货" name="2"></el-tab-pane>
            <!-- <el-tab-pane label="预付款到发货" name="3"></el-tab-pane> -->
            <!-- <el-tab-pane label="预付款到发货" name="4"></el-tab-pane> -->
        </el-tabs>
        <el-table :data="moneylist" style="width: 100%" @expand-change="open">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="所属销售单明细信息">
                            <el-table :data="mxform">
                                <el-table-column label="销售单编号" prop="soId"></el-table-column>
                                <el-table-column label="产品编号" prop="productCode"></el-table-column>
                                <el-table-column label="数量单位" prop="unitName"></el-table-column>
                                <el-table-column label="产品数量" prop="num"></el-table-column>
                                <el-table-column label="销售单价" prop="unitPrice"></el-table-column>
                                <el-table-column label="明细总价" prop="itemPrice"></el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="销售单编号" prop="soId"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="客户" prop="customerName"></el-table-column>
            <el-table-column label="创建用户" prop="account"></el-table-column>
            <el-table-column label="附加费用" prop="tipFee"></el-table-column>
            <el-table-column label="产品总价" prop="productTotal"></el-table-column>
            <el-table-column label="销售单总价" prop="soTotal"></el-table-column>
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
                    <span v-show="scope.row.status==2">已发货</span>
                    <span v-show="scope.row.status==3">已付款</span>
                    <span v-show="scope.row.status==4">已了结</span>
                    <span v-show="scope.row.status==5">已预付</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="inmoney(scope.row)">收款</el-button>
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
                mingxilist:[],
                mxform:[]
            }
        },
        methods: {
            open(row){
                // console.log('...',row)
                axios.get('api//main/sell/somain/queryItem?soId='+row.soId,{
                     headers: { Authorization: cookie.get("token") } 
                }).then(resp=>{
                    let res=resp.data;
                    // console.log(res)
                    this.mxform=res
                })
            },
            inmoney(row) {
                console.log(row)
                if(confirm('是否确定收款')){
                    axios.post('api/main/finance/receipt', qs.stringify({
                        soId: row.soId,
                        type: 1
                    }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                        let res = resp.data;
                        console.log(res)
                        if(res.code==2){
                            this.$message(res.message)
                        }
                    })
                }
            },
            handleClick(tab, event) {
                // console.log(tab)
                axios.post('api/main/sell/somain/show', qs.stringify({
                    type: 4, payType: tab.paneName, page: this.page
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.moneylist = res.list;
                })
            }
        },
        mounted() {
            axios.post('api/main/sell/somain/show', qs.stringify({
                type: 4, payType: this.activeName, page: this.page
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