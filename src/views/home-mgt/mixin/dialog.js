export default {
    data() {
        return {}
    },
    methods: {
        submitDialog(dialogName, formName) {
            const me = this
            formName = formName || 'dialogForm'
            let field = dialogName.substr(6).replace(/^[a-zA-Z]/gi, (val) => {
                return val.toLowerCase()
            })
            this.$refs[formName].validate((valid) => {
                if (!valid) return false
                me[formName].loading = true
                this[`${field}Confirm`]().then(res => {
                    me[formName].loading = false
                    me[dialogName] = false
                    me.$message({
                        type: 'success',
                        message: res
                    })
                })
            })
        },
        closeDialog(dialogName, formName) {
            const me = this
            me[dialogName] = false
        },
    }
}
