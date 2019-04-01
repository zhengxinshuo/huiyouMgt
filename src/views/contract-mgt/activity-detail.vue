<template>
    <div v-loading.lock="loading" class="goods-detail">
        <div class="wrapper">
            <ul class="list">
                <li class="row">
                    <div class="row__title">活动名称</div>
                    <div class="row__content">{{ detail.activityName }}</div>
                </li>
                <li class="row">
                    <div class="row__title">活动分类</div>
                    <div class="row__content">{{ detail.activityClassify }}</div>
                </li>
                <li class="row">
                    <div class="row__title">活动简介</div>
                    <div class="row__content">{{ detail.synopsis }}</div>
                </li>
                <li class="row">
                    <div class="row__title">活动开始时间</div>
                    <div class="row__content">{{ formatDateTime(detail.startTime) }}</div>
                </li>
                <li class="row">
                    <div class="row__title">活动结束时间</div>
                    <div class="row__content">{{ formatDateTime(detail.endTime) }}</div>
                </li>
                <li class="row">
                    <div class="row__title">主图</div>
                    <div class="row__content">
                        <el-row>
                            <el-col :span="8">
                                <div class="img-box">
                                    <img :src="detail.imagePath" class="img-box__img">
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </li>
                <li class="row">
                    <div class="row__title">白名单</div>
                    <div class="row__content">
                        <el-table
                            :data="detail.whiteList"
                            style="width: 100%"
                            class="table"
                            border
                        >
                            <el-table-column prop="listId" label="名单编号"></el-table-column>
                            <el-table-column prop="listName" label="名单名称"></el-table-column>
                        </el-table>
                    </div>
                </li>
                <li class="row">
                    <div class="row__title">活动详情</div>
                    <div class="row__content" v-html="detail.detail"></div>
                </li>
                <li class="row">
                    <div class="row__title">关联货架</div>
                    <div class="row__content">
                        <el-table :data="detail.shelves" style="width: 100%" class="table" border>
                            <el-table-column prop="shelfId" label="货架编号"></el-table-column>
                            <el-table-column prop="shelfName" label="货架名称"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="viewShelf(scope.row.shelfId)"
                                    >查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </li>
            </ul>
            <div class="btn-box">
                <el-button size="small" @click="back">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { getActivityDetail } from "../../api/activity"

export default {
    name: 'ActivityDetail',
    data() {
        return {
            loading: false,
            detail: {}
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        formatDateTime(str) {
            try {
                if (!str) return '无数据'
                let dateTime = new Date(str)
                if (!dateTime) return false
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
        viewShelf(id) {
            this.$router.push({
                name: 'Shelf',
                params: {
                    shelfId: id
                }
            })
        },
        back() {
            this.$router.go(-1)
        },
        getDetail() {
            let activityId = this.$route.params.id
            this.loading = true
            getActivityDetail({
                activityId: activityId
            }).then(res => {
                this.loading = false
                this.detail = filterFetchData(res.results || {})
            }, err => {
                this.loading = false
            })

            function filterFetchData(data) {
                data = data || {}
                data.activity = data.activity || {}
                data.shelves = data.shelves || []
                data.whiteList = [{
                    listName: data.listName,
                    listId: data.listId
                }]
                return data
            }
        }
    },

}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixin";

.goods-detail {
    position: relative;
    .wrapper {
        margin: 0 auto;
        padding: 20px;
        width: 80%;
    }
    .list {
        border: 1px solid $c-border;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .row {
        display: flex;
        border-bottom: 1px solid $c-border;
        &__title {
            padding: 18px;
            width: 126px;
            flex: 0 0 126px;
            font-size: $font-m;
            font-weight: 500;
            color: #606266;
            background: #f5f7fa;
        }
        &__content {
            flex: 1;
            padding: 18px;
            border-left: 1px solid $c-border;
            font-size: 14px;
            color: #606266;
        }
        &:last-child {
            border-bottom: 0;
        }
    }
    .img-box {
        width: 146px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        overflow: hidden;
        &__img {
            width: 100%;
            display: block;
        }
    }
    .btn-box {
        margin: 30px 0;
        text-align: center;
    }
}
</style>
