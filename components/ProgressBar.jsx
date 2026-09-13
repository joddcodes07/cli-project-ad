import React from 'react';
import { Box, Text } from 'ink';

const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
};

export const ProgressBar = ({ currentTime, duration }) => {
    const width = 50; // Total character width of the bar
    const safeDuration = duration > 0 ? duration : 1; 
    const progress = Math.min(currentTime / safeDuration, 1);
    
    const filledLength = Math.round(width * progress);
    const emptyLength = width - filledLength;
    
    // Creates a line like: ━━━━━━〇──────────────────
    const bar = '━'.repeat(filledLength) + '〇' + '─'.repeat(Math.max(0, emptyLength - 1));

    return (
        <Box marginTop={1} flexDirection="row" justifyContent="center">
            <Box width={6} marginRight={1}>
                <Text color="gray">{formatTime(currentTime)}</Text>
            </Box>
            <Text color="cyan">{bar}</Text>
            <Box width={6} marginLeft={1}>
                <Text color="gray">{formatTime(duration)}</Text>
            </Box>
        </Box>
    );
};