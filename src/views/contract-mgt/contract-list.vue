<template>
    <div class="page-container">
        <div class="top">
            <el-form
                ref="form"
                :inline="true"
                :model="form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="活动编号" prop="activityId">
                    <el-input v-model="form.activityId" placeholder="请输入活动编号"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" prop="activityName">
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
                <el-form-item label="活动状态" prop="activityState">
                    <el-select v-model="form.activityState" filterable>
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="未开始" value="1"></el-option>
                        <el-option label="进行中" value="2"></el-option>
                        <el-option label="暂停" value="3"></el-option>
                        <el-option label="结束" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联货架" prop="contentId">
                    <el-input v-model="form.contentId" placeholder="请输入关联的货架编号"></el-input>
                </el-form-item>
                <el-form-item prop="startTime" class="date-wrapper" label="活动有效时间">
                    <el-date-picker
                        v-model="validTime"
                        :default-time="['12:00:00','12:00:00']"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="small">新建活动</el-button>
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
            >
                <el-table-column prop="activityId" label="活动编号"></el-table-column>
                <el-table-column prop="activityName" label="活动名称"></el-table-column>
                <el-table-column prop="email" label="详情">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                        >查看
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="activityClassify" label="活动分类"></el-table-column>
                <el-table-column label="开始时间">
                    <template slot-scope="scope">{{ formatDateTime(scope.row.startTime) }}</template>
                </el-table-column>
                <el-table-column label="结束时间">
                    <template slot-scope="scope">{{ formatDateTime(scope.row.endTime) }}</template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">{{ activityStateMap(scope.row.activityState) }}</template>
                </el-table-column>
                <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" >删除</el-button>
                        <el-button type="text" size="small" >编辑</el-button>
                        <el-button type="text" size="small" >修改</el-button>
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
        </div>
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
            validTime: [],
            form: {
                contentId: '',
                activityClassify: '',
                activityName: '',
                activityId: '',
                activityState: '',
                startTime: '',
                endTime: ''
            },

            tableData: [],
        }
    },
    watch: {
        'validTime'(val) {
            if (val) {
                console.log(val)
                this.form.startTime = val[0] ? val[0].toJSON() : ''
                this.form.endTime = val[1] ? val[1].toJSON() : ''
            } else {
                this.form.startTime = ''
                this.form.endTime = ''
            }
            this.$refs.form.validateField('startTime')
        }
    },

    created() {
        const me = this
        me.init()
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields()
            if (formName === 'form') {
                this.validTime = []
            }
        },
        init() {
            const me = this
            me.form.activityId = me.$route.params.id || ''
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

            setTimeout(()=>{
                me.tableLoading = false
                me.tableData = []
                me.page.totalCount = 100
            },500)
            
        },
        formatDateTime(str) {
            try {
                let dateTime = new Date(str)
                let year = dateTime.getFullYear()
                let month = dateTime.getMonth() + 1
                let date = dateTime.getDate()
                if (month < 10) month = '0' + month
                if (date < 10) date = '0' + date
                return `${year}-${month}-${date}`
            } catch (e) {
                this.$message({
                    type: 'err',
                    message: '时间格式出错'
                })
                return ''
            }
        },
        onSubmit() {
            console.log(this.form)
            this.getTableData()
        }
        
    },
}
</script>
<style lang="scss" scoped>
    @import "../../styles/variables.scss";
    @import "../../styles/mixin.scss";
    .table {
        margin-top: 20px;
    }
    
    .el-row {
        margin-bottom: 20px;
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
            .date-wrapper {
                .el-form-item__content {
                    width: 475px;
                }
            }
        }
        .table {
            .el-table__body-wrapper {
                @include scrollBar;
            }
        }
    }
    
    .pagination {
        text-align: center;
        margin: 20px 0;
    }
</style>
