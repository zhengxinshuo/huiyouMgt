export default {
    data() {
        return {
            tableLoading: false, // 表格是否加载
            tableData: [], // 表格数据
            page: { // 分页数据
                sizes: [10, 50, 100, 200], // pageSize 可选范围
                pageNo: 1, // 当前页
                pageSize: 10, // 当前每页多少条
                totalCount: 0, // 总条数
            }
        }
    },
    methods: {
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        // 当 pageSize 改变时
        onSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.page.pageSize = val
            this.getTableData()
        },
        // 当 pageNo 改变时
        onCurrentChange(val) {
            this.page.pageNo = val
            console.log(`当前页: ${val}`)
            this.getTableData()
        },
        onSearch() {
            this.page.pageNo = 1
            this.getTableData()
        },
        // 获取表格数据(在页面上重写该方法)
        getTableData() {
            console.warn('Please rewrite the `getTableData` function!')
            this.tableLoading = true
            setTimeout(() => this.tableLoading = false, 1000)
        }
    }
}
