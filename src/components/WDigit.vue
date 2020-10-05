<template>
    <div class="digit">
        <span>{{data.value}}</span>
        <span 
            class="delta"
            :style="`color: ${deltaColor}`">{{delta}}</span>
    </div>
</template>

<script>
export default  {
    name: 'WDigit',
    props: {
        data: null, 
    },
    computed: {
        deltaColor(){
           return this.data.delta >= 0 ? '#269926' : '#ff0000';
        },
        delta() {
            const v = this.data.delta.toFixed(4);
            return v > 0 ? `+${v}` : v;
        },       
    },
}
</script>

<style lang="scss" scoped>
    .digit {
        position: relative;
        width: 300px;
        padding: var(--padding-small);
        background: var(--color-theme-2);
        $font: 13px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 0;
        align-self: stretch;
        line-height: 1;
        color: var(--color-theme-7);
        font-size: 50px;
        text-align: center;
        .delta {
            display: block;
            font-size: var(--font-size-midi);
            margin-top: var(--padding-base);
            text-align: center;
        }
    }
</style>