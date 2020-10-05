<template>
    <header class="header">
        <h3 class="title">{{title}}</h3>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: '',
        },
    }
}
</script>
<style scoped>
.header {
    height: var(--height-module);
    background: var(--color-theme-2);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
    z-index: 2000;
}
.title {
    margin: 0;
    padding: var(--padding-midi);
    font-weight: 400;
}
</style>