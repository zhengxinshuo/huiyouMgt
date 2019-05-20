<template>
    <div class="hardware-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="20" class="tip">
                    <el-row>
                        <el-col :span="1" style="text-align: right">
                            <span class="el-icon-warning" style="margin-right:10px"></span>
                        </el-col>
                        <el-col :span="23">
                            本页面所录入的资产为通过捐赠调拨等方式获取的资产以及验收的合同/项目资产，
                            若需录入进行中的合同/项目资产，请到合同/项目-设备到货页录入。
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4" style="text-align: right">
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
                label-width="100px"
                size="small"
            >
                <form-box>
                    <template slot="title">
                        基本信息
                    </template>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请输入资产名称'}" prop="name" label="资产名称">
                                <el-input placeholder="请输入资产名称" clearable></el-input>
                                <span class="form-tip">最多30个字</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="id" label="原院方编号">
                                <el-input placeholder="请输入资产名称" clearable></el-input>
                                <span class="form-tip">即院方入库时登记的资产编号</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true}" prop="value" label="资产类型">
                                <el-cascader
                                    :options="options"
                                    change-on-select
                                ></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="name" label="品牌">
                                <el-input placeholder="请输入品牌" clearable></el-input>
                                <span class="form-tip">最多10个字</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请输入规格型号'}" prop="id" label="规格型号">
                                <el-input v-model="form.id" placeholder="请输入规格型号" clearable></el-input>
                                <span class="form-tip">最多30个字</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="id" label="序列号">
                                <el-input v-model="form.id" placeholder="请输入序列号" clearable></el-input>
                                <span class="form-tip">最多50个字</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="版本号">
                                <el-input placeholder="请输入版本号"></el-input>
                                <span class="form-tip">最多10个字</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="ip地址">
                                <el-input placeholder="请输入ip地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="20">
                            <el-form-item label="license">
                                <el-input type="textarea" placeholder="请输入"></el-input>
                                <span class="form-tip">若有多个，请以;分割</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </form-box>
                <form-box>
                    <template slot="title">合同及供应商</template>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="取得方式">
                                <el-select v-model="form.value">
                                    <el-option value="1" label="合同采购">合同采购</el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同名称">
                                <el-select v-model="form.value" placeholder="请选择合同">
                                    <el-option value="1" label="全部">全部</el-option>
                                </el-select>
                                <el-button type="text">查看合同</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="项目名称">
                                <el-select v-model="form.value" placeholder="请选择项目">
                                    <el-option value="1" label="全部">全部</el-option>
                                </el-select>
                                <el-button type="text">查看项目</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="供应商名称">
                                <el-input v-model="form.supplierName" placeholder="请选择供应商">
                                    <el-button
                                        slot="append"
                                        icon="el-icon-search"
                                        @click="chooseSupplier"></el-button>
                                </el-input>
                                <el-button type="text">新增</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="服务商名称">
                                <el-input v-model="form.supplierName" placeholder="请选择服务商">
                                    <el-button
                                        slot="append"
                                        icon="el-icon-search"
                                        @click="chooseSupplier"></el-button>
                                </el-input>
                                <el-button type="text">新增</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="到货签收时间">
                                <el-date-picker
                                    v-model="form.time"
                                    type="date"
                                    placeholder="请选择到货签收时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="质保期限">
                                <el-input v-model="form.name" placeholder="请输入数值">
                                </el-input>
                                <span class="form-tip">个月</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="质保开始时间">
                                <el-date-picker
                                    v-model="form.time"
                                    type="date"
                                    placeholder="请选择质保开始时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="质保结束时间">
                                <el-date-picker
                                    v-model="form.time"
                                    :disabled="true"
                                    type="date"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </form-box>
                <form-box>
                    <template slot="title">其他信息</template>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" label="资产状态" prop="value">
                                <el-select v-model="form.value" filterable>
                                    <el-option label="待入库" value="1"></el-option>
                                    <el-option label="在库" value="2"></el-option>
                                    <el-option label="在用" value="3"></el-option>
                                    <el-option label="已借出" value="4"></el-option>
                                    <el-option label="维修中" value="5"></el-option>
                                    <el-option label="已报废" value="6"></el-option>
                                    <el-option label="已退货" value="7"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="存放地点" prop="value">
                                <el-select v-model="form.value" filterable>
                                    <el-option label="全部" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="是否有配件">
                                <el-radio-group v-model="form.radio">
                                    <el-radio :label="2">无</el-radio>
                                    <el-radio :label="1">有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="主件">
                                <el-select v-model="form.value" placeholder="请选择归属的主件" filterable>
                                    <el-option label="全部" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="20">
                            <el-form-item label="备注">
                                <el-input type="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="20">
                            <el-form-item label="合同附件">
                                <el-upload
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    multiple>
                                    <el-button size="small" type="primary">添加附件</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </form-box>
                <div class="btn-group" style="text-align: center;margin:20px 0">
                    <el-button type="default" size="small" @click="$router.go(-1)">返回</el-button>
                    <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
                </div>
            </el-form>
        </div>
        <!--添加供应商-->
        <el-dialog
            ref="dialogChooseSupplier"
            :visible.sync="dialogChooseSupplier.visible"
            top="40px"
            title="选择供应商"
            width="750px"
            @closed="resetForm('dialogChooseSupplier.form')"
        >
            <el-form
                ref="dialogChooseSupplier.form"
                :inline="true"
                :model="dialogChooseSupplier.form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model.trim="dialogChooseSupplier.form.name" placeholder="请输入供应商名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getSupplierTableData">查询</el-button>
                    <el-button type="default" @click="resetForm('dialogChooseSupplier.form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                v-loading="dialogChooseSupplier.tableLoading"
                :data="dialogChooseSupplier.tableData"
                class="table"
                max-height="300"
                highlight-current-row
                style="margin-top: 20px"
                border
                @current-change="onSupplierCurrentChange"
            >
                <el-table-column label="选择" width="50">
                    <template slot-scope="scope">
                        <el-radio
                            :label="scope.row"
                            v-model="dialogChooseSupplier.currentData"
                            class="no-label"
                        ></el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="供应商id"></el-table-column>
                <el-table-column prop="name" label="供应商名称"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogChooseSupplier.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogChooseSupplier.loading"
                    size="small"
                    type="primary"
                    @click="chooseSupplierConfirm"
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

            dialogChooseSupplier: {
                form: {
                    name: '供应商',
                },
                currentData: {},
                tableLoading: false,
                loading: false,
                visible: false
            },
            pageType: '1',
            loading: false,
            submitLoading: false,
            form: {
                supplierName: '',
                name: '',
                id: '',
                arr: [],
                value: '',
                time: '',
                radio: '',
                type: ""
            },
            fileList: [],
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
        me.init()
    },
    methods: {
        onSupplierCurrentChange(data) {
            const me = this
            let {dialogChooseSupplier} = me
            dialogChooseSupplier.currentData = data
            console.log(data)
        },
        chooseSupplier() {
            this.dialogChooseSupplier.visible = true
            this.$nextTick(() => {
                this.dialogChooseSupplier.form.name = this.form.supplierName
                this.getSupplierTableData()
            })
        },
        getSupplierTableData() {
            this.dialogChooseSupplier.tableLoading = true
            setTimeout(() => {
                this.dialogChooseSupplier.tableData = [
                    {
                        name: '测试供应商',
                        id: '测试乙方id'
                    }
                ]
                this.dialogChooseSupplier.tableLoading = false
            }, 500)
        },
        chooseSupplierConfirm() {
            if (!this.dialogChooseSupplier.currentData.id) {
                this.$message.warning(`请选择供应商`)
                return false
            }
            this.form.supplierName = this.dialogChooseSupplier.currentData.name
            this.dialogChooseSupplier.visible = false
        }
        ,

        init() {
            if (this.$route.query.type === '0') {
                this.$route.meta.title = '新增'
            } else {
                this.$route.meta.title = '修改'
            }
        }
        ,
        handleRemove(file, fileList) {
            console.log(file, fileList)
        }
        ,
        handlePreview(file) {
            console.log(file)
        }
        ,
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        }
        ,
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`)
        }
        ,
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
        }
        ,
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
        ,
        onUploadError() {
            const me = this
            return (res, file) => {
                this.$message({type: 'error', message: '上传失败'})
            }
        }
        ,
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


        }
        ,
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
                        name: 'AssetHardwareList'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })


            })


        }
        ,
    },
}
</script>
<style lang="scss">
    @import "../../../styles/variables";
    @import "../../../styles/mixin";
    
    .hardware-add {
        
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
        .tip {
            color: #666;
            font-size: 14px;
            line-height: 1.5;
        }
        .table {
            margin-top: 20px;
        }
    }
</style>
