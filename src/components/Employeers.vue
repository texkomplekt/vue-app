<template>
    <article class="employeers">
        <h3 class="title">Сотрудники</h3>
        <div class="container"> 
            <Avatar 
                v-for="(item, index) in items"
                :key="index"
                :img="item.avatar"
                :width="100"
                :height="100"
                style="border-radius: 0"/>
        </div>
    </article>
</template>

<script>
import users from '@/lib/users';
import Avatar from '@/components/Avatar.vue';
export default {
    name: 'Employeers',
    components: {
        Avatar,
    },
    props: {
        orgName: String,
    },
    data() {
        return {
            items: [],
        }
    },
    created() {
        // this.items = users.filter((el) => el.organization === orgName);
        this.items = users;
    }
}
</script>
<style lang="scss" scoped>
    .employeers {
        background: var(--color-theme-4);
        .title {
            color: var(--color-theme-7);
            font-size: var(--font-size-large);
            font-family: 'Montserrat', sans-serif;
        }
        .container {
            display: grid;
            grid-template-columns: repeat(auto-fill, 100px);
            justify-items: start;
            grid-area: employeers;
        }
    }
</style>
