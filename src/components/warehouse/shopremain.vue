<template>
  <div>
    <h1>库存盘点</h1>
    <el-table :data="inlist">
      <el-table-column label="产品编号" prop="productCode"></el-table-column>
      <el-table-column label="产品名称" prop="name"></el-table-column>
      <el-table-column label="库存数量" prop="num"></el-table-column>
      <el-table-column label="采购在途数" prop="poNum"></el-table-column>
      <el-table-column label="预销售数" prop="soNum"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="see(scope.row)" type="primary">库存变更</el-button>
          <el-dialog title="库存变更" :visible.sync="showkucun">
            <el-form :model="form" label-width="100px">
              <el-form-item label="产品编号">
                <el-input readonly v-model="form.productCode"></el-input>
              </el-form-item>
              <el-form-item label="原始数量">
                <el-input v-model="form.originNum" readonly></el-input>
              </el-form-item>
              <el-form-item label="变化数量">
                <el-input v-model="form.num"></el-input>
              </el-form-item>
              <el-form-item label="变化类型">
                <el-select v-model="form.type" required>
                  <el-option label="损耗" value="1"></el-option>
                  <el-option label="盘余" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="变化原因">
                <el-input v-model="form.description"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showkucun = false">取 消</el-button>
              <el-button type="primary" @click="isok">确 定</el-button>
            </div>
          </el-dialog>
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
  </div>
</template>

<script>
import axios from "axios";
import cookie from "js-cookie";
const qs = require("querystring");
export default {
  data() {
    return {
      inlist: [],
      activeName: "1",
      totalpage: 0,
      showkucun: false,
      kucunlist: [],
      code: "",
      totals: 0,
      form: {
        productCode: "",
        originNum: "",
        num: "",
        type: "",
        description: ""
      }
    };
  },
  methods: {
    isok() {
      this.form.num = `${-this.form.num}`;
      axios
        .post("api/main/stock/checkstock", qs.stringify(this.form), {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
        //   console.log(res);
          if (res.code == 2) {
            this.$message(`盘点成功`);
            axios
              .get("api/main/stock/query", {
                headers: { Authorization: cookie.get("token") }
              })
              .then(resp => {
                let res = resp.data;
                // console.log(res)
                this.inlist = res.list;
                this.totalpage = res.total;
              });
            this.showkucun = false;
          } else {
            this.$message(`盘点失败`);
          }
        });
    },
    see(row) {
      // console.log(row)
      this.showkucun = true;
      this.form.productCode = row.productCode;
      this.form.originNum = row.num;
    },
    handleCurrentChange(val) {
      axios
        .get("api/main/stock/query?page=" + val, {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          this.inlist = res.list;
        });
    }
  },
  mounted() {
    axios
      .get("api/main/stock/query", {
        headers: { Authorization: cookie.get("token") }
      })
      .then(resp => {
        let res = resp.data;
        this.inlist = res.list;
        this.totalpage = res.total;
      });
  }
};
</script>

<style scoped>
.block {
  margin-top: 40px;
  margin-right: 40px;
}
</style>