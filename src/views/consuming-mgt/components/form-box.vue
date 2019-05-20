<template>
    <div class="form-box">
        <h3 class="form-box__title">
            <slot name="title"></slot>
        </h3>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "FormBox"
}
</script>
<style scoped lang="scss">
@import "../../../styles/variables";
@import "../../../styles/mixin";


    .form-box {
        margin-bottom: 20px;
        & + .form-box {
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
        }
    }


</style>
