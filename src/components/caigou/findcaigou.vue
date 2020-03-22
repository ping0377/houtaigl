<template>
    <div>
        <h3>采购单查询</h3>
        <el-form :model="search">
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-input v-model="search.poId" value-format="yyyy-MM" placeholder="采购单编号" @input="go"></el-input>
                </el-col>
                <el-col :span="16">
                    <el-col :span="12">
                        <div class="block">
                            <el-date-picker v-model="search.startDate" value-format="yyyy-MM-dd" type="date"
                                placeholder="开始时间" @change="go">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="block">
                            <el-date-picker v-model="search.endDate" value-format="yyyy-MM-dd" type="date"
                                placeholder="截止时间" @change="go">
                            </el-date-picker>
                        </div>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-button @click="get_gysmsg">筛选供应商</el-button>
                    <el-dialog title="筛选供应商" :visible.sync="showgys">
                        <el-table :data="gridData">
                            <el-table-column property="venderCode" label="编号" width="150"></el-table-column>
                            <el-table-column property="name" label="名称" width="200"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="sure_gys(scope.row)">选择</el-button>
                                    <el-button @click="showgys=false" type="primary">取消</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>
                    <el-col :span="8">
                        <el-input v-model="search.venderCode" placeholder="供应商编号" readonly></el-input>
                    </el-col>
                </el-col>
                <el-col :span="7">
                    <el-select v-model="search.payType" placeholder="付款方式" @change="go">
                        <el-option label="货到付款" value="1"></el-option>
                        <el-option label="款到发货" value="2"></el-option>
                        <el-option label="预付款到发货" value="3"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="search.status" placeholder="处理状态" @change="go">
                        <el-option label="新增" value="1"></el-option>
                        <el-option label="已收货" value="2"></el-option>
                        <el-option label="已付款" value="3"></el-option>
                        <el-option label="已了结" value="4"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="caigoulist" style="width: 100%" @expand-change="open">
            <!-- 展开列 -->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="采购单编号">
                            <span>{{ props.row.poId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="供应商名称">
                            <span>{{ props.row.venderName }}</span>
                        </el-form-item>
                        <el-form-item label="创建用户">
                            <span>{{ props.row.account }}</span>
                        </el-form-item>
                        <el-form-item label="附加费用">
                            <span>{{ props.row.tipFee }}</span>
                        </el-form-item>
                        <el-form-item label="产品总价">
                            <span>{{ props.row.productTotal }}</span>
                        </el-form-item>
                        <el-form-item label="采购单总价">
                            <span>{{ props.row.poTotal }}</span>
                        </el-form-item>
                        <el-form-item label="付款方式">
                            <span>{{ props.row.payType }}</span>
                        </el-form-item>
                        <el-form-item label="最低预付款">
                            <span>{{ props.row.prePayFee }}</span>
                        </el-form-item>
                        <el-form-item label="处理状态">
                            <span>{{ props.row.status }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ props.row.remark }}</span>
                        </el-form-item>
                        <el-form-item label="采购单入库信息">
                            <span>入库时间:{{ props.row.stockTime }}</span>
                            <span>入库操作人:{{ props.row.stockUser }}</span>
                        </el-form-item>
                        <el-form-item label="采购单预付信息 ">
                            <span>预付时间:{{ props.row.prePayTime }}</span>
                            <span>预付操作用户:{{ props.row.prePayUser }}</span>
                        </el-form-item>
                        <el-form-item label="采购单付款信息 ">
                            <span>付款时间:{{ props.row.payTime }}</span>
                            <span>付款操作用户:{{ props.row.payUser }}</span>
                        </el-form-item>
                        <el-form-item label="所属采购单明细信息">
                            <el-table :data="mxform">
                                <el-table-column label="产品编号" prop="poId"></el-table-column>
                                <el-table-column label="产品名称" prop="productName"></el-table-column>
                                <el-table-column label="数量单位" prop="unitName"></el-table-column>
                                <el-table-column label="产品数量" prop="num"></el-table-column>
                                <el-table-column label="采购单价" prop="unitPrice"></el-table-column>
                                <el-table-column label="明细总价" prop="itemPrice"></el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            </el-table-column>
            <el-table-column prop="poId" width="100" label="采购单编号">
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="120">
            </el-table-column>
            <el-table-column prop="venderName" label="供应商名称" width="120">
            </el-table-column>
            <el-table-column prop="account" label="创建用户" width="100">
            </el-table-column>
            <el-table-column prop="tipFee" label="附加费用" width="80">
            </el-table-column>
            <el-table-column prop="productTotal" label="采购产品总价" width="80">
            </el-table-column>
            <el-table-column label="采购单总价" prop="poTotal" width="100">
            </el-table-column>
            <el-table-column label="付款方式" prop="payType" width="100">
                <template slot-scope="scope">
                    <span v-show="scope.row.payType==1">货到付款</span>
                    <span v-show="scope.row.payType==2">款到发货</span>
                    <span v-show="scope.row.payType==3">预付款</span>
                </template>
            </el-table-column>
            <el-table-column label="最低预付款" prop="prePayFee" width="100">
            </el-table-column>
            <el-table-column label="处理状态" prop="status" width="120">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==1">新增</span>
                    <span v-show="scope.row.status==4">已了结</span>
                    <span v-show="scope.row.status==2">已收货</span>
                    <span v-show="scope.row.status==3">已付款</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"  layout="total, prev, pager, next"
            :total="totalpage">
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
                showgys: false,
                gridData: [],
                caigoulist: [],
                search: {
                    poId: '',
                    endDate: '',
                    startDate: '',
                    venderCode: '',
                    payType: '',
                    status: '',
                    page:1
                },
                mxform: [],
                totalpage: 0
            }
        },
        mounted() {

        },
        methods: {
            open(row) {  //展开隐藏列
                console.log(row)
                axios.get('api/main/purchase/pomain/queryItem?poId=' + row.poId, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.mxform = res
                })
            },
            handleCurrentChange(val) {
                // 分页
                 this.search.page=val
                axios.post('/api/main/purchase/pomain/query', qs.stringify(
                    this.search
                ), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.caigoulist = res.list
                    this.totalpage = res.total;
                })
            },
            go() {  //每一项数据变化，就查询一次
                console.log(this.search)
                axios.post('/api/main/purchase/pomain/query', qs.stringify(this.search), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.caigoulist = res.list
                    this.totalpage = res.total;
                })
            },
            sure_gys(row) {   //确定供应商编号
                this.search.venderCode = row.venderCode
                this.showgys = false
                axios.post('/api/main/purchase/pomain/query', qs.stringify(this.search), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    this.caigoulist = res.list
                    console.log(res.list)
                    this.totalpage = res.total;
                })
            },
            get_gysmsg() {  //点击获得供应商信息，并渲染
                this.showgys = true;
                axios.get('api/main/purchase/vender/show?page=' + 1, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.gridData = res.list;
                    this.totalpage = res.total;

                })
            }
        },
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
        margin-left: 0px;
        margin-right: 0px;
        padding: 0px;
    }

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
        width: 45%;
    }
</style>