import React from 'react';
import {Line} from 'react-chartjs-2';
import {Variant} from '../../types';
import {DashboardCard} from '../DashboardCard';

interface TrendsChartProps {
    variants: Variant[];
    isDraggable?: boolean;
}

export const TrendsChart: React.FC<TrendsChartProps> = ({variants, isDraggable}) => {
    const history = variants[0]?.history || [];
    const labels = history.map(point => new Date(point.timestamp).toLocaleTimeString());

    const datasets = variants.flatMap(variant => {
        if (!variant.history || variant.history.length === 0) return [];
        return [
            {
                label: `${variant.name} Conversions`,
                data: variant.history.map(point => point.conversions),
                borderColor: variant.name === 'Control' ? '#16a34a' : '#f59e0b',
                fill: false,
                tension: 0.3,
            },
            {
                label: `${variant.name} Conversion Rate`,
                data: variant.history.map(point => point.rate),
                borderColor: variant.name === 'Control' ? '#2e8b57' : '#ff69b4',
                fill: false,
                borderDash: [5, 5],
                tension: 0.3,
            },
        ];
    });

    const chartData = {labels, datasets};

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {padding: 16},
        plugins: {
            legend: {position: 'top' as const},
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${context.parsed.y}`,
                },
            },
        },
        scales: {
            x: {
                type: 'category' as const,
                title: {display: true, text: 'Time'},
            },
            y: {
                beginAtZero: true,
                title: {display: true, text: 'Value'},
            },
        },
    };

    return (
        <DashboardCard isDraggable={isDraggable} title="Trends: Conversions & Conversion Rate">
            <div style={{height: '300px'}}>
                {labels.length > 0 ? (
                    <Line data={chartData} options={options}/>
                ) : (
                    <p>No historical data available.</p>
                )}
            </div>
        </DashboardCard>
    );
};
