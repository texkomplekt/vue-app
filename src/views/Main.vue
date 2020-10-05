<template>
    <section id="main">
        <Header 
            v-if="title"
            :title="title"/>
        <Sidebar 
            :items="sidebar"
            @update-view="onSidebarClick"
            @logout="onLogout"
            :currentUser="currentUser"/>
        <router-view/>
    </section>
</template>
<script>
import Sidebar from '@/components/layout/Sidebar.vue';
import Header from '@/components/layout/Header.vue';
import users from '@/lib/users';

export default {
    name: 'Main',
    components: {
        Sidebar,
        Header,
    },
    data() {
        return {
            sidebar: [
                {title: 'Рынки', icon: 's-data', route: 'markets'},
                {title: 'Пользователи', icon: 'user-solid', route: 'users'},
                {title: 'Организации', icon: 'office-building', route: 'organizations'},
            ],
            currentUser: {},
        }
    },
    computed: {
        title() {
            return this.$route.meta.title;
        },
    },
    beforeMount() {
        this.$router.push({name: 'markets'});
    },
    created() {
        this.currentUser = users[2]
    },
    methods: {
        onSidebarClick(item) {
            if (this.$router.currentRoute.name !== item.route) {
                this.$router.push({name: item.route});
            }
        },
        onLogout() {
            this.$router.push({name: 'login'});
        }
    }
}
</script>


   
