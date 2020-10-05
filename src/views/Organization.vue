<template>
    <section class="card">
        <div class="card-wrap organization">
            <header class="header">
                <div class="avatar-wrap org">
                    <i class="el-icon-office-building icon"></i>
                </div>
                <h3 class="title">{{item.name}}</h3>
                <span class="subtitle">{{item.city}}</span>
                <el-button 
                    type="text"
                    icon="el-icon-edit"
                    class="edit"
                    title="Редактировать"
                    @click="$router.push({name: 'edit-organization', params: {id: item.id, data: item}})">
                </el-button>
                <div class="bottom">
                    <button class="contact phone" title="Телефон"></button>
                    <button class="contact skype" title="Скайп"></button>
                    <button class="contact email" title="Email"></button>
                </div>
                <span class="location">
                    <i class="el-icon-location icon"></i>
                    {{`${item.city || ''} , ${item.country || ''}`}}
                </span>
            </header>
            <Details :items="details"/>
            <article class="location-block">
                <div id="map"></div>
            </article>
            <Employeers/>
            <Activity :items="activity"/>
        </div>
    </section>
</template>

<script>
import Details from '@/components/Details.vue';
import activity from '@/lib/activity';
import Activity from '@/components/Activity.vue';
import Employeers from '@/components/Employeers.vue';
export default {
    name: 'User',
    components: {
        Details,
        Activity,
        Employeers,
    },
    props: {
        item: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            details: [],
        }
    },
    created() {
        const item = this.item;
        this.details = [
            { label: 'Страна', value: item.country},
            { label: 'Город', value: item.city},
            { label: 'Email', value: item.email},
            { label: 'Телефон', value: item.phone},
        ];
        this.activity = activity.filter((el) => el.id === this.item.id);
            ymaps.ready(() => {
                const map = new window.ymaps.Map("map", {
                    center: item.coord,
                    zoom: 7
                }); 
            });
    }

}
</script>
<style lang="scss" scoped>
.card-wrap.organization {
    grid-template-columns: minmax(400px, 3fr) minmax(200px, 1fr);
    grid-template-rows: 200px 235px auto auto;
    grid-template-areas: 
        "header-card header-card"
        "details activity"
        "map activity"
        "employeers activity";
    .avatar-wrap.org {
        border: 0;
        box-shadow: none;
        left: 80px !important;
        top: 30px !important;
        .icon {
            display: block;
            font-size: var(--height-module);
            border: none;
            border-right: 1px solid var(--color-primary);
            color: var(--color-primary);
            padding: 0 var(--padding-midi);
        }
    }

}

@media (max-width: 767.98px) {
    .card-wrap.organization {
        grid-template-columns: minmax(250px, 2fr) minmax(200px, 1fr);
        grid-template-rows: 395px 235px auto;
        grid-template-areas: 
        "header-card header-card"
        "details activity"
        "map activity";
    }
}
@media (max-width: 575.98px) { 
    .card .card-wrap.organization {
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