import { ExperimentData, ExperimentLog, ConversionDataPoint } from '../types';

class ExperimentService {
    #experimentData: ExperimentData;
    #logs: ExperimentLog[] = [];

    constructor() {
        this.#experimentData = {
            experimentId: "exp_live_001",
            variants: [
                { name: "Control", visitors: 1200, conversions: 250, revenue: 4800, history: [] },
                { name: "Variant B", visitors: 1100, conversions: 290, revenue: 5200, history: [] }
            ],
            lastUpdated: new Date().toISOString()
        };
    }

    getData = (): ExperimentData => this.#experimentData;

    getLogs = (limit = 50): ExperimentLog[] => this.#logs.slice(-limit);

    updateData = (): ExperimentData => {
        this.#experimentData = {
            ...this.#experimentData,
            variants: this.#experimentData.variants.map(variant => {
                const updates = this.#generateVariantUpdates();
                const newVisitors = variant.visitors + updates.visitors;
                const newConversions = variant.conversions + updates.conversions;
                const newRevenue = variant.revenue + updates.revenue;
                const newRate = newVisitors > 0 ? (newConversions / newVisitors) * 100 : 0;
                const newDataPoint: ConversionDataPoint = {
                    timestamp: new Date().toISOString(),
                    rate: newRate,
                    visitors: newVisitors,
                    conversions: newConversions
                };
                const newHistory = [...(variant.history || []), newDataPoint];
                const newVariant = {
                    ...variant,
                    visitors: newVisitors,
                    conversions: newConversions,
                    revenue: newRevenue,
                    history: newHistory
                };
                this.#generateLogs(variant.name, updates);
                return newVariant;
            }),
            lastUpdated: new Date().toISOString()
        };
        return this.#experimentData;
    };

    addLog = (log: ExperimentLog) => {
        this.#logs.push(log);
    };

    #generateVariantUpdates = () => ({
        visitors: Math.floor(Math.random() * 10),
        conversions: Math.floor(Math.random() * 5),
        revenue: Math.floor(Math.random() * 50),
        sessionDuration: Number((Math.random() * 5 + 1).toFixed(2))
    });

    #generateLogs = (variantName: string, updates: { visitors: number; conversions: number; revenue: number }) => {
        const { visitors, conversions } = updates;
        const timestamp = new Date().toISOString();
        if (visitors > 0) {
            this.#logs.push({
                timestamp,
                type: 'visitor',
                variantName,
                message: `${visitors} new visitors for ${variantName}`,
                value: visitors
            });
        }
        if (conversions > 0) {
            this.#logs.push({
                timestamp,
                type: 'conversion',
                variantName,
                message: `${conversions} new conversions for ${variantName}`,
                value: conversions
            });
        }
    };
}

export const experimentService = new ExperimentService();
