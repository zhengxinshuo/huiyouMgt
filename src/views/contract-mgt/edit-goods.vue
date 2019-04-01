<template>
    <div class="goods-lib">
        <div class="wrapper">
            <!-- 表单查询 -->
            <el-form
                ref="form"
                :inline="true"
                :model="form"
                label-position="left"
                label-width="100px"
                class="form"
                size="small"
            >
                <el-form-item label="SKU编号" prop="skuId">
                    <el-input v-model="form.skuId" placeholder="请输入SKU编号"></el-input>
                </el-form-item>
                <el-form-item label="SKU名称" prop="skuName">
                    <el-input v-model="form.skuName" placeholder="请输入SKU名称"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierIdentity">
                    <el-select
                        v-model="form.supplierIdentity"
                        filterable
                        clearable
                        placeholder="全部"
                    >
                        <el-option
                            v-for="item of supplierList"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品编号" prop="goodsId">
                    <el-input v-model="form.goodsId" placeholder="请输入商品编号"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="goodsName">
                    <el-input v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品品牌" prop="brandName">
                    <el-input v-model="form.brandName" placeholder="请输入商品品牌"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="cascader">
                    <el-cascader
                        v-model="form.cascader"
                        :options="tree"
                        :props="defaultProps"
                        placeholder="请选择分类"
                        filterable
                        @active-item-change="treeChange"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="市场价区间">
                    <el-col :span="11">
                        <el-input v-model="form.minReferencePrice" type="number" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col :span="2" style="text-align:center">-</el-col>
                    <el-col :span="11">
                        <el-input v-model="form.maxReferencePrice" type="number" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="供应价区间">
                    <el-col :span="11">
                        <el-input v-model="form.minSupplierPrice" type="number" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col :span="2" style="text-align:center">-</el-col>
                    <el-col :span="11">
                        <el-input v-model="form.maxSupplierPrice" type="number" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="售价区间">
                    <el-col :span="11">
                        <el-input v-model="form.minPrice" type="number" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col :span="2" style="text-align:center">-</el-col>
                    <el-col :span="11">
                        <el-input v-model="form.maxPrice" type="number" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="12">
                    <el-button
                        type="primary"
                        size="small"
                        @click="addGoods"
                    >新增商品
                    </el-button>
                    <el-button
                        v-if="tableSelection.length"
                        type="primary"
                        size="small"
                        @click="batchRemoveShelf"
                    >批量下架
                    </el-button>
                    <el-button v-else :disabled="true" type="primary" size="small">批量下架</el-button>
                    <el-button
                        v-if="tableSelection.length"
                        type="primary"
                        size="small"
                        @click="setFixedPrice(null)"
                    >批量设置固定售价
                    </el-button>
                    <el-button v-else :disabled="true" type="primary" size="small">批量设置固定价</el-button>
                </el-col>
                <el-col v-if="false" :span="12" style="text-align: right">
                    <el-button
                        type="primary"
                        size="small"
                    >导出货架内商品
                    </el-button>
                    <el-button type="primary" size="small">导入商品</el-button>
                </el-col>
            </el-row>
            <!-- 商品库商品表格 1 -->
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
                @selection-change="onTableSelectionChange"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="goodsId" label="商品编号"></el-table-column>
                <el-table-column prop="goodsName" width="200" label="商品名称"></el-table-column>
                <el-table-column prop="brandName" label="商品品牌"></el-table-column>
                <el-table-column prop="supplierName" label="供应商"></el-table-column>
                <el-table-column prop="skuId" label="SKU编号"></el-table-column>
                <el-table-column prop="skuName" label="SKU名称"></el-table-column>
                <el-table-column
                    :formatter="row => toFixed(row.referencePrice)"
                    prop="referencePrice"
                    label="市场价（元）"></el-table-column>
                <el-table-column
                    :formatter="row => toFixed(row.supplierPrice)"
                    prop="supplierPrice"
                    label="供应价（元）"></el-table-column>
                <el-table-column :formatter="row => toFixed(row.price) " prop="price" label="售价（元）"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="setFixedPrice(scope.row)"
                        >设置固定售价
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="removeShelf(scope.row.skuId)"
                        >下架
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="pagination">
                <el-pagination
                    :current-page="page.pageNo"
                    :page-sizes="page.sizes"
                    :page-size="page.pageSize"
                    :total="page.totalCount"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="onSizeChange"
                    @current-change="onCurrentChange"
                ></el-pagination>
            </div>
            <!-- 设置固定售价 -->
            <el-dialog
                :visible.sync="dialogSetFixedPrice"
                title="设置固定售价"
                width="750px"
                @close="resetForm"
            >
                <el-table :data="fixedPriceTableData" class="table" border>
                    <el-table-column prop="goodsId" label="商品编号"></el-table-column>
                    <el-table-column prop="goodsName" width="200" label="商品名称"></el-table-column>
                    <el-table-column
                        :formatter="row => toFixed(row.referencePrice)"
                        prop="referencePrice"
                        label="市场价（元）"></el-table-column>
                    <el-table-column
                        :formatter="row => toFixed(row.supplierPrice)"
                        prop="supplierPrice"
                        label="供应价（元）"></el-table-column>
                    <el-table-column
                        :formatter="row => toFixed(row.price)"
                        prop="price"
                        label="当前售价（元）"></el-table-column>
                    <el-table-column label="固定售价（元）" width="220">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.isFixed" label="使用固定售价" size="small"></el-checkbox>
                            <el-input
                                :disabled="!scope.row.isFixed"
                                v-model.number="scope.row.fixedPrice"
                                type="number"
                                size="small"
                            ></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogSetFixedPrice=false">取消</el-button>
                    <el-button
                        :loading="setFixedPriceLoading"
                        size="small"
                        type="primary"
                        @click="setFixedPriceConfirm">提交
                    </el-button>
                </div>
            </el-dialog>
            <div class="btn-box">
                <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getShelfList,
    getAllGoodsForShelf,
    getShelfGoods,
    editShelfName,
    editSt,
    getSt,
    delShelf,
    outlineShelf
} from "../../api/shelf"
import {getSupplierList} from "../../api/goods"
import {setFixedPrice} from "../../api/fixedPrice"
import tableMixin from '@/mixin/table'
import {treeMixin} from '@/mixin'
export default {
    name: 'EditGoods',
    mixins: [tableMixin, treeMixin],
    data() {
        return {
            supplierList: [],
            setFixedPriceLoading: false,
            dialogSetFixedPrice: false,
            fixedPriceTableData: [],
            tableSelection: [],
            shelfId: '',
            tableLoading: false,
            form: {
                goodsId: "",
                cascader: [],
                goodsName: '',
                brandName: '',
                supplierIdentity: '',
                skuId: '',
                deliveryType: '',
                skuName: '',
                oneLevelId: '',
                twoLevelId: '',
                threeLevelId: '',
                minSupplierPrice: '',
                maxSupplierPrice: '',
                minReferencePrice: '',
                maxReferencePrice: '',
                minPrice: '',
                maxPrice: ''
            },
            enterpriseList: [{
                label: '卓望',
                value: '1'
            }],
            selectedOptions: []
        }
    },
    watch: {
        'fixedPriceTableData': {
            handler(val) {
                val.length && val.forEach(item => {
                    if (!item.isFixed) {
                        item.fixedPrice = ''
                    }
                })
            },
            deep: true
        },
        'form.cascader'(val) {
            const me = this
            let { form } = me
            try {
                form.oneLevelId = val[0] || ''
                form.twoLevelId = val[1] || ''
                form.threeLevelId = val[2] || ''
            } catch (e) {
                console.log(e)
            }
        }
    },
    created() {
        this.init()
        this.loadTree()
        this.getSupplier()
    },
    methods: {
        getSupplier() {
            getSupplierList().then(res => {
                this.supplierList = res.results.map(val => {
                    return {name: val.supplierName, id: val.supplierIdentity}
                })
            }).catch(() => {
            })
        },
        addGoods(){
            this.$router.push({
                name:'AddShelfGoods',
                query:{
                    id:this.shelfId
                }
            })
        },
        onTableSelectionChange(val) {
            this.tableSelection = val
        },
        init() {
            const me = this
            me.getTableData()
            me.shelfId = me.$route.query.id
        },
        getTableData(field) {
            const me = this
            let postData = {}
            postData = {
                ...me.form,
                shelfId: this.$route.query.id,
                pageNo: me.page.pageNo,
                pageSize: me.page.pageSize,
                minSupplierPrice: me.form.minSupplierPrice===''?'':me.form.minSupplierPrice * 100,
                maxSupplierPrice: me.form.maxSupplierPrice===''?'':me.form.maxSupplierPrice * 100,
                minReferencePrice: me.form.minReferencePrice===''?'':me.form.minReferencePrice * 100,
                maxReferencePrice: me.form.maxReferencePrice===''?'':me.form.maxReferencePrice * 100,
                minPrice: me.form.minPrice===''?'': me.form.minPrice * 100,
                maxPrice: me.form.maxPrice===''?'': me.form.maxPrice * 100
            }
            delete postData.cascader
            me.tableLoading = true
            getShelfGoods(postData).then(res=>{
                me.tableLoading = false
                me.page.totalCount = res.totalCount
                if (this.supplierList.length){
                    me.tableData = _filter( res.results || [])
                } else {
                    getSupplierList().then(supplierRes => {
                        this.supplierList = supplierRes.results.map(val => {
                            return {name: val.supplierName, id: val.supplierIdentity}
                        })
                        me.tableData = _filter( res.results || [])
                    }).catch(() => {
                    })
                }
            },err=>{
                me.tableLoading = false
            })

            //返回来的售价应该先除以100
            function _filter(arr){
                arr.forEach(item=>{
                    item.fixedPrice = (item.fixedPrice/100).toFixed(2)
                    let supplier = me.supplierList.find(supplier=>{
                        return supplier.supplierIdentity = item.supplierIdentity
                    })
                    item.supplierName = supplier?supplier.name:''
                })
                return arr
            }
        },
        setFixedPrice(data) {
            const me = this
            let {fixedPriceTableData, tableSelection} = me
            me.dialogSetFixedPrice = true
            let arr = []
            if (data) {
                arr = JSON.parse(JSON.stringify([data]))
            } else {
                arr = JSON.parse(JSON.stringify(tableSelection))
            }
            arr.forEach(item => {
                item.isFixed = !!item.isFixed
            })
            me.$nextTick(() => {
                fixedPriceTableData.splice(0, fixedPriceTableData.length, ...arr)
            })
        },
        setFixedPriceConfirm() {
            const me = this
            let { fixedPriceTableData } = me
            let postData = {
                "position": 2,
                positionId: me.shelfId,
                skuList: []
            }
            fixedPriceTableData.forEach(item => {
                postData.skuList.push({
                    skuId: item.skuId,
                    fixedPrice: Number((item.fixedPrice * 100).toFixed(0)),
                    isFixed: Number(item.isFixed)
                })
            })
            //todo:ajax
            this.setFixedPriceLoading = true
            setFixedPrice(postData).then(res => {
                this.$message({
                    type: 'success',
                    message: '设置成功!'
                })
                this.setFixedPriceLoading = false
                this.dialogSetFixedPrice = false
                me.getTableData()
            },err=>{
                this.setFixedPriceLoading = false
            })
        },
        removeShelf(ids) {
            const me =this
            let postData = {
                shelfId: this.shelfId,
                skuIds: typeof ids === 'object' ? ids : [ids]
            }
            postData.skuIds = postData.skuIds.join(',')
            this.$confirm('是否下架？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                outlineShelf(postData).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '下架成功'
                    })
                    me.getTableData()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        batchRemoveShelf() {
            const me = this
            let {tableSelection} = me
            let ids = tableSelection.map(item => {
                return item.skuId
            })
            me.removeShelf(ids)
        },

        changeHandle() {
        },
        onSubmit() {
            const me = this
            me.getTableData()
        },
        resetForm(formName) {
            this.$refs[formName] && this.$refs[formName].resetFields()
            if (formName === 'form') {
                //手动清除区间
                this[formName].minSupplierPrice = ''
                this[formName].maxSupplierPrice = ''
                this[formName].maxReferencePrice = ''
                this[formName].minReferencePrice = ''
                this[formName].maxPrice = ''
                this[formName].minPrice = ''
            }
        },

        exportsGoods() { },
        importGoods() { },
    }
}
</script>
<style lang='scss' scoped>
@import "~@/styles/variables";
@import "~@/styles/mixin";

.goods-lib {
    .wrapper {
        padding: 20px;
    }
    .form {
        /deep/ {
            .el-input {
                width: 170px;
            }
            .el-form-item__content {
                width: 170px;
            }
        }
    }
    .container {
        border: 1px solid $c-border;
        margin-bottom: 50px;
        padding: 18px;
    }
    .table {
        margin: 20px 0;
        /deep/ {
            .el-table__body-wrapper {
                @include scrollBar;
            }
        }
    }
    .btn-box {
        margin: 30px 0;
        text-align: center;
    }
}
</style>
