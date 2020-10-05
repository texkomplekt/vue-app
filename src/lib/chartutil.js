export class ChartUtil {
    static realTimeFormat(date) {
        // 15:00 01 02 ...
        const seconds = date.getSeconds();
        if ( seconds === 0 || seconds === 30 ) {
            return date.toLocaleString().split(', ')[1].slice(0, -3);
        } else {
            return seconds;
        }
    }

    static debounce(fn, wait, immediate) {
        let timeout;
        // return function(this) {
        return function() {
            const context = this;
            const args = arguments;
            const later = () => {
                timeout = null;
                if (!immediate) {fn.apply(context, args); }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {fn.apply(context, args); }
        };
    }

    static tooltip(svg) {
        const tooltip = svg
            .append('g')
            .classed('tooltip', true)
            .attr('style', 'display: none; transition: display .3s ease-in-out');

        tooltip
            .append('rect')
            .classed('tooltip-shadow', true)
            .attr('width', 30)
            .attr('height', 90)
            .attr('fill', 'rgba(250, 250, 250, 0.8)')
            .attr('stroke', '#cecece')
            .attr('stroke-width', '.5');
        return tooltip;
    }
}