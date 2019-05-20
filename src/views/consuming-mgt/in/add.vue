<template>
    <div class="in-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="12">
                    <h3 class="page-title">入库登记</h3>
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
                label-width="90px"
                size="small"
            >
                <form-box>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" prop="value" label="耗材类型">
                                <el-select v-model="form.value" clearable>
                                    <el-option label="全部" value="全部"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请输入耗材名称'}" prop="name" label="耗材名称">
                                <el-input placeholder="请输入耗材名称" clearable></el-input>
                                <span class="form-tip">最多30个字</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="id" label="品牌">
                                <el-input placeholder="请输入品牌" clearable></el-input>
                                <span class="form-tip">最多10个字</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请输入规格型号'}" prop="name" label="规格型号">
                                <el-input placeholder="请输入规格型号" clearable></el-input>
                                <span class="form-tip">最多30个字</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请输入数量'}" label="数量">
                                <el-input v-model="form.unitName" placeholder="请输入数量" clearable></el-input>
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
                </form-box>
            </el-form>
        </div>
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
            stepList: ['基本信息', '硬件设备', '软件系统', '维保清单', '技术服务'],
            pageType: '1',
            activityId: '',
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
            display: inline-block;
            color: #999;
            margin-left: 10px;
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
        .table {
            margin-top: 20px;
        }
    }
</style>
