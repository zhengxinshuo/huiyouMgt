<template>
    <ul class="step-list">
        <li v-for="(item,index) in data" :key="index" :class="{'active':step>index}" class="step">{{ item }}</li>
    </ul>
</template>
<script>
export default {
    props: {
        step: {
            type: Number,
            default: 1
        },
        data: {
            type: Array,
            default() {
                return {}
            }
        }
    }
}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    @import "../../styles/variables";
    @import "../../styles/mixin";
    
    .step-list {
        @include flex(flex-start, center);
        .step {
            position: relative;
            width: 108px;
            padding-left: 15px;
            height: 35px;
            border-radius: 3px;
            @include flex(center, center);
            background: #ECEFF4;
            color: #999;
            font-size: 14px;
            & + .step {
                margin-left: 15px;
            }
            &:after {
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-left: 17.5px solid #ECEFF4;
                border-top: 17.5px solid transparent;
                border-bottom: 17.5px solid transparent;
                display: block;
                content: '';
                position: absolute;
                top: 50%;
                right: -16.5px;
                z-index: 2;
            }
            &:last-child {
                &:after {
                    content: none;
                }
            }
            &:nth-child(n+2) {
                &:before {
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-left: 17.5px solid white;
                    border-top: 17.5px solid transparent;
                    border-bottom: 17.5px solid transparent;
                    display: block;
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    z-index: 1;
                }
            }
            &.active {
                background: linear-gradient(to right, #64CCFF, $c-primary);
                color: white;
                &:after {
                    border-left: 17.5px solid $c-primary;
                }
            }
            
        }
    }
</style>
