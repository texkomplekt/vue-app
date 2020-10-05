<template>
    <transition
        name="fade"
        v-if="shown">
        <div class="modal-mask" @click.self="shown=false">
            <div
                class="dialog"
                :style="width ? `width: ${width}px` : ''">
                <!-- header -->
                <div class="header">
                    <slot name="header">
                        <h2>{{title}}</h2>
                    </slot>
                </div>
                <!-- body -->
                <div class="body">
                    <slot><span>{{message}}</span></slot>
                </div>
                <!-- footer -->
                <div class="footer">
                    <slot name="footer">
                        <el-button
                            @click="onCancel" :style="btnStyle" class="button-danger" plain>
                            {{ cancelText }}
                        </el-button>
                        <el-button
                            @click="onConfirm"
                            :style="btnStyle"
                            class="button-default"
                            plain
                        >
                            {{ confirmText }}
                        </el-button>
                    </slot>
                </div>
                <button type="button" class="close" aria-label="Close" @click="onCancel">
                    <span class="close-icon">&#215;</span>
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: '',
        },
        message: {
            type: String,
            default: '',
        },
        cancelText: {
            type: String,
            default: 'Отменить',
        },
        confirmText: {
            type: String,
            default: 'Продолжить',
        },
        widthBtn: {
            type: [Number, String],
            default: 110,
        },
        width: {
            type: [Number, String],
            default: 500,

        },
    },
    data() {
        return {
            shown: false,
            resolver: null,
            rejecter: null,
        };
    },
    computed: {
        btnStyle() {
            return this.widthBtn ? `width: ${this.widthBtn}px` : '';
        },
    },
    mounted() {
        document.body.appendChild(this.$el);
    },
    methods: {
        show() {
            this.shown = true;
            return new Promise((res, rej) => {
                this.resolver = res;
                this.rejecter = rej;
            });
        },
        onCancel() {
            this.shown = false;
            this.rejecter();
        },
        onConfirm() {
            this.shown = false;
            this.resolver();
        },
    }

}
</script>
<style lang="scss">
.modal-mask .header h2 {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    margin: 0;
}
</style>
<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2000;
    background-color: rgba(0, 0, 0, .4);
    &:after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
    }
    .dialog {
        display: block;
        position: relative;
        min-width: 350px;
        flex-grow: 0;
        background-color: var(--color-theme-2);
        text-align: left;
        .el-button {
            padding: 8px 0 !important;
        }
        .close {
            position: absolute;
            top: 24px;
            right: 24px;
            padding: 0;
            width: 24px;
            height: 24px;
            background: 0 0;
            border: 0;
            color: #c4c4c4;
            font-size: 32px;
            line-height: 0.9;
            cursor: pointer;
            &:focus {
                outline: 1px dotted grey;
            }
            &:hover, :focus {
                color: darken($color: #c4c4c4, $amount: 0);
            }
            .close-icon {
                display: block;
                user-select: none;
            }
        }
        .footer {
            display: flex;
            justify-content: flex-end;
        }
        .header {
            display: flex;
            justify-content: space-between;
            font-size: 1.1rem;
            line-height: 1;
            font-weight: normal;
            padding: var(--padding-base);
            padding-bottom: 0;
            margin-bottom: var(--padding-base);
        }
    }
}
</style>