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
                        <el-button size="small" type="primary" @click="handling">故障处理</el-button>
                        <el-button size="small" type="primary" @click="turnKnowledgeBase">转入知识库</el-button>
                        <el-button size="small" type="primary" @click="done">确认完成</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-form
            ref="form"
            :model="form"
            label-position="left"
            class="form"
            label-width="125px"
            size="small"
        >
            <el-row :gutter="10">
                <el-col :span="20">
                    <div class="layout-box" style="height: 450px">
                        <form-box detail h2="工单信息">
                            <template slot="title">
                                基本信息
                            </template>
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item label="工单编号">
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="工作状态">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item prop="name" label="工单类型">
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item prop="name" label="紧急程度">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item prop="value" label="催单次数">
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item prop="value" label="故障地址">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item
                                        prop="detail"
                                        label="联系电话"
                                    >
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item
                                        prop="detail"
                                        label="是否明确故障资产"
                                    >
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </form-box>
                        <form-box detail>
                            <template slot="title">其他</template>
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item label="维修工程师">
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="报修科室">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item label="报修人">
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="报修人电话">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item label="报修时间">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </form-box>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="layout-box" style="height:450px">
                        <form-box detail h2="工单进度"></form-box>
                        <el-timeline :reverse="true">
                            <el-timeline-item
                                v-for="(activity, index) in timeList"
                                :key="index"
                                :timestamp="activity.timestamp">
                                {{ activity.content }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
                <el-col :span="24">
                    <div class="layout-box">
                        <form-box :show-h3="false" detail h2="处理结果">
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item label="实际工单类型" prop="value">
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="是否明确故障资产" prop="value">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="form-row">
                                <el-col :span="12">
                                    <el-form-item label="实际处理结果" prop="value">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </form-box>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
                <el-col :span="24">
                    <div class="layout-box">
                        <form-box :show-h3="false" detail h2="工单日志">
                            <el-table
                                :data="tableData"
                                style="width: 100%"
                                class="table"
                                border
                            >
                                <el-table-column prop="contractId" label="操作人"></el-table-column>
                                <el-table-column prop="contractName" label="操作类型"></el-table-column>
                                <el-table-column prop="contractClassify" label="操作内容"></el-table-column>
                                <el-table-column prop="unitName" label="操作时间"></el-table-column>
                            </el-table>
                            <!-- 分页器 -->
                            <div class="pagination">
                                <el-pagination
                                    :current-page.sync="page.pageNo"
                                    :page-sizes.sync="page.sizes"
                                    :page-size.sync="page.pageSize"
                                    :total.sync="page.totalCount"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    @size-change="onSizeChange"
                                    @current-change="onCurrentChange"
                                ></el-pagination>
                            </div>
                        </form-box>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        //故障处理
        <el-dialog
            ref="dialogHandling"
            :visible.sync="dialogHandling.visible"
            top="40px"
            title="故障处理"
            width="800px"
            @closed="resetForm('dialogHandling.form')"
        >
            <el-form
                ref="dialogHandling.form"
                :model="dialogHandling.form"
                label-position="left"
                class="form"
                size="small"
                label-width="130px"
            >
                <el-form-item label="实际工单类型" prop="value">
                    <el-select v-model="dialogHandling.form.value" clearable>
                        <el-option label="全部" value="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否明确故障资产" prop="value">
                    <el-radio-group v-model="dialogHandling.form.radio">
                        <el-radio :label="2">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :rules="{required:true,message:'请输入'}" class="flex-w" label="实际处理结果" prop="name">
                    <el-input placeholder="如需关联知识库，可关联知识标题进行快速引用"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <tinymce :height="100" v-model="form.detail" />
                </el-form-item>
                <el-form-item label="附件">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogHandling.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogHandling.loading"
                    size="small"
                    type="primary"
                    @click="handlingConfirm"
                >确 定
                </el-button>
            </div>
        </el-dialog>
        //工单完成
        <el-dialog
            ref="dialogDone"
            :visible.sync="dialogDone.visible"
            top="40px"
            title="工单完成"
            width="800px"
            @closed="resetForm('dialogDone.form')"
        >
            <el-form
                ref="dialogDone.form"
                :model="dialogDone.form"
                label-position="left"
                class="form"
                size="small"
                label-width="130px"
            >
                <el-form-item label="实际工单类型" prop="value">
                    <el-select v-model="dialogDone.form.value" clearable>
                        <el-option label="全部" value="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否明确故障资产" prop="value">
                    <el-radio-group v-model="dialogDone.form.radio">
                        <el-radio :label="2">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :rules="{required:true,message:'请输入'}" class="flex-w" label="实际处理结果" prop="name">
                    <el-input placeholder="如需关联知识库，可关联知识标题进行快速引用"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <tinymce :height="100" v-model="dialogDone.form.detail" />
                </el-form-item>
                <el-form-item label="工单完成时间">
                    <el-date-picker
                        v-model="dialogDone.form.time"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否进行备件替换">
                    <el-radio-group v-model="dialogDone.form.radio">
                        <el-radio :label="2">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <tinymce :height="100" v-model="dialogDone.form.detail" />
                </el-form-item>
                <el-form-item label="附件">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogDone.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogDone.loading"
                    size="small"
                    type="primary"
                    @click="doneConfirm"
                >确 定
                </el-button>
            </div>
        </el-dialog>
        //转入知识库
        <el-dialog
            ref="dialogTurnKnowledgeBase"
            :visible.sync="dialogTurnKnowledgeBase.visible"
            top="40px"
            title="录入知识库"
            width="800px"
            @closed="resetForm('dialogTurnKnowledgeBase.form')"
        >
            <el-form
                ref="dialogTurnKnowledgeBase.form"
                :model="dialogTurnKnowledgeBase.form"
                label-position="left"
                class="form"
                size="small"
                label-width="130px"
            >
                <el-form-item :rules="{required:true,message:'请输入'}" label="标题" prop="value">
                    <el-select v-model="dialogTurnKnowledgeBase.form.value" clearable>
                        <el-option label="全部" value="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :rules="{required:true,message:'请选择'}" prop="category" label="知识分类">
                    <el-cascader
                        v-model="dialogTurnKnowledgeBase.form.category"
                        :options="options"
                        change-on-select
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="重要程度" prop="radio">
                    <el-radio-group v-model="dialogTurnKnowledgeBase.form.radio">
                        <el-radio :label="1">一般</el-radio>
                        <el-radio :label="2">次要</el-radio>
                        <el-radio :label="3">重要</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="问题描述">
                    <tinymce :height="100" v-model="dialogTurnKnowledgeBase.form.detail" />
                </el-form-item>
                <el-form-item label="解决方案">
                    <tinymce :height="100" v-model="dialogTurnKnowledgeBase.form.detail" />
                </el-form-item>
                <el-form-item label="标签" prop="tag">
                    <el-tag
                        v-for="tag in dialogTurnKnowledgeBase.form.tagList"
                        :key="tag"
                        :disable-transitions="false"
                        closable
                        @close="handleTagClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input
                        v-if="dialogTurnKnowledgeBase.tagInputVisible"
                        ref="saveTagInput"
                        v-model="dialogTurnKnowledgeBase.tagInputValue"
                        class="input-new-tag"
                        size="small"
                        @keyup.enter.native="handleTagInputConfirm"
                        @blur="handleTagInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showTagInput">添加标签</el-button>
                </el-form-item>
                <el-form-item label="设为常见问题" prop="radio">
                    <el-radio-group v-model="dialogTurnKnowledgeBase.form.radio">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="解决方案附件">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogTurnKnowledgeBase.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogTurnKnowledgeBase.loading"
                    size="small"
                    type="primary"
                    @click="turnKnowledgeBaseConfirm"
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
import Tinymce from '@/components/Tinymce'
import tableMixin from '@/mixin/table'

export default {
    name: 'EditActivity',
    components: {Sticky, FormBox, Tinymce},
    mixins: [tableMixin],
    data() {
        return {
            dialogTurnKnowledgeBase: {
                tagInputVisible: false,
                tagInputValue: '',
                form: {
                    tagList: ['标签一', '标签二', '标签三'],
                    detail: '',
                    radio: '',
                    value: '',
                    time: '',
                    fileList: '',
                    name: '',
                    tag: []
                },
                tableSelection: [],
                currentData: {},
                tableData: [],
                tableLoading: false,
                loading: false,
                visible: false
            },
            dialogDone: {
                form: {
                    detail: '',
                    radio: '',
                    value: '',
                    time: '',
                    fileList: '',
                    name: '',
                },
                tableSelection: [],
                currentData: {},
                tableData: [],
                tableLoading: false,
                loading: false,
                visible: false
            },
            dialogHandling: {
                form: {
                    detail: '',
                    radio: '',
                    value: '',
                    name: '乙方单位',
                },
                currentData: {},
                tableLoading: false,
                loading: false,
                visible: false
            },
            timeList: [
                {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                }
            ],
            step: 3,
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
                arr: [],
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
        me.init()
    },
    methods: {
        //知识库关闭标签输入
        handleTagInputConfirm() {
            let inputValue = this.dialogTurnKnowledgeBase.tagInputValue
            if (inputValue) {
                this.dialogTurnKnowledgeBase.form.tagList.push(inputValue)
            }
            this.dialogTurnKnowledgeBase.tagInputVisible = false
            this.dialogTurnKnowledgeBase.tagInputValue = ''
        },
        //知识库标签关闭
        handleTagClose(tag) {
            this.dialogTurnKnowledgeBase.form.tagList.splice(this.dialogTurnKnowledgeBase.form.tagList.indexOf(tag), 1)
        },
        //知识库显示编辑标签
        showTagInput() {
            this.dialogTurnKnowledgeBase.tagInputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        //点击转入知识库
        turnKnowledgeBase() {
            this.dialogTurnKnowledgeBase.visible = true
        },
        turnKnowledgeBaseConfirm() {
            this.$refs['dialogTurnKnowledgeBase.form'].validate((valid) => {
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
                    this.dialogTurnKnowledgeBase.visible = false
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            })
        },
        //点击工单完成
        done() {
            this.dialogDone.visible = true
        },
        doneConfirm() {
            this.$refs['dialogDone.form'].validate((valid) => {
                //if (!valid) return false
                this.$confirm('确认提交？', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.dialogDone.visible = false
                    this.$confirm('工单已完成？是否将工单转入知识库', {
                        confirmButtonText: '是，立即转入',
                        cancelButtonText: '不，稍后处理',
                        type: 'info'
                    }).then(() => {
                        //todo:转入知识库的操作
                        this.dialogTurnKnowledgeBase.visible = true
                    }).catch(() => {
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            })
        },
        handling() {
            this.dialogHandling.visible = true
        },
        handlingConfirm() {
            this.$refs['dialogHandling.form'].validate((valid) => {
                if (!valid) return false
                this.$confirm('是否提交故障处理？', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '提交成功!'
                    })
                    this.dialogHandling.visible = false
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            })
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
    }
    ,
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
    
        .el-tag + .el-tag {
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
        
    }
    
    .form {
        margin-top: 10px;
    }
</style>
