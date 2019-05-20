<template>
    <div class="navbar">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
        <breadcrumb />
        <div class="user">
            <div class="item">
                2019-04-07 19:00:00
            </div>
            <div class="item cursor" @click="search">
                <i class="el-icon-search el-icon"></i>
            </div>
            <div class="item">
                <i class="el-icon-bell el-icon"></i>
            </div>
        </div>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
                <i class="el-icon-caret-bottom"/>
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>
                        首页
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item >
                    <span style="display: block" @click="dialogUser.visible = true">
                        个人中心
                    </span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dialog
            ref="dialogUser"
            :visible.sync="dialogUser.visible"
            top="40px"
            title="个人信息"
            width="500px"
            @closed="resetForm('dialogUser.form')"
        >
            <el-form
                ref="dialogUser.form"
                :model="dialogUser.form"
                label-position="left"
                label-width="120px"
                size="small"
                style="padding-left: 40px"
            >
                <el-form-item label="用户名">
                    {{ dialogUser.form.name }}
                </el-form-item>
                <el-form-item
                    :rules="{required:true,message:'未输入密码',trigger:'blur'}"
                    label="密码"
                    prop="password"
                >
                    <el-input v-model="dialogUser.form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="realName">
                    {{ dialogUser.form.userName }}
                </el-form-item>
                <el-form-item
                    :rules="{required:true,message:'未输入手机号码',trigger:'blur'}"
                    label="默认手机号"
                    prop="phone"
                >
                    <el-input v-model="dialogUser.form.phone"></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{required:true,message:'未输入联系方式',trigger:'blur'}"
                    label="备用联系方式"
                    prop="contact"
                >
                    <el-input v-model="dialogUser.form.contact"></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{required:true,message:'未输入微信',trigger:'blur'}"
                    label="微信"
                    prop="wx"
                >
                    <el-input v-model="dialogUser.form.wx"></el-input>
                </el-form-item>
                <el-form-item
                    :rules="{required:true,message:'未输入邮箱',trigger:'blur'}"
                    label="邮箱"
                    prop="email"
                >
                    <el-input v-model="dialogUser.form.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogUser.visible=false">取 消</el-button>
                <el-button
                    :loading="dialogUser.loading"
                    size="small"
                    type="primary"
                    @click="onSubmit"
                >确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/bread-crumb'
import Hamburger from '@/components/hamburger'

export default {
    components: {
        Breadcrumb,
        Hamburger
    },
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
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar'
        ])
    },
    methods: {
        search(){
            this.$router.push({
                name:'Search'
            })
        },
        onSubmit(){
            this.$refs['dialogUser.form'].validate((valid) => {
                //if (!valid) return false
                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
                this.dialogUser.visible = false
            })
        },
        submitDialog(dialogName, formName) {
            const me = this
            formName = formName || `${dialogName}.form`
            let field = dialogName.substr(6).replace(/^[a-zA-Z]/gi, (val) => {
                return val.toLowerCase()
            })

            this.$refs[formName].validate((valid) => {
                //if (!valid) return false
                me[dialogName].loading = true
                this[`${field}Confirm`]().then(res => {
                    me[dialogName].loading = false
                    me[dialogName].visible = false
                    me.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                }, error => {
                    me[dialogName].loading = false
                })
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
        logout() {
            this.$store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../../styles/variables.scss";
    @import "../../../styles/mixin.scss";
    
    .navbar {
        position: relative;
        height: 50px;
        background: white;
        line-height: 50px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                line-height: initial;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
    
    /deep/ {
        .el-input__inner {
            width: 180px;
        }
    }
    
    .user {
        position: absolute;
        height: 50px;
        top: 0;
        display: flex;
        align-items: center;
        right: 90px;
        border-right: 1px solid $c-border;
        border-left: 1px solid $c-border;
        .item {
            height: 100%;
            font-size: 14px;
            padding: 0 15px;
            @include flex(center, center);
            & + .item {
                border-left: 1px solid $c-border;
            }
        }
        .el-icon {
            font-size: 20px;
        }
    }
</style>

