import React from 'react';
import { Box, Text } from 'ink';

export const NowPlaying = ({ currentPlaying }) => {
    const displayName = currentPlaying ? currentPlaying.replace(/\.[^/.]+$/, "") : "None";

    return (
        <Box flexDirection="column" width="50%" paddingLeft={2}>
            <Text bold color="magenta" marginBottom={1}>Now Playing</Text>
            
            <Box flexDirection="column" marginBottom={1}>
                <Text color="gray">Track:</Text>
                <Text color="white">{displayName}</Text>
            </Box>

            <Box flexDirection="column">
                <Text color="gray">Status:</Text>
                <Text color={currentPlaying ? "green" : "dim"}>
                    {currentPlaying ? "Playing" : "Stopped"}
                </Text>
            </Box>
        </Box>
    );
};