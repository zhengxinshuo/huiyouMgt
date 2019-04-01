<template>
    <div class="goods-lib">
        <div class="wrapper">
            <div class="container">
                <h3 class="page-title">商品列表</h3>
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
                    <el-form-item v-if="false" label="SKU名称" prop="skuName">
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
                        <el-input v-model="form.brandName" placeholder="请输入商品名称"></el-input>
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
                            <el-input
                                v-model="form.minReferencePrice"
                                type="number"
                                style="width: 100%;"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align:center">-</el-col>
                        <el-col :span="11">
                            <el-input
                                v-model="form.maxReferencePrice"
                                type="number"
                                style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="供应价区间">
                        <el-col :span="11">
                            <el-input
                                v-model="form.minSupplierPrice"
                                type="number"
                                style="width: 100%;"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align:center">-</el-col>
                        <el-col :span="11">
                            <el-input
                                v-model="form.maxSupplierPrice"
                                type="number"
                                style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-show="false" label="售价区间">
                        <el-col :span="11">
                            <el-input v-model="form.minPrice" type="number" style="width: 100%;"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align:center">-</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.maxPrice" type="number" style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
                <!-- 商品库商品表格 1 -->
                <el-table
                    v-loading="goodsTableLoading"
                    ref="goodsTable"
                    :data="goodsTableData"
                    style="width: 100%"
                    class="table"
                    border
                >
                    <el-table-column prop="goodsId" label="商品编号"></el-table-column>
                    <el-table-column prop="goodsName" wdith="400" width="200" label="商品名称"></el-table-column>
                    <el-table-column prop="brandName" label="商品品牌"></el-table-column>
                    <el-table-column v-if="false" prop="categoryInfo" label="所在分类"></el-table-column>
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
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button
                                v-if="ifAddShelf(scope.row)"
                                :disabled="true"
                                type="text"
                                size="small"
                            >已加入
                            </el-button>
                            <el-button
                                v-else
                                type="text"
                                size="small"
                                @click="addShelf(scope.row)"
                            >加入货架
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
            </div>
            <div v-show="shelfGoodsTableData.length" class="container">
                <h3 class="page-title">已选择的商品</h3>
                <!-- 货架内商品表格2-->
                <el-table
                    :data="shelfGoodsTableData"
                    style="width: 100%"
                    class="table"
                    border
                >
                    <el-table-column prop="goodsId" label="商品编号"></el-table-column>
                    <el-table-column prop="goodsName" width="200" label="商品名称"></el-table-column>
                    <el-table-column prop="brandName" label="商品品牌"></el-table-column>
                    <el-table-column v-if="false" prop="categoryInfo" label="所在分类"></el-table-column>
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
                    <el-table-column label="操作" fixed="right" width="150">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="small"
                                @click="removeShelf(scope.row)"
                            >移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="btn-box">
                <el-button type="default" size="small" @click="$router.go(-1)">返回</el-button>
                <el-button
                    v-if="shelfGoodsTableData.length"
                    :loading="submitLoading"
                    type="primary"
                    size="small"
                    @click="commit">提交
                </el-button>
                <el-button v-else :disabled="true" type="primary" size="small">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {getAllGoodsForShelf, putOnShelf} from "../../api/shelf"
import {treeMixin} from "../../mixin"
import {getSupplierList} from "../../api/goods"

export default {
    name: 'EditGoods',
    mixins: [treeMixin],
    data() {
        return {
            supplierList: [],
            submitLoading: false,
            fixedPriceTableData: [],
            goodsTableSelection: [],
            shelfGoodsTableSelection: [],
            shelfId: '',
            goodsTableLoading: false,
            shelfGoodsTableLoading: false,
            form: {
                goodsId: "",
                cascader: [],
                goodsName: '',
                brandName: '',
                goodsType: '1',
                supplierIdentity: '',
                skuId: '',
                deliveryType: '',
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
            page: {
                sizes: [20, 50, 100, 200],
                pageNo: 1,
                pageSize: 20,
                totalCount: 0
            },
            goodsTableData: [],
            shelfGoodsTableData: [],
            enterpriseList: [{
                label: '卓望',
                value: '1'
            }],
            selectedOptions: []
        }
    },
    watch: {

        'form.cascader'(val) {
            const me = this
            let {form} = me
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
        ifAddShelf(data) {
            const me = this
            let {goodsTableData, shelfGoodsTableData} = me
            return shelfGoodsTableData.indexOf(data) >= 0
        },
        getSupplier() {
            getSupplierList().then(res => {
                this.supplierList = res.results.map(val => {
                    return {name: val.supplierName, id: val.supplierIdentity}
                })
            }).catch(() => {
            })
        },
        commit() {
            this.$confirm('是否提交？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.commitConfirm()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        commitConfirm() {
            const me = this
            let {shelfGoodsTableData} = this
            let postData = {
                shelfId: me.shelfId,
                skuIds: shelfGoodsTableData.map((item) => {
                    return item.skuId
                })
            }
            me.submitLoading = true
            putOnShelf(postData).then(res => {
                me.submitLoading = false
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                })
                //this.$router.push({ name: 'EditGoods', query: { id: me.shelfId } })
                this.$router.go(-1)
            }, err => {
                me.submitLoading = false
            })

            //putOnShelf()
            //提交完清空
            // this.shelfGoodsTableData = []
        },
        init() {
            const me = this
            me.getTableData('goods')
            me.shelfId = me.$route.query.id
        },
        getTableData(field) {
            const me = this
            let postData = {}
            if (field === 'goods') {
                postData = {
                    ...me.form,
                    pageNo: me.page.pageNo,
                    pageSize: me.page.pageSize
                }
                //后期处理
                postData = {
                    ...postData,
                    minSupplierPrice: postData.minSupplierPrice===''?'':postData.minSupplierPrice * 100,
                    maxSupplierPrice: postData.maxSupplierPrice===''?'':postData.maxSupplierPrice * 100,
                    minReferencePrice: postData.minReferencePrice===''?'':postData.minReferencePrice * 100,
                    maxReferencePrice: postData.maxReferencePrice===''?'':postData.maxReferencePrice * 100,
                    minPrice: postData.minPrice===''?'':postData.minPrice * 100,
                    maxPrice: postData.maxPrice===''?'':postData.maxPrice * 100
                }
                delete postData.cascader
                getAllGoodsForShelf(postData).then(res => {
                    me[`${field}TableLoading`] = false
                    me[`${field}TableData`] = res.results || []
                    me.page.totalCount = res.totalCount
                }, err => {
                    me[`${field}TableLoading`] = false
                })
            } else {
                postData = {
                    shelfId: me.shelfId
                }
            }
            
            
        },

        removeShelf(data) {
            this.shelfGoodsTableData.splice(this.shelfGoodsTableData.indexOf(data), 1)
        },

        onSizeChange(val) {
            this.page.pageSize = val
            this.getTableData('goods')
        },
        onCurrentChange(val) {
            this.page.pageNo = val
            this.getTableData('goods')
        },
        addShelf(data) {
            const me = this
            let {goodsTableData, shelfGoodsTableData} = me
            if (shelfGoodsTableData.indexOf(data) < 0) {
                shelfGoodsTableData.push(data)
            }
        },

        changeHandle() {
        },
        search() {
            const me = this
            me.getTableData('goods')
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
        }
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
