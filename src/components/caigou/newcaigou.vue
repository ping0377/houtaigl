<template>
  <div class="container">
    <el-button type="primary" @click="addcaigou">增加新的采购单</el-button>
    <el-table :data="caigoulist" style="width: 100%" @expand-change="open">
      <!-- 展开列详情 -->
      <el-table-column type="expand">
        <template>
          <el-form label-position="left" inline class="demo-table-expand">
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
      <el-table-column prop="poId" width="100" label="采购单编号"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100"></el-table-column>
      <el-table-column prop="venderName" label="供应商名称" width="100"></el-table-column>
      <el-table-column prop="account" label="创建用户" width="80"></el-table-column>
      <el-table-column prop="tipFee" label="附加费用" width="80"></el-table-column>
      <el-table-column prop="productTotal" label="产品总价" width="80"></el-table-column>
      <el-table-column prop="poTotal" label="采购单总价" width="100"></el-table-column>
      <el-table-column prop="payType" label="付款方式" width="80">
        <template slot-scope="scope">
          <span v-show="scope.row.payType==1">货到付款</span>
          <span v-show="scope.row.payType==2">款到发货</span>
          <span v-show="scope.row.payType==3">预付款</span>
        </template>
      </el-table-column>
      <el-table-column label="最低预付款" prop="prePayFee" width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" width="120">
          <!-- <el-button type="primary" @click="seecaigoulist">查看</el-button> -->
          <el-button type="danger" @click="delecaigoulist(scope.row)">删除</el-button>
          <el-button type="primary" @click="changecaigou(scope.row)">修改</el-button>
          <el-dialog title="修改采购单" :visible.sync="showchangelist">
            <el-form :model="newcaigoulist">
              <el-form-item label="采购单编号" :label-width="formLabelWidth">
                <el-input autocomplete="off" v-model="newcaigoulist.poId" readonly></el-input>
              </el-form-item>
              <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="newcaigoulist.createTime" readonly></el-input>
              </el-form-item>
              <!-- 选择供应商 -->
              <el-form-item label="供应商显示" :label-width="formLabelWidth">
                <el-button type="primary" @click="getgy">选择供应商</el-button>
                <el-dialog width="50%" title="供应商" :visible.sync="innerVisible" append-to-body>
                  <el-table :data="gylist">
                    <el-table-column prop="venderCode" label="编号"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" @click="isgys(scope.row)">选择</el-button>
                        <el-button type="primary" @click="innerVisible=false">取消</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-dialog>
                <el-input readonly v-model="newcaigoulist.venderCode"></el-input>
              </el-form-item>
              <el-form-item label="创建用户" :label-width="formLabelWidth">
                <el-input v-model="newcaigoulist.account"></el-input>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" label="明细修改">
                <el-button @click="showmsg" type="primary">明细修改</el-button>
                <el-dialog width="50%" title="修改明细" :visible.sync="msg" append-to-body>
                  <el-form :model="detail">
                    <el-form-item label="产品编号" :label-width="formLabelWidth">
                      <el-input readonly v-model="detail.productCode"></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" :label-width="formLabelWidth">
                      <el-input readonly v-model="detail.productName"></el-input>
                    </el-form-item>
                    <el-form-item label="数量单位" :label-width="formLabelWidth">
                      <el-input readonly v-model="detail.unitName"></el-input>
                    </el-form-item>
                    <el-form-item label="采购数量" :label-width="formLabelWidth">
                      <el-input v-model="detail.num"></el-input>
                    </el-form-item>
                    <el-form-item label="采购单价" :label-width="formLabelWidth">
                      <el-input v-model="detail.unitPrice"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="msg = false">取 消</el-button>
                    <el-button type="primary" @click="isadd">确定</el-button>
                  </div>
                </el-dialog>
              </el-form-item>
              <el-form-item label="附加费用" :label-width="formLabelWidth">
                <el-input v-model="newcaigoulist.tipFee"></el-input>
              </el-form-item>
              <el-form-item label="产品总价" :label-width="formLabelWidth">
                <el-input v-model="newcaigoulist.productTotal"></el-input>
              </el-form-item>
              <el-form-item label="采购总价" :label-width="formLabelWidth">
                <el-input v-model="newcaigoulist.poTotal"></el-input>
              </el-form-item>
              <el-form-item label="付款方式" :label-width="formLabelWidth">
                <el-select v-model="newcaigoulist.payType" required>
                  <el-option label="货到付款" value="1"></el-option>
                  <el-option label="款到发货" value="2"></el-option>
                  <el-option label="预付款到发货" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="newcaigoulist.remark"></el-input>
              </el-form-item>
              <el-form-item label="最低预付款" :label-width="formLabelWidth">
                <el-input v-model="newcaigoulist.prePayFee"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showchangelist = false" type="primary">取 消</el-button>
              <el-button type="danger" @click="ischange">确定修改</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total,sizes, prev, pager, next,jumper"
        :total="totalpage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookie from "js-cookie";
const qs = require("querystring");
export default {
  data() {
    return {
      msg: false, //点击修改明细，显示明细
      caigoulist: [],
      gylist: [],
      innerVisible: false, //在修改中显示供应商的列表
      showchangelist: false, //显示修改采购单
      totalpage: 0,
      formLabelWidth: "90px",
      dialogFormVisible: false,
      mxform: [],
      newcaigoulist: {
        //修改采购单时，一些不能更改的数据
        poId: "",
        venderCode: "",
        account: "",
        createTime: "",
        tipFee: "0", //附加费用
        productTotal: "",
        poTotal: "", //采购总价
        payType: "", //付款方式
        prePayFee: "0", //最低预付款
        status: "0",
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
      rules: {}
    };
  },
  mounted() {
    axios
      .post("/api/main/purchase/pomain/show", qs.stringify({ type: 1 }), {
        headers: { Authorization: cookie.get("token") }
      })
      .then(resp => {
        let res = resp.data;
        // console.log(res)
        this.caigoulist = res.list;
        this.totalpage = res.total;
      });
  },
  methods: {
    ischange() {
      // 修改采购单确定按钮
      axios
        .post(
          "api/main/purchase/pomain/update",
          JSON.stringify(this.newcaigoulist),
          {
            headers: {
              Authorization: cookie.get("token"),
              "Content-Type": "application/json"
            }
          }
        )
        .then(resp => {
          let res = resp.data;
          console.log(res);
          if (res.code == 2) {
            this.$message(res.message);
            axios
              .post(
                "/api/main/purchase/pomain/show",
                qs.stringify({ type: 1 }),
                { headers: { Authorization: cookie.get("token") } }
              )
              .then(resp => {
                let res = resp.data;
                // console.log(res)
                this.caigoulist = res.list;
                this.totalpage = res.total;
              });
          } else {
            this.$message("修改失败");
          }
        });
      this.showchangelist = false;
    },
    open(row) {
      //展开隐藏列
      // console.log(row)
      axios
        .get("api/main/purchase/pomain/queryItem?poId=" + row.poId, {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          // console.log(res)
          this.mxform = res;
        });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      axios
        .post(
          "/api/main/purchase/pomain/show",
          qs.stringify({ type: 1, page: val }),
          { headers: { Authorization: cookie.get("token") } }
        )
        .then(resp => {
          let res = resp.data;
          console.log(res);
          this.caigoulist = res.list;
          this.totalpage = res.total;
        });
    },
    isadd() {
      //确定明细信息
      this.newcaigoulist.poitems.push(this.detail);
      this.msg = false;
      console.log(this.newcaigoulist)
    },
    showmsg() {
      //点击按钮修改明细事件  显示明细信息
      this.msg = true;
      // 向后端发请求
      let poid = this.newcaigoulist.poId;
      axios
        .get("api/main/purchase/pomain/queryItem?poId=" + poid, {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          if (resp.status == 200) {
            this.detail = res[0];
          } else {
            alert(`该信息没有明细`);
          }
        });
    },
    isgys(row) {
      //在修改时，确定供应商的选择
      console.log(row);
      this.newcaigoulist.venderCode = row.venderCode;
      this.innerVisible = false;
    },
    getgy() {
      //在修改中点击 获得供应商信息  显示供应商
      this.innerVisible = true;
      axios
        .get("api/main/purchase/vender/show", {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          this.gylist = res.list;
        });
    },
    changecaigou(row) {
      //修改采购单信息，点击修改按钮
      this.showchangelist = true;
      // console.log("(row",row)
      row.poitems = [];
      this.newcaigoulist = row;
      let poid = this.newcaigoulist.poId;
      // 获取这行数据的明细
      axios
        .get("api/main/purchase/pomain/queryItem?poId=" + poid, {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          if (resp.status == 200) {
            this.detail = res[0];
            this.newcaigoulist.poitems.push(this.detail);
          } else {
            alert(`该信息没有明细`);
          }
        });
    },
    onSubmit() {},
    delecaigoulist(row) {
      if (confirm("是否删除该信息")) {
        axios
          .get("/api/main/purchase/pomain/delete?poId=" + row.poId, {
            headers: { Authorization: cookie.get("token") }
          })
          .then(resp => {
            let res = resp.data;
            // console.log(res)
            if (res.code == 2) {
              this.$message("删除成功");
              this.caigoulist = res.data.list;
            } else {
              this.$message("删除失败");
            }
          });
      }
    },
    addcaigou() {
      //添加新的采购单
      this.$router.push("/addcaigou");
    },
    seecaigoulist() {}
  }
};
</script>

<style scoped>
.container {
  width: 1120px;
}

.el-table__body-wrapper {
  width: 110%;
}
</style>