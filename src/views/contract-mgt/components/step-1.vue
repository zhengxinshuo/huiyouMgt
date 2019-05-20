<template>
    <div>
        <el-form
            ref="form"
            :model="form"
            label-position="left"
            class="form"
            label-width="130px"
            size="small"
        >
            <form-box>
                <template slot="title">基本条款</template>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item :rules="{required:true,message:'请输入合同名称'}" prop="name" label="合同名称">
                            <el-input v-model="form.name" placeholder="请输入合同名称" class="flex-w" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item :rules="{required:true,message:'请输入合同编号'}" prop="id" label="合同编号">
                            <el-input placeholder="请输入合同编号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item :rules="{required:true,message:'请输入乙方单位'}" label="乙方单位">
                            <el-input v-model="form.unitName" placeholder="请输入乙方单位" clearable>
                                <el-button
                                    slot="append"
                                    icon="el-icon-search"
                                    @click="addUnit"></el-button>
                            </el-input>
                            <el-button type="text">新增</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="丙方单位">
                            <el-input placeholder="请输入丙方单位" clearable>
                                <el-button
                                    slot="append"
                                    icon="el-icon-search"
                                    @click="dialogAddUnit.visible = true"></el-button>
                            </el-input>
                            <el-button type="text">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="合同类型">
                            <el-select v-model="form.value" clearable>
                                <el-option label="全部" value="全部"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额">
                            <el-input clearable></el-input>
                            元
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="合同签订日期">
                            <el-date-picker
                                v-model="form.time"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品交付日期">
                            <el-date-picker
                                v-model="form.time"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="安装调试完成日期">
                            <el-date-picker
                                v-model="form.time"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="系统上线日期">
                            <el-date-picker
                                v-model="form.time"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="计划终验日期">
                            <el-date-picker
                                v-model="form.time"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </form-box>
            <form-box>
                <template slot="title">服务条款</template>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="合同主要条款">
                            <el-input placeholder="请输入" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="服务响应时间">
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <el-input placeholder="请输入" class="flex-w"></el-input>
                                </el-col>
                                <el-col :span="10">
                                    <el-select v-model="form.value" class="flex-w" clearable>
                                        <el-option label="小时" value="全部"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="故障解决时间">
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <el-input placeholder="请输入" class="flex-w"></el-input>
                                </el-col>
                                <el-col :span="10">
                                    <el-select v-model="form.value" class="flex-w" clearable>
                                        <el-option label="小时" value="全部"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="是否有巡视">
                            <el-radio-group v-model="form.radio">
                                <el-radio :label="2">无</el-radio>
                                <el-radio :label="1">有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="是否有驻场">
                            <el-radio-group v-model="form.radio">
                                <el-radio :label="2">无</el-radio>
                                <el-radio :label="1">有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </form-box>
            <form-box>
                <template slot="title">其他</template>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="是否立项">
                            <el-radio-group v-model="form.radio">
                                <el-radio :label="2">否</el-radio>
                                <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item :rules="{required:true,message:'请选择'}" label="院方项目经理">
                            <el-select v-model="form.value" clearable>
                                <el-option label="系统管理员" value="1"></el-option>
                            </el-select>
                            <span class="form-tip">院方项目经理及系统管理员对该合同的验收拥有审批权限</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="乙方项目经理">
                            <el-select v-model="form.value" clearable>
                                <el-option label="系统管理员" value="1"></el-option>
                            </el-select>
                            <span class="form-tip">即对该项目拥有系统操作权限的乙方负责人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="乙方其他联系人">
                            <el-button type="text">添加</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input placeholder="请输入备注" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="合同发票">
                            <el-upload
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple>
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="合同附件">
                            <el-upload
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple>
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="创建人">
                            系统管理员
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="创建时间">
                            2019
                        </el-form-item>
                    </el-col>
                </el-row>
            </form-box>
        </el-form>
        <el-dialog
            ref="dialogAddUnit"
            :visible.sync="dialogAddUnit.visible"
            top="40px"
            title="添加乙方单位"
            width="750px"
            @closed="resetForm('dialogAddUnit.form')"
        >
            <el-form
                ref="dialogAddUnit.form"
                :inline="true"
                :model="dialogAddUnit.form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="乙方单位名称" prop="name">
                    <el-input v-model.trim="dialogAddUnit.form.name" placeholder="请输入乙方单位名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSearchUnit">查询</el-button>
                    <el-button type="default" @click="resetForm('dialogAddUnit.form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                v-loading="dialogAddUnit.tableLoading"
                :data="dialogAddUnit.tableData"
                class="table"
                max-height="300"
                highlight-current-row
                style="margin-top: 20px"
                border
                @current-change="onCurrentChange"
            >
                <el-table-column label="选择" width="50">
                    <template slot-scope="scope">
                        <el-radio
                            :label="scope.row"
                            v-model="dialogAddUnit.currentData"
                            class="no-label"
                        ></el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="unitId" label="单位编号"></el-table-column>
                <el-table-column prop="unitName" label="单位名称"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAddUnit.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogAddUnit.loading"
                    size="small"
                    type="primary"
                    @click="addUnitConfirm"
                >确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import FormBox from '@/components/form-box'

export default {
    components: {
        FormBox
    },
    data() {
        return {
            dialogAddUnit: {
                form: {
                    name: '乙方单位',
                },
                currentData: {},
                tableLoading: false,
                loading: false,
                visible: false
            },
            loading: false,
            submitLoading: false,
            fileList: []
        }
    },
    computed: {
        ...mapState({
            form: state => state.contractMgt.step1Data
        }),
    },
    methods: {
        onCurrentChange(data) {
            const me = this
            let {dialogAddUnit} = me
            dialogAddUnit.currentData = data
        },
        addUnit() {
            this.dialogAddUnit.visible = true
            this.$nextTick(() => {
                this.dialogAddUnit.form.name = this.form.unitName
                this.dialogAddUnit.tableData = [
                    {
                        unitName: '测试乙方单位',
                        unitId: '测试乙方id'
                    }
                ]
            })
        },
        onSearchUnit() {
        },
        addUnitConfirm() {
            if (!this.dialogAddUnit.currentData.unitId) {
                this.$message.warning(`请选择乙方单位`)
                return false
            }
            this.form.unitName = this.dialogAddUnit.currentData.unitName
            this.dialogAddUnit.visible = false
        },
        next() {
            this.$store.commit('contractMgt/next',2)
        },
        init() {
            const me = this
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`)
        },
        beforeImageUpload(file) {
            const w = 200
            const h = 100
            /*  if (!(file.size / 1024 < 200)) {
                                                                                                              this.$message.error('上传头像图片大小不能超过 200KB')
                                                                                                              return false
                                                                                                          }*/
            return new Promise(function(resolve, reject) {
                let _URL = window.URL || window.webkitURL
                let img = new Image()
                img.onload = function() {
                    //let valid = img.width === w && img.height === h
                    let valid = true
                    valid ? resolve() : reject()
                }
                img.src = _URL.createObjectURL(file)
            }).then(res => {
                return file
            }, err => {
                this.$message.error('上传头像图片尺寸不为200*100')
                return Promise.reject()
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        onUploadError() {
            const me = this
            return (res, file) => {
                this.$message({type: 'error', message: '上传失败'})
            }
        },
        onUploadSuccess() {
            const me = this
            return (res, file) => {
                if (res.code === '0') {
                    me.form.imagePath = res.data.results.url || ''
                    me.$refs.form.validateField(`imagePath`)
                    me.fileList.splice(0, 1, {url: res.data.results.url})
                    this.$refs.form.validateField('imagePath')
                } else {
                    this.$message({type: 'error', message: res.msg})
                    me.fileList = []
                    me.$refs.form.validateField(`imagePath`)
                }
            }


        },
        submitForm(formName) {
            const me = this
            const {form} = me
            this.$refs[formName].validate((valid) => {
                if (!valid) return false
                let postData = {
                    ...form
                }
            })
        },
        addItem() {
            this.form.list.push({
                value: '',
                key: Date.now()
            })
        },
        removeItem(item) {
            if (this.form.list.length === 1) return
            const index = this.form.list.indexOf(item)
            if (index !== -1) {
                this.form.list.splice(index, 1)
            }
        }
    }


}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .no-label {
        /deep/ {
            .el-radio__label {
                display: none;
            }
        }
    }
</style>
