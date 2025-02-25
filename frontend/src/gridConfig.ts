import { Layouts } from 'react-grid-layout';

export const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
export const cols = { lg: 14, md: 10, sm: 6, xs: 4, xxs: 2 };

export const defaultLayouts: Layouts = {
    lg: [
        { w: 3, h: 1, x: 0,  y: 0,  i: 'totalVisitors' },
        { w: 3, h: 1, x: 3,  y: 0,  i: 'conversionRate' },
        { w: 4, h: 1, x: 6,  y: 0,  i: 'avgSessionDuration' },
        { w: 4, h: 1, x: 10, y: 0,  i: 'revenuePerVisitor' },
        { w: 4, h: 4, x: 0,  y: 1,  i: 'revenueChart' },
        { w: 6, h: 4, x: 4,  y: 1,  i: 'variantsBarChart' },
        { w: 4, h: 4, x: 10, y: 1,  i: 'eventLog' },
    ],
    md: [
        { w: 2, h: 1, x: 0, y: 0, i: 'totalVisitors' },
        { w: 2, h: 1, x: 2, y: 0, i: 'conversionRate' },
        { w: 3, h: 1, x: 4, y: 0, i: 'avgSessionDuration' },
        { w: 3, h: 1, x: 7, y: 0, i: 'revenuePerVisitor' },
        { w: 3, h: 4, x: 0, y: 1, i: 'revenueChart' },
        { w: 4, h: 4, x: 3, y: 1, i: 'variantsBarChart' },
        { w: 3, h: 4, x: 7, y: 5, i: 'eventLog' },
    ],
    sm: [
        { w: 2, h: 1, x: 0, y: 0, i: 'totalVisitors' },
        { w: 2, h: 1, x: 0, y: 1, i: 'conversionRate' },
        { w: 2, h: 1, x: 0, y: 2, i: 'avgSessionDuration' },
        { w: 2, h: 1, x: 0, y: 3, i: 'revenuePerVisitor' },
        { w: 4, h: 4, x: 2, y: 0, i: 'revenueChart' },
        { w: 4, h: 4, x: 0, y: 4, i: 'variantsBarChart' },
        { w: 2, h: 4, x: 4, y: 4, i: 'eventLog' },
    ],
    xs: [
        { w: 2, h: 1, x: 0, y: 0, i: 'totalVisitors' },
        { w: 2, h: 1, x: 0, y: 2, i: 'conversionRate' },
        { w: 2, h: 1, x: 0, y: 3, i: 'avgSessionDuration' },
        { w: 2, h: 1, x: 0, y: 1, i: 'revenuePerVisitor' },
        { w: 2, h: 4, x: 2, y: 0, i: 'revenueChart' },
        { w: 2, h: 4, x: 0, y: 4, i: 'variantsBarChart' },
        { w: 2, h: 4, x: 2, y: 4, i: 'eventLog' },
    ],
    xxs: [
        { w: 2, h: 1, x: 0, y: 0, i: 'totalVisitors' },
        { w: 2, h: 1, x: 0, y: 1, i: 'conversionRate' },
        { w: 2, h: 1, x: 0, y: 2, i: 'avgSessionDuration' },
        { w: 2, h: 1, x: 0, y: 3, i: 'revenuePerVisitor' },
        { w: 2, h: 4, x: 0, y: 4, i: 'revenueChart' },
        { w: 2, h: 4, x: 0, y: 8, i: 'variantsBarChart' },
        { w: 2, h: 4, x: 0, y: 12, i: 'eventLog' },
    ],
};

export const ALL_ITEMS = [
    'totalVisitors',
    'conversionRate',
    'avgSessionDuration',
    'revenuePerVisitor',
    'revenueChart',
    'variantsBarChart',
    'eventLog'
];

export const LOCALSTORAGE_LAYOUT_KEY = 'myResponsiveDashboardLayouts';
export const LOCALSTORAGE_VISIBLE_KEY = 'myResponsiveDashboardVisibility';
