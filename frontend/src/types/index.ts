export interface ConversionDataPoint {
    timestamp: string;
    rate: number;
    visitors: number;
    conversions: number;
}

export interface Variant {
    name: string;
    visitors: number;
    conversions: number;
    revenue: number;
    history: ConversionDataPoint[];
}

export interface ExperimentData {
    averageSessionDuration: number;
    experimentId: string;
    variants: Variant[];
    lastUpdated: string;
}

export interface ExperimentLog {
    timestamp: string;
    type: 'visitor' | 'conversion' | 'revenue' | 'milestone';
    variantName: string;
    message: string;
    value?: number;
}
