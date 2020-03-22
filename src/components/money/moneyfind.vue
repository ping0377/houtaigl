<template>
    <div>
        <h1>收支查询</h1>
        <el-form :model="moneylist">
            <el-form-item>
                <el-row>
                    <el-col :span='12'>
                        <el-date-picker v-model="moneylist.startDate" 
                        type="datetime"  placeholder="开始时间">
                        </el-date-picker>
                        <el-date-picker v-model="moneylist.endDate" type="datetime" placeholder="结束时间">
                        </el-date-picker>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="">
                            <el-select v-model="moneylist.type" placeholder="收支类型">
                                <el-option label="收入" value="收入"></el-option>
                                <el-option label="支出" value="支出"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row>
                    <el-col :span='7'>
                        <el-form-item label="">
                            <el-select v-model="moneylist.payType" placeholder="付款方式">
                                <el-option label="货到付款" value="1"></el-option>
                                <el-option label="款到发货" value="2"></el-option>
                                <el-option label="预付款到发货" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="">
                            <el-input placeholder="相关单据号" style="width:'120px'" v-model="moneylist.no"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-button type="primary" @click="see">查询</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <el-table :data="outmoney">
            <el-table-column label="付款日期" prop="payTime"></el-table-column>
            <el-table-column label="相关单据号" prop="ordercode"></el-table-column>
            <el-table-column label="付款(收款)金额" prop="payPrice"></el-table-column>
            <el-table-column label="经手人" prop="account"></el-table-column>
            <el-table-column label="单据付款方式" prop="payType">
                <template slot-scope="scope">
                    <span v-show="scope.row.payType==1">货到付款</span>
                    <span v-show="scope.row.payType==2">款到发货</span>
                    <span v-show="scope.row.payType==3">预付款发货</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @current-change="handleCurrentChange" :page-size="10"
                layout="total,sizes, prev, pager, next,jumper" :total="totalpage">
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
                outmoney: [],
                moneylist: {
                    startDate: '',
                    endDate: '',
                    type: '',
                    no: '',
                    payType: '',
                    page:'1'
                },
                totalpage: 1
            }
        },
        methods: {
            see() {
                axios.post('api/main/finance/query', qs.stringify(this.moneylist), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res);
                        this.outmoney = res.list;
                        this.totalpage=res.total
                        this.$message(res.message)
                })
            },
            handleCurrentChange(val) {
                // console.log(val)
                this.moneylist.page=val;
                axios.post('api/main/finance/query', qs.stringify(
                    this.moneylist
                ), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.outmoney = res.list;
                    this.totalpage = res.total
                })
            }
        },
        mounted() {
            axios.post('api/main/finance/query', qs.stringify(), {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                // console.log(res)
                this.outmoney = res.list;
                this.totalpage = res.total
            })
        },
    }
</script>

<style>
    .block {
        margin-top: 30px;
        margin-right: 30px;
    }
</style>