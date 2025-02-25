import React, { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Drawer,
    FormControlLabel,
    Switch,
    ThemeProvider,
    Typography,
} from '@mui/material';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'chart.js/auto';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { useExperimentData } from './hooks/useExperimentData';
import { useExperimentMetrics } from './hooks/useExperimentMetrics';
import { LayoutControls } from './components/LayoutControls';
import { MetricsCard } from './components/MetricsCard';
import { RevenueChart } from './components/charts/RevenueChart';
import { LogPanel } from './components/LogPanel';
import { Header } from './components/Header';
import { darkTheme, lightTheme } from './theme';
import {
    ALL_ITEMS,
    breakpoints,
    cols,
    defaultLayouts,
    LOCALSTORAGE_LAYOUT_KEY,
    LOCALSTORAGE_VISIBLE_KEY,
} from './gridConfig';
import { getLocalStorageValue } from './utils';
import { TrendsChart } from './components/charts/TrendsChart';

const ResponsiveGridLayout = WidthProvider(Responsive);
const DARK_MODE_KEY = 'darkMode';

const App: React.FC = () => {
    const [layouts, setLayouts] = useState<Layouts>(() =>
        getLocalStorageValue(LOCALSTORAGE_LAYOUT_KEY, defaultLayouts)
    );
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [visibleItems, setVisibleItems] = useState<Set<string>>(() =>
        new Set(getLocalStorageValue<string[]>(LOCALSTORAGE_VISIBLE_KEY, Array.from(ALL_ITEMS)))
    );
    const [darkMode, setDarkMode] = useState<boolean>(() => getLocalStorageValue(DARK_MODE_KEY, false));
    const { data, logs, error } = useExperimentData();
    const { metrics, error: metricsError } = useExperimentMetrics();

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_LAYOUT_KEY, JSON.stringify(layouts));
    }, [layouts]);
    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_VISIBLE_KEY, JSON.stringify(Array.from(visibleItems)));
    }, [visibleItems]);
    useEffect(() => {
        localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));
    }, [darkMode]);
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const currentTheme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

    const layoutItems = [
        { i: 'totalVisitors', title: 'Total Visitors', visible: visibleItems.has('totalVisitors') },
        { i: 'conversionRate', title: 'Conversion Rate', visible: visibleItems.has('conversionRate') },
        { i: 'avgSessionDuration', title: 'Avg Session Duration', visible: visibleItems.has('avgSessionDuration') },
        { i: 'revenuePerVisitor', title: 'Revenue per Visitor', visible: visibleItems.has('revenuePerVisitor') },
        { i: 'revenueChart', title: 'Revenue Chart', visible: visibleItems.has('revenueChart') },
        { i: 'variantsBarChart', title: 'Trends: Conversions & Rate', visible: visibleItems.has('variantsBarChart') },
        { i: 'eventLog', title: 'Event Log', visible: visibleItems.has('eventLog') },
    ];

    const onLayoutChange = (current: Layout[], all: Layouts) => {
        setLayouts(all);
    };

    const toggleItemVisibility = (itemId: string) => {
        setVisibleItems(prev => {
            const next = new Set(prev);
            if (next.has(itemId)) {
                next.delete(itemId);
                setLayouts(prevLayouts => {
                    const updated: Layouts = {};
                    Object.keys(prevLayouts).forEach(bp => {
                        updated[bp] = prevLayouts[bp].filter(l => l.i !== itemId);
                    });
                    return updated;
                });
            } else {
                next.add(itemId);
                setLayouts(prevLayouts => {
                    const updated: Layouts = {};
                    Object.keys(prevLayouts).forEach(bp => {
                        const alreadyHasItem = prevLayouts[bp].some(l => l.i === itemId);
                        if (!alreadyHasItem) {
                            const defLayout = defaultLayouts[bp]?.find(l => l.i === itemId);
                            updated[bp] = defLayout
                                ? [...prevLayouts[bp], defLayout]
                                : [...prevLayouts[bp], { i: itemId, x: 0, y: 0, w: 2, h: 2 }];
                        } else {
                            updated[bp] = prevLayouts[bp];
                        }
                    });
                    return updated;
                });
            }
            return next;
        });
    };

    const handleReset = () => {
        setLayouts(defaultLayouts);
        setVisibleItems(new Set(ALL_ITEMS));
    };

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    if (error || metricsError) {
        return (
            <ThemeProvider theme={currentTheme}>
                <Container sx={{ mt: 4 }}>
                    <Alert severity="error">
                        Failed to connect to the server. Please try again later.
                    </Alert>
                </Container>
            </ThemeProvider>
        );
    }

    if (!data) {
        return (
            <ThemeProvider theme={currentTheme}>
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Container>
            </ThemeProvider>
        );
    }

    const totalVisitors = data.variants.reduce((acc, v) => acc + v.visitors, 0);
    const totalConversions = data.variants.reduce((acc, v) => acc + v.conversions, 0);
    const totalRevenue = data.variants.reduce((acc, v) => acc + v.revenue, 0);
    const revenuePerVisitor = totalVisitors ? totalRevenue / totalVisitors : 0;
    const conversionRate = totalVisitors ? (totalConversions / totalVisitors) * 100 : 0;
    const averageSessionDuration = data.averageSessionDuration || 3.2;


    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Header lastUpdated={data.lastUpdated ?? ''} onSettingsClick={toggleDrawer(true)} />
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={breakpoints}
                    cols={cols}
                    rowHeight={100}
                    margin={[8, 8]}
                    containerPadding={[8, 8]}
                    draggableHandle=".drag-handle"
                    onLayoutChange={onLayoutChange}
                >
                    {visibleItems.has('totalVisitors') && (
                        <div key="totalVisitors">
                            <MetricsCard
                                title="Total Visitors"
                                value={totalVisitors.toLocaleString()}
                                color={currentTheme.palette.success.dark}
                                isDraggable
                            />
                        </div>
                    )}
                    {visibleItems.has('conversionRate') && (
                        <div key="conversionRate">
                            <MetricsCard
                                title="Conversion Rate"
                                value={`${conversionRate.toFixed(2)}%`}
                                color={currentTheme.palette.warning.main}
                                isDraggable
                            />
                        </div>
                    )}
                    {visibleItems.has('avgSessionDuration') && (
                        <div key="avgSessionDuration">
                            <MetricsCard
                                title="Avg Session Duration"
                                value={`${averageSessionDuration.toFixed(2)} min`}
                                color={currentTheme.palette.primary.light}
                                isDraggable
                            />
                        </div>
                    )}
                    {visibleItems.has('revenuePerVisitor') && (
                        <div key="revenuePerVisitor">
                            <MetricsCard
                                title="Revenue/Visitor"
                                value={`$${revenuePerVisitor.toFixed(2)}`}
                                color={currentTheme.palette.primary.main}
                                isDraggable
                            />
                        </div>
                    )}
                    {visibleItems.has('revenueChart') && (
                        <div key="revenueChart">
                            <RevenueChart variants={data.variants} isDraggable />
                        </div>
                    )}
                    {visibleItems.has('variantsBarChart') && (
                        <div key="variantsBarChart">
                            <TrendsChart variants={data.variants} isDraggable />
                        </div>
                    )}
                    {visibleItems.has('eventLog') && (
                        <div key="eventLog">
                            <LogPanel logs={logs} isDraggable />
                        </div>
                    )}
                </ResponsiveGridLayout>
                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 300, p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Dashboard Settings
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={darkMode}
                                    onChange={(e) => setDarkMode(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Dark Mode"
                        />
                        <LayoutControls items={layoutItems} onToggle={toggleItemVisibility} />
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() => {
                                handleReset();
                                setDrawerOpen(false);
                            }}
                        >
                            Reset to Default View
                        </Button>
                    </Box>
                </Drawer>
            </Container>
        </ThemeProvider>
    );
};

export default App;
