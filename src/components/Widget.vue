<template>
    <article 
        class="widget"
        :style="`grid-column-end: span ${config.config.span};`">
        <header style="flex-grow: 0">
            <h3 class="title">{{config.name}}</h3>
            <p class="description">{{config.description}}</p>
        </header>
        <div class="body">
            <component
                :is="config.type"
                :data="config.data"
                :fill="config.config.fill"
                :id="config.id"
                :height="height"
                :width="width"/>
        </div>
    </article>
</template>

<script>
import WDigit from '@/components/WDigit.vue';
import WGauge from '@/components/WGauge.vue';
import LineChart from '@/components/LineChart.vue';
export default {
    name: 'Widget',
    components: {
      WDigit,
      WGauge,
      LineChart,
    },
    props: {
        config: {
            type: Object,
            default: () => {},
        },
        resize: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            width: undefined,
            height: 250,
            titleHeight: 50,
        }
    },
    watch: {
        resize: function() {
            if (this.$el) {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight - this.titleHeight;
            }
        },
        width: () => {
          // console.log(width);
        }    
    },
    mounted() {
        if (this.$el) {
            this.width = this.$el.clientWidth;
            this.height = this.$el.clientHeight - this.titleHeight;
        }
    }

  
}
</script>
<style lang="scss" scoped>
  .widget {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: 300px;
    background: var(--color-theme-2);
    overflow: hidden;
    .title {
        font-size: var(--font-size-large);
        margin: 0;
        padding: var(--padding-small) var(--padding-midi);
        color: var(--color-link);
    }
    .description {
        margin: 0;
        padding: 0 var(--padding-midi);
        color: var(--color-theme-7);
        font-size: var(--font-size-midi);
    }
    .body {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        box-sizing: border-box;
    }
  }
</style>>
