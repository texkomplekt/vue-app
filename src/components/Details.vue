<template>
    <article class="details">
        <h3 class="title">Информация</h3>
        <div class="list">
            <div 
                v-for="(item, index) in items"
                :key="index"
                class="item">
                <div class="label">{{item.label}}</div>
                <div class="value">{{item.value}}</div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: 'Details',
    props: {
        items: {
            type: Array,
            default: () => ([]),
        }
    },
}
</script>
<style lang="scss" scoped>
.details {
    background: var(--color-theme-4);
    padding: var(--padding-midi);
    grid-area: details;
    justify-self: stretch;
    align-self: stretch;
    .list {
        display: flex;
        flex-wrap: wrap;
    }
    .title {
        color: var(--color-theme-7);
        font-size: var(--font-size-large);
        font-family: 'Montserrat', sans-serif;
    }
    .label {
        display: inline-block;
        padding-bottom: var(--padding-small);
        color: var(--color-link);
        text-transform: uppercase;
        font-size: .9rem;
    }
    .value {
        font-size: var(--font-size-midi);
    }
    .item {
        width: 30%;
        margin-bottom: var(--padding-midi);
    }
    @media (max-width: 575.98px) { 
        .item {
            width: 100%;
        }    
    }
    @media (min-width: 576px) and (max-width: 991.98px) { 
        .item {
            width: 50%;
        }
    }
}
</style>