<template>
    <div>
        <h1>库存查询</h1>
        <el-table :data="inlist">
            <el-table-column label="产品编号" prop="productCode"></el-table-column>
            <el-table-column label="产品名称" prop="name"></el-table-column>
            <el-table-column label="库存数量" prop="num"></el-table-column>
            <el-table-column label="采购在途数" prop="poNum"></el-table-column>
            <el-table-column label="预销售数" prop="soNum"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="see(scope.row)" type="primary">库存变更记录</el-button>
                    <el-dialog title="库存变更" :visible.sync="showkucun">
                        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="入库" name="1"></el-tab-pane>
                            <el-tab-pane label="出库" name="2"></el-tab-pane>
                        </el-tabs>
                        <el-table :data="kucunlist" v-if="showif">
                            <el-table-column label="入库时间" width="150" property="stockTime"></el-table-column>
                            <el-table-column label="采购单号" width="200" property="orderCode"></el-table-column>
                            <el-table-column label="入库经手人" property="createUser"></el-table-column>
                            <el-table-column label="入库数量" property="stockNum"></el-table-column>
                            <el-table-column label="入库类型" property="stockType">
                                 <template slot-scope="scope">
                                    <span v-show="scope.row.stockType==1">采购入库</span>
                                    <span v-show="scope.row.stockType==2">销售出库</span>
                                    <span v-show="scope.row.stockType==3">盘点入库</span>
                                    <span v-show="scope.row.stockType==4">盘点出库</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-table :data="kucunlist" v-if="!showif">
                                <el-table-column label="出库时间" width="150" property="stockTime"></el-table-column>
                                <el-table-column label="销售单号" width="200" property="orderCode"></el-table-column>
                                <el-table-column label="出库经手人" property="createUser"></el-table-column>
                                <el-table-column label="出库数量" property="stockNum"></el-table-column>
                                <el-table-column label="出库类型" property="stockType">
                                     <template slot-scope="scope">
                                        <span v-show="scope.row.stockType==1">采购入库</span>
                                        <span v-show="scope.row.stockType==2">销售出库</span>
                                        <span v-show="scope.row.stockType==3">盘点入库</span>
                                        <span v-show="scope.row.stockType==4">盘点出库</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        <div class="block">
                            <el-pagination @current-change="hand" layout="total, sizes, prev, pager, next, jumper"
                                :total="totals">
                            </el-pagination>
                        </div>
                    </el-dialog>
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
                inlist: [],
                showif:true,
                activeName: "1",
                totalpage: 0,
                showkucun: false,
                kucunlist: [],
                code: "",
                totals: 0
            }
        },
        methods: {
            see(row) {
                this.showkucun = true;
                this.code = row.productCode
                axios.post('api/main/stock/alterRecord', qs.stringify({
                    productCode: row.productCode,
                    stockType: this.activeName
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    this.kucunlist = res.data.list;
                //    console.log(res)
                    this.totals = res.data.total
                })
            },
            hand(val) {
                axios.post('api/main/stock/alterRecord', qs.stringify({
                    productCode: this.code,
                    stockType: this.activeName,
                    page: val
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    this.kucunlist = res.data.list;
                     this.totals = res.data.total
                })
            },
            handleClick(tab, event) {
                // console.log(tab.paneName, event)
                this.showif=!this.showif
                axios.post('api/main/stock/alterRecord', qs.stringify({
                    productCode: this.code,
                    stockType: tab.paneName
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.kucunlist = res.data.list
                     this.totals = res.data.total
                })
            },
            handleCurrentChange(val) {
                axios.get('api/main/stock/query?page=' + val, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.inlist = res.list;
                })
            }
        },
        mounted() {
            axios.get('api/main/stock/query', {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                // console.log(res)
                this.inlist = res.list;
                this.totalpage = res.total
            })
        },
    }
</script>

<style scoped>
    .block {
        margin-top: 40px;
        margin-right: 40px;
    }
</style>