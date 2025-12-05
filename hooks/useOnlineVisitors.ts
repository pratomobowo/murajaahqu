import { useState, useEffect } from 'react';

interface VisitorSession {
    sessionId: string;
    lastSeen: number;
}

const STORAGE_KEY = 'murajaahqu_visitors';
const SESSION_TIMEOUT = 15000; // 15 seconds
const HEARTBEAT_INTERVAL = 5000; // 5 seconds

export const useOnlineVisitors = () => {
    const [visitorCount, setVisitorCount] = useState(0);
    const [sessionId] = useState(() => {
        // Generate unique session ID
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    });

    const updateVisitorCount = () => {
        try {
            const now = Date.now();
            const storedData = localStorage.getItem(STORAGE_KEY);
            let sessions: VisitorSession[] = storedData ? JSON.parse(storedData) : [];

            // Remove expired sessions
            sessions = sessions.filter(session => {
                return now - session.lastSeen < SESSION_TIMEOUT;
            });

            // Update or add current session
            const existingSessionIndex = sessions.findIndex(s => s.sessionId === sessionId);
            if (existingSessionIndex >= 0) {
                sessions[existingSessionIndex].lastSeen = now;
            } else {
                sessions.push({ sessionId, lastSeen: now });
            }

            // Save back to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));

            // Update count
            setVisitorCount(sessions.length);
        } catch (error) {
            console.error('Error updating visitor count:', error);
        }
    };

    useEffect(() => {
        // Initial update
        updateVisitorCount();

        // Set up heartbeat interval
        const heartbeatInterval = setInterval(() => {
            updateVisitorCount();
        }, HEARTBEAT_INTERVAL);

        // Cleanup on unmount
        return () => {
            clearInterval(heartbeatInterval);

            // Remove current session when component unmounts
            try {
                const storedData = localStorage.getItem(STORAGE_KEY);
                if (storedData) {
                    let sessions: VisitorSession[] = JSON.parse(storedData);
                    sessions = sessions.filter(s => s.sessionId !== sessionId);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
                }
            } catch (error) {
                console.error('Error cleaning up session:', error);
            }
        };
    }, [sessionId]);

    return visitorCount;
};
