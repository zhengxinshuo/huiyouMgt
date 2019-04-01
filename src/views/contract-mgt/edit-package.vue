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
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="12">
                    <el-button type="primary" size="small" @click="addPackage">新增礼包</el-button>
                    <el-button
                        v-if="tableSelection.length"
                        type="primary"
                        size="small"
                        @click="batchRemoveShelf"
                    >批量下架</el-button>
                    <el-button v-else :disabled="true" type="primary" size="small">批量下架</el-button>
                    <el-button
                        v-if="tableSelection.length"
                        type="primary"
                        size="small"
                        @click="setFixedPrice(null)"
                    >批量设置固定价</el-button>
                    <el-button v-else :disabled="true" type="primary" size="small">批量设置固定价</el-button>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <el-button type="primary" size="small">导出货架内礼包</el-button>
                    <el-button type="primary" size="small">导入礼包</el-button>
                </el-col>
            </el-row>
            <!-- 礼包库礼包表格 1 -->
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
                @selection-change="onTableSelectionChange"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="packageId" label="礼包编号"></el-table-column>
                <el-table-column prop="packageName" label="礼包名称"></el-table-column>
                <el-table-column prop="supplierIdentity" label="供应商"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="check(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="referencePrice" label="市场价"></el-table-column>
                <el-table-column prop="supplierPrice" label="供应价"></el-table-column>
                <el-table-column prop="price" label="售价"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="setFixedPrice(scope.row)">设置固定售价</el-button>
                        <el-button type="text" size="small" @click="removeShelf(scope.row.skuId)">下架</el-button>
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
                width="700px"
            >
                <el-table :data="fixedPriceTableData" class="table" border>
                    <el-table-column prop="packageId" label="礼包编号"></el-table-column>
                    <el-table-column prop="packageName" label="礼包名称"></el-table-column>
                    <el-table-column prop="referencePrice" label="市场价"></el-table-column>
                    <el-table-column prop="supplierPrice" label="供应价"></el-table-column>
                    <el-table-column prop="price" label="当前售价"></el-table-column>
                    <el-table-column label="固定售价" width="220">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.priceFixed" label="使用固定售价" size="small"></el-checkbox>
                            <el-input
                                :disabled="!scope.row.priceFixed"
                                v-model="scope.row.fixedPrice"
                                size="small"
                            ></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogSetFixedPrice=false">取消</el-button>
                    <el-button size="small" type="primary" @click="setFixedPriceConfirm">提交</el-button>
                </div>
            </el-dialog>
            <div class="btn-box">
                <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import tableMixin from '@/mixin/table'

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
    mixins: [tableMixin],
    data() {
        return {
            dialogSetFixedPrice: false,
            fixedPriceTableData: [],
            tableSelection: [],
            shelfId: '',
            tableLoading: false,
            options,
            form: {
                packageId: "",

                packageName: '',
                packageType: '1',

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
                    if (!item.priceFixed) {
                        item.fixedPrice = ''
                    }
                })
            },
            deep: true
        }
    },
    created() {
        this.init()
    },
    methods: {
        check(data) {

        },
        addPackage() {
            this.$router.push({
                name: 'AddShelfPackage',
                id: this.shelfId
            })
        },
        onTableSelectionChange(val) {
            this.tableSelection = val
        },
        init() {
            const me = this
            me.getTableData()
            me.shelfId = me.$route.params.id
        },
        getTableData(field) {
            const me = this
            let postData = {}

            postData = {
                ...me.form,
                pageNo: me.page.pageNo,
                pageSize: me.page.pageSize
            }

            me.tableLoading = true
            setTimeout(() => {
                me.tableLoading = false
                me.tableData = [{
                    packageId: 'p123445',
                    packageName: '大豆油',
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
                me.page.totalCount = 200
            }, 500)
        },
        setFixedPrice(data) {
            const me = this
            let { fixedPriceTableData, tableSelection } = me
            me.dialogSetFixedPrice = true
            let arr = []
            if (data) {
                arr = JSON.parse(JSON.stringify([data]))
            } else {
                arr = JSON.parse(JSON.stringify(tableSelection))
            }
            arr.forEach(item => {
                item.priceFixed = !!item.priceFixed
            })
            me.$nextTick(() => {
                fixedPriceTableData.splice(0, fixedPriceTableData.length, ...arr)
            })
        },
        setFixedPriceConfirm() {
            const me = this
            let { fixedPriceTableData } = me
            let postData = {
                shelfId: me.shelfId,
                fixedPriceList: []
            }
            fixedPriceTableData.forEach(item => {
                postData.fixedPriceList.push({
                    skuId: item.skuId,
                    fixedPrice: item.fixedPrice,
                    priceFixed: Number(item.priceFixed)
                })
            })
            //todo:ajax
            me.dialogSetFixedPrice = false
            me.getTableData()
        },
        removeShelf(ids) {
            let postData = {
                shelfId: this.shelfId,
                skuIds: typeof ids === 'object' ? ids : [ids]
            }
            console.log(postData)
            this.$confirm('是否移除？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '移除成功!'
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
            let { tableSelection } = me
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

        exportsPackage() {
        },
        importPackage() {
        },
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
