<template>
    <div>
        <h1>采购单了结</h1>
        <el-form :model="form">
            <el-form-item>
                <el-select v-model="form.payType" placeholder="付款方式" @change="once">
                    <el-option label="货到付款" value="1"></el-option>
                    <el-option label="款到发货" value="2"></el-option>
                    <el-option label="预付款到发货" value="3"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table :data="endlist" style="width: 100%">
            <el-table-column prop="poId" label="采购单编号" width="120">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120">
            </el-table-column>
            <el-table-column prop="venderName" label="供应商名称" width="100">
            </el-table-column>
            <el-table-column prop="account" label="创建用户" width="80">
            </el-table-column>
            <el-table-column prop="tipFee" label="附加费用" width="80">
            </el-table-column>
            <el-table-column prop="productTotal" label="采购产品总价" width="80">
            </el-table-column>
            <el-table-column prop="poTotal" label="采购单总价格" width="80">
            </el-table-column>
            <el-table-column prop="payType" label="付款方式" width="80">
                <template slot-scope="scope">
                    <span v-show="scope.row.payType==1">货到付款</span>
                    <span v-show="scope.row.payType==2">款到发货</span>
                    <span v-show="scope.row.payType==3">预付款</span>
                </template>
            </el-table-column>
            <el-table-column prop="prePayFee" label="最低付余款" width="80">
            </el-table-column>
            <el-table-column prop="status" label="处理状态" width="100">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==1">新增</span>
                    <span v-show="scope.row.status==2">已收货</span>
                    <span v-show="scope.row.status==3">已付款</span>
                    <span v-show="scope.row.status==4">已了结</span>
                </template>
            </el-table-column>
            <el-table-column label="查看明细" width="120">
                <template slot-scope="scope">
                    <el-button type="primary" @click="seedetail(scope.row)">查看明细</el-button>
                    <el-dialog title="产品明细" :visible.sync="dialogTableVisible" width="60%">
                        <el-table :data="detail">
                            <el-table-column property="productCode" label="产品编号" width="120"></el-table-column>
                            <el-table-column property="productName" label="产品名称" width="120"></el-table-column>
                            <el-table-column property="unitName" label="数量单位" width="120"></el-table-column>
                            <el-table-column property="num" label="数量" width="120"></el-table-column>
                            <el-table-column property="unitPrice" label="采购单价" width="120"></el-table-column>
                            <el-table-column property="itemPrice" label="明细总价" width="120"></el-table-column>
                        </el-table>
                    </el-dialog>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="end(scope.row)" type="danger">了结</el-button>
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
                form: {
                    payType: '2',
                    type: '2'
                },
                endlist: [],
                detail: [],
                dialogTableVisible: false,
                totalpage: 0
            }
        },
        methods: {
            handleCurrentChange(val) {
                axios.post('api/main/purchase/pomain/show', qs.stringify(
                    { type: 2, payType: this.form.payType, page: val }
                ), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.endlist = res.list;
                    this.totalpage = res.total;
                })
            },
            end(row) {//点击按钮了结采购单
                axios.post('api/main/purchase/pomain/end', qs.stringify({
                    poId: row.poId,
                    type: 2,
                    page: 1
                }), { headers: { Authorization: cookie.get("token") } }).then(resp => {
                    let res = resp.data;
                    console.log(res.data.list)
                    this.$message(res.message)
                    this.endlist = res.data.list
                })
            },
            seedetail(row) {
                this.dialogTableVisible = true;
                console.log(row.poId)
                axios.get('api/main/purchase/pomain/queryItem?poId=' + row.poId, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    this.detail = res
                })
            },
            once() {//每更改一次付款方式就重新获取一次
                axios.post('api/main/purchase/pomain/show', qs.stringify(
                    { type: 2, payType: this.form.payType, page: 1 }
                ), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.endlist = res.list;
                    this.totalpage = res.total;
                })
            }
        },
        mounted() {
            axios.post('api/main/purchase/pomain/show', qs.stringify(
                { type: 2, payType: this.form.payType, page: 1 }
            ), {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                this.endlist = res.list
                this.totalpage = res.total;
            })
        },
    }
</script>