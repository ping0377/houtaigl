<template>
    <div>
        <el-button type="primary" @click="addgy">添加供应商</el-button>
        <el-table :data="gylist" style="width: 100%" border>
            <el-table-column prop="venderCode" width="100" label="供应商编号">
            </el-table-column>
            <el-table-column prop="name" width="120" label="供应商名称">
            </el-table-column>
            <el-table-column prop="contactor" label="联系人" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="120">
            </el-table-column>
            <el-table-column prop="postCode" label="邮政编码" width="120">
            </el-table-column>
            <el-table-column prop="createDate" label="注册日期" width="120">
            </el-table-column>
            <el-table-column label="电话" prop="tel" width="120">
            </el-table-column>
            <el-table-column label="传真" prop="fax" width="120">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="danger" @click="delegy(scope.row)" >删除</el-button>
                    <el-button type="primary" @click="changegy(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template>
            <div class="block">
                <el-pagination :current-page="1" :page-sizes="[5, 10, 15, 20]" :page-size="10" background
                    layout=" sizes, prev, pager, next, jumper" :total="totalpage" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from "axios"
    import cookie from 'js-cookie'
    export default {
        data() {
            return {
                gylist: [],
                totalpage: 1,
                pagesize: '',//每页显示的数量
            }
        },
        mounted() {
            axios.get('api/main/purchase/vender/show?page=1', {
                headers: { Authorization: cookie.get("token") }
            }).then(resp => {
                let res = resp.data;
                this.gylist = res.list;
                this.totalpage = resp.data.total;
            })
        },
        methods: {
            addgy() {
                this.$router.push('/addgy')
            },
            handleSizeChange(val) {
                // console.log(`每页显示${val}条`)
            },
            handleCurrentChange(val) {
                // console.log(`当前页${val}`);
                axios.get('/api/main/purchase/vender/show?page=' + val, {
                    headers: { Authorization: cookie.get("token") }
                }).then(resp => {
                    let res = resp.data;
                    // console.log(res.list)
                    this.gylist = res.list;
                })
            },
            delegy(row){
                if(confirm('确定删除')){
                    // console.log(row.venderCode)
                    let code=row.venderCode;
                    axios.get('api/main/purchase/vender/delete?venderCode='+code,{
                        headers: { Authorization: cookie.get("token") }
                    }).then(resp=>{
                        let res=resp.data;
                        // console.log(res);
                        if(res.code==2){
                            this.gylist=res.data;
                            this.totalpage--;
                            this.$message('删除成功')
                        }else{this.$message('不能删除')}
                    })
                }
            },
            changegy(row){
                this.$router.push({path:'/changegy',query:row})
            }
        }
    }
</script>

<style scoped>
    .block {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>