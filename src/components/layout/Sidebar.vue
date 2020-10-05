<template>
    <aside class="sidebar">
        <span
            class="menu-icon"
            @click="show=!show">
            <span class="burger"></span>
        </span>
        <nav class="menu" :style="`width: ${show ? 250 : 53}px`">
            <ul class="list">
                <li
                    v-for="(item, index) in items"
                    :key="index"
                    :class="`item ${active === index ? 'active' : ''}`"
                    @click="onClick(item, index)">
                    <i :class="`menu-icon el-icon-${item.icon}`"></i>
                    <span v-show="show" class="title">{{item.title}}</span>
                </li>
            </ul>
            <ul class="list down">
                <li class="item" @click="$router.push({name: 'user', params: {item: currentUser}})">
                    <Avatar
                        :width="40"
                        :height="40"
                        :img="currentUser.avatar"
                        style="margin: 0 10px 0 5px"/>
                    <div>
                        <span v-show="show" class="title">{{currentUser.lastName}}</span>
                        <span v-show="show" class="subtitle">{{currentUser.login}}</span>
                    </div>
                </li>
                <li 
                    class="item"
                    @click="$emit('logout')">
                    <i class="menu-icon el-icon-switch-button"></i>
                    <span v-show="show" class="title">Выйти</span>
                </li>
            </ul>
        </nav>
    </aside>
</template>
<script>
import Avatar from '@/components/Avatar.vue';
export default {
    name: 'Sidebar',
    components: {
        Avatar,
    },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        currentUser: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            show: false,
            active: 0,
        }
    },
    methods: {
        onClick(item, index) {
            this.$emit('update-view', item);
            this.active = index;
            this.show = false;
        }
    }
}
</script>
<style scoped lang="scss">
.sidebar {
    background: var(--color-theme-1);
    z-index: 3000;
}
.menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--color-theme-1);
    top: var(--height-module);
    left: 0;
    bottom: 0;
    transition: width .25s linear;
}
.list {
    padding: 0;
    margin: 0;
    list-style: none;
    .item {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        height: var(--height-module);
        line-height: 1;
        color: var(--color-theme-2);
        font-size: 14px;
        cursor: pointer;
        .title {
            display: block;
            transition: display .25s linear;
        }
        .subtitle {
            font-size: 0.7rem;
            color: var(--color-theme-5);
            font-family: 'Montserrat', sans-serif;
        }
    }
  .item.active {
      background: rgba(255, 255, 255, .2);
  }
}
.list.down {
    border-top: 2px solid lighten(#353535, 5.10);
}
.menu-icon {
    display: inline-block;
    flex-shrink: 0;
    width: var(--height-module);
    height: var(--height-module);
    color: var(--color-theme-2);
    line-height: var(--height-module);
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    .burger {
        display: inline-block;
        position: relative;
        width: 22px;
        height: 2px;
        background: var(--color-theme-2);
        vertical-align: middle;
    &:before {
        content: '';
        position: absolute;
        width: 22px;
        height: 2px;
        top: -8px;
        left: 0;
        background: var(--color-theme-2);
    }
    &:after {
        content: '';
        position: absolute;
        width: 22px;
        height: 2px;
        bottom: -8px;
        left: 0;
        background: var(--color-theme-2);
    }
  }
}
</style>
