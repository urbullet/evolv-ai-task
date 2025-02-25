import React from 'react';
import {Typography} from '@mui/material';
import {DashboardCard} from './DashboardCard';

interface MetricsCardProps {
    title: string;
    value: string | number;
    color?: string;
    isDraggable?: boolean;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
                                                            title,
                                                            value,
                                                            color,
                                                            isDraggable
                                                        }) => {
    return (
        <DashboardCard isDraggable={isDraggable} title={title} small>
            <Typography
                variant="h3"
                align="center"
                sx={{fontWeight: 700, mt: 1, color}}
            >
                {value}
            </Typography>
        </DashboardCard>
    );
};
