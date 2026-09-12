import React, { useState, useEffect } from 'react';
import { render, Text, Box, useInput } from 'ink';
import { getSongs } from './utils/scanner.js';
import { playSong, stopSong } from './utils/audioEngine.js';

const App = () => {
    const [songs, setSongs] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentPlaying, setCurrentPlaying] = useState(null);

    useEffect(() => {
        const loadedSongs = getSongs();
        setSongs(loadedSongs);
    }, []);

    useInput((input, key) => {
        if (input === 'q') {
            stopSong();
            process.exit(0);
        }

        if (songs.length === 0) return;

        if (key.upArrow) {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : songs.length - 1));
        }

        if (key.downArrow) {
            setSelectedIndex(prev => (prev < songs.length - 1 ? prev + 1 : 0));
        }

        if (key.return) {
            const selected = songs[selectedIndex];
            setCurrentPlaying(selected);
            playSong(`./songs/${selected}`, () => {
                setCurrentPlaying(null);
            });
        }
    });

    return (
        <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
            <Text bold color="cyan">  🎶 Terminal Rhythm — React Edition</Text>
            <Text dimColor>  ────────────────────────────────────────</Text>
            
            {songs.length === 0 ? (
                <Text color="red">  ❌ No MP3 files found in ./songs</Text>
            ) : (
                songs.map((song, idx) => {
                    const isSelected = idx === selectedIndex;
                    const isPlaying = song === currentPlaying;
                    const displayName = song.replace(/\.[^/.]+$/, "");
                    
                    return (
                        <Text key={song} color={isSelected ? 'yellow' : 'white'}>
                            {isSelected ? ' ▶ ' : '   '} 
                            {String(idx + 1).padStart(2, '0')} │ {displayName} 
                            {isPlaying ? ' (Playing...)' : ''}
                        </Text>
                    );
                })
            )}
            
            <Text dimColor>  ────────────────────────────────────────</Text>
            <Text color="gray">  [↑/↓] Navigate  [Enter] Play  [q] Quit</Text>
        </Box>
    );
};

render(<App />);