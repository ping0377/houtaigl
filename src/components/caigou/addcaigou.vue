<template>
  <div class="container">
    <h3>添加新的采购单</h3>
    <el-form :model="pomain " :rules="rules" status-icon ref="form" label-width="100px">
      <el-form-item label="采购单编号" prop="account">
        <el-input v-model="pomain.poId" readonly></el-input>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-input readonly v-model="pomain .createTime"></el-input>
      </el-form-item>
      <el-form-item label="供应商编号" prop="name" type="primary">
        <el-button type="primary" @click="choice_gy">选择供应商</el-button>
        <el-dialog title="选择供应商" :visible.sync="dialogTableVisible">
          <!-- <el-form-item label="筛选供应商:">
                        <el-input v-model="inputmsg"></el-input>
          </el-form-item>-->
          <el-table :data="gylist">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column property="venderCode" label="供应商编号" width="200"></el-table-column>
            <el-table-column property="name" label="供应商名称" width="200"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button type="danger" @click="choice(scope.row)" aria-label="Close">选择</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            :total="totalpage"
          ></el-pagination>
        </el-dialog>
        <el-form-item>
          <el-input v-model="pomain.venderCode" readonly v-show="!isshow_gy"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="创建用户" prop="passWord">
        <el-input v-model="pomain .account" readonly></el-input>
      </el-form-item>

      <el-form-item label="付款方式" prop="passWord">
        <!-- <el-input placeholder="密码" v-model="caigoulist.payType"></el-input> -->
        <el-select v-model="pomain .payType" required>
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="passWord">
        <el-input placeholder="备注" v-model="pomain .remark"></el-input>
      </el-form-item>
      <el-form-item label="最低预付款" prop="passWord">
        <el-input placeholder="密码" v-model="pomain .prePayFee"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">添加产品明细</el-button>
        <el-dialog title="产品明细" :visible.sync="dialogFormVisible">
          <el-form :model="detail ">
            <el-form-item label="采购单编号" :label-width="formLabelWidth">
              <el-input v-model="detail .poId " readonly></el-input>
            </el-form-item>
            <el-form-item label="产品编号" :label-width="formLabelWidth">
              <!-- <el-input v-model="detail.productCode "></el-input> -->
              <el-button type="primary" @click="proid">选择产品编号</el-button>
              <el-dialog width="56%" title="产品编号" :visible.sync="innerVisible" append-to-body>
                <!-- 产品编号 -->
                <el-table :data="prolist" style="width: 100%">
                  <el-table-column prop="productCode" label="产品编号" width="100" v-model="productId"></el-table-column>
                  <el-table-column prop="name" label="产品名称" width="120"></el-table-column>
                  <el-table-column prop="unitName" label="数量单位" width="80"></el-table-column>
                  <el-table-column prop="num" label="产品数量" width="80"></el-table-column>
                  <el-table-column prop="price" label="采购单价" width="80"></el-table-column>
                  <el-table-column label="操作" width="190">
                    <template slot-scope="scope" width="120">
                      <el-button type="danger" @click="choice_proid(scope.row)">选择</el-button>
                     
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalpage"
                  ></el-pagination>
                </div>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="ishow = false">取 消</el-button>
                  <el-button type="primary">确 定</el-button>
                </div>
              </el-dialog>
              <el-form-item label-width="80">
                <!-- 显示出来的产品编号 -->
                <el-input readonly v-model="proids" v-show="!isshow_proid"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="产品单价" :label-width="formLabelWidth">
              <el-input v-model="detail.unitPrice" @input="get_mxprice"></el-input>
            </el-form-item>
            <el-form-item label="产品数量" :label-width="formLabelWidth">
              <el-input v-model="detail.num" @input="get_mxprice"></el-input>
            </el-form-item>
            <el-form-item label="数量单位" :label-width="formLabelWidth">
              <el-input v-model="detail.unitName" readonly></el-input>
            </el-form-item>
            <el-form-item label="明细总价" :label-width="formLabelWidth">
              <el-input v-model="detail.itemPrice" readonly>111</el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="detai">确定</el-button>
          </div>
        </el-dialog>
      </el-form-item>

      <el-form-item label="附加费用" prop="passWord">
        <el-input placeholder="密码" v-model="pomain .tipFee" @input="get_totalprice"></el-input>
      </el-form-item>
      <el-form-item label="产品总价">
        <el-input placeholder="总价" v-model="pomain .productTotal" readonly></el-input>
      </el-form-item>
      <el-form-item label="采购单总价" prop="passWord">
        <el-input placeholder="总价" v-model="pomain .poTotal" readonly></el-input>
      </el-form-item>

      <el-button type="primary" @click="addcaigoulist">确认保存</el-button>
      <el-button type="danger" @click="noaddcaigou">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import cookie from "js-cookie";
const qs = require("querystring");
export default {
  data() {
    return {
      totalpage: 1,
      productId: "",
      proids: "",
      isshow: false,
      isshow_gy: true,
      formLabelWidth: "120px",
      innerVisible: false,
      isshow_proid: true,
      prolist: [],
      pomain: {
        poId: "",
        venderCode: "",
        account: "",
        createTime: "",
        tipFee: "0", //附加费用
        productTotal: "",
        poTotal: "", //采购单总价
        payType: "", //付款方式
        prePayFee: "0", //最低预付款
        status: "1",
        remark: "",
        poitems: []
      },
      detail: {
        poId: "",
        productCode: "", //产品编号
        unitPrice: "", //产品单价
        num: "",
        unitName: "", //数量单位
        itemPrice: "" //明细总价
      },
      rules: {},
      isshow: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      gylist: [],
      inputmsg: "",
      totalpage: "0"
    };
  },
  methods: {
    get_totalprice() {
      this.pomain.poTotal = this.pomain.productTotal + this.pomain.tipFee;
    },
    get_mxprice() {
      this.detail.itemPrice = this.detail.unitPrice * this.detail.num;
    },
    choice_gy() {
      //选择供应商
      axios
        .get("/api/main/purchase/vender/show?page=1", {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          this.gylist = res.list; //  供应商信息在创建el的时候就获得
          this.totalpage = res.total;
        });
      this.dialogTableVisible = true;
    },
    choice_proid(row) {
      //选择产品编号  确定产品编号和数量单位
      // console.log(row, row.productCode, row.unitPrice)
      this.detail.productCode = row.productCode;
      this.proids = row.productCode;
      this.detail.unitName = row.unitName;
      this.detail.unitPrice = row.price;
      this.isshow_proid = false;
      this.innerVisible = false;
    },
    proid() {
      //获得产品编号  数据 以及产品的数据
      this.innerVisible = true;
      axios
        .get("/api/main/sell/product/show", {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          this.prolist = res.list;
          this.totalpage = resp.data.total;
        });
    },
    detai() {
      this.pomain.poitems.push(this.detail);
      this.pomain.productTotal = this.detail.unitPrice * this.detail.num;
      this.detail.itemPrice = this.detail.unitPrice * this.detail.num;
      this.pomain.poTotal = this.pomain.productTotal + this.pomain.tipFee;
      this.dialogFormVisible = false;
    },
    addcaigoulist() {
      //确认提交新的采购单
      axios
        .post("api/main/purchase/pomain/add", JSON.stringify(this.pomain), {
          headers: {
            Authorization: cookie.get("token"),
            "Content-Type": "application/json"
          }
        })
        .then(resp => {
          let res = resp.data;
          // console.log(res)
          if (res.code == 2) {
            alert(`添加成功`);
            this.dialogFormVisible = false;
            this.$router.push("/newcaigou");
          } else {
            this.$message(res.message);
          }
        });
    },
    noaddcaigou() {
      this.$router.push("/newcaigou");
    },
    choice(row) {
      this.pomain.venderCode = row.venderCode;
      this.dialogTableVisible = false;
      this.isshow_gy = !this.isshow_gy;
    },
    nochoice() {
      this.$router.push("/addcaigou");
    },
    handleCurrentChange(val) {
      axios
        .get("/api/main/sell/product/show?page="+val, {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res)
          this.prolist = res.list;
          this.totalpage = resp.data.total;
        });
    }
  },
  created() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let secondes = now.getSeconds();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (secondes < 10) {
      secondes = `0${secondes}`;
    }
    this.pomain.poId =
      year + "" + month + "" + day + "" + hour + "" + minutes + "" + secondes;
    let time =
      year +
      `-` +
      month +
      `-` +
      day +
      " " +
      hour +
      `:` +
      minutes +
      `:` +
      secondes;
    this.pomain.createTime = time.toString();
    this.detail.poId = this.pomain.poId;
    axios
      .get("/api/main/purchase/vender/show?page=1", {
        headers: { Authorization: cookie.get("token") }
      })
      .then(resp => {
        let res = resp.data;
        this.gylist = res.list; //  供应商信息在创建el的时候就获得
        this.totalpage = res.total;
      });
    this.pomain.account = cookie.get("username");
  }
};
</script>

<style scoped>
.container {
  margin-top: 25px;
  width: 600px;
  height: 500px;
}

.el-table--fit {
  margin-left: 20px;
}
</style>