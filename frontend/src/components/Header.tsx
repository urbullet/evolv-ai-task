import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Tooltip, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { formatRelativeOrDate } from '../utils/formatRelativeOrDate';

interface HeaderProps {
    lastUpdated: string;
    onSettingsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, onSettingsClick }) => {
    const [displayTime, setDisplayTime] = useState(formatRelativeOrDate(lastUpdated));

    useEffect(() => {
        setDisplayTime(formatRelativeOrDate(lastUpdated));

        const intervalId = setInterval(() => {
            setDisplayTime(formatRelativeOrDate(lastUpdated));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [lastUpdated]);

    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar>
                <Box
                    component="img"
                    src="https://placehold.co/40x40"
                    alt="Default Placeholder"
                    sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Evolv AI
                </Typography>
                <Tooltip title={new Date(lastUpdated).toLocaleString()}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }}>
                            Updated: {displayTime}
                        </Typography>

                        <IconButton onClick={onSettingsClick} color="inherit">
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};
