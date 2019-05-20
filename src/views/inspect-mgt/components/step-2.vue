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
                <div slot="title">
                    任务计划
                </div>
                <el-row>
                    <el-col :span="24">
                        <el-button icon="el-icon-plus" type="primary" size="small">新增</el-button>
                        <el-button :disabled="!tableSelection.length" icon="el-icon-delete" type="default" size="small">
                            删除
                        </el-button>
                    </el-col>
                </el-row>
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    style="width: 100%"
                    class="table"
                    border
                    @selection-change="onTableSelectionChange"
                >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="projectId" label="负责人"></el-table-column>
                    <el-table-column prop="projectName" label="负责时间段"></el-table-column>
                    <el-table-column prop="unitName" label="重复周期"></el-table-column>
                    <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </form-box>
        </el-form>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import FormBox from '@/components/form-box'
import {tableMixin} from "../../../mixin"

export default {
    components: {
        FormBox
    },
    mixins: [tableMixin],
    data() {
        return {
            tableData: [],
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
            form: state => state.contractMgt.step2Data
        }),
    },
    methods: {
        //完成
        done() {
            this.$confirm('是否提交？', {
                confirmButtonText: '提交',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                })
                this.$router.push({
                    name: 'InspectInsideAllList'
                })
                this.$store.commit('inspectMgt/addDone')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
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
            this.$store.commit('contractMgt/next', 3)
        },
        back() {
            this.$store.commit('contractMgt/next', 1)
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
