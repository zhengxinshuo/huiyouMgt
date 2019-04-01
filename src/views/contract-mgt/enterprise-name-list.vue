<template>
    <div class="page-container">
        <!-- <h2 class="page-title">福利站活动管理</h2>-->
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
                <el-form-item label="企业编号" prop="memberId">
                    <el-input v-model="form.memberId" placeholder="请输入企业编号"></el-input>
                </el-form-item>
                <el-form-item label="企业名称" prop="memberName">
                    <el-input v-model="form.memberName" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="名单编号" prop="listId">
                    <el-input v-model="form.listId" placeholder="请输入名单编号"></el-input>
                </el-form-item>
                <el-form-item label="名单名称" prop="listName">
                    <el-input v-model="form.listName" placeholder="请输入名单名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="small" @click="createNameList">新建企业名单</el-button>
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
            >
                <el-table-column prop="listId" label="名单编号"></el-table-column>
                <el-table-column prop="listName" label="名单名称"></el-table-column>
                <el-table-column label="包含企业">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="viewListDetail(scope.row.memberList)"
                        >{{ scope.row.memberList&&scope.row.memberList.length }}家</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.listId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="pagination">
                <el-pagination
                    :current-page="page.pageNo"
                    :page-sizes="page.sizes"
                    :page-size="page.pageSize"
                    :total="page.totalCount"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="onSizeChange"
                    @current-change="onCurrentChange"
                ></el-pagination>
            </div>
        </div>
        <!--新建企业名单-->
        <el-dialog
            :visible.sync="dialogCreateNameList.visible"
            :title=" dialogCreateNameList.title"
            width="400px"
            @closed="resetForm('dialogCreateNameList.form')"
        >
            <el-form
                ref="dialogCreateNameList.form"
                :model="dialogCreateNameList.form"
                label-position="left"
                label-width="80px"
                size="small"
            >
                <el-form-item
                    :rules="{ required: true, message: '名单名称不能为空', trigger: 'blur'}"
                    prop="listName"
                    label="名单名称"
                >
                    <el-input v-model.trim="dialogCreateNameList.form.listName" placeholder="请输入名单名称"></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{ type: 'array', required: true, message: '请选择企业!', trigger: 'change' }"
                    prop="enterpriseList"
                    label="选择企业"
                >
                    <checkbox-group
                        v-model="dialogCreateNameList.form.enterpriseList"
                        :data="enterpriseList"
                        height="200"
                    ></checkbox-group>
                </el-form-item>
                <el-form-item prop="remark" label="备注">
                    <el-input
                        v-model="dialogCreateNameList.form.remark"
                        type="textarea"
                        placeholder="请输入备注"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogCreateNameList.visible=false">返回</el-button>
                <el-button
                    :loading="dialogCreateNameList.loading"
                    size="small"
                    type="primary"
                    @click="submitDialog('dialogCreateNameList')"
                >确认</el-button>
            </div>
        </el-dialog>
        <!--名单内企业-->
        <el-dialog :visible.sync="dialogViewNameList.visible" title="名单内企业" width="400px">
            <el-table
                v-loading="dialogViewNameList.tableLoading"
                :data="dialogViewNameList.tableData"
                style="width: 100%"
                border
            >
                <el-table-column prop="memberId" label="企业编号"></el-table-column>
                <el-table-column prop="memberName" label="企业名称"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogViewNameList.visible=false">返回</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import tableMixin from '@/mixin/table'

import { getNameList, createNameList, delNameList, editNameList } from "../../api/whiteList"
import { getEnterpriseList } from "../../api/home"

export default {
    name: 'Activity',
    components: {},
    mixins: [tableMixin],
    data() {
        return {
            dialogViewNameList: {
                visible: false,
                tableData: [],
                tableLoading: false
            },
            dialogCreateNameList: {
                title: '新建企业名单',
                visible: false,
                type: '1',  // 1 新增， 2 编辑
                form: {
                    listName: '',
                    enterpriseList: [],
                    remark: ''
                },
                loading: false
            },
            enterpriseList: [],
            form: {
                memberId: '',
                memberName: '',
                listId: '',
                listName: ''
            },
            tableData: []
        }
    },
    created() {
        const me = this
        me.init()
    },
    methods: {
        viewListDetail(data) {
            const me = this
            me.dialogViewNameList.visible = true
            me.$nextTick(() => {
                me.dialogViewNameList.tableData = data || []
            })
        },
        createNameList() {
            const me = this
            me.dialogCreateNameList.visible = true
            me.dialogCreateNameList.title = '新建企业名单'
            me.dialogCreateNameList.type = '1'
            me.$nextTick(() => {
                //me.dialogCreateNameList.form = {}
            })
        },

        createNameListConfirm() {
            const me = this
            let { dialogCreateNameList, enterpriseList } = me

            return new Promise((resolve, reject) => {
                let listMapArr = []
                let listMapObj = {}
                enterpriseList.forEach(item => {
                    listMapObj[item.enterpriseId] = {
                        memberId: item.enterpriseId,
                        memberName: item.enterpriseName
                    }
                })
                dialogCreateNameList.form.enterpriseList.forEach(item => {
                    listMapArr.push(listMapObj[item])
                })
                let postData = {
                    listMemberType: '1',
                    listName: dialogCreateNameList.form.listName || '',
                    listMap: listMapArr,
                    ascriptionId: '',
                    listId: dialogCreateNameList.form.listId || '',
                    remark: dialogCreateNameList.form.remark || ''
                }
                dialogCreateNameList.loading = true
                if (dialogCreateNameList.type === '1') {
                    createNameList(postData).then(res => {
                        me.getTableData()
                        resolve('新建成功')
                    }, err => {
                        reject('')
                    })
                } else {
                    editNameList(postData).then(res => {
                        me.getTableData()
                        resolve('修改成功')
                    }, err => {
                        reject('')
                    })
                }
            })
        },
        submitDialog(dialogName, formName) {
            const me = this
            formName = formName || `${dialogName}.form`
            let field = dialogName.substr(6).replace(/^[a-zA-Z]/gi, (val) => {
                return val.toLowerCase()
            })

            this.$refs[formName].validate((valid) => {
                if (!valid) return false
                me[dialogName].loading = true
                this[`${field}Confirm`]().then(res => {
                    me[dialogName].loading = false
                    me[dialogName].visible = false
                    me.$message({
                        type: 'success',
                        message: res
                    })
                }, error => {
                    me[dialogName].loading = false
                })
            })
        },

        resetForm(formName) {
            this.$refs[formName].resetFields()
            if (formName === 'form') {
                this.validTime = []
            }
        },
        chooseShelf(data) {
            const me = this
            let { dialogForm } = me
            this.dialogChooseShelf = true
            //todo：ajax
            this.$nextTick(() => {
                let allArr = [
                    {
                        shelfName: '卓望货架',
                        shelfId: '1',
                        relationState: '1'
                    }, {
                        shelfName: '移动货架',
                        shelfId: '2',
                        relationState: '2'
                    },
                    {
                        shelfName: '京东货架',
                        shelfId: '3',
                        relationState: '1'
                    }
                ]
                let subArr = []
                allArr.forEach((item) => {
                    item.value = item.shelfId
                    item.label = item.shelfName
                })
                me.shelfList = [...allArr]
                subArr = allArr.filter((item) => {
                    return item.relationState === '1'
                })
                subArr = subArr.map(item => {
                    return item.shelfId
                })
                dialogForm.shelfList = subArr
            })
        },
        getEnterpriseList() {
            getEnterpriseList().then(res => {
                this.enterpriseList = _filter(res.results || [])
            })

            function _filter(arr) {
                arr.forEach(item => {
                    item.label = item.enterpriseName
                    item.value = item.enterpriseId
                })
                return arr
            }
        },
        init() {
            const me = this
            me.form.activityId = me.$route.params.id || ''
            me.getTableData()
            me.getEnterpriseList()
        },
        getTableData() {
            const me = this
            let postData = {
                ...me.form,
                pageNo: me.page.pageNo,
                pageSize: me.page.pageSize
            }
            me.tableLoading = true
            getNameList(postData).then(res => {
                me.tableData = res.results || []
                me.tableLoading = false
                me.page.totalCount = res.totalCount
            }, err => {
                me.tableLoading = false
            })

        },
        onSubmit() {
            this.getTableData()
        },
        edit(data) {
            const me = this
            let _listMap = []
            me.dialogCreateNameList.visible = true
            me.dialogCreateNameList.title = '编辑企业名单'
            me.dialogCreateNameList.type = '2' //编辑
            data.memberList.forEach(item => {
                _listMap.push(item.memberId)
            })
            me.$nextTick(() => {
                me.dialogCreateNameList.form.listName = data.listName
                me.dialogCreateNameList.form.listId = data.listId
                me.dialogCreateNameList.form.enterpriseList = _listMap
                me.dialogCreateNameList.form.remark = data.remark
            })
        },
        del(listId) {
            const me = this
            me.tableLoading = true
            delNameList({ listId: listId, verify: '0' }).then(res => {
                me.tableLoading = false
                let str = res.results && res.results.join(',')
                let msg = str.length?`该企业名单关联了活动${str},确定要删除该企业名单吗？`:`确定要删除该企业名单吗？`
                this.$confirm(msg, {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delNameList({ listId: listId, verify: '1' }).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getTableData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }, err => {
                me.tableLoading = false
            })
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
}

.pagination {
    text-align: center;
    margin: 20px 0;
}
</style>
<style lang="scss">
    .el-message-box__message{
        p{
            word-break: break-all;
        }
    }
</style>
