import React from 'react';
import {Typography} from '@mui/material';
import {Bar} from 'react-chartjs-2';
import {Variant} from '../../types';
import {DashboardCard} from "../DashboardCard";

interface RevenueChartProps {
    variants: Variant[];
    isDraggable?: boolean;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({variants, isDraggable}) => {
    const chartData = {
        labels: variants.map(v => v.name),
        datasets: [{
            label: 'Revenue',
            data: variants.map(v => v.revenue),
            backgroundColor: variants.map((_, index) =>
                index === 0 ? '#818cf8' : '#f472b6'
            ),
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `Revenue: $${context.parsed.y.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Revenue ($)'
                }
            }
        }
    };

    return (
        <DashboardCard isDraggable={isDraggable} title="Revenue by Variant">
            <Typography
                variant="h3"
                align="center"
                sx={{fontWeight: 700, mt: 1}}
            >
                <div style={{height: '300px'}}>
                    <Bar data={chartData} options={options}/>
                </div>
            </Typography>
        </DashboardCard>

    );
};
