<template>
    <div class="create-goods">
        <div v-loading="loading" class="wrapper">
            <el-form
                ref="form"
                :model="form"
                label-position="left"
                class="form"
                label-width="80px"
                size="small"
            >
                <el-form-item
                    :rules="{ required: true, message: '活动名称不能为空', trigger: 'blur'}"
                    prop="activityName"
                    label="活动名称"
                >
                    <el-input v-model="form.activityName" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="活动分类" prop="activityClassify">
                    <el-select v-model="form.activityClassify" filterable>
                        <el-option label="美食" value="美食"></el-option>
                        <el-option label="生活" value="生活"></el-option>
                        <el-option label="运动" value="运动"></el-option>
                        <el-option label="节日" value="节日"></el-option>
                        <el-option label="促销" value="促销"></el-option>
                        <el-option label="美妆" value="美妆"></el-option>
                        <el-option label="海淘" value="海淘"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :rules="{ required: true, message: '简介不能为空', trigger: 'blur'}"
                    label="活动简介"
                    prop="synopsis"
                >
                    <el-input
                        :rows="4"
                        v-model="form.synopsis"
                        type="textarea"
                        maxlength="200"
                        placeholder="请输入活动简介"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{ required: true, message: '请上传图片',trigger: ['blur', 'change']}"
                    prop="imagePath"
                    label="主图"
                >
                    <el-upload
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-error="onUploadError()"
                        :on-success="onUploadSuccess()"
                        :before-upload="beforeImageUpload"
                        :file-list="fileList"
                        :limit="1"
                        :action="uploadUrl"
                        :headers="headers"
                        list-type="picture-card"
                        accept="image/jpg, image/jpeg, image/png"
                    >
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">图片尺寸 200*100, &lt; 200KB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    :rules="{ required: true, message: '请输入起止时间',trigger:['blur']}"
                    prop="startTime"
                    label="起止时间"
                >
                    <el-date-picker
                        v-model="validTime"
                        :default-time="['12:00:00','12:00:00']"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    v-if="pageType==='1'"
                    :rules="{ required: true, message: '请选择名单!', trigger: 'change' }"
                    prop="listId"
                    label="白名单">
                    <radio-group
                        v-model="form.listId"
                        :data="whiteList"
                        :max="1"
                        height="200"
                    ></radio-group>
                </el-form-item>
                <el-form-item
                    :rules="{required:true,message:'请输入活动详情'}"
                    prop="detail"
                    label="活动详情"
                    class="no-border"
                >
                    <tinymce :height="300" v-model="form.detail"/>
                </el-form-item>
            </el-form>
            <div class="btn-box">
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
                <el-button
                    :loading="submitLoading"
                    size="small"
                    type="primary"
                    @click="submitForm('form')"
                >
                    提交
                    <span v-show="submitLoading">中...</span>
                </el-button>
            </div>
        </div>

        <el-dialog :visible.sync="dialogPicturePreview" top="0" class="dialog-preview">
            <img :src="dialogImageUrl" alt>
        </el-dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {createActivity,editActivity, getWhiteList, getActivityDetail} from "../../api/activity"
import Tinymce from '@/components/tinymce'
import {URL_UPLOAD_IMG} from "../../api/apiUrl"
export default {
    name: 'EditActivity',
    components: { Tinymce },
    data() {
        return {
            uploadUrl: URL_UPLOAD_IMG,
            whiteList: [],
            validTime: [],
            pageType: '1',
            activityId: '',
            loading: false,
            submitLoading: false,
            form: {
                activityName: '', //名称
                synopsis: '', //简介
                imagePath: '',
                startTime: '',
                endTime: '',
                detail: '',
                activityClassify: '',
                modifyIp: '', //修改ip
                creator: '',  //创建人
                modifier: '', //修改人
                listId: ''
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            dialogPicturePreview: false
        }
    },
    computed: {
        ...mapGetters([
            'headers',
        ]),
    },
    watch: {
        'validTime'(val) {
            if (val) {
                this.form.startTime = val[0] ? val[0].toJSON() : ''
                this.form.endTime = val[1] ? val[1].toJSON() : ''
            } else {
                this.form.startTime = ''
                this.form.endTime = ''
            }
            this.$refs.form.validateField('startTime')
        }
    },
    mounted() {
        const me = this
        const pageType = this.pageType = this.$route.params.type
        this.activityId = this.$route.params.id || ''
        if (pageType === '1') {
            //新增
            this.$route.meta.title = '创建活动'
        } else {
            //编辑
            this.$route.meta.title = '编辑活动'
        }
        me.init()
    },
    methods: {
        init() {
            const me = this
            me.loading = true
            if (me.pageType === '2') {
                //编辑
                //无需请求名单列表
                getActivityDetail({activityId: me.activityId}).then(res => {
                    me.loading = false
                    me.form = Object.assign(me.form, {
                        ...res.results
                    })
                    me.fileList = [{url:res.results.imagePath}]
                    me.validTime = [
                        new Date(res.results.startTime),
                        new Date(res.results.endTime)
                    ]

                }, err => {
                    me.loading = false
                })
            } else {
                getWhiteList({
                    "ascriptionId": "000000"
                }).then(res => {
                    me.loading = false
                    me.whiteList = _filterWhiteList(res.results || [])
                }, err => {
                    me.loading = false
                })
            }


            function _filterWhiteList(arr) {
                arr = arr || []
                arr.forEach(item => {
                    item.label = item && item.listName || ''
                    item.value = item && item.listId || ''
                })
                return arr
            }
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
                postData.listId = form.listId
                if (postData.whiteList) delete postData.whiteList
                me.submitLoading = true

                if (me.pageType === '1') {
                    createActivity(postData).then(res => {
                        me.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        me.$router.push('/activity-mgt/activity')
                    }, err => {
                        me.submitLoading = false
                    })
                }else{
                    postData.activityId = me.activityId
                    delete postData.listId
                    editActivity(postData).then(res => {
                        me.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        me.$router.push('/activity-mgt/activity')
                    }, err => {
                        me.submitLoading = false
                    })
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
        handleRemove() {
            this.form.imagePath = ''
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogPicturePreview = true
        },

    },
}
</script>
<style lang="scss" scoped>
@import "../../styles/variables";
@import "../../styles/mixin";

.create-goods {
    .wrapper {
        margin: 0 auto;
        padding: 20px;
        width: 80%;
    }
    .form {
        border: 1px solid $c-border;
        /deep/ {
            .el-input {
                width: 170px;
            }
            .el-form-item--small.el-form-item {
                padding: 18px;
                border-bottom: 1px solid $c-border;
            }
            .el-form-item {
                margin-bottom: 0;
                margin-right: 0;
            }
        }
    }
    .btn-box {
        margin: 30px 0;
        text-align: center;
    }
    .table {
        margin-top: 20px;
    }
    /deep/ {
        .dialog {
            .el-dialog {
                max-height: 75vh;
                overflow: auto;
                @include scrollBar;
            }

            .attr-wrap {
                margin-bottom: 10px;
                padding: 10px 10px 0 10px;
                border: 1px solid $c-border;
                border-radius: 5px;
                max-height: 120px;
                overflow-y: scroll;
                @include scrollBar;
            }

            .el-radio.is-bordered + .el-radio.is-bordered,
            .el-checkbox.is-bordered + .el-checkbox.is-bordered {
                margin-left: 0;
            }
            .el-radio.is-bordered,
            .el-checkbox.is-bordered {
                margin-right: 10px;
                margin-bottom: 10px;
            }
        }
        .dialog-preview {
            .el-dialog {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 90vw;
                max-height: 90vh;
                width: auto;
                height: auto;
                overflow: auto;
                @include scrollBar;
                img {
                    width: auto;
                    height: auto;
                }
            }
        }
    }
}
</style>
