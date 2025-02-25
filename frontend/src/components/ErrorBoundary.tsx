import React, {Component, ErrorInfo, ReactNode} from 'react';
import {Alert, Container} from '@mui/material';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return {hasError: true};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Container>
                    <Alert severity="error">
                        Sorry.. there was an error. Please refresh the page.
                    </Alert>
                </Container>
            );
        }

        return this.props.children;
    }
}
