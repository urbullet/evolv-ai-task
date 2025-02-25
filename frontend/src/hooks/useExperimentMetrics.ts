import { useState, useEffect } from 'react';
import { ExperimentData } from '../types';

const EXPERIMENT_ID = 'exp_live_001';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const useExperimentMetrics = () => {
    const [metrics, setMetrics] = useState<ExperimentData | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch(`${API_URL}/api/experiments/${EXPERIMENT_ID}/metrics`);
                if (!res.ok) {
                    throw new Error('Failed to fetch metrics');
                }
                const data = await res.json();
                setMetrics(data);
            } catch (err) {
                setError(err as Error);
            }
        };

        fetchMetrics();
        const interval = setInterval(fetchMetrics, 10000); // refresh every 10 seconds
        return () => clearInterval(interval);
    }, []);

    return { metrics, error };
};
