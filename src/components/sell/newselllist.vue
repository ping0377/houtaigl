<template>
    <div>
        <h1>新添加销售单</h1>
        <el-button type="primary" @click="showselllist=true">添加销售单</el-button>
        <el-dialog title="新添销售单" :visible.sync="showselllist">
            <el-form :model="form">
                <el-form-item label="销售单编号" :label-width="formLabelWidth">
                    <el-input v-model="form.soId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" :label-width="formLabelWidth">
                    <el-input v-model="form.createTime"></el-input>
                </el-form-item>
                <el-form-item label="客户编号" :label-width="formLabelWidth">
                    <el-button @click="getclient" type="primary">客户选择</el-button>
                    <el-dialog width="50%" title="客户选择" :visible.sync="innerVisible" append-to-body>
                        <el-table :data="clientlist">
                            <el-table-column property="customerCode" label="客户编号" width="150"></el-table-column>
                            <el-table-column property="name" label="客户名称" width="200"></el-table-column>
                            <el-table-column property="address" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="confirm_client(scope.row)">选择</el-button>
                                    <el-button @click="innerVisible=false" type="primary">取消</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>
                    <el-form-item>
                        <el-input v-model="form.customerCode" readpnly></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="创建用户" :label-width="formLabelWidth">
                    <el-input v-model="form.account" readonly></el-input>
                </el-form-item>
                <el-form-item label="附加费用" :label-width="formLabelWidth ">
                    <el-input v-model="form.tipFee"></el-input>
                </el-form-item>
                <el-form-item label="明细" :label-width="formLabelWidth">
                    <el-button type="primary" @click="showmx">销售明细</el-button>
                    <el-dialog width="50%" title="明细" :visible.sync="showmxform" append-to-body>
                        <el-form :model="mxform">
                            <el-form-item label="销售单编号" :label-width="formLabelWidth">
                                <el-input v-model="mxform.soId  " readonly></el-input>
                            </el-form-item>
                            <el-form-item label="产品选择" :label-width="formLabelWidth">
                                <!-- <el-input v-model="mxform.productCode "></el-input> -->
                                <el-button type="primary" @click="choice_product">选择产品</el-button>
                                <el-dialog width="50%" title="选择产品" :visible.sync="pro_choice" append-to-body>
                                    <el-table :data="pro_list">
                                        <el-table-column label="产品编号" prop="productCode"></el-table-column>
                                        <el-table-column label="产品名称" prop="name"></el-table-column>
                                        <el-table-column label="数量单位" prop="unitName"></el-table-column>
                                        <el-table-column label="操作" width="180px">
                                            <template slot-scope="scope">
                                                <el-button @click="confirm_choice(scope.row)" type="danger">选择
                                                </el-button>
                                                <el-button @click="pro_choice=false" type="primary">取消</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-dialog>
                                <el-input v-model="mxform.productCode" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="销售单价" :label-width="formLabelWidth">
                                <el-input v-model="mxform.unitPrice " readonly></el-input>
                            </el-form-item>
                            <el-form-item label="产品数量" :label-width="formLabelWidth">
                                <el-input v-model="mxform.num" @input="get_unitPrice"></el-input>
                            </el-form-item>
                            <el-form-item label="数量单位" :label-width="formLabelWidth">
                                <el-input v-model="mxform.unitName"></el-input>
                            </el-form-item>
                            <el-form-item label="明细总价" :label-width="formLabelWidth">
                                <el-input v-model="mxform.itemPrice" readonly></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="showmxform = false">取 消</el-button>
                            <el-button type="primary" @click="confirm_mx">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="采购产品总价" :label-width="formLabelWidth">
                    <el-input v-model="form.productTotal" readonly></el-input>
                </el-form-item>
                <el-form-item label="销售总价" :label-width="formLabelWidth">
                    <el-input v-model="form.soTotal"></el-input>
                </el-form-item>
                <el-form-item label="付款方式" :label-width="formLabelWidth">
                    <!-- <el-input v-model="form.payType"></el-input> -->
                    <el-select v-model="form.payType" placeholder="付款方式">
                        <el-option label="货到付款" value="1"></el-option>
                        <el-option label="款到发货" value="2"></el-option>
                        <el-option label="预付款到发货" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item label="最低预付款" :label-width="formLabelWidth">
                    <el-input v-model="form.prePayFee"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showselllist = false">取 消</el-button>
                <el-button type="primary" @click="addselllist">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="newselllist" style="width: 100%" @expand-change="open">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="产品编号">
                            <span>{{ itemmx.soId }}</span>
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
            <el-table-column label="销售单编号" prop="soId"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="客户名称" prop="customerName"></el-table-column>
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
            <el-table-column label="操作" width="190">
                <template slot-scope="scope">
                    <el-button type="primary" @click="changeselllist">修改</el-button>
                    <!-- <el-dialog title="销售单修改" :visible.sync="showchangeselllist">
                        <el-form :model="form">
                            <el-form-item label="活动名称" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="活动区域" :label-width="formLabelWidth">
                                <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="showchangeselllist = false">取 消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                    </el-dialog> -->
                    <el-button type="danger" @click="deleselllist(scope.row)">删除</el-button>
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
                product_id: [],//选择产品编号的变量
                pro_list: [],
                newselllist: [],
                mingxilist: [],
                showselllist: false,//显示新添加销售单
                formLabelWidth: '120px',
                showmxform: false,
                showchangeselllist: false,
                innerVisible: false,//显示客户选择dialog
                mxform: {//添加销售单的明细  不动
                    soId: '',
                    productCode: '',
                    unitPrice: '',
                    num: '',
                    unitName: '',
                    itemPrice: 0
                },
                form: {
                    soId: '',
                    customerCode: '',
                    createTime: '',
                    account: '',
                    tipFee: 0,
                    productTotal: '',  //采购总价
                    soTotal: '',  //销售总价
                    payType: '',
                    prePayFee: 0,
                    status: '1',
                    remark: "",
                    soitems: []
                },
                clientlist: [],
                itemmx: {},
                pro_choice: false  //显示产品选择的dialog
            }
        },
        methods: {
            get_unitPrice() {//根据输入的数量，得到销售价格
                this.mxform.itemPrice = this.mxform.num * this.mxform.unitPrice
                this.form.soTotal = this.mxform.num * this.mxform.unitPrice
            },
            confirm_choice(row) {//确认选择产品信息，选择之后会关闭显示，然后把编号写的input框中
                this.mxform.productCode = row.productCode;  //编号
                // this.mxform.num=row.num  //数量
                this.mxform.unitPrice = row.price  //单价  OK
                this.mxform.unitName = row.unitName;  //数量单位
                // this.mxform.itemPrice = this.mxform.num * this.mxform.unitPrice  //总价
                this.form.soTotal = this.mxform.num * this.mxform.unitPrice //销售总价
                this.productTotal = this.soTotal + this.form.tipFee
                console.log(this.mxform.num, this.mxform.unitPrice)
                this.pro_choice = false;
            },
            choice_product() {//新添销售单的产品选择，选择产品编号
                this.pro_choice = true
                axios.get('api/main/sell/product/show', {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res);
                    this.pro_list = res.list
                })
            },
            deleselllist(row) {
                //删除销售单
                axios.get('api/main/sell/somain/delete?soId=' + row.soId, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    if (res.code == 2) {
                        this.newselllist = res.data.list;
                    }
                })
            },
            changeselllist() {//修改销售单
                this.showchangeselllist = true;

            },
            confirm_mx() {//确定销售单的明细信息  点击确定
                this.form.productTotal = this.form.soTotal + this.form.tipFee
                this.form.soitems.push(this.mxform)
                this.showmxform = false;
            },
            showmx() {
                this.showmxform = true;
                this.mxform.soId = this.form.soId
            },
            confirm_client(row) {//确定选择顾客
                this.form.customerCode = row.customerCode
                this.innerVisible = false;
            },
            getclient() {
                this.innerVisible = true;
                axios.get('api/main/sell/customer/show', {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    console.log(res)
                    this.clientlist = res.list;
                })
            },
            open(row) {//展开table，获得当前行的明细信息，然后渲染在展开的table中
                // console.log(row.soId);
                axios.get('api/main/sell/somain/queryItem?soId=' + row.soId, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res)
                    if (!res.length == 0) {
                        this.itemmx = res[0]
                    } else { this.$message(`未知原因,可能产品没明细`) }
                    // console.log(this.itemmx)
                })
            },
            addselllist() {//向数据库发送数据，添加销售单
                axios.post('api/main/sell/somain/add', JSON.stringify(this.form), {
                    headers: {
                        Authorization: cookie.get("token"),
                        'Content-Type': 'application/json'
                    }
                }).then(resp => {
                    let res = resp.data;
                    console.log(resp)
                    if (res.code == 2) {
                        alert(`添加成功`)
                        this.showselllist = false;
                        axios.get('api/main/sell/somain/show?type=' + 1, {
                            headers: { Authorization: cookie.get("token") }
                        }).then(resp => {
                            let res = resp.data;
                            // console.log(res)
                            this.newselllist = res.list
                        })
                    }
                })
            }
        },
        mounted() {
            axios.get('api/main/sell/somain/show?type=' + 1, {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                // console.log(res)
                this.newselllist = res.list
            })
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();
            let hour = now.getHours();
            let minutes = now.getMinutes();
            let secondes = now.getSeconds();
            if (month < 10) { month = `0${month}` }
            if (day < 10) { day = `0${day}` }
            if (hour < 10) { hour = `0${hour}` }
            if (minutes < 10) { minutes = `0${minutes}` }
            if (secondes < 10) { secondes = `0${secondes}` }
            this.form.soId = year + '' + month + '' + day + '' + hour + '' + minutes + '' + secondes;
            let time = year + `-` + month + `-` + day + ' ' + hour + `:` + minutes + `:` + secondes;
            this.form.createTime = time
            this.form.account = cookie.get('username')
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