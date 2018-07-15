import React, {Component} from 'react';
import dayjs from 'dayjs';
import {
    AreaChart,
    Area,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import './Visualization.css';

const SERIES_ORDER = [
    'http_code',
    'attacks_blocked',
    'event',
    'http_4xx_code',
    'http_5xx_code',
    'attacks_blockable'
];

function formatXAxis(tickItem) {
    const formatted = dayjs(tickItem).format('ddd DD-MM');
    return formatted;
}

class Visualization extends Component {
    getData(series) {
        if (!series) {
            return [];
        }
        return series.map((e) => {
            return {
                ts: e[0],
                value: e[1]
            };
        });
    }

    getChart(id, series, data) {
        return (
            <div className="Visualization__chart" key={id}>
                <h2>{series.title}</h2>
                <div>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart width={600} height={300} data={data}>
                            <defs>
                                <linearGradient
                                    id="brandGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#4842b7"
                                        stopOpacity={0.9}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#4842b7"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="ts" tickFormatter={formatXAxis} />
                            <YAxis dataKey="value" name="Events" />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#4842b7"
                                fill="url(#brandGradient)"
                            />
                            <Tooltip cursor={false} labelFormatter={formatXAxis} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    renderCharts() {
        let charts = [];

        if (this.props.timeline) {
            let keys = Object.keys(this.props.timeline.series);
            keys.sort((a, b) => {
                return SERIES_ORDER.indexOf(a) - SERIES_ORDER.indexOf(b);
            });
            charts = keys
                .map((key) => {
                    const series = this.props.timeline.series[key];
                    if (series.sum === 0) {
                        return null;
                    } else {
                        const data = this.getData(series.series);
                        return this.getChart(key, series, data);
                    }
                })
                .filter((chart) => chart !== null);
        }

        if (charts.length === 0) {
            return (
                <div className="Visualization__empty emptystate">
                    No visualization
                </div>
            );
        } else {
            return charts;
        }
    }

    render() {
        const data = this.getData();
        return (
            <div className="Visualization block">
                <h1 className="block__title">Monitoring</h1>
                {this.renderCharts()}
            </div>
        );
    }
}

export default Visualization;
