import React from 'react';
import { Box, Text } from 'ink';

export const NowPlaying = ({ currentPlaying, trackInfo, isPaused }) => {
    const defaultName = currentPlaying ? currentPlaying.replace(/\.[^/.]+$/, "") : "None";
    
    const title = trackInfo ? trackInfo.title : defaultName;
    const artist = trackInfo ? trackInfo.artist : "Unknown Artist";
    const album = trackInfo ? trackInfo.album : "Unknown Album";

    return (
        <Box flexDirection="column" width="50%" paddingLeft={2}>
            <Text bold color="magenta" marginBottom={1}>Now Playing</Text>
            
            <Box flexDirection="column" marginBottom={1}>
                <Text color="gray">Track:</Text>
                <Text color="white" bold>{title}</Text>
                <Text color="cyan">{artist}</Text>
                <Text color="dim">{album}</Text>
            </Box>

            <Box flexDirection="column">
                <Text color="gray">Status:</Text>
                <Text color={currentPlaying ? (isPaused ? "yellow" : "green") : "dim"}>
                    {currentPlaying ? (isPaused ? "Paused" : "Playing") : "Stopped"}
                </Text>
            </Box>
        </Box>
    );
};