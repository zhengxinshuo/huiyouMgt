<template>
    <div class="user-enterprise page-container">
        <!-- <h2 class="page-title">福利站货架管理</h2>-->
        <div class="top">
            <el-form
                ref="form"
                :inline="true"
                :model="form"
                label-position="left"
                class="form"
                size="small"
                label-width="70px"
            >
                <el-form-item label="货架编号" prop="shelfId">
                    <el-input v-model="form.shelfId" placeholder="请输入货架编号"></el-input>
                </el-form-item>
                <el-form-item label="货架名称" prop="shelfName">
                    <el-input v-model="form.shelfName" placeholder="请输入货架名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="small" @click="createShelf">新建货架</el-button>
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
            >
                <el-table-column prop="shelfId" label="货架编号" width="200"></el-table-column>
                <el-table-column prop="shelfName" label="货架名称"></el-table-column>
                <el-table-column prop="action" label="操作" width="500" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editShelfName(scope.row)">编辑货架名称</el-button>
                        <el-button type="text" size="small" @click="editOperateSt(scope.row)">编辑运营策略</el-button>
                        <el-button type="text" size="small" @click="editPloySt(scope.row)">编辑定价下架策略</el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="editGoods(scope.row.shelfId)"
                        >编辑商品</el-button>
                        <el-button
                            v-show="false"
                            type="text"
                            size="small"
                            @click="editPackage(scope.row.shelfId)"
                        >编辑礼包</el-button>
                        <el-button type="text" size="small" @click="editClassify(scope.row)">编辑分类</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.shelfId)">删除</el-button>
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
        <!--编辑分类-->
        <el-dialog
            :visible.sync="dialogEditClassify.visible"
            title="编辑分类"
            class="dialog"
            width="600px"
            @closed="resetForm('dialogEditClassify.form')"
        >
            <el-form
                ref="dialogEditClassify.form"
                :model="dialogEditClassify.form"
                label-position="left"
                label-width="80px"
                size="small"
            >
                <el-form-item label="选择显示分类" label-width="100px" prop="classifyList">
                    <el-checkbox-group
                        v-model="dialogEditClassify.form.classifyList"
                        class="classify-list"
                        size="small">
                        <el-checkbox
                            v-for="(item,index) in classifyList"
                            :label="item.categoryId"
                            :key="index"
                            border
                        >{{ item.categoryName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogEditClassify.visible=false">返回</el-button>
                <el-button
                    :loading="dialogEditClassify.loading"
                    size="small"
                    type="primary"
                    @click="submitDialog('dialogEditClassify')"
                >确定</el-button>
            </div>
        </el-dialog>
        <!--编辑-->
        <el-dialog
            :visible.sync="dialogEditShelfName.visible"
            title="编辑货架名称"
            width="400px"
            @closed="resetForm('dialogEditShelfName.form')"
        >
            <el-form
                ref="dialogEditShelfName.form"
                :model="dialogEditShelfName.form"
                label-position="left"
                label-width="80px"
                size="small"
            >
                <el-form-item
                    :rules="{ required: true, message: '货架名称不能为空', trigger: 'blur'}"
                    prop="shelfName"
                    label="货架名称"
                >
                    <el-input v-model="dialogEditShelfName.form.shelfName" placeholder="请输入货架名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogEditShelfName.visible=false">返回</el-button>
                <el-button
                    :loading="dialogEditShelfName.loading"
                    size="small"
                    type="primary"
                    @click="submitDialog('dialogEditShelfName')"
                >确认</el-button>
            </div>
        </el-dialog>
        <!--编辑营运策略-->
        <el-dialog
            :visible.sync="dialogEditOperateSt.visible"
            title="编辑运营策略"
            width="400px"
            @closed="resetForm('dialogEditOperateSt.form')"
        >
            <el-form
                ref="dialogEditOperateSt.form"
                :model="dialogEditOperateSt.form"
                class="form"
                label-position="left"
                label-width="122px"
                size="small"
            >
                <el-form-item
                    :rules="{ type:'number',required: true, message: '次数不能为空', trigger: 'blur'}"
                    prop="p30"
                    label="单sku购买次数"
                >
                    <el-input
                        v-model.number="dialogEditOperateSt.form.p30"
                        type="number"
                        placeholder="请输入单件商品购买次数"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{ type:'number',required: true, message: '次数不能为空', trigger: 'blur'}"
                    prop="p31"
                    label="购买sku总次数"
                >
                    <el-input
                        v-model.number="dialogEditOperateSt.form.p31"
                        type="number"
                        placeholder="请输入总共购买次数"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{validator:validateMoney(true)}"
                    prop="p32"
                    label="购买总价"
                >
                    <el-input
                        v-model.number="dialogEditOperateSt.form.p32"
                        type="number"
                        placeholder="请输入购买总价"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogEditOperateSt.visible=false">返回</el-button>
                <el-button
                    :loading="dialogEditOperateSt.loading"
                    size="small"
                    type="primary"
                    @click="submitDialog('dialogEditOperateSt')"
                >确认</el-button>
            </div>
        </el-dialog>
        <!-- 编辑定价下架策略 -->
        <el-dialog
            :visible.sync="dialogEditPloySt.visible"
            title="编辑定价下架策略"
            width="700px"
            @closed="resetForm('dialogEditPloySt.form')"
        >
            <el-form
                ref="dialogEditPloySt.form"
                :model="dialogEditPloySt.form"
                class="form"
                label-position="left"
                label-width="80px"
                size="small"
            >
                <el-form-item prop="pricingPloy" label="定价策略">
                    <el-radio-group v-model="dialogEditPloySt.form.pricingPloy">
                        <el-radio :label="10">动态溢价率</el-radio>
                        <el-radio :label="11">固定溢价率
                            <el-form-item
                                ref="p11"
                                :rules="{ validator:validateItem() }"
                                class="m-l-20 form-item--inline"
                                style="display: inline-block"
                                prop="pricingValue"
                            >
                                <el-input
                                    v-model.number="dialogEditPloySt.form.pricingValue"
                                    :disabled="dialogEditPloySt.form.pricingPloy !== 11"
                                    type="number"
                                    placeholder="请输入固定溢价率"
                                ></el-input>
                            </el-form-item>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="offlinePloy" label="下架策略">
                    <el-checkbox-group v-model="dialogEditPloySt.form.offlinePloy">
                        <el-row>
                            <el-col :span="12">
                                <el-checkbox :label="20">销售价&lt;供应价*
                                    <el-form-item
                                        ref="p20"
                                        :rules="{validator:validateNum(isEnable(20))}"
                                        prop="p20"
                                        class="form-item--inline form-item--short"
                                    >
                                        <el-input
                                            v-model.number="dialogEditPloySt.form.p20"
                                            :disabled="!isEnable(20)"
                                            type="number"></el-input>
                                    </el-form-item>
                                    %
                                </el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox :label="21">销售价&gt;供应价*
                                    <el-form-item
                                        ref="p21"
                                        :rules="{validator:validateNum(isEnable(21))}"
                                        prop="p21"
                                        class="form-item--inline form-item--short"
                                    >
                                        <el-input
                                            v-model.number="dialogEditPloySt.form.p21"
                                            :disabled="!isEnable(21)"
                                            type="number"></el-input>
                                    </el-form-item>
                                    %
                                </el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-checkbox :label="22">销售价&lt;市场价*
                                    <el-form-item
                                        ref="p22"
                                        :rules="{validator:validateNum(isEnable(22))}"
                                        prop="p22"
                                        class="form-item--inline form-item--short"
                                    >
                                        <el-input
                                            v-model.number="dialogEditPloySt.form.p22"
                                            :disabled="!isEnable(22)"
                                            type="number"></el-input>
                                    </el-form-item>
                                    %
                                </el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox :label="23">销售价&gt;市场价*
                                    <el-form-item
                                        ref="p23"
                                        :rules="{validator:validateNum(isEnable(23))}"
                                        prop="p23"
                                        class="form-item--inline form-item--short"
                                    >
                                        <el-input
                                            v-model.number="dialogEditPloySt.form.p23"
                                            :disabled="!isEnable(23)"
                                            type="number"></el-input>
                                    </el-form-item>
                                    %
                                </el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-checkbox :label="24">销售价&lt;
                                    <el-form-item
                                        ref="p24"
                                        :rules="{validator:validateMoney(isEnable(24))}"
                                        prop="p24"
                                        class="form-item--inline form-item--short"
                                    >
                                        <el-input
                                            v-model.number="dialogEditPloySt.form.p24"
                                            :disabled="!isEnable(24)"
                                            type="number"></el-input>
                                    </el-form-item>
                                    元
                                </el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox :label="25">销售价&gt;
                                    <el-form-item
                                        ref="p25"
                                        :rules="{validator:validateMoney(isEnable(25))}"
                                        prop="p25"
                                        class="form-item--inline form-item--short"
                                    >
                                        <el-input
                                            v-model.number="dialogEditPloySt.form.p25"
                                            :disabled="!isEnable(25)"
                                            type="number"></el-input>
                                    </el-form-item>
                                    元
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogEditPloySt.visible=false">返回</el-button>
                <el-button
                    :loading="dialogEditPloySt.loading"
                    size="small"
                    type="primary"
                    @click="submitDialog('dialogEditPloySt')">确认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import tableMixin from '@/mixin/table'
import {
    getShelfList,
    setCategory,
    getShelfGoods,
    getCategory,
    editShelfName,
    editSt,
    getSt,
    delShelf
} from "../../api/shelf"

export default {
    name: 'Shelf',
    components: {},
    mixins: [tableMixin],
    data() {
        return {
            classifyList: [],
            tableLoading: false,
            form: {
                shelfId: '',
                shelfName: '',
            },
            dialogEditShelfName: {
                visible: false,
                title:'',
                form: {
                    shelfId: '',
                    shelfName: ''
                },
                loading: false
            },
            dialogEditClassify: {
                visible: false,
                form: {
                    shelfId: '',
                    shelfName: '',
                    classifyList: []
                },
                loading: false
            },
            dialogEditOperateSt: {
                visible: false,
                form: {
                    shelfId: '',
                    p30: 0,
                    p31: 0,
                    p32: 0
                },
                loading: false
            },
            dialogEditPloySt: {
                visible: false,
                loading: false,
                form: {
                    pricingValue: 0,
                    pricingPloy: 10,
                    positionId: '',
                    offlinePloy: [],
                    p20: 0,
                    p21: 0,
                    p22: 0,
                    p23: 0,
                    p24: 0,
                    p25: 0,
                    shelfId: '12345'
                }
            }
        }
    },
    watch: {
        'dialogEditPloySt.form.offlinePloy': {
            handler(newVal, oldVal) {
                if (newVal.length < oldVal.length) {
                    const field = oldVal.find(item => !(newVal.indexOf(item) + 1))
                    if(!field) return false
                    this.$refs[`p${field}`].resetField()
                }
            },
            deep: true,
        },
        'dialogEditPloySt.form.pricingPloy': {
            handler(a, b) {
                if (a === 10) {
                    this.$refs[`p11`].resetField()
                }
            },
            deep: true
        }
    },
    created() {
        const me = this
        me.init()
    },
    methods: {
        validateItem() {
            return (rule, value, callback) => {
                if (this.form.pricingPloy !== 11) callback()
                const num = Number(value)
                const reg = /(\.\d)/g
                if (reg.test(num)) {
                    callback(new Error('不能有小数'))
                    return
                }
                if (isNaN(num) || num < -100) {
                    callback(new Error('必须大于等于0%'))
                    return
                }
                callback()
            }
        },
        validateNum(enable) {
            return (rule, value, callback) => {
                if (!enable) callback()
                const num = Number(value)
                const reg = /(\.\d)/g
                if (reg.test(num)) {
                    callback(new Error('不能有小数'))
                    return
                }
                if (isNaN(num) || num < 0) {
                    callback(new Error('必须大于等于0%'))
                    return
                }
                callback()
            }
        },
        validateMoney(enable) {
            return (rule, value, callback) => {
                if (!enable) callback()
                const num = Number(value)
                const reg = /^(-?\d+)(\.\d{1,2})?$/
                if (!reg.test(num)) {
                    callback(new Error('最多两位小数'))
                    return
                }
                if (isNaN(num) || num < 0) {
                    callback(new Error('必须大于等于0'))
                    return
                }
                callback()
            }
        },
        isEnable(ploy) {
            return ~this.dialogEditPloySt.form.offlinePloy.indexOf(ploy)
        },
        editClassify(data) {
            const me = this
            let { dialogEditClassify } = me
            dialogEditClassify.visible = true
            this.$nextTick(() => {
                getCategory({
                    shelfId: data.shelfId
                }).then(res => {
                    me.classifyList = res.results || []
                    dialogEditClassify.form.shelfId = data.shelfId
                    dialogEditClassify.form.classifyList = data.categoryIds&&data.categoryIds.length ? data.categoryIds.split(',') : []
                })
            })
        },
        editClassifyConfirm() {
            const me = this
            let str = ''
            return new Promise((resolve, reject) => {
                str = me.dialogEditClassify.form.classifyList.join(',')
                setCategory({
                    shelfId: me.dialogEditClassify.form.shelfId,
                    categoryIds: str
                }).then(res => {
                    resolve(res.msg)
                    me.getTableData()
                },err=>{
                    reject()
                })
            })
        },
        submitDialog(dialogName, formName) {
            const me = this
            formName = formName || `${dialogName}.form`
            let field = dialogName.substr(6).replace(/^[a-zA-Z]/gi, (val) => {
                return val.toLowerCase()
            })

            this.$refs[formName].validate((valid) => {
                if (!valid) return false
                me[dialogName].loading = true
                this[`${field}Confirm`]().then(res => {
                    me[dialogName].loading = false
                    me[dialogName].visible = false
                    me.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                }, error => {
                    me[dialogName].loading = false
                })
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        getEnable(ploy) {
            return !(this.dialogEditPloySt.form.offlinePloy.indexOf(ploy) + 1)
        },
        editPloySt(data) {
            const me = this
            let { dialogEditPloySt } = me
            dialogEditPloySt.visible = true

            let postData = {
                position: 2,
                positionId: data.shelfId,
                ployTypes: '1,2'
            }
            this.$nextTick(() => {
                getSt(postData).then(res => {
                    dialogEditPloySt.form.shelfId = data.shelfId
                    dialogEditPloySt.form = Object.assign(dialogEditPloySt.form, _filter(res.results))
                })
            })

            function _filter(arr) {
                arr = arr || []
                let obj = {
                    offlinePloy: [],
                    pricingValue: 0,
                    pricingPloy: 10,
                }
                arr.forEach(item => {
                    if (item.ployType === 1) {
                        obj.pricingValue = item.ployValue
                        obj.pricingPloy = item.ploy
                    } else {
                        obj[`p${item.ploy}`] = (item.ploy === 24 || item.ploy === 25) ? item.ployValue / 100 : item.ployValue
                        obj.offlinePloy.push(item.ploy)
                    }
                })
                return obj
            }
        },
        editShelfName(data) {
            const me = this
            let { dialogEditShelfName } = me
            dialogEditShelfName.visible = true
            this.$nextTick(() => {
                dialogEditShelfName.form.shelfId = data.shelfId
                dialogEditShelfName.form.shelfName = data.shelfName
            })
        },
        editOperateSt(data) {
            const me = this
            let { dialogEditOperateSt } = me
            dialogEditOperateSt.visible = true
            let postData = {
                position: 2,
                positionId: data.shelfId,
                ployTypes: 3
            }
            this.$nextTick(() => {
                getSt(postData).then(res => {
                    dialogEditOperateSt.form = Object.assign(dialogEditOperateSt.form, {
                        ..._filter(res.results),
                        shelfId: data.shelfId || ''
                    })
                })
            })

            function _filter(arr) {
                arr = arr || []
                let obj = {}
                arr.forEach(item => {
                    obj[`p${item.ploy}`] = item.ploy === 32 ? item.ployValue / 100 : item.ployValue
                })
                return obj
            }
        },
        editPackage() {
            // this.$router.push('/aplusGoodsMgt/editPackage/1')
            this.$router.push({ name: 'EditPackage', params: { id: '1' } })

        },
        editGoods(id) {
            // this.$router.push('/aplusGoodsMgt/editGoods/1')
            this.$router.push({ name: 'EditGoods', query: { id: id } })
        },
        del(id) {
            this.$confirm('是否删除该货架？', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                delShelf({
                    shelfId: id
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.getTableData()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        createShelf() {
            // this.$router.push('/aplusGoodsMgt/createShelf')
            this.$router.push({ name: 'CreateShelf' })
        },
        viewDetail() {

        },
        selectShelves(val) {
            console.log(val)
        },
        init() {
            const me = this
            console.log(me.$route.params)
            me.form.shelfId = me.$route.params.shelfId || ''
            me.getTableData()
        },
        getCategory(shelfId) {
            const me = this
            getCategory({shelfId: shelfId}).then(res => {
                me.classifyList = res.results || []
            })
        },
        getTableData() {
            const me = this
            let postData = {
                ...me.form,
                pageNo: me.page.pageNo,
                pageSize: me.page.pageSize
            }
            for(let field in postData) {
                if(!String(postData[field])){
                    delete postData[field]
                }
            }
            
            me.tableLoading = true
            getShelfList(postData).then(res => {
                me.tableData = res.results||[]
                me.tableLoading = false
                me.page.totalCount = res.totalCount
            },err=>{
                me.tableLoading = false
            })
        },
        onSubmit() {
            this.getTableData()
        },
        editShelfNameConfirm() {
            const me = this
            return new Promise((resolve, reject) => {
                let postData = {
                    shelfName: me.dialogEditShelfName.form.shelfName,
                    shelfId: me.dialogEditShelfName.form.shelfId
                }
                editShelfName(postData).then(res => {
                    resolve('修改成功')
                    me.getTableData()
                }, err => {
                    reject()
                })
            })
        },
        editOperateStConfirm() {
            const me = this
            let { dialogEditOperateSt } = me
            return new Promise((resolve, reject) => {
                if (!dialogEditOperateSt.form.shelfId) {
                    me.$message({
                        message: '缺少货架id',
                        type: 'error'
                    })
                    reject()
                } else {
                    let postData = {
                        position: 2,
                        positionId: me.dialogEditOperateSt.form.shelfId,
                        ployList: [
                            {
                                ployType: '3',
                                ploy: '30',
                                ployValue: dialogEditOperateSt.form.p30
                            },
                            {
                                ployType: '3',
                                ploy: '31',
                                ployValue: dialogEditOperateSt.form.p31
                            },
                            {
                                ployType: '3',
                                ploy: '32',
                                ployValue: dialogEditOperateSt.form.p32 * 100
                            }
                        ]
                    }
                    editSt(postData).then(res => {
                        resolve('修改成功')
                        me.getTableData()
                    }, err => {
                        reject()
                    })
                }
                
                
            })
        },
        editPloyStConfirm() {
            const me = this
            let { dialogEditPloySt } = me
            let offlinePloyCheckbox = dialogEditPloySt.form.offlinePloy
            let ployList = []
            //定价策略
            ployList.push({
                ployType: 1,
                ploy: dialogEditPloySt.form.pricingPloy,
                ployValue: dialogEditPloySt.form.pricingValue
            })
            //下架策略
            offlinePloyCheckbox.forEach(item => {
                if (item) {
                    let obj = {
                        ployType: 2,
                        ploy: item,
                        ployValue: dialogEditPloySt.form[`p${item}`]
                    }
                    if (String(item) === '24' || String(item) === '25') {
                        obj.ployValue = obj.ployValue * 100
                    }
                    ployList.push(obj)
                }
            })
            return new Promise((resolve, reject) => {
                if (!me.dialogEditPloySt.form.shelfId) {
                    me.$message({
                        message: '货架id为空',
                        type: 'error'
                    })
                    reject()
                }
                let postData = {
                    position: 2,
                    positionId: me.dialogEditPloySt.form.shelfId,
                    ployList
                }
                me.$confirm('定价下架策略已经修改，确认提交吗？', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    editSt(postData).then(res => {
                        resolve('修改成功')
                        me.getTableData()
                    }, err => {
                        reject()
                    })

                }).catch(() => {
                    me.$message({
                        type: 'info',
                        message: '已取消'
                    })
                    reject()
                })
            })
        }
    },
}
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/mixin.scss";

.user-enterprise {
    .table {
        margin-top: 20px;
    }
}

.classify-list {
    max-height: 300px;
    overflow: auto;
    @include scrollBar();
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

/deep/ {
    .form {
        .el-select > .el-input {
            display: block;
        }
        .el-input {
            width: 170px;
        }
        .date-wrapper {
            .el-form-item__content {
                width: 475px;
            }
        }
        .el-radio {
            line-height: 32px;
            display: block;
            margin: 0 0 10px;
            &:last-child {
                margin: 0;
            }
        }
        &-item--inline {
            display: inline-block;
            padding: 0 !important;
            margin: 0 10px 18px !important;
            &:last-child {
                margin-bottom: 0 !important;
            }
            &.form-item--short {
                .el-input {
                    width: 65px;
                }
            }
        }
        .el-row {
            margin-bottom: 18px;
            &:last-child {
                margin: 0;
            }
        }
    }

    .el-checkbox.is-bordered + .el-checkbox.is-bordered {
        margin-left: 0;
    }
    .el-checkbox.is-bordered {
        padding-top: 6px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
}

.pagination {
    text-align: center;
    margin: 20px 0;
}
</style>

