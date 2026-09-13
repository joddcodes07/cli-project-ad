import React from 'react';
import { Box, Text } from 'ink';

export const QueueList = ({ songs, selectedIndex, currentPlaying }) => {
    return (
        <Box flexDirection="column" width="50%" paddingRight={2}>
            <Text bold color="cyan" marginBottom={1}>Playlist</Text>
            {songs.length === 0 ? (
                <Text color="red">❌ No MP3 files found</Text>
            ) : (
                songs.map((song, idx) => {
                    const isSelected = idx === selectedIndex;
                    const isPlaying = song === currentPlaying;
                    const displayName = song.replace(/\.[^/.]+$/, "");
                    
                    return (
                        <Text key={song} color={isSelected ? 'yellow' : 'white'}>
                            {isSelected ? '▶ ' : '  '}
                            {String(idx + 1).padStart(2, '0')} │ {displayName}
                            {isPlaying ? ' (Playing)' : ''}
                        </Text>
                    );
                })
            )}
        </Box>
    );
};