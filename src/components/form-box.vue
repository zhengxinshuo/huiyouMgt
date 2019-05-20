<template>
    <div :class="{'view-detail':detail}" class="form-box">
        <h2 v-if="h2" class="form-box__h2">
            {{ h2 }}
        </h2>
        <h3 v-show="showH3" class="form-box__h3">
            <slot name="title"></slot>
        </h3>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "FormBox",
    props: {
        showH3: {
            type: Boolean,
            default: true
        },
        detail: {
            type: Boolean,
            default: false
        },
        h2: {
            type: String,
            default() {
                return ''
            }
        }
    }
}
</script>
<style scoped lang="scss">
    @import "../styles/variables";
    @import "../styles/mixin";
    .form-box {
        margin-bottom: 20px;
        &__h2 {
            line-height: 55px;
            padding-left: 15px;
            font-size: 14px;
            font-weight: bold;
            color: #333;
            margin-top: -10px;
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
        &__h3 {
            color: #606266;
            background: #f3f6fc;
            font-size: 14px;
            padding: 0 15px;
            line-height: 32px;
            margin-bottom: 20px;
        }
        .form-row {
            margin-bottom: 18px;
            padding: 0 30px;
            /deep/ {
                .el-form-item {
                    margin-bottom: 0;
                }
            }
        }
        /*    & + .form-box {
                border-top: 0;
            }
            .form-row {
                padding: 20px;
                margin: 0;
                border: 1px solid $c-border;
                /deep/{
                    .el-form-item{
                        margin-bottom: 0;
                    }
                }
                & + .form-row {
                    border-top: none;
                }
            }
            &__title {
                color: #606266;
                font-size: 16px;
                font-weight: bold;
                line-height: 20px;
                margin-bottom: 20px;
            }*/
        &.view-detail {
            .form-row {
                margin-bottom: 0;
            }
        }
    }


</style>
