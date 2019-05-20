<template>
    <div class="in-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="12">
                    <h3 class="page-title">出库登记</h3>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <div class="btn-box">
                        <el-button size="small" @click="$router.go(-1)">返回</el-button>
                        <el-button
                            size="small"
                            type="primary"
                            @click="onSubmit"
                        >
                            保存
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="layout-box">
            <el-form
                ref="form"
                :model="form"
                label-position="left"
                class="form"
                label-width="130px"
                size="small"
            >
                <form-box>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" prop="value" label="领用科室">
                                <el-select v-model="form.value" clearable>
                                    <el-option label="全部" value="全部"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" prop="name" label="领用人">
                                <el-select v-model="form.value" clearable>
                                    <el-option label="全部" value="全部"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item prop="id" label="选取耗材">
                                <el-button type="primary" @click="addConsumables">选取耗材</el-button>
                                <el-button :disabled="!tableSelection.length" type="default" @click="delConsumables">
                                    删除
                                </el-button>
                                <el-table
                                    :data="tableData"
                                    style="width: 100%"
                                    class="table"
                                    border
                                    @selection-change="onTableSelectionChange"
                                >
                                    <el-table-column lable="选择" type="selection"></el-table-column>
                                    <el-table-column prop="name" label="耗材名称"></el-table-column>
                                    <el-table-column prop="name" label="规格型号"></el-table-column>
                                    <el-table-column prop="name" label="可领用数量"></el-table-column>
                                    <el-table-column prop="name" label="申请数量"></el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item label="领用原因">
                                <el-input placeholder="请输入领用原因" type="textarea"></el-input>
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
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item :rules="{required:true,message:'请输入'}" label="审批人">
                                <el-input placeholder="请输入审批人"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </form-box>
            </el-form>
        </div>
        <el-dialog
            ref="dialogAddConsumables"
            :visible.sync="dialogAddConsumables.visible"
            top="40px"
            title="选取耗材"
            width="750px"
            @closed="resetForm('dialogAddConsumables.form')"
        >
            <el-form
                ref="dialogAddConsumables.form"
                :inline="true"
                :model="dialogAddConsumables.form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="关键字" prop="name">
                    <el-input v-model.trim="dialogAddConsumables.form.name" placeholder="请输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearchConsumables">查询</el-button>
                    <el-button type="default" @click="resetForm('dialogAddConsumables.form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                v-loading="dialogAddConsumables.tableLoading"
                :data="dialogAddConsumables.tableData"
                class="table"
                max-height="300"
                style="margin-top: 20px"
                border
                @selection-change="onDialogTableSelectionChange"
            >
                <el-table-column lable="选择" type="selection">
                </el-table-column>
                <el-table-column prop="name" label="耗材名称"></el-table-column>
                <el-table-column prop="name" label="耗材型号"></el-table-column>
                <el-table-column prop="name" label="可领用数量"></el-table-column>
                <el-table-column prop="name" label="申请数量"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAddConsumables.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogAddConsumables.loading"
                    size="small"
                    type="primary"
                    @click="addConsumablesConfirm"
                >确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Sticky from '@/components/sticky'
import FormBox from '@/components/form-box'

export default {
    name: 'EditActivity',
    components: {Sticky, FormBox},
    data() {
        return {
            dialogAddConsumables: {
                form: {
                    name: '',
                },
                tableData: [],
                tableSelection: [],
                tableLoading: false,
                loading: false,
                visible: false
            },
            tableData: [],
            tableSelection: [],
            pageType: '1',
            loading: false,
            submitLoading: false,
            form: {
                name: '',
                id: '',
                value: '',
                time: '',
                radio: '',
                type: ""
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            dialogPicturePreview: false
        }
    },
    computed: {
        ...mapState({
            step: state => state.contractMgt.step
        }),
    },
    watch: {},
    mounted() {
        const me = this
        const pageType = this.pageType = this.$route.params.type
        this.activityId = this.$route.params.id || ''
        if (pageType === '1') {
            //新增
            //this.$route.meta.title = '创建活动'
        } else {
            //编辑
            //this.$route.meta.title = '编辑活动'
        }
        me.init()
    },
    methods: {
        onSearchConsumables() {
        },
        delConsumables() {
        },
        addConsumables() {
            this.dialogAddConsumables.visible = true
            this.$nextTick(() => {
                this.dialogAddConsumables.tableData = [
                    {
                        name: '测试乙方单位',
                        id: '123'
                    }
                ]
                console.log(this.dialogAddConsumables.tableData)
            })
        },
        addConsumablesConfirm() {
            const me = this
            this.tableData = this.dialogAddConsumables.tableSelection
            this.dialogAddConsumables.visible = false
        },
        onTableSelectionChange(val) {
            this.tableSelection = val
        },
        onDialogTableSelectionChange(val) {
            this.dialogAddConsumables.tableSelection = val
        },
        init() {
        },
        commit() {
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
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (!valid) return false
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
                        name: 'ConsumablesInList'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })


            })


        },
    },
}
</script>
<style lang="scss">
    @import "../../../styles/variables";
    @import "../../../styles/mixin";
    
    .in-add {
        
        .el-input {
            width: 170px;
        }
        .el-textarea__inner {
            height: 100px;
        }
        .flex-w {
            width: 100%;
            .el-input {
                width: 100%;
            }
            .el-input__inner {
                width: 100%;
            }
        }
        .form-tip {
            color: #999;
            margin-left: 20px;
        }
        
        .step-list {
            padding: 20px 0;
            @include flex(flex-start, center);
            .step {
                position: relative;
                width: 108px;
                padding-left: 15px;
                height: 35px;
                border-radius: 3px;
                @include flex(center, center);
                background: #ECEFF4;
                color: #999;
                font-size: 14px;
                & + .step {
                    margin-left: 20px;
                }
                &:after {
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-left: 17.5px solid #ECEFF4;
                    border-top: 17.5px solid transparent;
                    border-bottom: 17.5px solid transparent;
                    display: block;
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: -16.5px;
                    z-index: 2;
                }
                &:nth-child(n+2) {
                    &:before {
                        transform: translateY(-50%);
                        width: 0;
                        height: 0;
                        border-left: 17.5px solid white;
                        border-top: 17.5px solid transparent;
                        border-bottom: 17.5px solid transparent;
                        display: block;
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 0;
                        z-index: 1;
                    }
                }
                &.active {
                    background: linear-gradient(to right, #64CCFF, $c-primary);
                    color: white;
                    &:after {
                        border-left: 17.5px solid $c-primary;
                    }
                }
                
            }
        }
    }
</style>
