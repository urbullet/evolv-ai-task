import React from 'react';
import {Card, CardContent, FormControlLabel, FormGroup, Switch, Typography} from '@mui/material';

export interface LayoutItem {
    i: string;
    title: string;
    visible: boolean;
}

interface LayoutControlsProps {
    items: LayoutItem[];
    onToggle: (itemId: string) => void;
}

export const LayoutControls: React.FC<LayoutControlsProps> = ({items, onToggle}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Dashboard Controls
                </Typography>
                <FormGroup>
                    {items.map((item) => (
                        <FormControlLabel
                            key={item.i}
                            control={
                                <Switch
                                    checked={item.visible}
                                    onChange={() => onToggle(item.i)}
                                />
                            }
                            label={item.title}
                        />
                    ))}
                </FormGroup>
            </CardContent>
        </Card>
    );
};
