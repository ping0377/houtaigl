<template>
        <div>
            <h1>月度入库报表</h1>
            <div class="block">
                <span class="demonstration">选择年月查询</span>
                <el-date-picker v-model="time" type="datetime" placeholder="选择年月" format="yyyy-MM" value-format="yyyy-MM"
                    @change="getforms">
                </el-date-picker>
            </div>
            <el-table :data="formlist">
                <el-table-column label="入库单据数" prop="total"></el-table-column>
                <el-table-column label="产品总数量" prop="totalNum"></el-table-column>
                <el-table-column label="入库产品总金额" prop="productTotal"></el-table-column>
               
            </el-table>
            <el-table :data="buylist">
                <el-table-column property="poId" label="采购单编号" width="120"></el-table-column>
                <el-table-column property="stockTime" label="入库日期" width="120"></el-table-column>
                <el-table-column property="productCode" label="产品编号"></el-table-column>
                <el-table-column property="name" label="产品名称"></el-table-column>
                <el-table-column property="stockNum" label="产品数"></el-table-column>
                <el-table-column property="productTotal" label="产品总金额"></el-table-column>
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
                    totalpage:0
                }
            },
            mounted() {
    
            },
            methods: {
                handleCurrentChange(val){
                    this.formlist.splice(0, this.formlist.length)
                    axios.get(`api/main/report/instock/main?time=${this.time}&page=${val}`, {
                        headers: { Authorization: cookie.get("token") }
                    }).then(resp => {
                        let res = resp.data;
                        this.formlist.push(res);
                        this.buylist = res.details.list
                        this.totalpage=res.details.total;
                    })
                },
                getforms() {  //选择年月进行查询
                    this.formlist.splice(0, this.formlist.length)
                    axios.get(`api/main/report/instock/main?time=${this.time}`, {
                        headers: { Authorization: cookie.get("token") }
                    }).then(resp => {
                        let res = resp.data;
                        this.formlist.push(res);
                        this.buylist = res.details.list
                        this.totalpage=res.details.total;
                        console.log(res)
                    })
                }
            },
        }
    </script>
    
    <style scoped>
    
    </style>