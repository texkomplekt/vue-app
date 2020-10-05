<template>
    <section class="org">
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
                    v-model="form.country"
                    placeholder="Выберите страну..."
                    @change="(val) => filter(val, 'Country')"
                    :clearable="true">
                    <el-option
                        v-for="(item, index) in optionsCountry"
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
        <div class="table table-org">
            <div class="theader">
            <div class="th">Название</div>
            <div class="th">Расположение</div>
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
                            @click="$router.push({name: 'organization', params: {id: item.id, item: item}})">
                            {{item.name}}
                        </a>
                    </div>
                    <div class="cell">
                        <span>{{item.country}}</span>
                        <span>{{item.city}}</span>
                    </div>
                    <div class="cell">
                    <span>
                        <i class="el-icon-message"></i>
                        <span>{{item.email}}</span>
                    </span>
                    <span>
                        <i class="el-icon-mobile-phone"></i>
                        <span>{{item.phone}}</span>
                    </span>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            ref="newOrg"
            title="Добавить организацию">
            <FormOrganization 
                @add="addOrg"
                @close="$refs.newOrg.onCancel()"/>
            <template slot="footer">
                <span></span>
            </template>
        </Modal>
    </section>
</template>
<script>
import organizations from '@/lib/organizations';
import FormOrganization from '@/components/FormOrganization';
import Modal from '@/components/Modal.vue';
export default {
    name: 'Organizations',
    components: {
      FormOrganization,
      Modal,
    },
    data() {
        return {
            form: {
                country: null,
                name: '',
            },
            optionsCountry: [],
            data: [],
            filterData: [],
        }
    },
    created() {
        this.data = [...organizations];
        this.filterData = [...organizations];
        this.optionsCountry = [];
        this.data.forEach((el) => {
            if (this.optionsCountry.findIndex((val => val === el.country)) === -1) {
                this.optionsCountry.push(el.country);
            }
        });
    },
    methods: {
        showForm() {
            this.$refs.newOrg.show();
        },
        filter(val, key) {
            if (val || val === 0) {
                this.filterData = 
                this.data.filter((el) => {
                    return el[key.toLowerCase()].toLowerCase() === this.optionsCountry[val].toLowerCase();
                });
            } else {
                this.filterData = [...this.data];
            }
        },
        filterName(val) {
            if (val) {
                const v = val.toLowerCase(); 
                this.filterData = this.data.filter(
                  (el) => el.name.toLowerCase().indexOf(v) > -1);
            } else {
                this.filterData = [...this.data];
            }
        },
        addOrg(org) {
            this.data.push(org);
            this.filterData.push(org);
            this.optionsCountry.push(org.country);
            this.$refs.newOrg.shown = false;
        }
    }
}
</script>
<style lang="scss">
@import '../assets/styles/table.scss';
.org .table-org {
    min-width: 680px;
    .cell,
    .th {
        width: 25%;
    }
}

</style>
<style lang="scss" scoped>
.org .form {
    min-width: 680px;
    display: flex;
    align-items: center;
    height: var(--height-module);
    padding: var(--padding-small) var(--padding-midi);
    box-sizing: border-box;
    background: var(--color-theme-4);
}
</style>
