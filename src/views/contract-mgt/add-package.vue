<template>
    <div class="package-lib">
        <div class="wrapper">
            <div class="container">
                <h3 class="page-title">礼包列表</h3>
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
                    <el-form-item label="礼包编号" prop="packageId">
                        <el-input v-model="form.packageId" placeholder="请输入礼包编号"></el-input>
                    </el-form-item>
                    <el-form-item label="礼包名称" prop="packageName">
                        <el-input v-model="form.packageName" placeholder="请输入礼包名称"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商" prop="supplierIdentity">
                        <el-select v-model="form.supplierIdentity" filterable placeholder="全部">
                            <el-option label="京东" value="shanghai"></el-option>
                            <el-option label="网易严选" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="SKU编号" prop="skuId">
                        <el-input v-model="form.skuId" placeholder="请输入SKU编号"></el-input>
                    </el-form-item>
                    <el-form-item label="SKU名称" prop="skuName">
                        <el-input v-model="form.skuName" placeholder="请输入SKU名称"></el-input>
                    </el-form-item>
                    <el-form-item label="市场价区间">
                        <el-col :span="11">
                            <el-input v-model="form.minReferencePrice" style="width: 100%;"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align:center">-</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.maxReferencePrice" style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="供应价区间">
                        <el-col :span="11">
                            <el-input v-model="form.minSupplierPrice" style="width: 100%;"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align:center">-</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.maxSupplierPrice" style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="售价区间">
                        <el-col :span="11">
                            <el-input v-model="form.minPrice" style="width: 100%;"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align:center">-</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.maxPrice" style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
                <!-- 礼包库礼包表格 1 -->
                <el-table
                    v-loading="packageTableLoading"
                    ref="packageTable"
                    :data="packageTableData"
                    style="width: 100%"
                    class="table"
                    border
                >
                    <el-table-column prop="packageId" label="礼包编号"></el-table-column>
                    <el-table-column prop="packageName" label="礼包名称"></el-table-column>
                    <el-table-column prop="supplierIdentity" label="供应商"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="toDetail(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="referencePrice" label="市场价"></el-table-column>
                    <el-table-column prop="supplierPrice" label="供应价"></el-table-column>
                    <el-table-column prop="price" label="售价"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="addShelf(scope.row)">加入货架</el-button>
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
            <div v-show="shelfPackageTableData.length" class="container">
                <h3 class="page-title">已选择的礼包</h3>
                <!-- 货架内礼包表格2-->
                <el-table :data="shelfPackageTableData" style="width: 100%" class="table" border>
                    <el-table-column prop="packageId" label="礼包编号"></el-table-column>
                    <el-table-column prop="packageName" label="礼包名称"></el-table-column>
                    <el-table-column prop="supplierIdentity" label="供应商"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="toDetail(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="referencePrice" label="市场价"></el-table-column>
                    <el-table-column prop="supplierPrice" label="供应价"></el-table-column>
                    <el-table-column prop="price" label="售价"></el-table-column>
                    <el-table-column label="操作" fixed="right" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="removeShelf(scope.row)">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="btn-box">
                <el-button type="default" size="small" @click="$router.go(-1)">返回</el-button>
                <el-button
                    v-if="shelfPackageTableData.length"
                    type="primary"
                    size="small"
                    @click="commit"
                >提交</el-button>
                <el-button v-else :disabled="true" type="primary" size="small">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
const options = [{
    value: 'zhinan',
    label: '指南',
    children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
            value: 'yizhi',
            label: '一致'
        }]
    }]
}]
export default {
    name: 'EditPackage',
    data() {
        return {

            fixedPriceTableData: [],
            packageTableSelection: [],
            shelfPackageTableSelection: [],
            shelfId: '',
            packageTableLoading: false,
            shelfPackageTableLoading: false,
            options,
            form: {
                packageId: "",
                packageName: '',
                brandName: '',
                packageType: '1',
                supplierPackageId: '',
                supplierSkuId: '',
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
            page: {
                sizes: [20, 50, 100, 200],
                pageNo: 1,
                pageSize: 20,
                totalCount: 0
            },
            packageTableData: [],
            shelfPackageTableData: [],
            enterpriseList: [{
                label: '卓望',
                value: '1'
            }],
            selectedOptions: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        toDetail() {

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
            let { shelfPackageTableData } = this
            let postData = {}
            this.$message({
                type: 'success',
                message: '提交成功!'
            })
            //提交完清空
            this.shelfPackageTableData = []
        },
        init() {
            const me = this
            me.getTableData('package')
            me.shelfId = me.$route.params.id
        },
        getTableData(field) {
            const me = this
            let postData = {}
            if (field === 'package') {
                postData = {
                    ...me.form,
                    pageNo: me.page.pageNo,
                    pageSize: me.page.pageSize
                }
            } else {
                postData = {
                    shelfId: me.shelfId
                }
            }
            me[`${field}TableLoading`] = true
            setTimeout(() => {
                me[`${field}TableLoading`] = false
                me[`${field}TableData`] = [{
                    packageId: 'p123445',
                    packageName: '大豆油',
                    brandName: '黑龙',
                    categoryInfo: '粮油>油>酱油',
                    supplierIdentity: '京东',
                    skuId: '123',
                    skuName: '食品',
                    referencePrice: '188',
                    supplierPrice: '155',
                    price: '120',
                    priceFixed: 1,
                    fixedPrice: '2454',
                    isShelfPackage: '1',
                },
                {
                    packageId: 'p123446',
                    packageName: '大豆油',
                    brandName: '黑龙',
                    categoryInfo: '粮油>油>酱油',
                    supplierIdentity: '京东',
                    skuId: '123',
                    skuName: '食品',
                    referencePrice: '188',
                    supplierPrice: '155',
                    price: '130',
                    priceFixed: 0,
                    fixedPrice: '',
                    isShelfPackage: '0'
                }]
                if (field === 'package') {
                    me.page.totalCount = 200
                }
            }, 500)
        },

        removeShelf(data) {
            this.shelfPackageTableData.splice(this.shelfPackageTableData.indexOf(data), 1)
        },

        onSizeChange(val) {
            this.page.pageSize = val
            this.getTableData('package')
        },
        onCurrentChange(val) {
            this.page.pageNo = val
            this.getTableData('package')
        },
        addShelf(data) {
            const me = this
            let { shelfPackageTableData } = me
            if (shelfPackageTableData.indexOf(data) < 0) {
                shelfPackageTableData.push(data)
            }
        },

        changeHandle() {
        },
        search() {
            const me = this
            me.getTableData('package')
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

.package-lib {
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
