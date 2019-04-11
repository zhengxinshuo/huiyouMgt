<template>
    <div>
        <div class="page-detail">
            <el-tabs v-model="step">
                <el-tab-pane name="1" label="基本信息">
                    <div class="box">
                        <h3 class="box__title">
                            基本条款
                        </h3>
                        <ul class="box__content">
                            <li class="row">
                                <div class="row__title">
                                    合同名称
                                </div>
                                <div class="row__content">
                                    消消乐
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    合同编号
                                </div>
                                <div class="row__content">
                                    1234567
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    乙方单位
                                </div>
                                <div class="row__content">
                                    黑龙LONG
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    丙方单位
                                </div>
                                <div class="row__content">
                                    黑龙12345
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    合同类型
                                </div>
                                <div class="row__content">
                                    全部
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    合同金额
                                </div>
                                <div class="row__content">
                                    100000
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    合同签订日期
                                </div>
                                <div class="row__content">
                                    19-01-01
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    合同交付日期
                                </div>
                                <div class="row__content">
                                    19-01-01
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    安装调试完成日期
                                </div>
                                <div class="row__content">
                                    19-01-01
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    系统上线日期
                                </div>
                                <div class="row__content">
                                    19-01-01
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    计划终验日期
                                </div>
                                <div class="row__content">
                                    19-01-01
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="box">
                        <h3 class="box__title">
                            服务条款
                        </h3>
                        <ul class="box__content">
                            <li class="row">
                                <div class="row__title">
                                    合同主要条款
                                </div>
                                <div class="row__content">
                                    消消乐
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    服务响应时间
                                </div>
                                <div class="row__content">
                                    1234567
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    是否有巡检
                                </div>
                                <div class="row__content">
                                    是
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    是否有驻场
                                </div>
                                <div class="row__content">
                                    是
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="box">
                        <h3 class="box__title">
                            其他
                        </h3>
                        <ul class="box__content">
                            <li class="row">
                                <div class="row__title">
                                    是否立项
                                </div>
                                <div class="row__content">
                                    是
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    院方项目经理
                                </div>
                                <div class="row__content">
                                    征信说
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    乙方项目经理
                                </div>
                                <div class="row__content">
                                    是
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    乙方其他联系人
                                </div>
                                <div class="row__content">
                                    我
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    备注
                                </div>
                                <div class="row__content">
                                    暂无备注
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    合同发票
                                </div>
                                <div class="row__content">
                                    暂无备注
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    合同附件
                                </div>
                                <div class="row__content">
                                    暂无备注
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    创建人
                                </div>
                                <div class="row__content">
                                    暂无备注
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    创建时间
                                </div>
                                <div class="row__content">
                                    19
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="硬件设备" name="2">
                    <h3 class="box__title">
                        硬件设备
                    </h3>
                    <div class="box">
                        <ul class="box__content">
                            <li class="row">
                                <div class="row__title">
                                    保质期限
                                </div>
                                <div class="row__content">
                                    16个月
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    内容
                                </div>
                                <div class="row__content">
                                    <el-table
                                        :data="tableData"
                                        style="width: 100%"
                                        class="table"
                                        border
                                    >
                                        <el-table-column prop="contractName" label="设备名称"></el-table-column>
                                        <el-table-column prop="contractClassify" label="设备类型"></el-table-column>
                                        <el-table-column prop="unitName" label="设备型号"></el-table-column>
                                        <el-table-column prop="time" label="数量"></el-table-column>
                                        <el-table-column prop="contractState" label="品牌"></el-table-column>
                                        <el-table-column prop="contractState" label="配置和主要性能"></el-table-column>
                                        <el-table-column prop="contractState" label="质保期限（月）"></el-table-column>
                                    </el-table>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="软件系统" name="3">
                    <div class="box">
                        <h3 class="box__title">
                            软件系统
                        </h3>
                        <ul class="box__content">
                            <li class="row">
                                <div class="row__title">
                                    服务期限
                                </div>
                                <div class="row__content">
                                    16个月
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    内容
                                </div>
                                <div class="row__content">
                                    <el-table
                                        :data="tableData"
                                        style="width: 100%"
                                        class="table"
                                        border
                                    >
                                        <el-table-column prop="contractName" label="系统名称"></el-table-column>
                                        <el-table-column prop="contractClassify" label="设备类型"></el-table-column>
                                        <el-table-column prop="contractState" label="功能模块"></el-table-column>
                                        <el-table-column prop="contractState" label="质保期限（月）"></el-table-column>
                                    </el-table>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="维保清单" name="4">
                    <div class="box">
                        <h3 class="box__title">
                            硬件维保
                        </h3>
                        <div class="box">
                            <ul class="box__content">
                                <li class="row">
                                    <div class="row__title">
                                        服务期限
                                    </div>
                                    <div class="row__content">
                                        16个月
                                    </div>
                                </li>
                                <li class="row">
                                    <div class="row__title">
                                        服务等级
                                    </div>
                                    <div class="row__content">
                                        高级
                                    </div>
                                </li>
                                <li class="row">
                                    <div class="row__title">
                                        内容
                                    </div>
                                    <div class="row__content">
                                        <el-table
                                            :data="tableData"
                                            style="width: 100%"
                                            class="table"
                                            border
                                        >
                                            <el-table-column prop="contractName" label="资产名称"></el-table-column>
                                            <el-table-column prop="contractClassify" label="规格型号"></el-table-column>
                                            <el-table-column prop="unitName" label="序列号"></el-table-column>
                                            <el-table-column prop="time" label="原服务到期时间"></el-table-column>
                                            <el-table-column prop="contractState" label="新服务期限（月）"></el-table-column>
                                            <el-table-column prop="contractState" label="新服务开始时间"></el-table-column>
                                        </el-table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="box">
                        <h3 class="box__title">
                            软件维保
                        </h3>
                        <div class="box">
                            <ul class="box__content">
                                <li class="row">
                                    <div class="row__title">
                                    </div>
                                    <div class="row__content">
                                        16个月
                                    </div>
                                </li>
                                <li class="row">
                                    <div class="row__title">
                                        服务等级
                                    </div>
                                    <div class="row__content">
                                        高级
                                    </div>
                                </li>
                                <li class="row">
                                    <div class="row__title">
                                        内容
                                    </div>
                                    <div class="row__content">
                                        <el-table
                                            :data="tableData"
                                            style="width: 100%"
                                            class="table"
                                            border
                                        >
                                            <el-table-column prop="contractName" label="资产名称"></el-table-column>
                                            <el-table-column prop="contractClassify" label="版本号"></el-table-column>
                                            <el-table-column prop="time" label="原服务到期时间"></el-table-column>
                                            <el-table-column prop="contractState" label="新服务期限（月）"></el-table-column>
                                            <el-table-column prop="contractState" label="新服务开始时间"></el-table-column>
                                        </el-table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="技术服务" name="5">
                    <div class="box">
                        <h3 class="box__title">
                            技术服务
                        </h3>
                        <ul class="box__content">
                            <li class="row">
                                <div class="row__title">
                                    服务期限
                                </div>
                                <div class="row__content">
                                    16个月
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    服务开始时间
                                </div>
                                <div class="row__content">
                                    19-01-90
                                </div>
                            </li>
                            <li class="row">
                                <div class="row__title">
                                    技术服务
                                </div>
                                <div class="row__content">
                                    服务内容
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="btn-group" style="text-align: center;margin:40px 0;">
                <el-button size="small" type="default" @click="$router.go(-1)">
                    返回列表
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [{
                contractName: '合同名称',
                contractId: '123456',
                contractClassify: '类型1',
                contractState: '进行中',
                time: '2018-01-21',
                unitName: '乙方单位'
            }],
            step: "1"
        }
    }
}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    @import "../../styles/variables";
    
    .page-detail {
        margin: 0 auto;
        padding: 20px;
        width: 80%;
    }
    
    .el-tab-pane {
        padding: 0 10px;
    }
    
    .box {
        width: 100%;
        &__title {
            padding-left: 20px;
            position:relative;
            display: flex;
            align-items: center;
            margin: 20px 0;
            font-size: 16px;
            font-weight: bold;
            color: $c-font-title;
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
    
    .box__content {
        padding: 0;
        border: 1px solid $c-border;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .row {
            border-bottom: 1px solid $c-border;
            display: flex;
            &__title {
                width: 18%;
                padding: 18px;
                font-size: 14px;
                color: $c-font-sub-text;
                background: #f5f7fa;
                font-weight: bold;
            }
            &__content {
                width: 82%;
                padding: 18px;
                border-left: 1px solid $c-border;
                font-size: 14px;
                color: #606266;
            }
            &:last-child {
                border-bottom: 0;
            }
            &.is-no-title {
                .row__content {
                    border-left: none;
                }
            }
        }
    }
</style>
