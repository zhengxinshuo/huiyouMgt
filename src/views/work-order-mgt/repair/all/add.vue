<template>
    <div class="supplier-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="16">
                    <el-steps :active="step" align-center>
                        <el-step title="创建"></el-step>
                        <el-step title="待接单"></el-step>
                        <el-step title="故障处理"></el-step>
                        <el-step title="转知识库"></el-step>
                        <el-step title="待评价"></el-step>
                        <el-step title="已结束"></el-step>
                    </el-steps>
                </el-col>
                <el-col :span="8" style="text-align: right">
                    <div class="btn-box">
                        <!-- <el-button size="small" @click="$router.go(-1)">返回</el-button>
                         <el-button
                             size="small"
                             type="primary"
                         >
                             存入草稿箱
                         </el-button>
                         <el-button
                             size="small"
                             type="primary"
                             @click="onSubmit"
                         >
                             保存
                         </el-button>-->
                        <el-button size="small" @click="$router.go(-1)">返回</el-button>
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
                label-width="125px"
                size="small"
            >
                <form-box>
                    <template slot="title">
                        基本信息
                    </template>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" prop="value" label="工单类型">
                                <el-select v-model="form.value" clearable>
                                    <el-option label="全部" value="全部"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="radio" label="紧急程度">
                                <el-radio-group v-model="form.radio">
                                    <el-radio :label="1">一般</el-radio>
                                    <el-radio :label="2">紧急</el-radio>
                                    <el-radio :label="3">加急</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="name" label="故障地址">
                                <el-cascader
                                    :options="options"
                                    change-on-select
                                ></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="name" label="联系电话">
                                <el-input :disabled="true" placeholder="请输入电话号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="value" label="是否明确故障资产">
                                <el-radio-group v-model="form.radio">
                                    <el-radio :label="1">否</el-radio>
                                    <el-radio :label="1">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item
                                prop="detail"
                                label="故障描述"
                            >
                                <tinymce :height="300" v-model="form.detail" />
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
                <form-box>
                    <template slot="title">
                        其他
                    </template>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" prop="arr" label="指派工程师">
                                <el-select
                                    v-model="form.arr"
                                    multiple
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="请选择">
                                    <el-option
                                        label="全部"
                                        value="全部">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" prop="value" label="报修科室">
                                <el-select v-model="form.value" clearable>
                                    <el-option label="全部" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="name" label="报修人">
                                <el-input :disabled="true" placeholder="请选择报修人"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="name" label="报修人电话">
                                <el-input placeholder="请输入电话号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="value" label="报修时间">
                                <el-date-picker
                                    v-model="form.time"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item
                                prop="detail"
                                label="备注"
                            >
                                <tinymce :height="300" v-model="form.detail" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item label="添加附件">
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
            <div style="margin: 20px 0 ;text-align: center">
                <el-button type="default" size="small" @click="$router.go(-1)">返回</el-button>
                <el-button type="primary" size="small" @click="onSubmit">存入草稿箱</el-button>
                <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Sticky from '@/components/sticky'
import FormBox from '@/components/form-box'
import Tinymce from '@/components/Tinymce'

export default {
    name: 'EditActivity',
    components: {Sticky, FormBox, Tinymce},
    data() {
        return {
            step: 1,
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }]
            }],


            pageType: '1',
            loading: false,
            submitLoading: false,
            form: {
                arr:[],
                name: '',
                id: '',
                value: '',
                time: '',
                radio: '',
                type: "",
                detail: ''
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            dialogPicturePreview: false
        }
    },
    computed: {},
    watch: {},
    mounted() {
        const me = this
        const pageType = this.pageType = this.$route.params.type
        me.init()
    },
    methods: {
        init() {
            if (this.$route.query.type === '0') {
                this.$route.meta.title = '新增工单'
            } else {
                this.$route.meta.title = '修改工单'
            }

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
                //if (!valid) return false
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
                        name: 'SupplierList'
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
    @import "~@/styles/variables";
    @import "~@/styles/mixin";
    
    .supplier-add {
        
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
