<template>
  <div 
      id="dashboard"
      class="dashboard">
      <Widget 
        v-for="(widget, index) in widgets"
        :key="index"
        :config="widget"
        :resize="resize"/>
  </div>
</template>

<script>
import Widget from '@/components/Widget.vue';
import widgets from '@/lib/widgets';
  export default {
    name: 'Dashboard',
    components: {
      Widget,
    },
    props: {
      msg: String
    },
    data() {
        return {
            state: 0,
            resize: false,
            widgets: [],
            timerId: null,
            timeout: 150,
        }
    },
    created() {
        this.widgets = widgets;
    },
    mounted() {
        window.addEventListener('resize', this.onResize, {passive: true});
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            clearTimeout(this.timerId);
            const timerHandler = () => this.resize = !this.resize;
            this.timerId = setTimeout(timerHandler, this.timeout);
        }
    }
}
</script>
<style scoped lang="scss">
.dashboard {
    justify-content: space-around;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    padding: var(--padding-midi);
    grid-gap: var(--padding-midi);
    background-color: var(--color-theme-4);
    overflow-y: auto;
}
</style>