<template>
    <div 
        :id='compId'
        class="widget-gauge"
        :style="`height: ${height}px; width: ${width}px`">
    </div>
</template>

<script>
import Vue from 'vue';
import * as d3 from 'd3';

export default {
    name: 'WGauge',
    props: {
        id: {
            type: String,
            default: '',
        },
        height: {
            type: [Number, String],
            default: '300',
        },
        width: {
            type: [Number , String],
            default: '300',
        },
        data: {
            type: Number,
            default: 0,
        },
        animation: {
            type: Boolean,
            default: false,
        },
        colors: {
            type: Object,
            default: () => ({'#26b165': '10%', '#ffb735': '15%', '#c62828': '20%', '#8E0000': '100%'}),
        },
        duration: {
            type: Number,
            default: 1500,
        },
    },
    data() {
        return {
            relativeHeight: 0.5, 
            maxRadius: 350,
            format: d3.format('.2f'),
            progressAngle: 0,
            compId: '',
          
        }
    },
    created() {
        this.progressAngle = Math.PI * (this.data / 100 - 0.5);
        this.compId = this.id || `widget-gauge-${Math.floor(Math.random() * 1000000000)}`;
    },
    watch: {
        data: function(val) {
            this.updateComp({data: val});
        },
        height: function(val) {
            this.updateComp({height: +val});
        },
        width: function(val) {
            this.updateComp({width: +val});
        }
    },
    mounted() {
        this.renderComp();
    },
    methods: {
        getColor() {
            const vm = this;
            const limits = Object.values(this.colors)
              .map((el) => parseInt(el, 10))
              .filter((el) => el >= vm.data);
            const min = d3.min(limits) || 100;
            return Object.entries(this.colors).filter((el) => el[1] === `${min}%`)[0][0];
        },
        getArc(inRadius, outRadius) {
            const angle = 0.5 * Math.PI;
            return d3.arc()
                .innerRadius(inRadius)
                .outerRadius(outRadius)
                .startAngle(-1 * angle);
        },
        updateText(oldVal, newVal, text) {
            if (this.animation) {
                text.transition()
                .ease(d3.easeLinear)
                .duration(this.duration)
                .delay(0)
                .tween('text', (d) => {
                  const i = d3.interpolate(oldVal, newVal);
                  return (t) => {
                    text.text(this.format(i(t)) + '%');
                  };
                });
            } else {
                text.text(this.format(newVal) + '%');
            }
        },
        updateProgress(arc, arcSelection) {
            if (this.animation) {
                const arcTween = (newAngle) => {
                    return (d) => {
                        const i = d3.interpolate(d.endAngle, newAngle);
                        return (t) => {
                            d.endAngle = i(t);
                            return arc(d);
                        };
                    };
                };
              arcSelection.transition()
                .duration(this.duration)
                .attrTween('d', arcTween(this.progressAngle));
            } else {
                arcSelection.datum({endAngle: this.progressAngle}).attr('d', arc);
            }
        },
        addArc(g, arc, fill, angle = 0.5 * Math.PI, name) {
            const arc1 = g.append('path')
                .classed(`${name}-arc`, true)
                .datum({endAngle: angle})
                .style('fill', fill)
                .attr('d', arc);
            if (name === 'progress') {
                this.updateProgress(arc, arc1);
            }
        },
        renderComp() {
            const angle = 0.5 * Math.PI;
            const progressAngle = this.animation ? -angle : this.progressAngle;
            const margin = 36;
            const width = +this.width - margin;
            const radius = Math.min(+this.height * this.relativeHeight, width / 2, this.maxRadius);
            d3
                .select(`#${this.compId}`)
                .select('svg')
                .remove();
            const svg = d3
                .select(`#${this.compId}`)
                .append('svg')
                .attr('width', width)
                .attr('height', radius)
                .attr('viewBox', `0 0 ${width} ${radius}`)
                .attr('preserveAspectRatio', 'xMidYMid meet');

            const backgroundArc = this.getArc(0, radius);
            const transparentArc = this.getArc(radius * 0.7, radius * 0.85);
            const progressArc = this.getArc(radius * 0.7, radius * 0.85);
            const  g = svg
                .append('g')
                .attr('style', `transform: translate(${width / 2}px, ${radius}px)`);

            this.addArc(g, backgroundArc, this.getColor(), angle, 'background');
            this.addArc(g, transparentArc, 'rgba(255, 255, 255, 0.6)', angle, 'transparent');
            this.addArc(g, progressArc, '#fff', progressAngle, 'progress');
            const text = svg
                .append('text')
                .classed('text', true)
                .attr('x', width / 2)
                .attr('y', radius)
                .attr('dx', 0)
                .attr('dy', -radius * 0.15)
                .attr('fill', '#212121')
                .attr('text-anchor', 'middle')
                .attr('font-size', `${radius * 0.20}px`)
                .attr('font-weight', 'bold');
            this.updateText(0, this.data, text);
        },
        updateComp(val) {
            const margin = 36;
            const height = val.height || +this.height;
            const width = val.width - margin || +this.width - margin;
            const data = val.data || +this.data;
            const radius = Math.min(+height * this.relativeHeight, +width / 2, this.maxRadius);
            const svg = d3.select(`#${this.compId} svg`);
            const text = svg.select('text');
            if (!!svg) {
                if (val.width || val.height) {
                    svg
                        .attr('width', width)
                        .attr('height', radius)
                        .attr('viewBox', `0 0 ${width} ${radius}`)
                        .select('g')
                        .attr('style', `transform: translate(${width / 2}px, ${radius}px)`);
                    const arcBackground = this.getArc(0, radius);
                    svg.select('.background-arc').attr('d', arcBackground);
                    const arcTransparent = this.getArc(radius * 0.7, radius * 0.85);
                    svg.select('.transparent-arc').attr('d', arcTransparent);
                    text.attr('x', width / 2).attr('y', radius).attr('dy', -radius * 0.15).attr('font-size', `${radius * 0.20}px`);
                }
                // update progress arc
                const arcPrSelection = svg.select('.progress-arc');
                const arcProgress = this.getArc(radius * 0.7, radius * 0.85);
                this.updateProgress(arcProgress, arcPrSelection);
                if (val.data) {
                    // update text
                    this.updateText(+text.text().slice(0, -1), data, text);
                    // animate update background
                  svg
                      .select('.background-arc')
                      .transition()
                      .duration(500)
                      .style('fill', this.getColor());
                }
            }
        },
    },
}
</script>
<style lang="scss" scoped>
  .widget-gauge {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    svg {
      flex-grow: 0;
    }
    .text {
      font-family: 'Open Sans', sans-serif;
    }
  }
</style>
