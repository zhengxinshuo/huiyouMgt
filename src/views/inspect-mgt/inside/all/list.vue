<template>
    <div class="page-container">
        <el-tabs v-model="form.step" class="tab" type="border-card">
            <el-tab-pane name="1" label="今日计划">
                <el-row :gutter="10" class="row--1">
                    <el-col :span="12">
                        <div class="box">
                            <div class="box__title">
                                <el-row>
                                    <el-col :span="8">
                                        <el-date-picker
                                            v-model="time"
                                            type="date"
                                            size="mini"
                                            placeholder="选择月份">
                                        </el-date-picker>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="box__container">
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="box tag-container">
                            <div class="box__title">
                                今日统计
                            </div>
                            <div class="box__container">
                                <el-row :gutter="10" class="tag-title-tip">
                                    <el-col :span="12">巡检统计</el-col>
                                    <el-col :span="12">巡检结果</el-col>
                                </el-row>
                                <el-row :gutter="20" class="tag-list">
                                    <el-col :span="12">
                                        <div class="tag tag--red">
                                            <div class="tag__icon">
                                                <i class="el-icon-news"></i>
                                            </div>
                                            <div class="tag__content">
                                                <p>0</p>
                                                <p>总任务数</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="tag tag--green">
                                            <div class="tag__icon">
                                                <i class="el-icon-news"></i>
                                            </div>
                                            <div class="tag__content">
                                                <p>0</p>
                                                <p>正常</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20" class="tag-list">
                                    <el-col :span="12">
                                        <div class="tag tag--pink">
                                            <div class="tag__icon">
                                                <i class="el-icon-news"></i>
                                            </div>
                                            <div class="tag__content">
                                                <p>0</p>
                                                <p>已完成任务</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="tag tag--blue">
                                            <div class="tag__icon">
                                                <i class="el-icon-news"></i>
                                            </div>
                                            <div class="tag__content">
                                                <p>0</p>
                                                <p>正常</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20" class="tag-list">
                                    <el-col :span="12">
                                        <div class="tag tag--orange">
                                            <div class="tag__icon">
                                                <i class="el-icon-news"></i>
                                            </div>
                                            <div class="tag__content">
                                                <p>0</p>
                                                <p>生成工单</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="tag tag--purple">
                                            <div class="tag__icon">
                                                <i class="el-icon-news"></i>
                                            </div>
                                            <div class="tag__content">
                                                <p>0</p>
                                                <p>异常</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="box">
                            <div class="box__title">
                                <el-row>
                                    <el-col :span="8">任务列表</el-col>
                                    <el-col :span="16" style="text-align: right">
                                        <el-select v-model="person" placeholder="负责人" size="small" clearable>
                                            <el-option label="全部" value="1"></el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="box__container">
                                <el-table
                                    style="width: 100%"
                                    class="table"
                                    border
                                >
                                    <el-table-column prop="projectId" label="任务名称"></el-table-column>
                                    <el-table-column prop="projectName" label="负责人"></el-table-column>
                                    <el-table-column prop="unitName" label="巡检状态"></el-table-column>
                                    <el-table-column prop="projectStep" label="巡检结果"></el-table-column>
                                    <el-table-column prop="projectState" label="操作"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="2" label="所有巡检">
                <el-form
                    ref="form"
                    :inline="true"
                    :model="form"
                    label-position="left"
                    class="form"
                    size="small"
                    label-width="100px"
                >
                    <el-form-item label="任务名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入名称关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="巡检对象" prop="name">
                        <el-input v-model="form.name" placeholder="请输入对象关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" size="small">表格导出</el-button>
                        <el-button
                            :disabled="!tableSelection.length"
                            type="default"
                            icon="el-icon-delete"
                            size="small"
                            @click="del">批量删除
                        </el-button>
                    </el-col>
                </el-row>
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    style="width: 100%"
                    class="table"
                    border
                    @selection-change="onTableSelectionChange"
                >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="projectId" label="任务名称"></el-table-column>
                    <el-table-column prop="projectName" label="巡检对象"></el-table-column>
                    <el-table-column prop="unitName" label="状态"></el-table-column>
                    <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
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
            </el-tab-pane>
        </el-tabs>
        <el-button class="fixed-btn" icon="el-icon-plus" size="mini" type="primary" @click="add">
            新增巡检
        </el-button>
    </div>
</template>
<script>
import tableMixin from '@/mixin/table'

export default {
    name: 'ProjectAuditList',
    components: {},
    mixins: [tableMixin],
    data() {
        return {
            person: '',
            time: '',
            form: {
                step: '1',
                name: '',
                value: '',
                unitName: '',
            },

            tableData: [],
        }
    },
    watch: {
        'form.step'(val) {
            this.getTableData()
        }
    },

    created() {
        const me = this
        me.init()
    },
    methods: {
        edit(id) {
            this.$router.push({
                name: 'AssetHardwareAdd',
                query: {
                    type: '1',
                    id: id
                }
            })
        },
        view(id) {
            this.$router.push({
                name: 'AssetHardwareDetail',
                query: {
                    id: id
                }
            })
        },
        add() {
            this.$router.push({
                name: 'InspectInsideAllAdd',
                query: {
                    type: '0'
                }
            })
        },
        del(data) {
            this.$confirm('是否删除？', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.getTableData()

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        init() {
            const me = this
            me.form.projectId = me.$route.params.id || ''
            me.getTableData()

        },
        getTableData() {
            const me = this
            me.tableLoading = true
            let postData = {
                ...me.form,
                pageNo: me.page.pageNo,
                pageSize: me.page.pageSize
            }

            setTimeout(() => {
                me.tableLoading = false
                me.tableData = [
                    {
                        id: 123,
                        projectStep: '1',
                        projectName: '合同名称',
                        projectId: '123456',
                        projectClassify: '类型1',
                        projectState: '进行中',
                        time: '2018-01-21',
                        unitName: '乙方单位'
                    }
                ]
                me.page.totalCount = 100
            }, 500)

        },
        onSubmit() {
            this.getTableData()
        }

    },
}
</script>
<style lang="scss" scoped>
    @import "~@/styles/variables";
    @import "~@/styles/mixin";
    
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
   


    .page-container {
        .fixed-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            z-index: 100;
        }
    }
    
    .tab {
        position: relative;
    }
    
    .tag-container {
        background: #F6F7F9;
        .tag-title-tip {
            text-align: center;
            color: #666;
            font-size: 12px;
        }
    }
    
    .tag-list {
        padding: 0 20px;
        .tag {
            @include flex();
            height: 60px;
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
    
    .tip {
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
        line-height: 1.5;
    }
    
    .el-row {
        &.row--1 {
            .box__container {
                height: 250px;
            }
        }
        
    }
    
    .el-icon-warning {
        margin-right: 10px;
        color: $c-danger;
    }
    
    .el-row {
        margin-bottom: 15px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    
    /deep/ {
        .form {
            .el-select > .el-input {
                display: block;
            }
            .el-input {
                width: 170px;
            }
            .el-form-item__content {
                width: 170px;
            }
        }
    }
    
    .pagination {
        text-align: center;
        margin: 20px 0;
    }
</style>
