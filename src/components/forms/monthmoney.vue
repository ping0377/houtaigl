<template>
    <div>
        <h3>月度收支报表</h3>
        <div class="block">
            <span class="demonstration">选择年月查询</span>
            <el-date-picker v-model="time" type="datetime" placeholder="选择年月" format="yyyy-MM" value-format="yyyy-MM"
                @change="getforms">
            </el-date-picker>
        </div>


        <el-table :data="formlist">
            <el-table-column label="收款次数" prop="receCount"></el-table-column>
            <el-table-column label="收款总金额" prop="recePrice"></el-table-column>
            <el-table-column label="付款次数" prop="payCount"></el-table-column>
            <el-table-column label="付款总金额" prop="payPrice"></el-table-column>

        </el-table>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="收款明细" name="receipt"></el-tab-pane>
            <el-tab-pane label="付款明细" name="pay"></el-tab-pane>
        </el-tabs>
        <!-- 收款 -->
        <el-table :data="buylist" v-if="this.activeName=='receipt'">
            <el-table-column property="soid" label="销售单编号" width="120"></el-table-column>
            <el-table-column property="pay_time" label="销售单日期" width="120"></el-table-column>
            <el-table-column property="createTime" label="收款日期"></el-table-column>
            <el-table-column property="pay_price" label="收款金额"></el-table-column>
            <el-table-column property="account" label="经手人"></el-table-column>
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
        <!-- 付款 -->
        <el-table :data="buylist" v-if="this.activeName=='pay'">
            <el-table-column property="poid" label="采购单编号" width="120"></el-table-column>
            <el-table-column property="createTime" label="采购日期" width="120"></el-table-column>
            <el-table-column property="pay_time" label="付款日期"></el-table-column>
            <el-table-column property="account" label="经手人"></el-table-column>
            <el-table-column property="status" label="处理状态">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==1">新增</span>
                    <span v-show="scope.row.status==2">已发货</span>
                    <span v-show="scope.row.status==3">已付款</span>
                    <span v-show="scope.row.status==4">了结</span>
                    <span v-show="scope.row.status==5">已预付</span>
                </template>
            </el-table-column>
            <el-table-column property="pay_price" label="未付款金额"></el-table-column>
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
                activeName: 'receipt',
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
                axios.post(`api/main/report/payment/detail/${this.activeName}`, qs.stringify({
                    time: this.time, page: val
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.buylist = res.list
                    this.totalpage = res.total
                })
            },
            handleClick() {  //tab改变，重新加载
                // console.log(this.activeName)
                axios.post(`api/main/report/payment/detail/${this.activeName}`, qs.stringify({
                    time: this.time
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.buylist = res.list
                    this.totalpage = res.total
                })
            },
            getforms() {  //选择年月进行查询
                this.formlist.splice(0, this.formlist.length)
                axios.get(`api/main/report/payment/main?time=${this.time}`, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    this.formlist.push(res)
                    console.log(this.formlist)
                });
                //  这是收款明细，在刚开始查询的时候，默认查询收款明细
                axios.post(`api/main/report/payment/detail/${this.activeName}`, qs.stringify({
                    time: this.time
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.buylist = res.list
                    this.totalpage = res.total
                })
            }
        },
    }
</script>

<style scoped>

</style>