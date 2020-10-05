<template>
    <section class="users">
        <el-form
            @submit.native.prevent
            :model="form"
            size="small"
            :inline="true"
            class="form">
            <el-form-item style="margin-bottom: 0">
                <el-input 
                    v-model="form.name"
                    :maxlength="200"
                    @input="filterName"
                    placeholder="Поиск">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input> 
            </el-form-item>
            <el-form-item style="margin-bottom: 0">
                <el-select 
                    v-model="form.organization"
                    placeholder="Выберите организацию..."
                    @change="filterOrg"
                    :clearable="true">
                    <el-option
                        v-for="(item, index) in optionsOrg"
                        :key="index"
                        :label="item"
                        :value="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0">
                <el-button 
                    type="primary"
                    size="small"
                    style="width: 115px"
                    icon="el-icon-plus"
                    @click="showForm">
                    Создать
                </el-button>
            </el-form-item>
        </el-form>
        <div class="table table-users">
            <div class="theader">
                <div class="th">Персона</div>
                <div class="th">Организация</div>
                <div class="th">Имя пользователя</div>
                <div class="th">Контакты</div>
            </div>
            <div class="tbody">
                <div 
                    class="row"
                    v-for="(item, index) in filterData"
                    :key="index">
                        <div class="cell">
                            <a 
                                class="link"
                                @click="$router.push({name: 'user', params: {id: item.id, item: item}})">
                                {{`${item.lastName} ${item.name} ${item.middleName}`}}
                            </a>
                            <span>{{item.jobTitle}}</span>
                        </div>
                    <div class="cell">
                        <a 
                            class="link"
                            @click="onOrgClick(item.organization)">{{item.organization}}</a>
                    </div>
                    <div class="cell">
                        <span>{{`${item.login}`}}</span>
                        <span>{{`${item.admin ? 'администратор' : ''}`}}</span>
                    </div>
                    <div class="cell">
                        <span>
                            <i class="el-icon-message icon"></i>
                            <span>{{`${item.email}`}}</span>
                        </span>
                    <span>
                        <i class="el-icon-mobile-phone icon"></i>
                        <span>{{`${item.phone}`}}</span>
                    </span>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            ref="newUser"
            title="Добавить пользователя">
            <FormUser 
                @add="addUser"
                @close="$refs.newUser.onCancel()"/>
            <template slot="footer">
                <span></span>
            </template>
        </Modal>
    </section>
</template>
<script>
import users from '@/lib/users';
import organizations from '@/lib/organizations';
import FormUser from '@/components/FormUser';
import Modal from '@/components/Modal.vue';
export default {
    name: 'Users',
    components: {
      FormUser,
      Modal,
    },
    data() {
        return {
            form: {
                organization: null,
                name: '',
            },
            optionsOrg: [],
            data: [],
            filterData: [],
        }
    },
    created() {
        this.data = [...users];
        this.filterData = [...users];
        this.optionsOrg = organizations.map((el) => el.name);
    },
    methods: {
        showForm() {
            this.$refs.newUser.show();
        },
        filterOrg(val, a, s) {
            if (val) {
                this.filterData = this.data.filter((el) => 
                    el.organization.toLowerCase() === this.optionsOrg[val].toLowerCase());
            } else {
                this.filterData = [...this.data];
            }
        },
        filterName(val) {
            if (val) {
                const v = val.toLowerCase(); 
                this.filterData = this.data.filter((el) => 
                    el.name.toLowerCase().indexOf(v) > -1
                    || el.lastName.toLowerCase().indexOf(v) > -1
                    || el.middleName.toLowerCase().indexOf(v) > -1);
            } else {
                this.filterData = [...this.data];
            }
        },
        addUser(user) {
            this.data.push(user);
            this.filterData.push(user);
            this.optionsOrg.push(user.organization);
            this.$refs.newUser.shown = false;
        },
        onOrgClick(name) {
            const item = organizations.find((el) => name === el.name);
            this.$router.push({name: 'organization', params: {id: item.id, item: item}});
        }
    }
}
</script>
<style lang="scss">


</style>
<style lang="scss" scoped>
@import '../assets/styles/table.scss';
.users {
    overflow-x: auto;
    .table.table-users {
        min-width: 680px;
        .cell,
        .th {
          width: 25%;
          min-width: 150px;
        }
    }
    .form {
        display: flex;
        min-width: 680px;
        align-items: center;
        height: var(--height-module);
        padding: var(--padding-small) var(--padding-midi);
        box-sizing: border-box;
        background: var(--color-theme-4);
    }
    .icon {
        padding-right: var(--padding-small);
    }
}


</style>
