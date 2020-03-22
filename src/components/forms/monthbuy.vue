<template>
    <div>
        <h1>月度采购报表</h1>
        <div class="block">
            <span class="demonstration">选择年月查询</span>
            <el-date-picker v-model="time" type="datetime" placeholder="选择年月" format="yyyy-MM" value-format="yyyy-MM"
                @change="getforms">
            </el-date-picker>
        </div>
        <el-table :data="formlist">
            <el-table-column label="采购单总数" prop="totalnum"></el-table-column>
            <el-table-column label="已了结数" prop="endtotalnum"></el-table-column>
            <el-table-column label="采购单总金额" prop="pototal"></el-table-column>
            <el-table-column label="已付款金额" prop="totalpay"></el-table-column>
        </el-table>
        <el-table :data="buylist">
            <el-table-column property="poId" label="采购单编号" width="120"></el-table-column>
            <el-table-column property="venderName" label="供应商名称" width="120"></el-table-column>
            <el-table-column property="createTime" label="创建日期"></el-table-column>
            <el-table-column property="account" label="创建用户"></el-table-column>
            <el-table-column property="productTotal" label="采购单总价"></el-table-column>
            <el-table-column property="prePayFee" label="未付款金额"></el-table-column>
            <el-table-column property="payType" label="付款方式">
                <template slot-scope="scope">
                    <span v-show="scope.row.payType==1">货到付款</span>
                    <span v-show="scope.row.payType==2">款到发货</span>
                    <span v-show="scope.row.payType==3">预付款</span>
                </template>
            </el-table-column>
            <el-table-column property="tipFee" label="最低预付款"></el-table-column>
            <el-table-column property="status" label="采购单状态">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==1">新增</span>
                    <span v-show="scope.row.status==2">已收货</span>
                    <span v-show="scope.row.status==3">已付款</span>
                    <span v-show="scope.row.status==4">已了结</span>
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
                time: '',
                showtablemsg: false,//显示详情
                formlist: [],
                totalnum: '',  //采购单总数
                endtotalnum: '',  //已了结数
                pototal: '',  //采购单总金额
                totalpay: '', //已付款金额
                buylist: [],
                totalpage: 0
            }
        },
        mounted() {

        },
        methods: {
            handleCurrentChange(val) {
                this.formlist.splice(0, this.formlist.length)
                axios.get(`api/main/report/pomain/main?time=${this.time}&page=${val}`, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    this.formlist.push(res);
                    this.buylist = res.details.list
                    // console.log(res)
                    // console.log(res.details.list)
                    this.totalpage = res.details.total
                })
            },
            getforms() {  //选择年月进行查询
                // console.log(this.time)
                // console.log(`这是选择时间函数`)
                this.formlist.splice(0, this.formlist.length)
                axios.get(`api/main/report/pomain/main?time=${this.time}`, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    this.formlist.push(res);
                    this.buylist = res.details.list
                    // console.log(res)
                    // console.log(res.details.list)
                    this.totalpage = res.details.total
                })
            }
        },
    }
</script>

<style scoped>

</style>