import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { ExperimentData, ExperimentLog } from '../types';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000';

export const useExperimentData = () => {
    const [data, setData] = useState<ExperimentData | null>(null);
    const [logs, setLogs] = useState<ExperimentLog[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        newSocket.on('experimentUpdate', (update: ExperimentData) => {
            setData(update);
        });

        newSocket.on('logsUpdate', (update: ExperimentLog[]) => {
            setLogs(update);
        });

        newSocket.on('connect_error', (err) => {
            setError(err);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    return { data, logs, error, socket };
};
