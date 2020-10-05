<template>
    <section class="form-user">
        <el-form
            @submit.native.prevent
            :model="form"
            size="small"
            :rules="rules"
            ref="form"
            :class="`form ${data ? 'edit' : ''}`"
            label-position="left"
            label-width="140px">
            <el-tabs 
                v-model="activeTab"
                @tab-click="onTabClick">
                <el-tab-pane name="0">
                    <span slot="label">
                        <i class="el-icon-user"></i>
                        Главная
                    </span>
                    <el-form-item
                        label="Фамилия"
                        prop="lastName">
                        <el-input v-model="form.lastName" :maxlength="200"/> 
                    </el-form-item>
                    <el-form-item
                        label="Имя"
                        prop="name">
                        <el-input v-model="form.name" :maxlength="200"/> 
                    </el-form-item> 
                    <el-form-item
                        label="Отчество"
                        prop="middleName">
                        <el-input v-model="form.middleName" :maxlength="200"/> 
                    </el-form-item>
                    <el-form-item
                        label="Логин"
                        prop="login">
                        <el-input v-model="form.login" :maxlength="200"/> 
                    </el-form-item>
                    <el-form-item
                        label="Пароль"
                        prop="password">
                        <el-input v-model="form.password" show-password :maxlength="200"/> 
                    </el-form-item>
                    <el-form-item
                        v-if="form.password"
                        label="Повторите пароль"
                        prop="passwordConfirm">
                        <el-input v-model="form.passwordConfirm" show-password :maxlength="200"/> 
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="1">
                    <span slot="label">
                        <i class="el-icon-house"></i>
                        Контакты
                    </span>
                    <el-form-item
                        label="Дата рождения"
                        prop="birthday">
                        <el-date-picker
                            v-model="form.birthday"
                            type="date"
                            format="DD.MM.yyyy"
                            placeholder="Выберите дату"
                            value-format="timestamp"
                            style="width: 100%">
                        </el-date-picker>
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
                    <el-form-item
                        label="skype"
                        prop="skype">
                        <el-input v-model="form.skype" :maxlength="200"/> 
                    </el-form-item>
                    </el-tab-pane>
                <el-tab-pane name="2">
                    <span slot="label">
                        <i class="el-icon-suitcase"></i>
                        Работа
                    </span>
                    <el-form-item
                        label="Должность"
                        prop="jobTitle">
                        <el-input v-model="form.jobTitle" :maxlength="200"/> 
                    </el-form-item>
                    <el-form-item
                        label="Организация"
                        prop="organization">
                        <el-input v-model="form.organization" :maxlength="200"/> 
                    </el-form-item>
                    <el-form-item
                        label="Регистрация"
                        prop="entryDate">
                        <el-date-picker
                            v-model="form.entryDate"
                            type="date"
                            format="DD.MM.yyyy"
                            placeholder="Выберите дату"
                            value-format="timestamp"
                            style="width: 100%">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item
                        label="Окончание рег."
                        prop="exitDate">
                        <el-date-picker
                            v-model="form.exitDate"
                            type="date"
                            format="DD.MM.yyyy"
                            placeholder="Выберите дату"
                            value-format="timestamp"
                            style="width: 100%">
                        </el-date-picker>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="3">
                    <span slot="label">
                        <i class="el-icon-picture-outline"></i>
                        Фото
                    </span>
                    <div class="avatar-container">
                        <div class="avatar" :style="`background-image: ${form.avatar ? `url(${form.avatar}) `: 'none'}`"></div>
                        <label class="avatar-label">
                            Загрузить фото
                            <input
                                type="file"
                                name="avatar"
                                id="profile-avatar"
                                accept="image/*"
                                @change="addAvatar"
                                style="position: absolute; clip: rect(0, 0, 0, 0); width: 1px; height: 1px">
                        </label>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <div :class="`buttons ${data ? 'edit' : ''}`">
            <div>
                <el-button 
                    icon="el-icon-arrow-left"
                    circle
                    :disabled="activeTab === '0'"
                    size="mini"
                    plain
                    @click="changeTab(false)">
                </el-button>
                <el-button
                    icon="el-icon-arrow-right"
                    circle
                    @click="changeTab(true)"
                    :disabled="activeTab === '3'"
                    size="mini"
                    plain>
                </el-button>
            </div>
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
    name: 'FormUser',
    props: {
        data: {
            type: Object,
        }
    },
    data() {
        const  validatePass = (rule, value, cb) => {
            if (this.form.passwordConfirm !== '') {
                this.$refs.form.validateField('passwordConfirm');
            }
            cb();
        };
        const validateConfirm = (rule, value, cb) => {
            if (value !== this.form.password) {
                cb(new Error('Введенные значения не совпадают'));
            } else {
                cb();
            }
        };
        return {
            activeTab: '0',
            form: {
                name: '',
                lastName: '',
                middleName: '',
                login: '',
                password: '',
                birthday: null,
                email: '',
                phone: '',
                skype: '',
                jobTitle: '',
                organization: '',
                enrtyDate: null,
                exitDate: null,
                avatar: '',
                validatePass: '',
            },
            rules: {
                name: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                lastName: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                middleName: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                login: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                birthday: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                email: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                phone: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                jobTitle: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                organization: [{required: true, message: 'Поле обязательно', trigger: 'blur'}],
                password: [{ validator: validatePass, trigger: 'blur' }],
                passwordConfirm: [{ validator: validateConfirm, trigger: 'blur' }],
            },
        }
    },
    created() {
        if (this.data) {
            this.form = this.data;
        }
    },
    methods: {
        onTabClick(tab, event) {
            this.activeTab = tab.index.toString();
        },
        changeTab(dir) {
            const delta = dir ? 1 : -1;
            this.activeTab = (parseInt(this.activeTab, 10) + delta).toString();
        },
        onConfirm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (!this.data) {
                        const user = {...this.form};
                        user.id = Math.random().toString();
                        this.$emit('add', user);
                    }  else {
                        this.$router.push({name: 'users'});
                    }
                } else {
                    this.$message.error('Заполните все обязательные поля формы');
                }
            });
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        addAvatar(e) {
            const file = e.target.files[0];
            if (!file.type.match('image.*')) { // проверка типа загруженного файла
                this.$message({
                    showClose: true,
                    message: 'Файл не является изображением',
                    type: 'error',
                });
            } else {
                this.getBase64(file).then((data) => {console.log(data); this.form.avatar = data});
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form-user {
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
        justify-content: space-between;
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
