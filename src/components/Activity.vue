<template>
    <article class="activity">
        <h3 class="title">Активность пользователя</h3>
        <div class="list">
            <div 
                v-for="(item, index) in items"
                :key="index"
                class="item"
                @click="onClick(item)">
                <Avatar 
                    :width="40"
                    :height="40"
                    :img="usersObj[item.id].avatar"
                    style="position: absolute; top: 10px; left: 10px;"/>
                <span class="name">{{`${usersObj[item.id].login}`}}</span>
                <span class="time">{{new Date(item.time).toLocaleString('ru')}}</span>
            </div>
        </div>
    </article>
</template>

<script>
import Avatar from '@/components/Avatar.vue';
import users from '@/lib/users';
export default {
    name: 'Activity',
    components: {
        Avatar,
    },
    props: {
        items: {
            type: Array,
            default: () => ([]),
        },
        id: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            usersObj: {},
        };
    },
    created() {
        users.forEach(el => this.usersObj[el.id] = el);
    },
    methods: {
        onClick(item) {
            if (this.id !== item.id) {
                this.$router.push({name: 'user', params: { item: users.find(el => el.id === item.id)}});
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.activity {
    grid-area: activity;
    background: var(--color-theme-4);
    .list {
        display: flex;
        flex-wrap: wrap;
    }
    .title {
        color: var(--color-theme-7);
        font-size: var(--font-size-large);
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: var(--padding-base);
    }
    .name {
        display: block;
        font-weight: bold;
        font-size: 0.9rem;
        font-family: 'Montserrat', sans-serif;
        padding-bottom: var(--padding-small);
    }
    .time {
        display: block;
        font-size: var(--font-size-midi);
    }
    .item {
        width: 100%;
        position: relative;
        margin-bottom: var(--padding-midi);
        padding: var(--padding-midi);
        padding-left: 60px;
        cursor: pointer;
        &:hover {
            background-color: var(--color-theme-4-hover);
        }
    }
}
</style>
