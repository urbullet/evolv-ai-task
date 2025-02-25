import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import {config} from './config';
import {experimentService} from './services/experimentService';

const app = express();
const server = createServer(app);
const io = new Server(server, {cors: {origin: config.cors.origin}});

app.use(cors());
app.use(express.json());

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});

io.on('connection', socket => {
    console.log('Client connected');
    socket.emit('experimentUpdate', experimentService.getData());
    socket.emit('logsUpdate', experimentService.getLogs());
    socket.on('disconnect', () => console.log('Client disconnected'));
});

const startUpdates = () => {
    setInterval(() => {
        const updatedData = experimentService.updateData();
        io.emit('experimentUpdate', updatedData);
        io.emit('logsUpdate', experimentService.getLogs());
    }, config.updateInterval);
};

app.get('/api/experiments/live', (req: express.Request, res: express.Response) => {
    res.json(experimentService.getData());
});

app.get('/api/experiments/:id/metrics', (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    const data = experimentService.getData();
    if (data.experimentId !== id) {
        res.status(404).json({error: 'Experiment not found'});
    } else {
        const metrics = {
            conversionRates: data.variants.map(variant => variant.visitors > 0 ? (variant.conversions / variant.visitors) * 100 : 0),
            revenuePerVisitor: data.variants.map(variant => variant.visitors > 0 ? variant.revenue / variant.visitors : 0)
        };
        res.json({...data, metrics});
    }
});

app.post('/api/experiments/:id/logs', (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    const newLog = req.body;
    const data = experimentService.getData();
    if (data.experimentId !== id) {
        res.status(404).json({error: 'Experiment not found'});
    } else {
        experimentService.addLog(newLog);
        res.status(201).json({message: 'Log created', log: newLog});
    }
});

app.get('/api/experiments/logs', (req, res) => {
    const limit = parseInt(req.query.limit as string) || 50;
    res.json(experimentService.getLogs(limit));
});

const startServer = () => {
    try {
        server.listen(config.port, () => {
            console.log(`Backend running on port ${config.port}`);
            startUpdates();
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
