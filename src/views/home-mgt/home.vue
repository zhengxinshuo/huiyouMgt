<template>
    <div class="page-container">
        <el-row :gutter="10" class="row--1">
            <el-col :span="11">
                <div class="box">
                    <h3 class="box__title">未完成</h3>
                    <div class="box__container">
                        <el-row :gutter="10" class="tag-list">
                            <el-col :span="8">
                                <div class="tag tag--red">
                                    <div class="tag__icon">
                                        <i class="el-icon-news"></i>
                                    </div>
                                    <div class="tag__content">
                                        <p>0</p>
                                        <p>待审批</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="tag tag--orange">
                                    <div class="tag__icon">
                                        <i class="el-icon-news"></i>
                                    </div>
                                    <div class="tag__content">
                                        <p>0</p>
                                        <p>进行中工单</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="tag tag--pink">
                                    <div class="tag__icon">
                                        <i class="el-icon-news"></i>
                                    </div>
                                    <div class="tag__content">
                                        <p>0</p>
                                        <p>未完成项目</p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="13">
                <div class="box">
                    <div class="box__title">
                        <el-row>
                            <el-col :span="12">
                                已完成
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                                <el-date-picker
                                    v-model="time"
                                    type="date"
                                    size="mini"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="box__container">
                        <el-row :gutter="10" class="tag-list">
                            <el-col :span="6">
                                <div class="tag tag--blue">
                                    <div class="tag__icon">
                                        <i class="el-icon-news"></i>
                                    </div>
                                    <div class="tag__content">
                                        <p>0</p>
                                        <p>已接听</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="tag tag--purple">
                                    <div class="tag__icon">
                                        <i class="el-icon-news"></i>
                                    </div>
                                    <div class="tag__content">
                                        <p>0</p>
                                        <p>已建单</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="tag tag--green">
                                    <div class="tag__icon">
                                        <i class="el-icon-news"></i>
                                    </div>
                                    <div class="tag__content">
                                        <p>0</p>
                                        <p>工单已完成</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="tag tag--deepBlue">
                                    <div class="tag__icon">
                                        <i class="el-icon-news"></i>
                                    </div>
                                    <div class="tag__content">
                                        <p>0</p>
                                        <p>知识录入</p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="row--2">
            <el-col :span="12">
                <div class="box">
                    <h3 class="box__title">未完成项目</h3>
                    <div class="box__container">
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            class="table"
                            height="200"
                            border
                        >
                            <el-table-column align="center" prop="name" label="项目名称"></el-table-column>
                            <el-table-column align="center" prop="person" label="院方项目经理"></el-table-column>
                            <el-table-column align="center" prop="state" label="项目阶段"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="box">
                    <h3 class="box__title">系统公告</h3>
                    <div class="box__container">
                        <p class="empty-tip">暂无数据</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="row--3">
            <el-col :span="12">
                <div class="box">
                    <h3 class="box__title">未完成工单</h3>
                    <div class="box__container">
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            class="table"
                            height="200"
                            border
                        >
                            <el-table-column align="center" label="工单类型"></el-table-column>
                            <el-table-column align="center" label="报修科室"></el-table-column>
                            <el-table-column align="center" label="紧急程度"></el-table-column>
                            <el-table-column align="center" label="工程师"></el-table-column>
                            <el-table-column align="center" label="报修时间"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="box">
                    <div class="box__title">
                        <el-row>
                            <el-col :span="14">
                                <span>工单统计</span>
                                <el-date-picker
                                    v-model="time"
                                    type="date"
                                    size="mini"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="10" style="text-align: right">
                                <el-button type="primary" size="mini">更多数据</el-button>
                                <el-button type="default" size="mini">导出</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="box__container">
                        <div class="charts-wrapper">
                            <ve-line :data="chartData" height="280px"></ve-line>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import tableMixin from '@/mixin/table'

export default {
    name: 'Activity',
    components: {},
    mixins: [tableMixin],
    data() {
        return {
            dialogUser: {
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
            chartData: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
                    {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
                    {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
                    {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
                    {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
                    {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
                ]
            },
            time: '',
            validTime: [],
            form: {
                contractClassify: '',
                unitName: '',
                activityClassify: '',
                contractName: '',
                contractId: '',
                contractState: '',
                time: ''
            },
            tableData: [],
        }
    },
    watch: {},

    created() {
        const me = this
    },
    methods: {},
}
</script>
<style lang="scss" scoped>
    @import "../../styles/variables.scss";
    @import "../../styles/mixin.scss";
    
    $tagRed: #F66129;
    $tagOrange: #F89A12;
    $tagPink: #FF5463;
    $tagBlue: #2581EB;
    $tagPurple: #5244A8;
    $tagGreen: #1C9576;
    $tagDeepBlue: #1361C3;
    @mixin tag($color) {
        cursor: pointer;
        background: $color;
        .tag__icon {
            color: lighten($color, 50%);
        }
        .tag__content {
            background: lighten($color, 8%)
        }
        &:hover {
            background: darken($color, 10%);
            .tag__content {
                background: darken($color, 2%);
            }
        }
    }
    
  
    
    .el-row {
        & + .el-row {
            margin-top: 10px;
        }
        &.row--2 {
            .box__container {
                height: 195px;
                .empty-tip {
                    width: 100%;
                    height: 100%;
                    border-radius: 2px;
                    border: 1px solid $c-border;
                    padding-top: 50px;
                    text-align: center;
                    font-size: 12px;
                    color: #999;
                }
            }
        }
        
        &.row--3 {
            .box__container {
                height: 250px;
                
            }
        }
    }
    
    .box {
        padding: 0 14px 14px;
        background: white;
        border-radius: 4px;
        border: 1px solid $c-border;
        .box__title {
            line-height: 50px;
            padding-left: 15px;
            font-size: 14px;
            font-weight: bold;
            color: #333;
            position: relative;
            &:before {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 2px;
                width: 6px;
                height: 15px;
                background: $c-primary;
                border-radius: 20px;
                content: '';
                display: block;
            }
        }
    }
    
    .tag-list {
        .tag {
            @include flex();
            height: 50px;
            border-radius: 4px;
            color: white;
            font-size: 14px;
            overflow: hidden;
            &__icon {
                height: 100%;
                flex: 1;
                @include flex(center, center)
            }
            &__content {
                @include flex(center, center, column);
                height: 100%;
                flex: 2;
                p {
                    color: white;
                    &:nth-child(2) {
                        margin-top: 6px;
                    }
                }
            }
            &--red {
                @include tag($tagRed)
            }
            &--orange {
                @include tag($tagOrange)
            }
            &--pink {
                @include tag($tagPink)
            }
            &--blue {
                @include tag($tagBlue)
            }
            &--purple {
                @include tag($tagPurple)
            }
            &--green {
                @include tag($tagGreen)
            }
            &--deepBlue {
                @include tag($tagDeepBlue)
            }
        }
    }
    
    /deep/ {
        .el-date-editor {
            width: 120px;
            .el-input__inner {
                width: 120px;
            }
        }
    }
    
    .charts-wrapper {
        padding-top: 20px;
    }
</style>
