import React, {useEffect, useMemo, useState} from 'react';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {ExperimentLog} from '../types';
import {DashboardCard} from './DashboardCard';

interface LogPanelProps {
    logs: ExperimentLog[];
    isDraggable?: boolean;
}

export const LogPanel: React.FC<LogPanelProps> = ({logs, isDraggable}) => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const dynamicEventTypes = useMemo(() => {
        return Array.from(new Set(logs.map(log => log.type)));
    }, [logs]);

    useEffect(() => {
        if (selectedTypes.length === 0 && dynamicEventTypes.length > 0) {
            setSelectedTypes(dynamicEventTypes);
        }
    }, [dynamicEventTypes, selectedTypes]);

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const filteredLogs = logs.filter(log => {
        const logDate = new Date(log.timestamp);
        const typeMatch = selectedTypes.includes(log.type);
        const startMatch = !startDate || logDate >= new Date(startDate);
        const endMatch = !endDate || logDate <= new Date(endDate);
        return typeMatch && startMatch && endMatch;
    });

    const getIconForType = (type: string) => {
        switch (type) {
            case 'visitor':
                return <PersonIcon color="primary"/>;
            case 'conversion':
                return <MonetizationOnIcon color="success"/>;
            case 'revenue':
                return <AttachMoneyIcon color="secondary"/>;
            case 'milestone':
                return <StarBorderIcon color="warning"/>;
            default:
                return <InfoOutlinedIcon/>;
        }
    };

    const FilterPopoverContent = () => (
        <Box p={2}>
            <FormGroup>
                {dynamicEventTypes.map(type => (
                    <FormControlLabel
                        key={type}
                        control={
                            <Checkbox
                                checked={selectedTypes.includes(type)}
                                onChange={() => toggleType(type)}
                            />
                        }
                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                    />
                ))}
            </FormGroup>
            <Box mt={2}>
                <Typography variant="subtitle2">Filter by Timestamp</Typography>
                <FormControl fullWidth margin="dense">
                    <InputLabel shrink htmlFor="start-date">
                        Start Date
                    </InputLabel>
                    <OutlinedInput
                        id="start-date"
                        type="datetime-local"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        label="Start Date"
                    />
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel shrink htmlFor="end-date">
                        End Date
                    </InputLabel>
                    <OutlinedInput
                        id="end-date"
                        type="datetime-local"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        label="End Date"
                    />
                </FormControl>
            </Box>
        </Box>
    );

    return (
        <DashboardCard
            isDraggable={isDraggable}
            title="Event Log"
            filterPopoverContent={<FilterPopoverContent/>}
            sx={{display: 'flex', flexDirection: 'column', overflowY: 'scroll'}}
        >
            <List>
                {filteredLogs.map((log, index) => (
                    <ListItem
                        key={index}
                        divider
                        sx={index === filteredLogs.length - 1 ? {marginBottom: '75px'} : {}}
                    >
                        <ListItemIcon>{getIconForType(log.type)}</ListItemIcon>
                        <ListItemText
                            primary={log.message}
                            secondary={new Date(log.timestamp).toLocaleString()}
                        />
                    </ListItem>
                ))}
            </List>
        </DashboardCard>
    );
};
