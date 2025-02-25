export const formatRelativeOrDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();

    // If somehow in the future or basically "just now"
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return 'just now';

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    // If older than 24 hours, return standard locale string
    if (diffHr >= 24) {
        return date.toLocaleString();
    }

    // Otherwise build a "time ago" message
    if (diffHr >= 1) {
        const leftoverMinutes = diffMin % 60;
        if (leftoverMinutes > 0) {
            return `${diffHr}h ${leftoverMinutes}m ago`;
        }
        return `${diffHr}h ago`;
    }

    if (diffMin >= 1) {
        return `${diffMin}m ago`;
    }

    // Otherwise show seconds
    return `${diffSec}s ago`;
};
