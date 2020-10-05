<template>
    <section 
        class="chart-legend"
        v-show="visible">
        <div class="chart-legend-inner"> 
            <template v-for="(legend, i) in data">
                <el-tooltip 
                       :key="`${legend}_${i}`"
                       :content="legend.label" 
                       placement="top-start"
                       effect="light"
                       :disabled="true">
                    <div 
                        :key="`${legend}_${i}`"
                        :class="legend.active ? 'legend-item active' : 'legend-item'" 
                        :style="`max-width: ${maxWidthItem}px`"
                        @click="onClickLegend(legend)">
                        <span 
                            class="legend-color"
                            :style="`background-color: ${colors[i % (colors.length - 1) || i]}`">
                        </span>
                        {{legend.label}}
                    </div>
                </el-tooltip>
            </template>
        </div>
    </section>
</template>

<script>
export default {
    name: 'LegendChart',
    props: {
        data: {
            type: Array,
            required: true,
            default: () => [],
        },
        visible: {
            type: Boolean,
            default: true,
        },
    },
    data () {
        return {
            colors: ['#26b165', '#379BD9', '#25b064', '#F5771E', '#FFB735', '#C62828', '#8E0000'],
            maxWidthItem: 600,
        }
    },
    methods: {
        onClickLegend(legend) {
            const val = this.data.map((item) => {
                if (item.code === legend.code) {
                    item.active = !item.active;
                }
                return item;
            });
            this.$emit('legend-click', val);
        }
    }
}
</script>

<style lang="scss" scoped>
.chart-legend {
    position: absolute; 
    max-width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 6px 12px 0 12px;
    overflow-y: auto;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    overflow: hidden;
    user-select: none;
    .chart-legend-inner {
        display: flex;
        height: 70px;
        flex-direction: column;
        flex-wrap: wrap;
        box-sizing: border-box;
        overflow-x: auto;
    }
    .legend-item {
        position: relative;
        padding: 3px 6px;
        padding-left: 24px;
        color: var(--color-theme-7);
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 0;
        cursor: pointer;
        &:focus {
            outline: 1px dotted var(--color-theme-3);
            outline-offset: -2px;
        }
        .legend-color {
            position: absolute;
            left: 7px;
            top: 7px;
            width: 9px;
            height: 9px;
            border-radius: 50%;
        }
        &.active {
            color: var(--color-font-base);
        }
    }
}
</style>

