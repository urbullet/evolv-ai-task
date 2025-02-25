import React, {FC, ReactNode, useState} from 'react';
import {Box, Card, CardContent, IconButton, Popover, Typography} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FilterListIcon from "@mui/icons-material/FilterList";
import {SxProps} from "@mui/system/styleFunctionSx";

interface DashboardCardProps {
    children: ReactNode;
    title?: string;
    isDraggable?: boolean;
    small?: boolean;
    color?: string;
    filterPopoverContent?: ReactNode
    sx?: SxProps
}

/**
 * A reusable card that:
 *  - Applies consistent styling (borderRadius, boxShadow, hover).
 *  - Renders a drag handle if isDraggable = true.
 *  - Optionally shows a "title" in the top handle area or CardContent.
 *  - Optionally displays a smaller size "small"
 *  - Renders `children` inside the CardContent.
 */
export const DashboardCard: FC<DashboardCardProps> = ({
                                                          children,
                                                          title,
                                                          isDraggable,
                                                          small,
                                                          color,
                                                          filterPopoverContent,
                                                          sx = {},
                                                      }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const popoverId = open ? 'filter-popover' : undefined;
    return (
        <Card
            sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: 2,
                transition: '0.2s',
                '&:hover': {
                    boxShadow: 6
                },
                ...sx
            }}
        >
            <Box sx={{
                backgroundColor: 'rgba(0,0,0,0.03)',
                '&:hover': {backgroundColor: 'rgba(0,0,0,0.07)'},
                display: 'flex',
                flexDirection: 'row',
                px: 1,
                py: 0.5,
            }}>
                {filterPopoverContent
                    ? <>
                        <IconButton size="small" onClick={handleFilterClick} sx={{}}>
                            <FilterListIcon/>
                        </IconButton>
                    </>
                    : null
                }
                <Box
                    className="drag-handle"
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        alignItems: 'center',
                        cursor: isDraggable ? 'move' : 'default',
                        justifyContent: 'space-between'
                    }}
                >

                    {title && (
                        <Typography
                            variant="overline"
                            color="textSecondary"
                            sx={{letterSpacing: '1px'}}
                        >
                            {title}
                        </Typography>
                    )}

                    {isDraggable && (
                        <DragIndicatorIcon
                            fontSize="small"
                            sx={{
                                ml: title ? 1 : 0
                            }}
                        />
                    )}

                </Box>
            </Box>


            <CardContent sx={small ? {padding: 0} : {py: 2}}>
                <Box sx={{color}}>{children}</Box>
            </CardContent>
            <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                {filterPopoverContent}
            </Popover>
        </Card>
    );
};
