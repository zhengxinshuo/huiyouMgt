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
                <p class="tip"><span class="el-icon-warning"></span>提示：本页面所填写内容为合同中所购买的软件系统相关信息</p>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item :rules="{required:true,message:'请输入服务期'}" prop="name" label="服务期限">
                            <el-input v-model="form.name" placeholder="请输入服务期" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-row style="margin-bottom: 20px">
                        <el-col :span="24">
                            <el-button type="primary" size="small">下载模板</el-button>
                            <el-button type="primary" size="small">批量导入</el-button>
                            <el-button type="primary" size="small" @click="add">新增</el-button>
                            <el-button type="primary" size="small" @click="del">删除</el-button>
                        </el-col>
                    </el-row>
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        class="table"
                        border
                    >
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="contractName" label="系统名称"></el-table-column>
                        <el-table-column prop="contractClassify" label="设备类型"></el-table-column>
                        <el-table-column prop="contractState" label="功能模块"></el-table-column>
                        <el-table-column prop="contractState" label="质保期限（月）"></el-table-column>
                    </el-table>
                </el-row>
            </form-box>
        </el-form>
        <div class="btn-box">
            <el-button size="small" @click="back">上一步</el-button>
            <el-button
                size="small"
                type="primary"
                @click="next()"
            >
                下一步
            </el-button>
        </div>
        <el-dialog
            ref="dialogAdd"
            :visible.sync="dialogAdd.visible"
            top="40px"
            title="新增"
            width="500px"
            @closed="resetForm('dialogAdd.form')"
        >
            <el-form
                ref="dialogAdd.form"
                :model="dialogAdd.form"
                label-position="left"
                label-width="130px"
                size="small"
                style="padding-left: 40px"
            >
                <el-form-item
                    :rules="{required:true,message:'请输入系统名称',trigger:'blur'}"
                    label="系统名称"
                    prop="password"
                >
                    <el-input v-model="dialogAdd.form.password"></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{required:true,message:'请输入功能模块',trigger:'blur'}"
                    label="功能模块"
                    prop="password"
                >
                    <el-input v-model="dialogAdd.form.password"></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{required:true,message:'请输入保质期',trigger:'blur'}"
                    label="保质期（月）"
                    prop="password"
                >
                    <el-input v-model="dialogAdd.form.password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAdd.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogAdd.loading"
                    size="small"
                    type="primary"
                    @click="onSubmit"
                >确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import FormBox from './form-box'

export default {
    components: {
        FormBox
    },
    data() {
        return {
            tableData: [
                {
                    contractName: '合同名称',
                    contractId: '编号1',
                    contractClassify: '类型1',
                    contractState: '进行中',
                    time: '2018-01-21',
                    unitName: '乙方单位'
                }
            ],
            whiteList: [],
            validTime: [],
            pageType: '1',
            activityId: '',
            loading: false,
            submitLoading: false,
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            dialogPicturePreview: false,
            dialogAdd: {
                form: {
                    name: '用户名',
                    password: '123',
                    realName: 'zheng',
                    phone: '13111211111',
                    contact: '13211111112',
                    email: 'zheng@qq.com',
                    wx: 'zhengxinshuo'
                },
                loading: false,
                visible: false
            },
        }
    },
    computed: {
        ...mapState({
            form: state => state.contractMgt.step3Data
        }),
    },
    methods: {
        del(data) {
            this.$confirm('是否删除？', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.getTableData()

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        onSubmit() {
            this.$refs['dialogAdd.form'].validate((valid) => {
                if (!valid) return false
                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
                this.dialogAdd.visible = false
            })
        },
        add() {
            this.dialogAdd.visible = true
            this.$nextTick(() => {

            })
        },

        test() {

        },
        next() {
            this.$store.commit('CONTRACT_ADD_NEXT_STEP', 4)
        },
        back() {
            this.$store.commit('CONTRACT_ADD_NEXT_STEP', 2)
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
        },
        changeHandle(data) {
            console.log(data)
        },

        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogPicturePreview = true
        },
    }


}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    @import "../../../styles/variables";
    
    .tip {
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
    }
    
    .el-icon-warning {
        margin-right: 10px;
        color: $c-danger;
    }
</style>
