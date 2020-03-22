<template>
    <div>
        <h1>销售单了结</h1>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货到付款" name="1"></el-tab-pane>
            <el-tab-pane label="款到发货" name="2"></el-tab-pane>
            <el-tab-pane label="预付款到发货" name="3"></el-tab-pane>
        </el-tabs>
        <el-table :data="selllist" @expand-change="open" style="width: 100%">
            <!-- 展开table的一行 -->
            <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="产品编号">
                                <span>{{ itemmx.productCode }}</span>
                            </el-form-item>
                            <el-form-item label="产品名称">
                                <span>{{ itemmx.productName }}</span>
                            </el-form-item>
                            <el-form-item label="产品数量">
                                <span>{{ itemmx.num }}</span>
                            </el-form-item>
                            <el-form-item label="数量单位">
                                <span>{{ itemmx.unitName  }}</span>
                            </el-form-item>
                            <el-form-item label="销售单价">
                                <span>{{ itemmx.unitPrice  }}</span>
                            </el-form-item>
                            <el-form-item label="销售明细总价">
                                <span>{{ itemmx.itemPrice  }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
            <!-- 正常；列表 -->
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
            <el-table-column label="最低预付款" prop="prePayFee">
                 
            </el-table-column>
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
                    <el-button type="danger" @click="end_selllist(scope.row)">了结</el-button>
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
                activeName: "2",
                selllist: [],
                itemmx:{}
            }
        },
        mounted() {
            axios.post('api/main/sell/somain/show', qs.stringify({
                type: 2, payType: this.activeName, page: 1
            }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                let res = resp.data;
                console.log(res)
                this.selllist = res.list
            })
        },
        methods: {
            end_selllist(row){
                // 销售单了结操作，点击了结
                axios.post('api/main/sell/somain/end',qs.stringify({
                    soId:row.soId,type:2,page:1
                }),{ headers: { Authorization: cookie.get("token") } }).then(resp=>{
                    let res=resp.data;
                    // console.log(res)
                    this.$message(res.message)
                    this.selllist=res.data.list;
                })
            },
            open(row){
                // console.log(row.soId);
                axios.get('api/main/sell/somain/queryItem?soId='+row.soId,{
                    headers: { Authorization: cookie.get("token") } 
                }).then(resp=>{
                    let res=resp.data;
                    // console.log(res)
                    this.itemmx=res[0]
                })
            },
            handleClick() {
                axios.post('api/main/sell/somain/show', qs.stringify({
                type: 2, payType: this.activeName, page: 1
            }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                let res = resp.data;
                console.log(res)
                this.selllist = res.list
            })
            }
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