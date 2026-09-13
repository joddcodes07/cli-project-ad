import React from 'react';
import { Box, Text } from 'ink';

export const NowPlaying = ({ currentPlaying, trackInfo, isPaused }) => {
    const defaultName = currentPlaying ? currentPlaying.replace(/\.[^/.]+$/, "") : "None";
    
    const title = trackInfo ? trackInfo.title : defaultName;
    const artist = trackInfo ? trackInfo.artist : "Unknown Artist";
    const album = trackInfo ? trackInfo.album : "Unknown Album";

    // Dynamic ASCII Art based on playback state
    const asciiArt = currentPlaying ? [
        " 💽  ██████ ",
        "    ██████ ",
        "    ██████ "
    ] : [
        " 📭  ░░░░░░ ",
        "    ░░░░░░ ",
        "    ░░░░░░ "
    ];

    return (
        <Box flexDirection="column" width="50%" paddingLeft={2}>
            <Text bold color="magenta" marginBottom={1}>Now Playing</Text>
            
            <Box flexDirection="row" marginBottom={1}>
                {/* ASCII Art Box */}
                <Box flexDirection="column" marginRight={3}>
                    {asciiArt.map((line, i) => (
                        <Text key={i} color={currentPlaying ? "cyan" : "gray"}>{line}</Text>
                    ))}
                </Box>
                
                {/* Metadata Box */}
                <Box flexDirection="column">
                    <Text color="gray">Track:</Text>
                    <Text color="white" bold>{title}</Text>
                    <Text color="cyan">{artist}</Text>
                    <Text color="dim">{album}</Text>
                </Box>
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