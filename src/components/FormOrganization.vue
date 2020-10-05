<template>
    <section class="form-organization">
        <el-form
            @submit.native.prevent
            :model="form"
            size="small"
            :rules="rules"
            ref="form"
            :class="`form ${data ? 'edit' : ''}`"
            label-position="left"
            label-width="130px">
            <el-form-item
                label="Название"
                prop="name">
                <el-input v-model="form.name" :maxlength="200"/> 
            </el-form-item>
            <el-form-item
                label="Страна"
                prop="country">
                <el-input v-model="form.country" :maxlength="200"/> 
            </el-form-item> 
            <el-form-item
                label="Город"
                prop="city">
                <el-input v-model="form.city" :maxlength="200"/> 
            </el-form-item>
            <el-form-item
                label="email"
                prop="email">
                <el-input v-model="form.email" :maxlength="200"/> 
            </el-form-item>
            <el-form-item
                label="Телефон"
                prop="phone">
                <el-input v-model="form.phone" :maxlength="200"/> 
            </el-form-item>
        </el-form>
        <div :class="`buttons ${data ? 'edit' : ''}`">
            <div>
                <el-button
                    @click="onConfirm"
                    type="primary"
                    style="width: 90px"
                    class="button-default">
                    Сохранить
                </el-button>
                <el-button
                    @click="$emit('close')"
                    style="width: 90px"
                    plain>
                    Отменить
                </el-button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'FormOrganization',
    props: {
        data: {
            type: Object,
        }
    },
    data() {
        return {
            form: {
                name: '',
                country: '',
                city: '',
                phone: '',
                email: '',
            },
            rules: {
                name: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                country: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                city: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                phone: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                birthday: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
            },
        }
    },
    created() {
        if (this.data) {
            this.form = this.data;
        }
    },
    methods: {
        onConfirm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (!this.data) {
                        const org = {...this.form};
                        org.id = Math.random().toString();
                        this.$emit('add', org);
                    } else {
                        this.$router.push({name: 'organizations'});
                    }
                } else {
                    this.$message.error('Заполните все обязательные поля формы');
                }
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.form-organization {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 1024px;
    .form {
        padding: 0 var(--padding-base);
        padding-bottom: var(--padding-small);
    }
    .form.edit {
        order: 2;
    }
    .buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: var(--color-theme-4);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
        padding: var(--padding-small) var(--padding-base);
    }
    .buttons.edit {
        order: 1;
        box-shadow: none;
        background: none;
    }
    .avatar-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: var(--padding-small);
    }
    .avatar {
        display: inline-block;
        width: 350px;
        height: 350px;
        margin-bottom: var(--padding-small);
        background-color: var(--color-theme-4);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        border: 1px dotted var(--color-theme-5);
    }
    .avatar-label {
        display: inline-block;
        padding: 12px 14px;
        color: var(--color-theme-2);
        background: var(--color-primary);
        cursor: pointer;
        font-size: var(--font-size-midi);
        &:hover {
            background: #61c8cc;
        }
    }
}
</style>
