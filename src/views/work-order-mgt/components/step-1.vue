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
                <template slot="title">需求内容</template>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item :rules="{required:true,message:'请输入'}" prop="name" label="需求名称">
                            <el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
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
                        <el-form-item :rules="{required:true,message:'请选择'}" prop="value" label="需求类别">
                            <el-select v-model="form.value" clearable>
                                <el-option label="全部" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="radio" label="需求工作量">
                            <el-radio-group v-model="form.radio">
                                <el-radio :label="1">小</el-radio>
                                <el-radio :label="2">中</el-radio>
                                <el-radio :label="3">大</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item :rules="{required:true,message:'请选择'}" prop="value" label="改造系统">
                            <el-select v-model="form.value" clearable>
                                <el-option label="全部" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="radio" label="相关系统">
                            <el-input :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="20">
                        <el-form-item :rules="{required:true,message:'请输入'}" label="需求描述">
                            <tinymce :height="200" v-model="form.detail" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="20">
                        <el-form-item label="需求目的">
                            <tinymce :height="200" v-model="form.detail" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="20">
                        <el-form-item label="需求来源">
                            <tinymce :height="200" v-model="form.detail" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="20">
                        <el-form-item label="备注">
                            <tinymce :height="200" v-model="form.detail" />
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
                                <el-button size="small" type="primary">添加附件</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </form-box>
        </el-form>
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
</style>
