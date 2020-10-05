<template>
    <section class="card">
        <div class="card-wrap user">
            <header class="header">
                <div class="avatar-wrap">
                    <Avatar
                        :width="150"
                        :height="150"
                        :img="item.avatar"/>
                </div>
                <h3 class="title">{{item.name}} {{item.middleName}} <strong>{{item.lastName}}</strong></h3>
                <span class="subtitle">{{item.jobTitle}}</span>
                <el-button 
                    type="text"
                    icon="el-icon-edit"
                    class="edit"
                    title="Редактировать"
                    @click="$router.push({name: 'edit-user', params: {id: item.id, data: item}})">
                </el-button>
                <div class="contacts-block">
                    <button class="contact phone" title="Телефон"></button>
                    <button class="contact skype" title="Скайп"></button>
                    <button class="contact email" title="Email"></button>
                </div>
                <span class="location">
                    <i class="el-icon-location icon"></i>
                    {{`${item.city || ''}, ${item.country || ''}`}}
                </span>
            </header>
            <Details :items="details"/>
            <article class="location-block">
                <header>
                    <a href="" class="link organization" @click="onOrgClick">{{item.organization}}</a>
                    <span class= "country">{{`${item.city || ''}, ${item.country || ''}`}}</span> 
                </header>
                <div id="map"></div>
            </article>
            <Activity :items="activityCurrent" :id="item.id"/>
        </div>
    </section>
</template>
<script>
import Details from '@/components/Details.vue';
import activity from '@/lib/activity';
import organizations from '@/lib/organizations';
import Activity from '@/components/Activity.vue';
import Avatar from '@/components/Avatar.vue';
export default {
    name: 'User',
    components: {
        Details,
        Activity,
        Avatar,
    },
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
        id: {
            type: String,
        }
    },
    data() {
        return {
            details: [],
            activityId: [],
            org: {
                coord: ''
            },
        }
    },
    created() {
        const self = this;
        const item = this.item;
        this.details = [
          { label: 'Логин', value: item.login},
          { label: 'Email', value: item.email},
          { label: 'Телефон', value: item.phone},
          { label: 'Skype', value: item.skype},
          { label: 'Дата рождения', value: new Date(item.birthday).toLocaleString().split(' ,')[0]},
          { label: 'Дата регистрации', value: new Date(item.enrtyDate).toLocaleString().split(' ,')[0]},
      ];;
        this.activityCurrent = activity.filter((el) => el.id === item.id);
        this.org = organizations.find((el) => el.name === item.organization);
        ymaps.ready(() => {
            if (self.org.coord) {
                const map = new window.ymaps.Map("map", {
                center: self.org.coord,
                zoom: 7
            }); 
            }
        });
    },
    methods: {
        onOrgClick() {
            this.$router.push({name: 'organization', params: {id: this.org.id, item: this.org}});
        },
    }
}
</script>
<style lang="scss" scoped>
.card-wrap.user {
    grid-template-columns: minmax(400px, 3fr) minmax(200px, 1fr);
    grid-template-rows: 200px 235px auto;
    grid-template-areas: 
        "header-card header-card"
        "details activity"
        "map activity";
}

@media (max-width: 767.98px) {
    .card-wrap.user {
        grid-template-columns: minmax(250px, 2fr) minmax(200px, 1fr);
        grid-template-rows: 395px 235px auto;
        grid-template-areas: 
        "header-card header-card"
        "details activity"
        "map activity";
    }
}
@media (max-width: 575.98px) { 
    .card .card-wrap.user {
        grid-template-columns: 100%;
        grid-template-rows: 395px auto auto auto;
        grid-template-areas: 
        "header-card"
        "details"
        "map"
        "activity";
    }
}
</style>
