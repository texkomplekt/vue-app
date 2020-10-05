const colors = ['#26b165', '#ffb735', '#c62828', '#8E0000'];
const lineData = (serNum, limit = 60) => {
    const series = [];
    for (let i = 0; i < serNum; i++) {
        series.push({});
    }
    const points = 20;
    let dat = [];
    for (let i = 0; i < points; i++) {
        dat.push(1584026822379 + i * 86400);
    }
    return ({
        dates: dat, 
        series: series.map((el, i) => ({
            code: `code${i}`,
            label: `метрика${i}`,
            values: ((j) => {
                const v = [];
                for (let jj = 0; jj < points; jj++) {
                    v.push(Math.random() * limit * 0.3 + limit);
                };
                return v;
            })(points),
        }))
    });
};
const widgets = [
        {
            id: 'widget1',
            type: 'WDigit',
            name: 'Драгметаллы. Золото',
            description: 'Средневзвешенный курс на 12.03.2020 16:39:15',
            data: {
                value : '3627.0000',
                delta: 27.0000,
            },
            config: {
                 span: 2,
                    linkto: '',
            }
        },
        {   
            id: 'widget2',
            type: 'WGauge',
            name: 'Драгметаллы. Золото',
            description: 'Отклонение от среднего на 12.03.2020 16:39:15',
            data: 5,
            config: {
                span: 2,
            }
        },
        {
            id: 'widget3',
            type: 'WDigit',
            name: 'Товарные рынки. BR-4.20',
            description: 'Цена контракта на 12.03.2020 16:39:15',
            data: {
                value : '32,89',
                delta: -8.87,
            },
            config: {
                span: 2,
            }
        },
        {   
            id: 'widget4',
            type: 'WGauge',
            name: 'Товарные рынки. BR-4.20',
            description: 'Отклонение от среднего на 12.03.2020 16:39:15',
            data: 12,
            config: {
                span: 2,
            }
        },
        {
            id: 'widget5',
            type: 'WDigit',
            name: 'Облигации. RUCBITR',
            description: 'Цена контракта на 12.03.2020 16:39:15',
            data: {
                value : 415.07,
                delta: 1.68,
            },
            config: {
                span: 2,
            }
        },
        {   
            id: 'widget6',
            type: 'WGauge',
            name: 'Облигации. RUCBITR',
            description: 'Отклонение от среднего на 12.03.2020 16:39:15',
            data: 19,
            config: {
                span: 2,
            }
        },
        {   
            id: 'widget10',
            type: 'LineChart',
            name: 'Облигации. RUCBITR',
            description: 'Отклонение от среднего на 12.03.2020 16:39:15',
            data: lineData(4, 60),
            config: {
                span: 3,
            }
        },
        {   
            id: 'widget11',
            type: 'LineChart',
            name: 'Облигации. RUCBITR',
            description: 'Отклонение от среднего на 12.03.2020 16:39:15',
            data: lineData(1, 40),
            config: {
                span: 3,
                fill: 'to bottom, rgba(38,177,101,0.3) 0%, rgba(38,177,101,0) 100%',
            }
        },

];

export default widgets;