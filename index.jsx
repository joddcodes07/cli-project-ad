import React, { useState, useEffect } from 'react';
import { render, Box, useInput } from 'ink';
import { getSongs } from './utils/scanner.js';
import { playSong, stopSong, togglePause } from './utils/audioEngine.js';
import { getTrackInfo } from './utils/metadata.js';

import { Layout } from './components/Layout.jsx';
import { Header } from './components/Header.jsx';
import { QueueList } from './components/QueueList.jsx';
import { NowPlaying } from './components/NowPlaying.jsx';
import { ProgressBar } from './components/ProgressBar.jsx';
import { KeyboardLegend } from './components/KeyboardLegend.jsx';

const App = () => {
    const [songs, setSongs] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [trackInfo, setTrackInfo] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); // New state for progress

    useEffect(() => {
        setSongs(getSongs());
    }, []);

    // The Timer: Ticks up 1 second at a time while playing
    useEffect(() => {
        let interval;
        if (currentPlaying && !isPaused) {
            interval = setInterval(() => {
                setCurrentTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [currentPlaying, isPaused]);

    const handlePlayTrack = async (index) => {
        if (songs.length === 0) return;
        const selected = songs[index];
        const filePath = `./songs/${selected}`;
        
        setCurrentPlaying(selected);
        setSelectedIndex(index);
        setIsPaused(false);
        setCurrentTime(0); // Reset progress
        
        const info = await getTrackInfo(filePath);
        setTrackInfo(info);

        playSong(filePath, () => {
            // Auto-Next Logic when song finishes naturally
            const nextIndex = index + 1 < songs.length ? index + 1 : 0;
            handlePlayTrack(nextIndex);
        });
    };

    useInput((input, key) => {
        if (input === 'q') {
            stopSong();
            process.exit(0);
        }
        if (songs.length === 0) return;
        
        if (key.upArrow) setSelectedIndex(prev => (prev > 0 ? prev - 1 : songs.length - 1));
        if (key.downArrow) setSelectedIndex(prev => (prev < songs.length - 1 ? prev + 1 : 0));
        
        if (input === ' ') {
            if (currentPlaying) {
                const paused = togglePause();
                setIsPaused(paused);
            }
        }
        
        if (key.return) {
            handlePlayTrack(selectedIndex);
        }
    });

    const duration = trackInfo ? trackInfo.duration : 0;

    return (
        <Layout>
            <Header />
            <Box flexDirection="row">
                <QueueList songs={songs} selectedIndex={selectedIndex} currentPlaying={currentPlaying} />
                <NowPlaying currentPlaying={currentPlaying} trackInfo={trackInfo} isPaused={isPaused} />
            </Box>
            <ProgressBar currentTime={currentTime} duration={duration} />
            <KeyboardLegend />
        </Layout>
    );
};

render(<App />);