<template>
    <div>
        <h1>月度销售报表</h1>
        <div class="block">
            <span class="demonstration">选择年月查询</span>
            <el-date-picker v-model="time" type="datetime" placeholder="选择年月" format="yyyy-MM" value-format="yyyy-MM"
                @change="getforms">
            </el-date-picker>
        </div>
        <el-table :data="formlist">
            <el-table-column label="销售单数" prop="totalnum"></el-table-column>
            <el-table-column label="已了结单数" prop="endtotalnum"></el-table-column>
            <el-table-column label="销售总金额" prop="sototal"></el-table-column>
            <el-table-column label="已付款金额" prop="totalpay"></el-table-column>
        </el-table>
        <el-table :data="buylist">
            <el-table-column property="soId" label="销售单号" width="120"></el-table-column>
            <el-table-column property="customerCode" label="客户编号" width="120"></el-table-column>
            <el-table-column property="customerName" label="客户名称"></el-table-column>
            <el-table-column property="createTime" label="销售日期"></el-table-column>
            <el-table-column property="account" label="经手人"></el-table-column>
            <el-table-column property="soTotal" label="销售单总金额"></el-table-column>
            <el-table-column property="productTotal" label="未付款金额"></el-table-column>
            <el-table-column property="status" label="处理状态">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==1">新增</span>
                    <span v-show="scope.row.status==2">已发货</span>
                    <span v-show="scope.row.status==3">已付款</span>
                    <span v-show="scope.row.status==4">了结</span>
                    <span v-show="scope.row.status==5">已预付</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">

            <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="totalpage">
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
                time: '',
                showtablemsg: false,//显示详情
                formlist: [],
                totalnum: '',  //采购单总数
                endtotalnum: '',  //已了结数
                pototal: '',  //采购单总金额
                totalpay: '', //已付款金额
                buylist: [],
                totalpage: 1
            }
        },
        mounted() {

        },
        methods: {
            handleCurrentChange(val) {
                axios.get(`api/main/report/somain/main?time=${this.time}&page=${val}`, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    this.buylist = res.details.list
                    this.totalpage = res.details.total;
                })
            },
            getforms() {  //选择年月进行查询
                // console.log(this.time)
                // console.log(`这是选择时间函数`)
                this.formlist.splice(0, this.formlist.length)
                axios.get(`api/main/report/somain/main?time=${this.time}`, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    this.formlist.push(res);
                    this.buylist = res.details.list
                    console.log(res)
                    // console.log(this.formlist)
                    // console.log(res.details.list)
                    this.totalpage = res.details.total;
                })
            }
        },
    }
</script>

<style scoped>
    .block {
        margin-top: 30px;
        margin-right: 40px;
    }
</style>