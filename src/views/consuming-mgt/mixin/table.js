export default {
    data() {
        return {
            tableData: [],
            tableLoading:false,
            page: {
                sizes: [20, 50, 100, 200],
                pageNo: 1,
                pageSize: 20,
                totalCount: 0
            }
        }
    },
    methods: {
        onSizeChange(val) {
            this.page.pageSize = val
            this.getTableData()
        },
        onCurrentChange(val) {
            this.page.pageNo = val
            this.getTableData()
        },
    }
}
