<template>
    <div>
        <el-form
            ref="form"
            :model="form"
            label-position="left"
            class="form"
            label-width="100px"
            size="small"
        >
            <form-box>
                <p class="tip"><span class="el-icon-warning"></span>提示：1.若是否立项选择“是”，则巡检内容将自动读取所选模板对应的值，选择后才可进行编辑。2.巡检结果和备注为巡检结果录入时各对象自带的字段，本页仅做展示
                </p>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item :rules="{required:true,message:'请输入'}" prop="name" label="任务名称">
                            <el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
                            <span class="form-tip">最多输入30个字</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="value" label="巡检类型">
                            <el-select v-model="form.value" clearable>
                                <el-option label="全部" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item prop="radio" label="是否应用模板">
                            <el-radio-group v-model="form.radio">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="radio" label="模板名称">
                            <el-input v-model="form.name" placeholder="请输入名称关键字" clearable>
                                <el-button
                                    slot="append"
                                    icon="el-icon-search"
                                    @click="add"></el-button>
                            </el-input>
                            <el-button type="text">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="20">
                        <el-form-item label="巡检内容"></el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="20">
                        <el-form-item label="备注">
                            <tinymce :height="200" v-model="form.detail" />
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
import Tinymce from '@/components/Tinymce'

export default {
    components: {
        FormBox,
        Tinymce
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
        add() {
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
        onCurrentChange(data) {
            const me = this
            let {dialogAddUnit} = me
            dialogAddUnit.currentData = data
        },
        next() {
            this.$store.commit('contractMgt/next', 2)
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
            /* if (!(file.size / 1024 < 200)) {
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
    .tip {
        font-size: 14px;
        color: #666;
        margin-bottom: 30px;
        line-height: 1.5;
    }
</style>
