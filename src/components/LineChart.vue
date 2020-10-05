<template>
    <div 
        :id="id"
        class='line-chart'
        :style="`
            padding-bottom: ${this.multiple ? 70 : 24}px;
            width: ${this.width}px;
            height: ${this.height}px;`">
        <span v-if='isEmpty' class='empty-text'>Нет данных</span>
        <div v-else class='svg-container' />
        <LegendChart
            :visible='multiple && !isEmpty'
            :data='activeSeries'
            :colors='colors'/>
            <!-- @legend-click='changeActive' -->
    </div>
</template>

<script>
import LegendChart from './LegendChart.vue';
import { ChartUtil as Util } from '@/lib/chartutil';
import * as d3 from 'd3';

export default {
    name: 'LineChart',
    components: {
        LegendChart,
    },
    props: {
        id: {
            type: String,
            default: '',
        },
        data: {
            type: Object,
        },
        fill: {
            type: String,
            default: '',
        },
        showGrid: {
            type: Object,
            default: () => ({ x: false, y: true}),
        },
        height: {
            type: Number,
            default: 235,
        },
        width: {
            type: Number,
            default: 300,
        }
    },
    data() {
        return {
            colors: ['#26b165', '#379BD9', '#25b064', '#F5771E', '#FFB735', '#C62828', '#8E0000'],
            multiple: false,
            activeSeries: [],
            isEmpty: true,
            padding: {top: 24, left: 24, right: 24, bottom: 70},
        }
   
    },
    computed: {
        activeSeriesObj() {
            const b = {};
            if (this.data.dates && this.data.dates.length > 0) {
                this.data.series.forEach((ser) => {
                    b[ser.code] = this.activeSeries.find((el) => el.code === ser.code);
                });
            }
            return b;
        }
    },
    watch: {
        data : {
            handler: () => this.updateChart(),
            deep: true,
        },
        width: function(val) {
            this.width = val;
            this.updateChart();
        },
    },
    created() {
        this.getActive();
        this.isEmpty = !this.data.dates;
    },
    mounted() {
        this.updateChart();
    },
    methods: {
        updateChart() {
            this.isEmpty = !this.data.dates;
            this.renderChart();
        },
        renderChart() {
            if (this.data) {
                this.multiple = this.data.series.length > 1;
                const margin = {
                    top: 0,
                    right: 0,
                    bottom: 48,
                    left: 48,
                };
                const container = d3.select(`#${this.id}`);
                const width = 
                    container.node().getBoundingClientRect().width
                    - this.padding.right
                    - this.padding.left;
                const height =
                    container.node().getBoundingClientRect().height
                    - this.padding.top
                    - this.padding.bottom;
                const inWidth = width - margin.left - margin.right;
                const inHeight = height - margin.top - margin.bottom;
                const tickXFormat = d3.timeFormat('%d.%m.%Y %H:%M');
                const tickXStep = 2; 
                const colors = d3.scaleOrdinal(this.colors);
                const scale = [1, 8];
                const data = this.getData();
                const tickXNum = 50;
                const active = this.activeSeriesObj;
                const tickYNum = this.getTickYNum(data);
                d3.select(`#${this.id}`).selectAll('svg').remove();

                const svg = container
                    .select('.svg-container')
                    .append('svg')
                    .classed('svg', true)
                    .attr('preserveAspectRatio', 'xMidYMid meet')
                    .attr('viewBox', `0 0 ${width} ${height}`)
                    .attr('width', width)
                    .attr('height', height);

                // градиент для заливки
                if (this.fill && this.fill.split(', ').length > 0) {
                    const gr = this.fill.split(', ');
                    const vector = this.getSVGGradientVector(gr[0]);
                    const linearGradient = svg
                    .append('linearGradient')
                    .attr('id', `${this.id}-gradient`);
                    if (vector) {
                    linearGradient
                        .attr('x1', `${vector[0]}%`)
                        .attr('y1', `${vector[1]}%`)
                        .attr('x2', `${vector[2]}%`)
                        .attr('y2', `${vector[3]}%`);
                    }
                    const length = this.fill.split(', ').length;
                    for (let i = 0; i < length - 1; i++) {
                    const par = gr[i + 1].split(' ');
                    linearGradient.append('stop').attr('offset', par[1]).attr('stop-color', par[0]);
                    }
                }

                const GWrap = svg
                    .append('g')
                    .classed('g-wrap', true);

                const line = d3
                    .line()
                    .defined((d) => !isNaN(d))
                    .x((d, i) => x(data.dates[i]))
                    .y((d) => y(d));

                // ocь x
                const x = d3
                    .scaleTime()
                    .domain(d3.extent(data.dates))
                    .range([0, inWidth]);

                const xAxis = (g) => g
                    .attr('transform', `translate(${margin.left}, ${inHeight})`)
                    .attr('fill', '#0d1114')
                    .call(d3
                    .axisBottom(x)
                    .tickValues(data.dates)
                    .tickFormat((d, i) => {
                        if (i % tickXStep === 0 || i === tickXNum || i === 0) {
                            return tickXFormat(d);
                        }
                    })
                    .tickPadding(0)
                    .tickSizeInner(6))
                    .selectAll('text')
                    .attr('y', 0)
                    .attr('x', 0)
                    .attr('dx', 0)
                    .attr('transform', `rotate(${-25})`)
                    .style('text-anchor', 'end')
                    .attr('font-family', 'Open Sans, sans-serif');

                // ось y
                const maxY = d3.max(data.series, (d) => d3.max(d.values)) || 1;
                const minY = d3.min(data.series, (d) => d3.min(d.values)) || 0;
                
                const y = d3
                    .scaleLinear()
                    .domain([minY, maxY])
                    .nice()
                    .range([inHeight, 0]);

                const yAxis = (g) =>
                    g .attr('transform', `translate(${margin.left},3)`)
                    .attr('fill', '#0d1114')
                    .call(
                        d3.axisLeft(y)
                        .tickFormat(d3.format(' '))
                        .ticks(tickYNum)
                        .tickSizeInner(0)
                        .tickPadding(10))
                    .call((g1) =>
                        g1.select('.tick:last-of-type text')
                        .clone()
                        .attr('x', 3)
                        .attr('text-anchor', 'start')
                        .attr('font-family', 'Open Sans, sans-serif')
                        .text(data.y || ''));
                // заливка графика
                const fillArea = d3
                    .area()
                    .x((d, i) => x(data.dates[i]))
                    .y1((d) => y(d))
                    .y0(inHeight);

                const CreateLine = () => {
                    svg.select('.path-wrap').remove();
                    svg.select('.path-fill').remove();
                    svg.select('.paths-dots').remove();

                GWrap
                .insert('g', '.axis.x')
                .attr('class', 'path-wrap')
                .attr('transform', `translate(${margin.left}, 0)`)
                .selectAll('path')
                .data(data.series)
                .enter()
                .append('path')
                .attr('class', 'path')
                .style('mix-blend-mode', 'multiply')
                .attr('d', (d) => line(d.values))
                .attr('stroke', (d) => active[d.code] ? colors(d.code) : 'transparent')
                .attr('data-legend', (d) => d.label);

                // градиент для заливки
                if (this.fill && this.fill.split(', ').length > 0) {
                    GWrap.append('g')
                        .attr('class', 'path-fill')
                        .attr('transform', `translate(${margin.left}, 0)`)
                        .selectAll('path')
                        .data(data.series)
                        .enter()
                        .append('path')
                        .attr('d', (d) => fillArea(d.values))
                        .attr('fill', () =>
                        !this.fill
                        ? 'transparent'
                        : this.fill.split(', ').length === 1 ? this.fill : `url(#${this.id}-gradient)`);
                    }

                    const lineDots = GWrap
                    .append('g')
                    .attr('class', 'paths-dots')
                    .attr('transform', `translate(${margin.left}, 0)`);

                    data.series.forEach((d) => {
                    lineDots
                        .append('g')
                        .selectAll('circle')
                        .data(d.values)
                        .enter()
                        .append('circle')
                        .attr('r', 2)
                        .attr('cx', (dd, i) => x(data.dates[i]))
                        .attr('cy', (dd) => y(dd))
                        .attr('stroke', colors(d.code))
                        .attr('style', 'fill: #ffffff');
                    });
                };

                // сетка по оси X
                const setXGridlines = () => {
                    return d3.axisBottom(x).ticks(tickXNum);
                };

                // сетка по оси Y
                const setYGridlines = () => {
                    return d3.axisLeft(y).ticks(tickYNum);
                };
                
                // добавление в dom
                // сетка (ось x)
                if (this.showGrid.x) {
                    GWrap.append('g')
                    .attr('class', 'grid x')
                    .attr('transform', `translate(${margin.left}, ${inWidth})`)
                    .call((setXGridlines()).tickSize(-inHeight).tickFormat(' '));
                }
                // сетка (ось y)
                if (this.showGrid.y) {
                    GWrap.append('g')
                    .attr('class', 'grid y')
                    .attr('transform', `translate(${margin.left}, 0)`)
                    .call((setYGridlines()).tickSize(-width).tickFormat(' '));
                }

                CreateLine();

                var moveTooltip = Util.debounce(onMoveTooltip, 5, true);
                var moveTooltip = onMoveTooltip;

                // tooltip
                GWrap.append('rect')
                    .classed('tooltip-rect', true)
                    .attr('height', inHeight)
                    .attr('width', inWidth)
                    .attr('transform', `translate(${margin.left}, 0)`)
                    .attr('fill', 'transparent')
                    .on('mousemove', moveTooltip)
                    .on('mouseleave', onOutTooltip);

                const tooltipLine = svg
                    .append('line')
                    .classed('tooltip-line', true)
                    .attr('stroke', '#a1a1a1')
                    .attr('stroke-width', '0.5px')
                    .attr('x1', 0)
                    .attr('x2', 0)
                    .attr('y1', 0)
                    .attr('y2', inHeight)
                    .style('display', 'none');

                const tooltipDot = svg
                    .append('circle')
                    .classed('tooltip-dot', true)
                    .attr('r', 3)
                    .attr('fill', 'transparent')
                    .style('display', 'none');

                var tooltip = Util.tooltip(svg);

                // ось x
                GWrap.append('g')
                    .attr('class', 'axis x')
                    .call(xAxis);

                // ось y
                GWrap.append('g')
                    .attr('class', 'axis y')
                    .call(yAxis);

                // tooltip start
                function onOutTooltip() {
                    tooltipDot.style('display', 'none');
                    tooltip.style('display', 'none');
                    tooltipLine.style('display', 'none');
                }
                function onMoveTooltip() {
                    d3.event.preventDefault();
                    const mouse = d3.mouse(GWrap.select('.tooltip-rect').node());
                    const tx = Date.parse(x.invert(mouse[0] - margin.left).toString());
                    const ty = y.invert(mouse[1]);
                    const i1 = d3.bisectLeft(data.dates, tx, 1);
                    const i0 = i1;
                    const i = tx - data.dates[i0] > data.dates[i1] - tx ? i1 : i0;
                    const s = data.series.reduce((a, b) =>
                    Math.abs(a.values[i] - ty) < Math.abs(b.values[i] - ty) ? a : b);

                    if (active[s.code] && data.dates.length > 2) {
                    const newX = x(data.dates[i]) + margin.left;
                    const newY = y(s.values[i]);
                    tooltipDot
                        .style('display', null)
                        .attr('fill', colors(s.code))
                        .attr('transform', `translate(${newX},${newY})`);
                    tooltipLine
                        .style('display', null)
                        .attr('x1', newX)
                        .attr('x2', newX);
                    // отступ от курсора
                    const delta = 12;
                    // ширина tooltip
                    const value = (Math.round(s.values[i0] * 100) / 100).toString();
                    const label = s.label;
                    const datetime = new Date(data.dates[i0])
                        .toLocaleString()
                        .split(', ');
                    const max = d3.max([value.length, label.length, 12]);
                    const tWidth = (max + 12 || 1) * 8;
                    const tHeight = 50;
                    // положение tooltip всегда внутри графика
                    const ttx = newX < tWidth ? newX + delta : newX - tWidth - delta;
                    const tty =
                        height - newY - margin.bottom < tHeight
                        ? newY - delta - tHeight
                        : newY + delta;
                    tooltip.select('rect').attr('width', `${tWidth}`);
                    tooltip.style('display', null)
                        .attr('transform', `translate(${ttx},${tty})`)
                        .selectAll('text')
                        .data([ label, value || '', 'Дата', datetime[0], 'Время', datetime[1]])
                        .join('text')
                        .text((dd) => dd)
                        .attr('x', (dd, ii) => (ii % 2) * ((tWidth / (max + 12)) * max))
                        .attr('y', '12')
                        .attr('dy', (dd, ii) => ii % 2 ? `${ii}em` : `${ii + 1}em`)
                        .attr('dx', '18')
                        .attr('font-size', '12px')
                        .attr('fill', (dd, ii) =>  ii % 2 ? '#212121' : '#878787');
                    }
                }
            return svg.node();
            }
        },
        changeActive(active) {
            this.activeSeries = active;
            this.renderChart();
        },
        getActive() {
            if (this.data.series && this.data.series.length > 0) {
                this.activeSeries = this.data.series.map((seria) => ({
                    code: seria.code,
                    label: seria.label,
                    active: this.active ? this.active[seria.code] : true,
                }));
            } else {
                this.activeSeries = [];
            }
        },
        getSVGGradientVector(type) {
            let vector;
            switch (type) {
            case 'to top':
                vector = [0, 100, 0, 0];
                break;
            case 'to bottom':
                vector = [0, 0, 0, 100];
                break;
            case 'to right':
                vector = null;
                break;
            default:
                vector = [0, 100, 0, 0];
                break;
            }
            return vector;
        },
        getTickYNum(data) {
            let max = 0;
            const tickNum = 10; // max количество меток, которое будет отображаться на графике
            data.series.map((ser) => max = d3.max([0, d3.max(ser.values)]));
            if (max === 0) {
                return 1;
            } else {
                return max <= tickNum ? Math.ceil(max) + 1 : tickNum;
            }
        },
        getData() {
            const data = {dates: this.data.dates};
            const zeroArr = data.dates.map(() => 0);
            const b = {};
            this.data.series.forEach((ser) => {
                b[ser.code] = this.activeSeries.find((el) => el.code === ser.code);
            });
            data.series = this.data.series.map((ser) => {
            return {
                label: ser.label,
                code: ser.code,
                values: b[ser.code].active ? ser.values : zeroArr};
            });
            return data;
        },
    },

 }
</script>
<style lang='scss'>
.line-chart {
    .x-axis {
        stroke: var(--color-theme-7);
    }
    .grid line {
        stroke: var(--color-theme-7);
        shape-rendercharting: crispEdges;
    }
    .grid path {
        stroke-width: 0;
    }
    .axis text {
        font-size: 10px;
        color: var( --color-font-base);
        user-select: none;
    }
    .axis path {
        stroke: transparent;
    }
    .path-wrap {
        fill: none;
        stroke-width: 1.5;
        stroke-linejoin: round;
        stroke-linecap: round;
    }
    .tick line {
        stroke: var(--color-theme-3);
    }
}
</style>
<style lang='scss' scoped>
  .line-chart {
    display: flex;
    position: relative;
    flex-grow: 1;
    min-width: 450px;
    min-height: 250px;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    padding: 24px;
    .svg-container {
      display: flex;
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      flex-grow: 1;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
    }
    .svg {
      padding-left: 70px;
      box-sizing: border-box;
    }
    .empty-text {
      font-size: 12px;
      color: #909399;
    }
    .label-hover {
      display: inline-block;
      color: var( --color-font-base);
      font-size: 10px;
      font-family: 'Open Sans', sans-serif;
    }
  }
</style>