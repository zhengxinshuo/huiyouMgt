<template>
    <div class="create-shelves">
        <div class="wrapper">
            <el-form
                ref="form"
                :model="form"
                label-position="left"
                class="form"
                label-width="120px"
                size="small"
            >
                <el-form-item
                    :rules="{ required: true, message: '货架名称不能为空', trigger: 'blur'}"
                    prop="shelfName"
                    label="货架名称"
                >
                    <el-input v-model="form.shelfName" placeholder="请输入货架名称"></el-input>
                </el-form-item>
                <form-box>
                    <form-box>
                        <template slot="title">定价下架策略</template>
                        <el-form-item prop="pricingPloy" label="定价策略">
                            <el-radio-group v-model="form.pricingPloy">
                                <el-radio :label="10">动态溢价率</el-radio>
                                <el-radio :label="11">固定溢价率
                                    <el-form-item
                                        ref="p11"
                                        :rules="{ validator:validateItem() }"
                                        class="m-l-20 form-item--inline"
                                        style="display: inline-block"
                                        prop="pricingValue"
                                    >
                                        <el-input
                                            v-model.number="form.pricingValue"
                                            :disabled="form.pricingPloy !== 11"
                                            type="number"
                                            placeholder="请输入固定溢价率"
                                        ></el-input>
                                    </el-form-item>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="offlinePloy" label="下架策略">
                            <el-checkbox-group v-model="form.offlinePloy">
                                <el-row>
                                    <el-col :span="12">
                                        <el-checkbox :label="20">销售价&lt;供应价*
                                            <el-form-item
                                                ref="p20"
                                                :rules="{validator:validateNum(isEnable(20))}"
                                                prop="p20"
                                                class="form-item--inline form-item--short"
                                            >
                                                <el-input
                                                    v-model.number="form.p20"
                                                    :disabled="!isEnable(20)"
                                                    type="number"></el-input>
                                            </el-form-item>
                                            %
                                        </el-checkbox>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-checkbox :label="21">销售价&gt;供应价*
                                            <el-form-item
                                                ref="p21"
                                                :rules="{validator:validateNum(isEnable(21))}"
                                                prop="p21"
                                                class="form-item--inline form-item--short"
                                            >
                                                <el-input
                                                    v-model.number="form.p21"
                                                    :disabled="!isEnable(21)"
                                                    type="number"></el-input>
                                            </el-form-item>
                                            %
                                        </el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-checkbox :label="22">销售价&lt;市场价*
                                            <el-form-item
                                                ref="p22"
                                                :rules="{validator:validateNum(isEnable(22))}"
                                                prop="p22"
                                                class="form-item--inline form-item--short"
                                            >
                                                <el-input
                                                    v-model.number="form.p22"
                                                    :disabled="!isEnable(22)"
                                                    type="number"></el-input>
                                            </el-form-item>
                                            %
                                        </el-checkbox>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-checkbox :label="23">销售价&gt;市场价*
                                            <el-form-item
                                                ref="p23"
                                                :rules="{validator:validateNum(isEnable(23))}"
                                                prop="p23"
                                                class="form-item--inline form-item--short"
                                            >
                                                <el-input
                                                    v-model.number="form.p23"
                                                    :disabled="!isEnable(23)"
                                                    type="number"></el-input>
                                            </el-form-item>
                                            %
                                        </el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-checkbox :label="24">销售价&lt;
                                            <el-form-item
                                                ref="p24"
                                                :rules="{validator:validateMoney(isEnable(24))}"
                                                prop="p24"
                                                class="form-item--inline form-item--short"
                                            >
                                                <el-input
                                                    v-model.number="form.p24"
                                                    :disabled="!isEnable(24)"
                                                    type="number"></el-input>
                                            </el-form-item>
                                            元
                                        </el-checkbox>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-checkbox :label="25">销售价&gt;
                                            <el-form-item
                                                ref="p25"
                                                :rules="{validator:validateMoney(isEnable(25))}"
                                                prop="p25"
                                                class="form-item--inline form-item--short"
                                            >
                                                <el-input
                                                    v-model.number="form.p25"
                                                    :disabled="!isEnable(25)"
                                                    type="number"></el-input>
                                            </el-form-item>
                                            元
                                        </el-checkbox>
                                    </el-col>
                                </el-row>
                            </el-checkbox-group>
                        </el-form-item>
                    </form-box>
                </form-box>
                <form-box>
                    <template slot="title">定价运营策略</template>
                    <el-form-item
                        :rules="{ required: true,type:'number', message: '次数不能为空', trigger: 'blur'}"
                        prop="times"
                        label="单sku购买次数"
                    >
                        <el-input v-model.number="form.times" type="number" placeholder="请输入单件商品购买次数"></el-input>
                        <span class="row-tip">0表示不限制</span>
                    </el-form-item>
                    <el-form-item
                        :rules="{type:'number', required: true, message: '次数不能为空', trigger: 'blur'}"
                        prop="totalTimes"
                        label="购买sku总次数"
                    >
                        <el-input v-model.number="form.totalTimes" type="number" placeholder="请输入总共购买次数"></el-input>
                        <span class="row-tip">0表示不限制</span>
                    </el-form-item>
                    <el-form-item
                        :rules="{validator:validateMoney(true)}"
                        prop="totalPrice"
                        label="购买总价"
                    >
                        <el-input v-model.number="form.totalPrice" type="number" placeholder="请输入购买总价"></el-input>&nbsp;&nbsp;元
                        <span class="row-tip">最多两位小数，0表示不限制</span>
                    </el-form-item>
                </form-box>
            </el-form>
            <div class="btn-box">
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
                <el-button :loading="submitLoading" size="small" type="primary" @click="submitForm('form')">提交
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
import Tinymce from '@/components/tinymce'
import FormBox from './components/form-box'
import {createShelf} from "../../api/shelf"

export default {
    name: 'CreateShelves',
    components: { Tinymce, FormBox },
    data() {
        return {
            enterpriseList: [{ label: '卓望', value: '1' }, { label: '卓望', value: '2' }, { label: '移动', value: '3' }],
            form: {
                pricingValue: 0,
                pricingPloy: 10,
                positionId: '',
                offlinePloy: [],
                p20: 0,
                p21: 0,
                p22: 0,
                p23: 0,
                p24: 0,
                p25: 0,
                shelfId: '',
                shelfName: '',
                shelvesList: [],
                name: '电器特卖',
                totalTimes: 0,
                times: 0,
                totalPrice: 0
            },
            submitLoading: false,
            fileList: [],
            radioItem: '',
            checkboxItems: [],
            customItem: '',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                pic: '',
                action: ''
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                pic: '',
                action: ''
            }]
        }
    },
    watch: {
        'form.offlinePloy': {
            handler(newVal, oldVal) {
                if (newVal.length < oldVal.length) {
                    const field = oldVal.find(item => !(newVal.indexOf(item) + 1))
                    this.$refs[`p${field}`].resetField()
                }
            },
            deep: true
        },
        'form.pricingPloy': {
            handler(a, b) {
                if (a === 10) {
                    this.$refs[`p11`].resetField()
                }
            },
            deep: true
        }
    },
    methods: {
        validateItem() {
            return (rule, value, callback) => {
                if (this.form.pricingPloy !== 11) callback()
                const num = Number(value)
                const reg = /(\.\d)/g
                if (reg.test(num)) {
                    callback(new Error('不能有小数'))
                    return
                }
                if (isNaN(num) || num < -100) {
                    callback(new Error('必须大于等于0%'))
                    return
                }
                callback()
            }
        },
        validateNum(enable) {
            return (rule, value, callback) => {
                if (!enable) callback()
                const num = Number(value)
                const reg = /(\.\d)/g
                if (reg.test(num)) {
                    callback(new Error('不能有小数'))
                    return
                }
                if ( isNaN(num) || num < 0) {
                    callback(new Error('必须大于等于0%'))
                    return
                }
                callback()
            }
        },
        validateMoney(enable) {
            return (rule, value, callback) => {
                if (!enable) callback()
                const num = Number(value)
                const reg = /^(-?\d+)(\.\d{1,2})?$/
                if (!reg.test(num)) {
                    callback(new Error('最多两位小数'))
                    return
                }
                if ( isNaN(num) || num < 0) {
                    callback(new Error('必须大于等于0'))
                    return
                }
                callback()
            }
        },
        isEnable(ploy) {
            return ~this.form.offlinePloy.indexOf(ploy)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        submitForm(formName) {
            const me = this
            let { form } = me
            let ployList = []
            let offlinePloyCheckbox = form.offlinePloy
            let postData = {
                shelfName: form.shelfName,
                //ascriptionId: '1',     //这鬼东西怎么来的
                //whiteList: form.whiteList,
                ployList,

            }
            //定价策略
            ployList.push({
                ployType: 1,
                ploy: form.pricingPloy,
                ployValue: form.pricingValue
            })
            
            //下架策略
            offlinePloyCheckbox.forEach(item => {
                if (item) {
                    let obj = {
                        ployType: 2,
                        ploy: item,
                        ployValue: form[`p${item}`]
                    }
                    if (String(item) === '24' || String(item) === '25') {
                        obj.ployValue = obj.ployValue * 100
                    }
                    ployList.push(obj)
                }
            })
            //运营策略
            ployList.splice(ployList.length, 0, ...[
                {
                    ployType: 3,
                    ploy: 30,
                    ployValue: form.times
                },
                {
                    ployType: 3,
                    ploy: 31,
                    ployValue: form.totalTimes
                },
                {
                    ployType: 3,
                    ploy: 32,
                    ployValue: form.totalPrice*100
                }
            ])
            this.$refs[formName].validate((valid) => {
                if (!valid) return false
                this.submitLoading = true
                createShelf(postData).then(res => {
                    this.$message({
                        type: 'success',
                        message: '新建成功!'
                    })
                    this.submitLoading = false
                    this.$router.push('/activity-mgt/shelf')
                }, err => {
                    this.submitLoading = false
                })
            })
        },
        changeHandle(data) {
            console.log(data)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        }

    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/variables";
@import "../../styles/mixin";

.m-l-20 {
    margin-left: 20px;
}

.m-space-10 {
    margin: 0 10px;
}

.create-shelves {
    .wrapper {
        margin: 0 auto;
        padding: 20px;
        width: 80%;
    }
    /deep/ {
        .form {
            .el-input {
                width: 170px;
            }
            .el-radio {
                line-height: 32px;
                display: block;
                margin: 0 0 10px;
                &:last-child {
                    margin: 0;
                }
            }
            &-item--inline {
                display: inline-block;
                padding: 0 !important;
                margin: 0 10px 18px;
                &:last-child {
                    margin-bottom: 0 !important;
                }
                &.form-item--short {
                    .el-input {
                        width: 65px;
                    }
                }
            }
            .el-row {
                margin-bottom: 18px;
                &:last-child {
                    margin: 0;
                }
            }
            .row-tip{
                color: $c-danger;
                position: absolute;
                left: 300px;
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
}
</style>
