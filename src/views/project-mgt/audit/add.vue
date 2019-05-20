<template>
    <div class="project-add">
        <div class="page-add">
            <div class="layout-box">
                <el-row>
                    <el-col :span="18">
                        <step :data="stepList" :step="step"></step>
                    </el-col>
                    <el-col :span="6" style="text-align: right">
                        <div class="btn-box">
                            <el-button v-show="step===1" size="small" @click="$router.go(-1)">返回</el-button>
                            <el-button v-show="step>1" size="small" @click="back">上一步</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="$store.dispatch('contractMgt/saveDraft')"
                            >
                                存草稿
                            </el-button>
                            <el-button
                                v-show="step<3"
                                size="small"
                                type="primary"
                                @click="next()"
                            >
                                下一步
                            </el-button>
                            <el-button
                                v-show="step===3"
                                size="small"
                                type="primary"
                                @click="done()"
                            >
                                完成
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="layout-box">
                <step-1 v-show="step===1" ref="step1"></step-1>
                <step-2 v-show="step===2" ref="step2"></step-2>
                <step-3 v-show="step===3" ref="step3"></step-3>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Sticky from '@/components/sticky'
import FormBox from '@/components/form-box'
import Step1 from './components/step-1'
import Step2 from './components/step-2'
import Step3 from './components/step-3'
import Step from '@/components/step'


export default {
    name: 'EditActivity',
    components: {Step, Sticky, FormBox, Step1, Step2, Step3},
    data() {
        return {
            stepList: ['基本信息', '项目范围', '项目计划'],
            pageType: '1',
            activityId: '',
            loading: false,
            submitLoading: false,
            form: {
                name: '',
                id: '',
                value: '',
                time: '',
                radio: ''
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            dialogPicturePreview: false
        }
    },
    computed: {
        ...mapState({
            step: state => state.projectMgt.step
        }),
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
            //this.$route.meta.title = '创建活动'
        } else {
            //编辑
            //this.$route.meta.title = '编辑活动'
        }
        me.init()
    },
    beforeDestroy() {
        this.$store.dispatch('projectMgt/clear')
    },
    methods: {
        next() {
            const me = this
            const step = me.step
            this.$refs[`step${step}`].next()
        },
        back() {
            const me = this
            const step = me.step
            this.$refs[`step${step}`].back()
        },
        done() {
            const me = this
            const step = me.step
            this.$refs[`step3`].done()
        },
        init() {
        }

    },
}
</script>
<style lang="scss">
    @import "~@/styles/variables";
    @import "~@/styles/mixin";
    
    .project-add {
        
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
            margin-left: 10px;
        }
        
    }
</style>
