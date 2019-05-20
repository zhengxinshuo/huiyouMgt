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
                    <el-col :span="12">
                        <el-form-item :rules="{required:true,message:'请输入项目名称'}" prop="name" label="项目名称">
                            <el-input v-model="form.name" placeholder="请输入项目名称" clearable></el-input>
                            <span class="form-tip">最多30个字</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="id" label="项目代号">
                            <el-input placeholder="请输入项目代号" clearable></el-input>
                            <span class="form-tip">最多10个字</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="关联合同">
                            <el-input v-model="form.contractName" placeholder="请输入合同关键字" clearable>
                                <el-button
                                    slot="append"
                                    icon="el-icon-search"
                                    @click="addContract"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="乙方单位">
                            <el-input v-model="form.contractName" placeholder="请输入乙方单位" clearable>
                                <el-button
                                    slot="append"
                                    icon="el-icon-search"
                                    @click="addContract"></el-button>
                            </el-input>
                            <el-button icon="el-icon-plus" type="text">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="项目阶段">
                            <el-select v-model="form.value" clearable>
                                <el-option label="全部" value="全部"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :rules="{required:true,message:'请选择'}" label="项目类型">
                            <el-select v-model="form.value" clearable>
                                <el-option label="全部" value="全部"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="紧急程度">
                            <el-radio-group v-model="form.radio">
                                <el-radio :label="4">次要</el-radio>
                                <el-radio :label="3">重要</el-radio>
                                <el-radio :label="2">紧急</el-radio>
                                <el-radio :label="1">特急</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="项目简介">
                            <el-input placeholder="请输入项目简介" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </form-box>
            <form-box>
                <template slot="title">其他</template>
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
                        <el-form-item :rules="{required:true,message:'请选择'}" label="乙方项目经理">
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
                            <el-input placeholder="请输入" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="附件">
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
            </form-box>
        </el-form>
        <!--//添加共联合同-->
        <el-dialog
            ref="dialogAddContract"
            :visible.sync="dialogAddContract.visible"
            top="40px"
            title="添加合同"
            width="750px"
            @closed="resetForm('dialogAddContract.form')"
        >
            <el-form
                ref="dialogAddContract.form"
                :inline="true"
                :model="dialogAddContract.form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="合同名称" prop="name">
                    <el-input v-model.trim="dialogAddContract.form.contractName" placeholder="请输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSearchUnit">查询</el-button>
                    <el-button type="default" @click="resetForm('dialogAddContract.form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                v-loading="dialogAddContract.tableLoading"
                :data="dialogAddContract.tableData"
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
                            v-model="dialogAddContract.currentData"
                            class="no-label"
                        ></el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="contractId" label="单位编号"></el-table-column>
                <el-table-column prop="contractName" label="单位名称"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAddContract.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogAddContract.loading"
                    size="small"
                    type="primary"
                    @click="addContractConfirm"
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
            dialogAddContract: {
                form: {
                    contractName: '',
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
            form: state => state.projectMgt.step1Data
        }),
    },
    methods: {
        onCurrentChange(data) {
            const me = this
            let {dialogAddContract} = me
            dialogAddContract.currentData = data
        },
        addContract() {
            this.dialogAddContract.visible = true
            this.$nextTick(() => {
                this.dialogAddContract.form.contractName = this.form.contractName
                console.log(this.form)
                this.dialogAddContract.tableData = [
                    {
                        contractName: '测试合同名称',
                        contractId: '测试合同id'
                    }
                ]
            })
        },
        onSearchUnit() {
        },
        addContractConfirm() {
            if (!this.dialogAddContract.currentData.contractId) {
                this.$message.warning(`请选择合同`)
                return false
            }
            this.form.contractName = this.dialogAddContract.currentData.contractName
            this.dialogAddContract.visible = false
        },
        next() {
            this.$store.commit('projectMgt/next', 2)
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
        }
    }


}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
</style>
