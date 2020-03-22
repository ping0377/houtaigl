<template class="container">
    <div>
        <h2>销售单查询</h2>
        <el-row :gutter="8" style="margin:0">
            <el-col :span="8">
                <el-input placeholder="销售单编号" v-model="search.soId" @input="input_id"></el-input>
            </el-col>
            <el-col :span="8">
                <el-row>
                    <el-col :span="12">
                        <div class="block">
                            <el-date-picker @change="start" v-model="search.startDate" type="datetime"
                                placeholder="开始时间" value-format="yyyy-MM-dd HH-mm-ss">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <!-- <el-col :span="4">
                        <el-date-picker>--</el-date-picker>
                    </el-col> -->
                    <el-col :span="12">
                        <div class="block">
                            <el-date-picker @change="start" value-format="yyyy-MM-dd HH-mm-ss" v-model="search.endDate" type="datetime" placeholder="结束时间">
                            </el-date-picker>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row>
                    <el-col :span="12">
                        <el-button @click="getclient_id" type="primary">选择客户编号</el-button>
                        <el-dialog title="选择客户" :visible.sync="dialogTableVisible">
                            <el-table :data="clientlist">
                                <el-table-column property="customerCode" label="编号" width="150"></el-table-column>
                                <el-table-column property="name" label="名称" width="200"></el-table-column>
                                <el-table-column  label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="danger" @click="choice_client(scope.row)">选择</el-button>
                                        <el-button @click="dialogTableVisible=false"type="primary">取消</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-dialog>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="客户编号" v-model="search.customerCode"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="4">
                <el-select placeholder="付款方式" v-model="search.payType" @change="start">
                    <el-option label="货到付款" value="1"></el-option>
                    <el-option label="款到发货" value="2"></el-option>
                    <el-option label="预付款到发货" value="3"></el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-select placeholder="处理状态" v-model="search.status" @change="start">
                    <el-option label="新增" value="1"></el-option>
                    <el-option label="已发货" value="2"></el-option>
                    <el-option label="已付款" value="3"></el-option>
                    <el-option label="已了结" value="4"></el-option>
                </el-select>
            </el-col>
        </el-row>
         <el-table :data="selllist">
            <!-- 展开table的一行
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
                </el-table-column> -->

            <el-table-column label="销售单编号" prop="soId"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="供应商名称" prop="customerName"></el-table-column>
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
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
                :total="totalpage">
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
                selllist: [],  //全部的销售单，
                dialogTableVisible:false,
                search: {   //根据输入条件查找信息
                    soId: "",
                    startDate: '',
                    endDate: '',
                    payType: '',
                    status: '',
                    customerCode:''
                },
                totalpage: 1,
                itemmx: {},
                clientlist:[]
            }
        },
        mounted() {
            axios.post('api/main/sell/somain/query', qs.stringify(), {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                // console.log(res)
                this.selllist = res.list
                this.totalpage = res.total
            })
        },
        methods: {
            choice_client(row){
                // 确认选择客户编号
                // console.log(row)
                this.search.customerCode=row.customerCode;
                this.dialogTableVisible=false;
                axios.post('api/main/sell/somain/query', qs.stringify(this.search), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.selllist = res.list
                    this.totalpage = res.total
                })
            },
            getclient_id(){  //  点击事件，获得客户信息， 渲染编号和名称
                this.dialogTableVisible=true;
                axios.get('api/main/sell/customer/show',{
                    headers: { Authorization: cookie.get("token") }
                }).then(resp=>{
                    let res=resp.data;
                    // console.log(res)
                    this.clientlist=res.list
                })
            },
            start() {//填写开始时间
                // console.log(this.search.startDate, this.search.endDate)
                axios.post('api/main/sell/somain/query', qs.stringify(this.search), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.selllist = res.list
                    this.totalpage = res.total
                })
            },
            input_id() {//搜索销售单编号  填写销售单编号在输入的时候就开始搜索
                axios.post('api/main/sell/somain/query', qs.stringify(this.search), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.selllist = res.list
                    this.totalpage = res.total
                })
            },
            // open(row){  //展开隐藏的table  明细
            //     // console.log(row.soId);
            //     axios.get('api/main/sell/somain/queryItem?soId='+row.soId,{
            //         headers: { Authorization: cookie.get("token") } 
            //     }).then(resp=>{
            //         let res=resp.data;
            //         console.log(res)
            //         this.itemmx=res[0]
            //     })
            // },
            handleCurrentChange(val) {
                axios.post('api/main/sell/somain/query?page=' + val, qs.stringify(), {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    this.selllist = res.list
                })
            }
        },
    }
</script>

<style scoped>
   
</style>